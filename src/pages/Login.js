import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";

const Login = ({ handleToken, setUserId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [unauthorized, setUnauthorized] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Veuillez entrer votre adresse e-mail et votre mot de passe.");
    } else {
      try {
        const response = await axios.post(
          "https://site--vinted-backend--67k4ycyfnl9b.code.run/user/login",
          {
            email: email,
            password: password,
          }
        );
        // console.log(response.data);
        // console.log(response.data._id);
        if (response.data.token) {
          const token = response.data.token;
          handleToken(token);
          if (location.state?.previousUrl) {
            navigate(location.state.previousUrl);
          } else {
            navigate("/");
          }
          // navigate(location.state.previousUrl);
          // console.log(location.state.previousUrl);
          setUserId(response.data._id);
        }
      } catch (error) {
        console.log(error.response);
        if (
          error.response.data.error === "Unauthorized" ||
          error.response.data.message === "User not found"
        ) {
          setUnauthorized(true);
        }
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Se connecter</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          className="necessary"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          className="necessary"
        />
        {unauthorized ? (
          <div className="unauthorized">Mauvais email et/ou mot de passe</div>
        ) : null}
        <input
          type="submit"
          value="Se connecter"
          className="signup-submit-btn"
        />
      </form>
      <Link to="/signup" className="redirect-to-login-signup">
        Pas encore de compte ? Inscris-toi !
      </Link>
    </div>
  );
};
export default Login;
