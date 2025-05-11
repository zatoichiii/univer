// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import AddToCartButton from "../components/AddToCartButton"; // Импортируем новый компонент

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
    const selectedProduct = products.find((p) => p._id === id);
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [id, products, dispatch]);

  if (!product) {
    return (
      <p className="text-center text-gray-600">Loading product details...</p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />{" "}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 mt-2">${product.price}</p>
          <p className="text-gray-700 mt-4">
            {product.description || "No description available."}
          </p>
          <AddToCartButton product={product} />{" "}
          {/* Используем новый компонент */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
