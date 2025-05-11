// src/pages/AllProductsPage.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AllProductsPage = () => {
  const products = useSelector((state) => state.products?.items || []);

  if (!products.length) {
    return <p className="text-center text-gray-600">Loading products...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Все товары
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="block"
          >
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
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;
