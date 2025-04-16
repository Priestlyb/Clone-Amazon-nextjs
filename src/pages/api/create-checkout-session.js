import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function checkoutSession(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { items, email } = req.body;

    // Transform cart items to Stripe format
    const transformedItems = items.map((item) => ({
      quantity: item.quantity || 1,
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: item.price * 100, // convert dollars to cents
      },
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_options: [
        {
          shipping_rate: 'shr_1REFPXGqmFtglJz9skMJJZdQ', // Your real shipping rate ID
        },
      ],
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB'],
      },
      line_items: transformedItems,
      mode: 'payment',
      submit_type: 'pay',
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/checkout`,
      metadata: {
        email,
        images: JSON.stringify(items.map((item) => item.image)),
      },
    });

    res.status(200).json({ id: session.id });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
}
