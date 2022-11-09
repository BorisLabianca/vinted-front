import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <main className="offer-main">
      <div className="container">
        <div className="product">
          <div className="product-pics">
            <div className="main-pic">
              <img src={data.product_image.secure_url} alt="" />
            </div>
            <div className="picture-mosaic">
              {data.product_pictures.map((pic) => {
                return (
                  <div key={pic.asset_id} className="additional-picture">
                    <img src={pic.secure_url} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="full-product-details">
            <div className="offer-page-price">
              {data.product_price.toFixed(2)} €
            </div>
            <div className="product-specs">
              {data.product_details.map((detail, index) => {
                if (detail.MARQUE) {
                  return (
                    <div key={index} className="indiv-spec">
                      <div className="key">MARQUE</div>
                      <div>{detail.MARQUE}</div>
                    </div>
                  );
                } else if (detail.TAILLE) {
                  return (
                    <div key={index} className="indiv-spec">
                      <div className="key">TAILLE</div>
                      <div>{detail.TAILLE}</div>
                    </div>
                  );
                } else if (detail.ÉTAT) {
                  return (
                    <div key={index} className="indiv-spec">
                      <div className="key">ÉTAT</div>
                      <div>{detail.ÉTAT}</div>
                    </div>
                  );
                } else if (detail.COULEUR) {
                  return (
                    <div key={index} className="indiv-spec">
                      <div className="key">COULEUR</div>
                      <div>{detail.COULEUR}</div>
                    </div>
                  );
                } else if (detail.EMPLACEMENT) {
                  return (
                    <div key={index} className="indiv-spec">
                      <div className="key">EMPLACEMENT</div>
                      <div>{detail.EMPLACEMENT}</div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className="name-desc-user">
              <div className="product-name">{data.product_name}</div>
              <div className="prod-description">{data.product_description}</div>
              {data.owner ? (
                <div className="owner">
                  <div className="user-initial"></div>
                  {data.owner.account.username}
                </div>
              ) : null}
            </div>
            <div className="buy-btn">
              <button>Acheter</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Offer;
