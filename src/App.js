import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// import des pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

// import des composants
import Header from "./components/Header";

// import de fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleInfo,
  faHeart,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
library.add(faCircleInfo, faHeart, faMagnifyingGlass);

function App() {
  const [search, setSearch] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState("");
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [userId, setUserId] = useState();
  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 7 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <Router>
      <Header
        token={token}
        handleToken={handleToken}
        setPriceSort={setPriceSort}
        priceSort={priceSort}
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        setPageNumber={setPageNumber}
        limit={limit}
        setLimit={setLimit}
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              search={search}
              priceSort={priceSort}
              setPriceSort={setPriceSort}
              priceMin={priceMin}
              setPriceMin={setPriceMin}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
              pageCount={pageCount}
              setPageCount={setPageCount}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              limit={limit}
              setLimit={setLimit}
            />
          }
        />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route
          path="/login"
          element={<Login handleToken={handleToken} setUserId={setUserId} />}
        />
        <Route path="/offer/:id" element={<Offer token={token} />} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route
          path="/payment"
          element={<Payment token={token} userId={userId} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
