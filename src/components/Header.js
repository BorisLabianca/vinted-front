import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header-top">
          <div className="header-logo">
            <Link to="/">
              <img src={logo} alt="Vinted logo" />
            </Link>
          </div>
          <div className="header-search">
            <select name="themes" id="themes">
              <option value="articles">Articles</option>
              <option value="membres">Membres</option>
              <option value="forum">Forum</option>
              <option value="help-center">Centre d'aide</option>
            </select>
            <input type="text" placeholder="Rechercher des articles" />
          </div>
          <div className="header-action">
            <button>S'inscrire | Se connecter</button>
            <button>Vends tes articles</button>
            <button>?</button>
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
