import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../redux/slices/productSlice";
import { motion } from "framer-motion";
import AddToCartButton from "./AddToCartButton";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.items || []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!products.length) {
    return <p className="text-center text-gray-500">Загрузка товаров...</p>;
  }

  const limitedProducts = products.slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Популярные товары
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {limitedProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              <Link to={`/products/${product._id}`}>
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="w-full h-56 object-cover"
                />
              </Link>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="text-indigo-600 font-bold mt-2 mb-4 text-xl">
                  {product.price} руб.
                </p>
                <AddToCartButton product={product} />
                <Link
                  to={`/products/${product._id}`}
                  className="block text-center mt-4 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Подробнее
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/all-products"
            className="inline-block bg-indigo-600 text-white font-medium px-6 py-3 rounded-md hover:bg-indigo-700 transition"
          >
            Смотреть все товары
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
