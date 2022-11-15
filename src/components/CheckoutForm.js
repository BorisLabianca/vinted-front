import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({ title, amount, userId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);
  //   console.log(userId);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);
    const stripeResponse = await stripe.createToken(cardElement, {
      name: userId,
    });
    // console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;
    // console.log(amount);

    const response = await axios.post(
      "https://site--vinted-backend--67k4ycyfnl9b.code.run/payment",
      {
        token: stripeToken,
        amount: amount,
        title: title,
      }
    );
    console.log(response);
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };
  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement className="card-details" />
          <button type="submit" className="pay-btn">
            Payer
          </button>
        </form>
      ) : (
        <span>Paiement effectué !</span>
      )}
    </>
  );
};
export default CheckoutForm;
