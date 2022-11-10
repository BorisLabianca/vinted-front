import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/offer/:id" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
