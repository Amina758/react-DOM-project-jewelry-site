import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  useNavigate,
} from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <Router>
      {/* Header */}
      <header className="header">
        <div className="logo">
          <Link to="/">Pure Spark

          </Link>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/launch">Shop</Link>
          <button className="feed-btn">Feed</button>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="launch" element={<Launch />}>
            <Route path="" element={<LaunchIndex />} />
            <Route path=":slug" element={<LaunchShoe />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Not Found!</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Jwellery Store</h1>
      <p>Your one-stop destination for the best jwellery in town!</p>
      <Link to="/launch" className="shop-now-btn">
        Shop Now
      </Link>
    </div>
  );
}

function Launch() {
  return (
    <div className="launch">
      <h1>Our Collection</h1>
      <Outlet />
    </div>
  );
}

function LaunchIndex() {
  return (
    <ul className="shoe-list">
      {Object.entries(shoes).map(([slug, { name, img, inStock }]) => (
        <li key={slug} className={inStock ? "in-stock" : "out-of-stock"}>
          <Link to={slug}>
            <h2>{name}</h2>
            <img src={img} alt={name} />
          </Link>
          <p className="stock-status">
            {inStock ? "In Stock" : "Out of Stock"}
          </p>
          <button className="buy-now-btn" disabled={!inStock}>
            {inStock ? "Buy Now" : "Unavailable"}
          </button>
        </li>
      ))}
    </ul>
  );
}

function LaunchShoe() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const shoe = shoes[slug];

  if (!shoe) {
    return <h2> Not Found!</h2>;
  }

  const { name, img, inStock } = shoe;

  return (
    <div className="shoe-details">
      <h2>{name}</h2>
      <img src={img} alt={name} />
      <p className="stock-status">
        {inStock ? "Available Now!" : "Currently Unavailable"}
      </p>
      <button
        className="buy-now-btn"
        disabled={!inStock}
        onClick={() => alert("Thank you for your purchase!")}
      >
        {inStock ? "Buy Now" : "Out of Stock"}
      </button>
      <button className="back-btn" onClick={() => navigate("/launch")}>
        Back to Shop
      </button>
    </div>
  );
}

// Sample Data
const shoes = {
  "Rings": {
    name: "Ring ",
    img: "https://i.pinimg.com/736x/79/73/74/7973742d33aa55e2beee3eeff9513b4a.jpg",
    inStock: true,
  },
  "Necklace": {
    name: "  Crystal Necklace",
    img: "https://i.pinimg.com/736x/b3/9d/bc/b39dbc168f2885a4816b3064cba0b306.jpg",
    inStock: true,
  },
  "Earrings ": {
    name: "Earlobe style earrings",
    img: "https://i.pinimg.com/736x/c2/35/7b/c2357b9de03c3d467a21de6fe9150581.jpg",
    inStock: false,
  },
};
