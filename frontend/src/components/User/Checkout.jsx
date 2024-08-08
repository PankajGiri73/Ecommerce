import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaUser, FaPhone, FaAddressCard, FaCity, FaMapMarkerAlt, FaMapPin } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const Checkout = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const orderDetails = {
            userId: user._id,
            customerName: formData.get('customerName'),
            customerContactNumber: formData.get('customerContactNumber'),
            address: `${formData.get('address')},${formData.get("city")},${formData.get("state")}`,
            pinCode: formData.get('pinCode'),
            products: cartItems,
        };
        try {
            const stripe = await loadStripe(`${import.meta.env.VITE_API_PUBLISHABLE_KEY}`);
            const body = orderDetails

            const response = await axios.post(`${import.meta.env.VITE_API_URI}/create-checkout-session`, body)

            const result = stripe.redirectToCheckout({
                sessionId: response.data.id
            });
            if (result.error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error);
            alert('Payment failed. Please try again.');
        }
    };

    const totalAmount = cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const reversedCartItems = [...cartItems].reverse();

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <div className="mt-4 p-6 bg-white shadow-lg rounded-lg flex justify-between items-center select-none">
                <h2 className="text-3xl font-bold text-gray-800">Checkout</h2>
                <button
                    className='px-5 sm:px-10 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105'
                    onClick={scrollToForm}
                >
                    Proceed to Pay
                </button>
            </div>
            <div className="my-8">
                {reversedCartItems.map((item, index) => (
                    <div key={index} className="flex flex-wrap justify-between p-4 border-b bg-white rounded-lg my-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                        <div className="flex flex-1 gap-6 select-none">
                            <img src={`${import.meta.env.VITE_API_URI}/${item.productImage}`}
                                alt={item.productName}
                                className='w-32 h-32 object-cover rounded-lg shadow-md'
                            />
                            <div className="flex flex-col justify-center flex-wrap">
                                <div className='text-xl font-semibold select-text line-clamp-1 sm:line-clamp-2 text-gray-800'>{item.productName}</div>
                                <div className="mt-2 text-gray-600">
                                    <div><span className="font-semibold">Quantity:</span> {item.quantity}</div>
                                    <div><span className="font-semibold">Price:</span> ₹{item.productPrice.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-gray-800">₹{(item.productPrice * item.quantity).toFixed(2)}</span>
                        </div>
                    </div>
                ))}
                <div className="p-6 bg-white shadow-lg rounded-lg select-none text-right font-bold mt-6 text-2xl text-gray-800">
                    Total: ₹{totalAmount.toFixed(2)}
                </div>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-white shadow-lg rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Shipping Details</h3>
                <div className="flex items-center border-b border-gray-300 py-2">
                    <FaUser className="mr-4 text-gray-500" />
                    <input
                        type="text"
                        name="customerName"
                        placeholder="Customer Name"
                        required
                        className="flex-1 p-2 focus:outline-none"
                    />
                </div>
                <div className="flex items-center border-b border-gray-300 py-2">
                    <FaPhone className="mr-4 text-gray-500" />
                    <input
                        type="text"
                        name="customerContactNumber"
                        placeholder="Phone Number"
                        required
                        className="flex-1 p-2 focus:outline-none"
                    />
                </div>
                <div className="flex items-center border-b border-gray-300 py-2">
                    <FaAddressCard className="mr-4 text-gray-500" />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        required
                        className="flex-1 p-2 focus:outline-none"
                    />
                </div>
                <div className="flex items-center border-b border-gray-300 py-2">
                    <FaCity className="mr-4 text-gray-500" />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        required
                        className="flex-1 p-2 focus:outline-none"
                    />
                </div>
                <div className="flex items-center border-b border-gray-300 py-2">
                    <FaMapMarkerAlt className="mr-4 text-gray-500" />
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        required
                        className="flex-1 p-2 focus:outline-none"
                    />
                </div>
                <div className="flex items-center border-b border-gray-300 py-2">
                    <FaMapPin className="mr-4 text-gray-500" />
                    <input
                        type="text"
                        name="pinCode"
                        placeholder="Pin Code"
                        required
                        className="flex-1 p-2 focus:outline-none"
                    />
                </div>
                <div className="mt-8">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 w-full text-lg font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    >
                        Pay Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;