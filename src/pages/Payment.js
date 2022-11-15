import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51M4UiHDyQmaF7KhQkOh3V7oxPXIQyBjkVhUlLrJZkrTD1TIblFkGLbvlLKo8rIlwwUdNBKBCraoZZOODxxw8dO6x00zFSGCFRU"
);

const Payment = ({ userId }) => {
  const location = useLocation();
  const { title, amount } = location.state;
  const protectionFee = amount / 10;
  const shippingFee = protectionFee * 2;
  const grandTotal =
    Number(amount) + Number(protectionFee) + Number(shippingFee);
  return (
    <main className="payment-main">
      <div className="payment-container">
        <div className="order-summary">
          <p className="title">Résumé de la commande</p>
          <div className="payment-details">
            <div>
              <span>Commande</span>
              <span>{Number(amount).toFixed(2)} €</span>
            </div>
            <div>
              <span>Frais de protection acheteurs</span>
              <span>{protectionFee.toFixed(2)} €</span>
            </div>
            <div>
              <span>Frais de port</span>
              <span>{shippingFee.toFixed(2)} €</span>
            </div>
          </div>
          <hr />
          <div className="grand-total">
            <span>Total</span>
            <span>{grandTotal.toFixed(2)} €</span>
          </div>
          <div className="final-notice">
            Il ne vous reste plus qu'une étape pour vous offrir{" "}
            <span className="emphasise">{title}</span>. Vous allez payer{" "}
            <span className="emphasise">{grandTotal.toFixed(2)} € </span> (frais
            de protection et frais de port inclus).
          </div>
          <hr />
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm title={title} amount={amount} userId={userId} />
        </Elements>
      </div>
    </main>
  );
};
export default Payment;
