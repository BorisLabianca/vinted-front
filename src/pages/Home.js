import axios from "axios";
import { useState, useEffect } from "react";
import banner from "../assets/images/banner-wide-b31e1e250bf33255b4014ead6799dad6546dcc18dedad6925ba79a616cb676e6.jpg";
import HotOffer from "../components/HotOffer";

const Home = ({
  priceSort,
  setPriceSort,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  limit,
  setLimit,
  search,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers",
          {
            params: {
              title: search,
              sort: priceSort,
              priceMin: priceMin,
              priceMax: priceMax,
              limit: limit,
              page: pageNumber,
            },
          }
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        setPageCount(
          Math.ceil(response.data.count / response.data.offers.length)
        );
        // console.log(pageCount);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [
    search,
    setData,
    priceSort,
    priceMin,
    priceMax,
    limit,
    pageCount,
    pageNumber,
    setPageCount,
  ]);

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
              return (
                <HotOffer
                  key={offer._id}
                  offer={offer}
                  setPriceSort={setPriceSort}
                  setPriceMin={setPriceMin}
                  setPriceMax={setPriceMax}
                  setLimit={setLimit}
                />
              );
            })}
          </div>
          <div>
            {pageNumber === 1 ? null : (
              <button
                onClick={() => {
                  setPageNumber(pageNumber - 1);
                }}
              >
                Page précédente
              </button>
            )}
            {pageCount === 1 ? null : (
              <span>
                Page {pageNumber}/{pageCount}
              </span>
            )}
            {pageNumber === pageCount ? null : (
              <button
                onClick={() => {
                  setPageNumber(pageNumber + 1);
                }}
              >
                Page suivante
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
export default Home;
