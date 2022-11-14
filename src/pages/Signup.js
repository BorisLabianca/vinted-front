import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = ({ handleToken }) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsLetter] = useState(false);
  const navigate = useNavigate();
  const [emailExists, setEmailExists] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.length < 8) {
      alert("Votre mot de passe est trop court.");
    } else if (!email) {
      alert("Veuillez entrer une adresse e-mail.");
    } else if (!username) {
      alert("Veuillez entrer un nom d'utilisateur.");
    } else {
      try {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          { username: username, email: email, password: password }
        );
        console.log(response.data);
        if (response.data.token) {
          const token = response.data.token;
          handleToken(token);
          navigate("/");
        }
      } catch (error) {
        console.log(error.response);
        if (
          error.response?.data.message === "This email already has an account"
        ) {
          setEmailExists(true);
        }
        //   console.log(error.response.data.message);
      }
    }
  };
  return (
    <div className="signup-container">
      <h1>S'inscrire</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
          className="necessary"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          className="necessary"
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
          className="necessary"
        />
        {password === "" ? null : password.length < 8 ? (
          <div className="password-too-short">
            Votre mot de passe doit comporter au moins 8 caractères.
          </div>
        ) : null}
        <div className="checkbox-div">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={() => {
              setNewsLetter(!newsletter);
            }}
          />
          <label>S'inscrire à notre newsletter</label>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>

        <input type="submit" value="S'inscrire" className="signup-submit-btn" />
      </form>
      <Link to="/login" className="redirect-to-login-signup">
        Tu as déjà un compte ? Connecte-toi !
      </Link>
    </div>
  );
};
export default Signup;
