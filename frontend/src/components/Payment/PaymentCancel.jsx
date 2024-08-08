import React from 'react';
import { Link } from 'react-router-dom';

const PaymentCancel = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-400 to-pink-500">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center transform transition-all hover:scale-105 duration-300">
                <div className="mb-8">
                    <svg className="w-20 h-20 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Payment Cancelled</h1>
                <p className="text-gray-600 mb-8 text-lg">
                    Your payment was not successful. Please try again or contact our support team if you continue to experience issues.
                </p>
                <div className="space-y-4">
                    <Link 
                        to="/cart" 
                        className="block w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        Return to Cart
                    </Link>
                    <Link 
                        to="/" 
                        className="block w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;