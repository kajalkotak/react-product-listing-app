// src/context/CartContext.jsx
import React, { createContext, useReducer, useEffect } from "react";

/*
  CartContext provides:
   - cartItems (array)
   - addItem(product)
   - removeItem(index)
   - increment(index)
   - decrement(index)
   - clearCart()
   - totalPrice
   - totalQuantity
*/

export const CartContext = createContext();

// initial state reads localStorage so cart persists across reloads
const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const product = action.payload;
      const exists = state.cartItems.find((i) => i.name === product.name);
      if (exists) {
        // if already in cart, increase quantity
        return {
          cartItems: state.cartItems.map((i) =>
            i.name === product.name ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      // else add with quantity 1
      return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
    }

    case "REMOVE_ITEM": {
      const index = action.payload;
      return { cartItems: state.cartItems.filter((_, i) => i !== index) };
    }

    case "INCREMENT": {
      const index = action.payload;
      return {
        cartItems: state.cartItems.map((it, i) =>
          i === index ? { ...it, quantity: it.quantity + 1 } : it
        ),
      };
    }

    case "DECREMENT": {
      const index = action.payload;
      return {
        cartItems: state.cartItems.map((it, i) =>
          i === index
            ? { ...it, quantity: it.quantity > 1 ? it.quantity - 1 : 1 }
            : it
        ),
      };
    }

    case "CLEAR_CART":
      return { cartItems: [] };

    case "SET_CART": // if you need to set from outside
      return { cartItems: action.payload };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // persist cart in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  // helper action creators
  const addItem = (product) => dispatch({ type: "ADD_ITEM", payload: product });
  const removeItem = (index) =>
    dispatch({ type: "REMOVE_ITEM", payload: index });
  const increment = (index) => dispatch({ type: "INCREMENT", payload: index });
  const decrement = (index) => dispatch({ type: "DECREMENT", payload: index });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  // derived values
  const totalPrice = state.cartItems.reduce(
    (acc, it) => acc + Number(it.price) * it.quantity,
    0
  );
  const totalQuantity = state.cartItems.reduce(
    (acc, it) => acc + it.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addItem,
        removeItem,
        increment,
        decrement,
        clearCart,
        totalPrice,
        totalQuantity,
        dispatch, // optional if you want raw dispatch
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
