import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Header = ({ token, handleToken }) => {
  return (
    <header>
      <div className="header-container">
        <div className="header-top">
          <div className="header-logo">
            <Link to="/">
              <img src={logo} alt="Vinted logo" />
            </Link>
          </div>
          <div className="header-search">
            {/* <select name="themes" id="themes">
              <option value="articles">Articles</option>
              <option value="membres">Membres</option>
              <option value="forum">Forum</option>
              <option value="help-center">Centre d'aide</option>
            </select> */}
            <input
              type="text"
              placeholder="Rechercher des articles"
              className="search-input"
            />
            <FontAwesomeIcon icon="magnifying-glass" className="search-icon" />
          </div>
          <div className="header-action">
            {token ? (
              <>
                <Link to="/">
                  <button
                    onClick={() => {
                      handleToken(null);
                    }}
                  >
                    Deconnexion
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <button className="signup-login-btn">S'inscrire</button>
                </Link>
                <Link to="/login">
                  <button className="signup-login-btn">Se connecter</button>
                </Link>
              </>
            )}

            <button className="help-btn">?</button>
            <select name="languages" id="languages">
              <option value="french">Français (French)</option>
              <option value="english">English (English)</option>
              <option value="spanish">Español (Spanish)</option>
              <option value="dutch">Nederlands (Dutch)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
