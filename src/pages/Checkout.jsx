// src/pages/Checkout.jsx
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Name required";
    if (!email.trim()) errs.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Email invalid";
    if (!address.trim()) errs.address = "Address required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // pretend to place order
    console.log("Order placed:", {
      name,
      email,
      address,
      cartItems,
      totalPrice,
    });
    alert("Order placed successfully 🎉");
    clearCart();
    setName("");
    setEmail("");
    setAddress("");
    setErrors({});

    navigate("/order-success");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <h2 className="font-semibold mb-2">Order Summary</h2>
      {cartItems.length > 0 ? (
        <ul className="mb-4">
          {cartItems.map((item, idx) => (
            <li key={idx}>
              {item.name} - ${item.price} × {item.quantity} = $
              {Number(item.price) * item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in cart</p>
      )}

      <p className="font-bold mb-4">Total: ${totalPrice}</p>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 p-4 rounded shadow w-80"
      >
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}

        <button
          type="submit"
          className="bg-green-500 text-white rounded px-4 py-2 mt-2 hover:bg-green-600"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
