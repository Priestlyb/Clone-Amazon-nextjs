require('dotenv').config();
import { buffer } from 'micro';
import Stripe from 'stripe';
import * as admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  // Ensure this is parsed if from environment variable

const app = !admin.apps.length
    ? admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
    : admin.app();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET
;

const fullfillOrder = async (session) => {
    console.log(`Fulfilling order for session ${session.id}`);
    return app
        .firestore()
        .collection('users')
        .doc(session.metadata.email)
        .collection("orders")
        .doc(session.id)
        .set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            console.log(`Order ${session.id} fulfilled`);
        });
};

const webhookHandler = async (req, res) => {
    if (req.method === "POST") {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString('utf8');
        const sig = req.headers['stripe-signature'];

        let event;
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (err) {
            console.error(`⚠️ Webhook signature verification failed:`, err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            return fullfillOrder(session)
                .then(() => res.status(200).send('Success'))
                .catch((err) => {
                    console.error('Error fulfilling order:', err);
                    res.status(400).send('Webhook Error: ' + err.message);
                });
        } else {
            console.log(`Unhandled event type: ${event.type}`);
            return res.status(200).end();
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
};

export default webhookHandler;

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};


// stripe listen --forward-to localhost:3000/api/webhook