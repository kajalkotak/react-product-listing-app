//ProductList.jsx

function ProductList({
  products,
  addToCart,
  selectCategory,
  setSelectedCategory,
  quantity,
}) {
  return (
    <div className="w-full min-h-screen mt-5">
      {/* product category filter */}
      <select
        value={selectCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="rounded bg-gray-300 p-4 mb-4"
      >
        <option value="">Select Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
      </select>

      {/* product grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="border border-red rounded mx-auto shadow-lg p-3 sm:p-4 m-2 sm:m-3"
          >
            <img
              src={product.img}
              alt={product.name}
              className="rounded w-full sm:h-48 h-40 object-cover"
            />
            <h3 className="font-semibold mt-2">{product.name}</h3>
            <p className="mt-1 text-green-600 font-bold">${product.price}</p>
            <button
              className="bg-red-500 text-white rounded p-2 mt-3 hover:bg-red-600"
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
