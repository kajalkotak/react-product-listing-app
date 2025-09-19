// src/components/Header.jsx
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Header() {
  const { totalQuantity } = useContext(CartContext);

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">My Shop</h1>
      <nav className="flex gap-4 items-center">
        <Link to="/">Home</Link>
        <Link to="/checkout">Checkout</Link>
        <span>🛒 {totalQuantity}</span>
      </nav>
    </header>
  );
}

export default Header;
