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
          if (detail.TAILLE) {
            return (
              <div key={index} className="details">
                {detail.TAILLE}
              </div>
            );
          } else {
            return null;
          }
        })}
        {details.map((detail, index) => {
          if (detail.MARQUE) {
            return (
              <div key={index} className="details">
                {detail.MARQUE}
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};
export default HotOffer;
