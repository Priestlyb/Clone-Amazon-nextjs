import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import db  from "../../../firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";
import moment from "moment";
import Stripe from "stripe";
import Order from "@/components/Order";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <Header />
        <main className="max-w-screen-lg mx-auto p-10">
          <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
            Your Orders
          </h1>
          <h2>Please sign in to see your orders</h2>
        </main>
      </div>
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const userRef = doc(db, "users", session.user.email);
const ordersRef = collection(userRef, "orders");
const q = query(ordersRef, orderBy("timestamp", "desc"));
const stripeOrdersSnapshot = await getDocs(q);


  const orders = await Promise.all(
    stripeOrdersSnapshot.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amount_shipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h2>{orders.length} Orders</h2>
        <div className="mt-5 space-y-4">
          {orders?.map(
            ({id, amount, amount_shipping, items, timestamp, images}) => (
              <Order
                key={id}
                id={id}
                amount={amount}
                amount_shipping={amount_shipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            ))}
        </div>
      </main>
    </div>
  );
}
