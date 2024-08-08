import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { add } from '../../redux/slices/cartSlice';

const SingleProduct = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.product);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Scroll to the top of the page when component mounts
        window.scrollTo(0, 0);
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        const product = products?.find(product => product._id === productId);
        if (product) {
            setSelectedProduct(product);
        } else if (status !== 'loading') {
            navigate('/');
        }
    }, [products, productId, navigate, status]);

    const handleClick = () => {
        if (selectedProduct) {
            dispatch(add(selectedProduct));
        }
    };

    if (status === 'loading') return <div className="flex items-center justify-center h-screen text-3xl font-bold text-gray-700">Loading...</div>
    if (status === 'error') return <div className="flex items-center justify-center h-screen text-3xl font-bold text-red-600">Error loading products.</div>
    if (!selectedProduct) return <div className="flex items-center justify-center h-screen text-3xl font-bold text-gray-700">Product not found.</div>

    return (
        <div className="bg-gray-100 min-h-screen py-7">
            <div className="container mx-auto px-4">
                <div className="bg-white shadow-2xl rounded-lg overflow-hidden select-none">
                    <div className="md:flex items-center ">
                        <div className="md:flex-shrink-0">
                            <img
                                className="h-full w-full object-cover md:w-96"
                                src={`${import.meta.env.VITE_API_URI}/${selectedProduct.productImage}`}
                                alt={selectedProduct.productName}
                            />
                        </div>
                        <div className="p-8 md:flex-1">
                            <div className="uppercase tracking-wide text-sm text-orange-500 font-semibold">
                                {selectedProduct.productCategory}
                            </div>
                            <h2 className="mt-2 text-3xl leading-tight font-bold text-gray-900">
                                {selectedProduct.productName}
                            </h2>
                            <p className="mt-4 text-gray-600 text-justify line-clamp-6">
                                {selectedProduct.productDesc}
                            </p>
                            <div className="mt-6 flex items-center">
                                <span className="text-gray-500 mr-2">Price:</span>
                                <span className="text-3xl font-bold text-orange-500">₹{selectedProduct.productPrice}</span>
                            </div>
                            <div className="mt-4 flex items-center">
                                <span className="text-gray-500 mr-2">Status:</span>
                                <span className={`font-semibold ${selectedProduct.status ? 'text-green-500' : 'text-red-500'}`}>
                                    {selectedProduct.status ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                            <button
                                onClick={handleClick}
                                className={`mt-8 w-full md:w-auto py-3 px-8 font-semibold text-lg rounded-full transition-colors duration-300 ${selectedProduct.status
                                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                disabled={!selectedProduct.status}
                            >
                                {selectedProduct.status ? 'Add to cart' : 'Out of stock'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;