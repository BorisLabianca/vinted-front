import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({ title, amount, userId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);
  console.log(userId);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);
    const stripeResponse = await stripe.createToken(cardElement, {
      name: userId,
    });
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;

    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/payment",
      { stripeToken, amount, title }
    );
    console.log(response.data);
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };
  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement /> <button type="submit">Payer</button>
        </form>
      ) : (
        <span>Paiement effectué !</span>
      )}
    </>
  );
};
export default CheckoutForm;
