import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = ({ handleToken }) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [emailExists, setEmailExists] = useState(false);

  return (
    <div>
      <h1>S'inscrire</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (password.length < 8) {
            alert("Votre mot de passe est trop court.");
          } else if (!email) {
            alert("Veuillez entrer une adresse e-mail.");
          } else if (!username) {
            alert("Veuillez entrer un nom d'utilisateur.");
          } else {
            const fetchData = async () => {
              try {
                const response = await axios.post(
                  "https://lereacteur-vinted-api.herokuapp.com/user/signup",
                  { username: username, email: email, password: password }
                );
                console.log(response.data);
                const token = response.data.token;
                handleToken(token);
                navigate("/");
              } catch (error) {
                console.log(error.response);
                if (
                  error.response.data.message ===
                  "This email already has an account"
                ) {
                  setEmailExists(true);
                }
                //   console.log(error.response.data.message);
              }
            };
            fetchData();
          }
        }}
      >
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        {emailExists ? (
          <p className="email-exists">Cet email a déjà un compte chez nous !</p>
        ) : null}
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {password.length < 8 ? (
          <div className="password-too-short">
            Votre mot de passe doit comporter au moins 8 caractères.
          </div>
        ) : null}

        <input type="checkbox" />
        <label>S'inscrire à notre newsletter</label>
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <input type="submit" value="S'inscrire" />
      </form>
      <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
    </div>
  );
};
export default Signup;
