import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { add } from '../../redux/slices/cartSlice';

const ProductCategory = () => {
    const { category } = useParams();
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.product);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Scroll to the top of the page when component mounts
        window.scrollTo(0, 0);
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        const filteredProducts = products?.filter(product => product.productCategory.toLowerCase() === category);
        // console.log("filteredProducts: ", filteredProducts);
        // console.log("category: ", category);
        if (filteredProducts && filteredProducts.length > 0) {
            setCategoryProducts(filteredProducts);
        } else if (status !== 'loading') {
            navigate('/');
        }
    }, [products, category, navigate, status]);

    const handleClick = (product) => {
        dispatch(add(product));
    };

    const handleProductClick = (productId) => {
        // console.log(productId);
        navigate(`/product/${productId}`);
    };

    if (status === 'loading') return <div className="flex items-center justify-center h-screen text-3xl font-bold text-gray-700">Loading...</div>
    if (status === 'error') return <div className="flex items-center justify-center h-screen text-3xl font-bold text-red-600">Error loading products.</div>
    if (categoryProducts.length === 0) return <div className="flex items-center justify-center h-screen text-3xl font-bold text-gray-700">No products found in this category.</div>

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">{category.charAt(0).toUpperCase() + category.slice(1)} Products</h1>
                <div className="text-lg font-semibold text-gray-700 mb-4 text-center">
                    Total Products: {categoryProducts.length}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 select-none">
                    {categoryProducts.map((product) => (
                        <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                            <div className="relative">
                                <img
                                    className="w-full h-[70vh] object-cover"
                                    src={`${import.meta.env.VITE_API_URI}/${product.productImage}`}
                                    alt={product.productName}
                                    onClick={() => handleProductClick(product._id)}
                                />
                                {/* <div className="absolute top-0 right-0 bg-white m-2 px-2 py-1 rounded-full text-sm font-semibold">
                                    {product.status ? 'In Stock' : 'Out of Stock'}
                                </div> */}
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-bold line-clamp-1 text-gray-900 mb-2 hover:text-orange-500 cursor-pointer" onClick={() => handleProductClick(product._id)}>{product.productName}</h2>
                                {/* <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.productDesc}</p> */}
                                <div className="font-bold mb-4">
                                    <span className="text-2xl text-orange-500">₹{product.productPrice}</span>
                                </div>
                                <button
                                    onClick={() => handleClick(product)}
                                    className={`w-full py-3 px-4 font-semibold text-white rounded-full transition-colors duration-300 ${product.status
                                        ? 'bg-orange-500 hover:bg-orange-600'
                                        : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                    disabled={!product.status}
                                >
                                    {product.status ? 'Add to cart' : 'Out of stock'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductCategory;