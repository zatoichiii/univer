import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('add-product'); // Текущий активный таб
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(''); // Ссылка на изображение
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
    fetchUsers();
  }, []);

  // Обработчик загрузки изображения
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const { url } = await response.json();
      setImage(url); // Сохраняем URL изображения в состояние
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  // Обработчик отправки данных продукта
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !description || !image) {
      alert('Please fill in all fields and upload an image.');
      return;
    }

    const token = localStorage.getItem('token'); // Предполагается, что токен хранится в localStorage

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Если требуется авторизация
        },
        body: JSON.stringify({ name, price, description, image }),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const newProduct = await response.json();
      setProducts([...products, newProduct]); // Добавляем новый продукт в список
      setName('');
      setPrice('');
      setDescription('');
      setImage('');
      alert('Product added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
  
    try {
      const token = localStorage.getItem('token'); // Получаем токен из localStorage
  
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
  
      // Обновляем список продуктов после удаления
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to delete product');
    }
  };

  const handleEditProduct = async (productId) => {
    const newName = prompt('Enter new name:', '');
    const newPrice = prompt('Enter new price:', '');
    const newDescription = prompt('Enter new description:', '');
  
    if (!newName || !newPrice || !newDescription) {
      alert('All fields are required for editing.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token'); // Получаем токен из localStorage
  
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
        body: JSON.stringify({
          name: newName,
          price: parseFloat(newPrice),
          description: newDescription,
          image: image, // Предполагается, что изображение остается прежним
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
  
      const updatedProduct = await response.json();
  
      // Обновляем список продуктов после редактирования
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product._id === productId ? updatedProduct : product))
      );
      alert('Product updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update product');
    }
  };
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user');
      }
  
      // Обновляем список пользователей после удаления
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert(error.message || 'Failed to delete user');
    }
  };  

  // Редактирование пользователя
  const handleEditUser = async (userId) => {
    const newUsername = prompt('Enter new username:', '');
    const newEmail = prompt('Enter new email:', '');
    const newRole = prompt('Enter new role (user/admin):', '');

    if (!newUsername || !newEmail || !newRole) {
      alert('All fields are required for editing.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newUsername,
          email: newEmail,
          role: newRole,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();

      // Обновляем список пользователей после редактирования
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? updatedUser : user))
      );
      alert('User updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update user');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Panel</h1>

      {/* Табы */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('add-product')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'add-product' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Add Product
        </button>
        <button
          onClick={() => setActiveTab('manage-products')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'manage-products' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Manage Products
        </button>
        <button
          onClick={() => setActiveTab('manage-users')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'manage-users' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Manage Users
        </button>
      </div>

      {/* Контент табов */}
      {activeTab === 'add-product' && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Product</h2>

          {/* Поле для имени */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Поле для цены */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Поле для описания */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Поле для загрузки изображения */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {loading && <p className="text-sm text-gray-500 mt-2">Uploading image...</p>}
            {image && (
              <div className="mt-2">
                <img src={`http://localhost:5000${image}`} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
              </div>
            )}
          </div>

          {/* Кнопка добавления продукта */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Product
          </button>
        </form>
      )}

      {activeTab === 'manage-products' && (
        <div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Manage Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <p className="text-gray-700 mt-2">{product.description}</p>
                <div className="flex justify-between mt-4">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    onClick={() => handleEditProduct(product._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'manage-users' && (
        <div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Manage Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {users.map((user) => (
              <div key={user._id} className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-xl font-semibold text-gray-800">{user.username}</h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-700 mt-2">Role: {user.role}</p>
                <div className="flex justify-between mt-4">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    onClick={() => handleEditUser(user._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;