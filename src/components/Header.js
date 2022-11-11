import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Header = ({
  token,
  handleToken,
  priceSort,
  setPriceSort,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  limit,
  setLimit,
}) => {
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
        <div className="filter-part">
          <div className="price-sorting">
            <div className="price-desc">
              <input
                type="checkbox"
                checked={
                  priceSort === "price-asc" || priceSort === "" ? "" : "checked"
                }
                onChange={() => {
                  if (priceSort === "price-asc") {
                    setPriceSort("");
                  } else {
                    setPriceSort("price-asc");
                  }
                }}
              />
              <span>Prix croissants</span>
            </div>
            <div className="price-desc">
              <input
                type="checkbox"
                checked={
                  priceSort === "price-asc" || priceSort === "" ? "" : "checked"
                }
                onChange={() => {
                  if (priceSort === "price-desc") {
                    setPriceSort("");
                  } else {
                    setPriceSort("price-desc");
                  }
                }}
              />
              <span>Prix décroissants</span>
            </div>
          </div>
          <div className="price-range">
            <input
              type="text"
              placeholder="Prix min"
              value={priceMin}
              onChangeCapture={(event) => {
                setPriceMin(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Prix max"
              value={priceMax}
              onChange={(event) => {
                setPriceMax(event.target.value);
              }}
            />
          </div>
          <div className="offer-limit">
            <label for="limit">Nombres d'offres par page :</label>
            <select
              name="limit"
              id="limit"
              onChange={(event) => {
                setLimit(event.target.value);
                console.log(event.target.value);
              }}
            >
              <option value={null}>--</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
