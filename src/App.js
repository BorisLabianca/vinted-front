import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// import des pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// import des composants
import Header from "./components/Header";

// import de fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleInfo, faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faCircleInfo, faHeart);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
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
      <Header token={token} handleToken={handleToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/offer/:id" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
