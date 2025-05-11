// src/components/ProductList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../redux/slices/productSlice";
import { motion } from "framer-motion";
import AddToCartButton from "./AddToCartButton"; // Импортируем новый компонент

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.items || []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!products.length) {
    return <p className="text-center text-gray-600">Loading products...</p>;
  }

  const limitedProducts = products.slice(0, 5);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {limitedProducts.map((product, index) => (
          <div key={product._id} className="block">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
            >
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />{" "}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-600 mt-2">${product.price}</p>
                <AddToCartButton product={product} />{" "}
                {/* Используем новый компонент */}
                <Link
                  to={`/products/${product._id}`}
                  className="flex align-center justify-center mt-2 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="text-center m-8">
        <Link
          to="/all-products"
          className="p-4 mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
