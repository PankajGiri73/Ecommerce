import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../../redux/slices/cartSlice';

const PaymentSuccess = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCart());
    }, [dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center transform transition-all hover:scale-105 duration-300">
                <div className="mb-8">
                    <svg className="w-20 h-20 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Payment Successful!</h1>
                <p className="text-gray-600 mb-8 text-lg">
                    Thank you for your purchase. Your order is being processed and will be on its way soon!
                </p>
                <div className="space-y-4">
                    <Link 
                        to="/" 
                        className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        Continue Shopping
                    </Link>
                    <Link 
                        to="/myorder" 
                        className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        View Orders
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;