const rawBody = require("raw-body");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    // Parse the raw body before accessing it
    const body = await rawBody(req);
    const parsedBody = JSON.parse(body.toString()); // Parse the raw body into a JSON object
    const { items, email } = parsedBody; // Destructure the items and email

    // Ensure that each item has a quantity
    const transformedItem = items.map((item) => ({
      quantity: item.quantity || 1, // Default to 1 if quantity is missing
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: item.price * 100, // Convert to cents (Stripe expects the price in cents)
      },
    }));

    // Create a session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Specify your payment methods
      shipping_options: [
        {
          shipping_rate: "shr_1REFPXGqmFtglJz9skMJJZdQ", // Shipping rate ID
          // Note: You should replace this with your actual shipping rate ID
        },
      ],
      submit_type: "pay", // This defines the type of submission (can be 'pay' or 'donate')
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB"], // Limit shipping countries to US, CA, and GB
      },
      line_items: transformedItem, // Add the transformed items
      mode: "payment", // Payment mode
      success_url: `${req.headers.origin}/success`, // URL to redirect to upon success
      cancel_url: `${req.headers.origin}/checkout`, // URL to redirect to if the user cancels
      metadata: {
        email: email,
        images: JSON.stringify(items.map((item) => item.image)), // Store item images as metadata
      },
    });

    // Send back the session ID to the client
    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
};

export default createCheckoutSession;

export const config = {
  api: {
    bodyParser: false, // Disable body parsing (we'll handle it manually)
  },
};
