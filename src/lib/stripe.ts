import { Stripe, loadStripe } from "@stripe/stripe-js";
import exp from "constants";

let stripePromise: promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXTAUTH_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
  }
  return stripePromise;
};

export default getStripe;
