import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import SigninPage from "./pages/SigninPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
import ShippingPage from "./pages/ShippingPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import PrivatePage from "./pages/PrivatePage.jsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<HomePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="" element={<PrivatePage />}>
            <Route path="shipping" element={<ShippingPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="place-order" element={<PlaceOrderPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="order/:id" element={<OrderPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
