import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes/router.tsx";
import { CartProvider } from "./pages/cart/cartContext";
import "./App.css";

export function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Router />
      </CartProvider>
    </BrowserRouter>
  );
}
