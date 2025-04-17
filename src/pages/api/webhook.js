// Import dependencies
require('dotenv').config();
import { buffer } from 'micro';
import Stripe from 'stripe';
import * as admin from 'firebase-admin';

// Parse Firebase service account key
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccount) {
    throw new Error("Missing FIREBASE_SERVICE_ACCOUNT in environment variables");
}

const firebaseConfig = JSON.parse(serviceAccount);

// Initialize Firebase Admin
const app = !admin.apps.length
    ? admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig)
    })
    : admin.app();

// Initialize Stripe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeSigningSecret = process.env.STRIPE_SIGNING_SECRET;

if (!stripeSecretKey || !stripeSigningSecret) {
    throw new Error("Missing Stripe secret keys in environment variables");
}

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2022-11-15'
});

// Fulfill the order in Firebase
const fulfillOrder = async (session) => {
    const email = session.metadata?.email;
    const images = session.metadata?.images;

    if (!email || !images) {
        console.error("❌ Missing required session metadata", session.metadata);
        return;
    }

    let parsedImages = [];

    try {
        parsedImages = JSON.parse(images);
    } catch (err) {
        console.error("❌ Error parsing session metadata images", images, err);
        return;
    }

    return app
        .firestore()
        .collection('users')
        .doc(email)
        .collection('orders')
        .doc(session.id)
        .set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details?.amount_shipping / 100 || 0,
            images: parsedImages,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log(`✅ Order ${session.id} has been added to Firestore`);
        });
};

// Webhook handler
const webhookHandler = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    const reqBuffer = await buffer(req);
    const payload = reqBuffer.toString('utf8');
    const signature = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, signature, stripeSigningSecret);
    } catch (err) {
        console.error('❌ Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        return fulfillOrder(session)
            .then(() => res.status(200).send('✅ Success'))
            .catch((err) => {
                console.error('❌ Error fulfilling order:', err);
                return res.status(400).send(`Webhook Error: ${err.message}`);
            });
    } else {
        console.log(`⚠️ Unhandled event type: ${event.type}`);
        return res.status(200).end();
    }
};

export default webhookHandler;

// Disable body parsing for Stripe
export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
};


//stripe listen --forward-to localhost:3000/api/webhook