// src/App.jsx
import "./App.css";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Checkout from "./pages/Checkout";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  // category state still lives here
  const [selectedCategory, setSelectedCategory] = useState("");

  // get cart state + actions from context
  const {
    cartItems,
    addItem, // add product to cart
    removeItem,
    increment,
    decrement,
    clearCart,
    totalPrice,
    totalQuantity,
  } = useContext(CartContext);

  // dummy product data (same as before)
  const dummyProducts = [
    {
      img: "https://via.placeholder.com/150",
      name: "Laptop",
      price: "12000",
      category: "Electronics",
    },
    {
      img: "https://via.placeholder.com/150",
      name: "Shirt",
      price: "250",
      category: "Clothing",
    },
    {
      img: "https://via.placeholder.com/150",
      name: "Mobile",
      price: "5000",
      category: "Electronics",
    },
  ];

  const filterProducts = selectedCategory
    ? dummyProducts.filter((product) => product.category === selectedCategory)
    : dummyProducts;

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="text-right p-4">
                🛒 Cart: {totalQuantity} items
              </div>

              <div className="bg-gray-200 p-4 rounded shadow mb-4">
                <h2 className="font-bold text-lg mb-2 ">Cart Items:</h2>
                {cartItems.length > 0 ? (
                  <ul className="list-none ml-4">
                    {cartItems.map((item, index) => (
                      <li key={index}>
                        {item.name} - ${item.price} × {item.quantity}
                        <button
                          className="ml-3 text-red-500 hover:text-red-700"
                          onClick={() => removeItem(index)}
                        >
                          Remove
                        </button>
                        <button
                          className="ml-2 text-green-600"
                          onClick={() => increment(index)}
                        >
                          +
                        </button>
                        <button
                          className="ml-1 text-yellow-600"
                          onClick={() => decrement(index)}
                        >
                          -
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No items in cart yet.</p>
                )}

                {cartItems.length > 0 && (
                  <>
                    <p className="mt-2 font-bold">Total: ${totalPrice}</p>
                    <button
                      onClick={clearCart}
                      className="bg-red-500 text-white rounded px-4 py-2 ml-4 hover:bg-red-600 mt-3"
                    >
                      Clear Cart
                    </button>
                    <Link
                      to="/checkout"
                      className="bg-blue-500 text-white rounded px-4 py-2 ml-4 hover:bg-blue-600 mt-3 inline-block"
                    >
                      Proceed to Checkout
                    </Link>
                  </>
                )}
              </div>

              <ProductList
                products={filterProducts}
                addToCart={addItem} // pass context addItem
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </>
          }
        />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
    </div>
  );
}

export default App;
