import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const HotOffer = ({
  offer,
  setPriceMin,
  setPriceMax,
  setPriceSort,
  setLimit,
}) => {
  // console.log(offer);
  return (
    <div className="individual-offer">
      {offer.owner ? (
        <div className="hot-offer-owner-account">
          <div className="hot-offer-avatar-container">
            {offer.owner.account.avatar ? (
              <img
                src={offer.owner.account.avatar.secure_url}
                alt="owner avatar"
                className="hot-offer-avatar"
              />
            ) : (
              <div className="filler"></div>
            )}
          </div>
          <p className="hot-offer-username">{offer.owner.account.username}</p>
        </div>
      ) : (
        <div className="owner-account-filler"></div>
      )}
      <Link
        to={`/offer/${offer._id}`}
        className="link-to-offer"
        onClick={() => {
          setPriceMin("");
          setPriceMax("");
          setLimit("");
          setPriceSort("");
        }}
      >
        <img src={offer.product_image.secure_url} alt="Product pic" />
      </Link>
      <div className="offer-info">
        <div className="subpic">
          <div className="price-info">
            <p>{offer.product_price.toFixed(2)} €</p>
            <FontAwesomeIcon icon="circle-info" />
          </div>
          <div className="popularity">
            <FontAwesomeIcon icon="heart" />
            <p>19</p>
          </div>
        </div>

        {offer.product_details.map((detail, index) => {
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
        {offer.product_details.map((detail, index) => {
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
