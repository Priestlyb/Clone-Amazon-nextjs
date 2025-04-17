// File: /pages/api/webhook.js

import { buffer } from 'micro';
import Stripe from 'stripe';

// Disable body parsing for Stripe webhooks
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

// Initialize Firebase Admin SDK
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
    }),
  });
}


// Fulfill the order and store in Firestore
const fulfillOrder = async (session) => {
  const email = session.metadata?.email;
  const images = session.metadata?.images;

  if (!email || !images) {
    console.error("❌ Missing session metadata:", session.metadata);
    return;
  }

  let parsedImages;
  try {
    parsedImages = JSON.parse(images);
  } catch (err) {
    console.error("❌ Error parsing images:", err);
    return;
  }

  return admin
    .firestore()
    .collection('users')
    .doc(email)
    .collection('orders')
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details?.amount_shipping / 100 || 0,
      images: parsedImages,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`✅ Order ${session.id} saved to Firestore`);
    });
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      process.env.STRIPE_SIGNING_SECRET
    );
  } catch (err) {
    console.error('❌ Error verifying webhook signature:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      await fulfillOrder(session);
      return res.status(200).send('✅ Success');
    } catch (err) {
      console.error('❌ Error fulfilling order:', err);
      return res.status(500).send(`Error: ${err.message}`);
    }
  }

  res.status(200).send('✅ Received');
}

//stripe listen --forward-to localhost:3000/api/webhook