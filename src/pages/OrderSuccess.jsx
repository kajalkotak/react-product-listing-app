//OrderSuccess.jsx

import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉thank you for your order
      </h1>

      <p className="mb-4 text-lg">
        Your order has been placed successfully. we will deliver your items
        soon.
      </p>

      <Link
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default OrderSuccess;
