import React from 'react';
import NavBar from '../../sharedComp/NavBar/NavBar';
import { remove, increaseQuantity, decreaseQuantity } from '../../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { role, auth } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemove = (id) => {
        dispatch(remove(id));
    };

    const handleIncrease = (id) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecrease = (id) => {
        dispatch(decreaseQuantity(id));
    };

    const totalSum = cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);

    const handleCheckout = async () => {
        if (totalSum === 0) {
            alert("Your cart is empty. Add items before checking out.");
            return;
        }

        if (auth) {
            if (role === "admin") {
                return alert("Please Login with Customer Account")
            }
            navigate("/checkout")
        } else {
            alert("Please Login...")
        }
    }

    const reversedCartItems = [...cartItems].reverse();

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* <NavBar /> */}
            <div className="container mx-auto p-4 md:p-8">
                <h1 className="text-4xl font-bold mb-8 text-gray-800 select-none">Shopping Cart</h1>
                {reversedCartItems.length === 0 ? (
                    <div className="bg-white p-12 rounded-lg shadow-lg text-center select-none">
                        <p className="text-2xl font-bold text-gray-700 select-none uppercase">Your cart is empty.</p>
                    </div>
                ) : (
                    <div className="space-y-6 select-none">
                        {reversedCartItems.map((item) => (
                            <div key={item._id} className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden h-fit">
                                <img src={`${import.meta.env.VITE_API_URI}/${item.productImage}`} alt={item.productName} className="w-full md:w-2/5 h-[65vh] object-cover select-none" />
                                <div className="flex-1 p-6 flex-wrap">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2 line-clamp-1">{item.productName}</h2>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{item.productDesc}</p>
                                    <p className="text-gray-700 mb-2 capitalize"><span className="font-bold">Category:</span> {item.productCategory}</p>
                                    <p className="text-2xl font-bold text-orange-500 mb-4">₹{item.productPrice}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <button onClick={() => handleDecrease(item._id)} className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-700 hover:bg-gray-300 transition-colors">-</button>
                                            <span className="text-xl font-semibold">{item.quantity}</span>
                                            <button onClick={() => handleIncrease(item._id)} className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-700 hover:bg-gray-300 transition-colors">+</button>
                                        </div>
                                        <button onClick={() => handleRemove(item._id)} className="px-6 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-colors">Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="mt-8 bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row justify-between items-center select-none">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Total: <span className="text-orange-500">₹{totalSum.toFixed(2)}</span></h2>
                    <button
                        className={`px-8 py-3 text-lg font-semibold text-white rounded-full shadow-lg transition-colors ${
                            totalSum === 0
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-orange-500 hover:bg-orange-600'
                        }`}
                        onClick={handleCheckout}
                        disabled={totalSum === 0}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;