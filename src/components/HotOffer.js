import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const HotOffer = ({ image, price, details, id }) => {
  //   console.log(id);
  return (
    <div className="individual-offer">
      <Link to={`/offer/${id}`} className="link-to-offer">
        <img src={image} alt="Product pic" />
      </Link>
      <div className="offer-info">
        <div className="subpic">
          <div className="price-info">
            <p>{price.toFixed(2)} €</p>
            <FontAwesomeIcon icon="circle-info" />
          </div>
          <div className="popularity">
            <FontAwesomeIcon icon="heart" />
            <p>19</p>
          </div>
        </div>

        {details.map((detail, index) => {
          const taille = detail.TAILLE;
          const marque = detail.MARQUE;
          return (
            <div key={index} className="details">
              <div>{taille}</div>
              <div>{marque}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default HotOffer;
