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
  pageNumber,
  setPageNumber,
  pageCount,
  setPageCount,
  search,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--vinted-backend--67k4ycyfnl9b.code.run/offers?title=${search}&sort=${priceSort}&priceMin=${priceMin}&priceMax=${priceMax}&limit=${limit}&page=${pageNumber}`
          // `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}&sort=${priceSort}&priceMin=${priceMin}&priceMax=${priceMax}&limit=${limit}&page=${pageNumber}`
          // {
          //   params: {
          //     title: search,
          //     sort: priceSort,
          //     priceMin: priceMin,
          //     priceMax: priceMax,
          //     limit: limit,
          //     page: pageNumber,
          //   },
          // }
        );
        // console.log(response.data);
        setData(response.data);
        setPageCount(Math.ceil(Number(response.data.count) / Number(limit)));
        setIsLoading(false);
        // console.log("data count", data.count);
        // console.log("page count", pageCount);
        // console.log("offer length ", response.data.offers.length);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [
    search,
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
              // console.log(data.offers);
              return (
                <HotOffer
                  key={offer._id}
                  offer={offer}
                  setPriceSort={setPriceSort}
                  setPriceMin={setPriceMin}
                  setPriceMax={setPriceMax}
                  setLimit={setLimit}
                  setPageNumber={pageNumber}
                />
              );
            })}
          </div>
          {pageCount > 1 ? (
            <div className="pagination">
              <div
                className={pageNumber === 1 ? "disabled" : "active"}
                onClick={
                  pageNumber === 1
                    ? null
                    : () => {
                        setPageNumber(pageNumber - 1);
                      }
                }
              >
                Page précédente
              </div>

              <span>
                Page {pageNumber}/{pageCount}
              </span>

              <div
                className={pageNumber === pageCount ? "disabled" : "active"}
                onClick={
                  pageNumber === pageCount
                    ? null
                    : () => {
                        setPageNumber(pageNumber + 1);
                      }
                }
              >
                Page suivante
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
};
export default Home;
