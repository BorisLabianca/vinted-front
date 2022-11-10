import axios from "axios";
import { useState, useEffect } from "react";
import banner from "../assets/images/banner-wide-b31e1e250bf33255b4014ead6799dad6546dcc18dedad6925ba79a616cb676e6.jpg";
import HotOffer from "../components/HotOffer";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <main>
      <div className="banner">
        <img src={banner} alt="banner" />
        <div className="tear-effect"></div>
      </div>
      <div className="container">
        <div className="content">
          <div className="category">
            <span>Articles populaires</span>
            <button>Voir tout</button>
          </div>
          <div className="offers-display">
            {data.offers.map((offer) => {
              return <HotOffer key={offer._id} offer={offer} />;
            })}
          </div>
        </div>
      </div>
    </main>
  );
};
export default Home;
