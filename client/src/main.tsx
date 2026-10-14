import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { CartProvider } from "./context/CartContext.tsx";
import App from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Router>
    <CartProvider>
      <App />
    </CartProvider>
  </Router>,
);
