import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersByUserId, deleteOrderById } from '../../redux/slices/orderSlice';

const MyOrder = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrdersByUserId(user._id));
    }
  }, [dispatch, user]);

  const handleCancelOrder = (orderId) => {
    dispatch(deleteOrderById(orderId));
  };

  const canCancelOrder = (products) => {
    return products.every(product =>
      product.status !== 'delivered' && product.status !== 'cancelled'
    );
  };

  const sortedOrders = orders ? [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

  if (status === 'loading') {
    return <div className='flex items-center justify-center h-screen text-2xl font-semibold text-gray-600'>Loading...</div>;
  }

  if (status === 'failed') {
    return <div className='flex items-center justify-center h-screen text-2xl font-semibold text-red-600'>Error: {error}</div>;
  }

  if (status === 'succeeded' && sortedOrders.length === 0) {
    return <div className='flex items-center justify-center h-screen text-2xl font-semibold text-gray-600'>No orders found.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">My Orders</h2>
        <div className="space-y-8 select-none">
          {sortedOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-200 px-6 py-4">
                <h3 className="text-2xl font-bold text-gray-800 break-words">Order ID: {order._id}</h3>
                <p className="text-gray-600">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-xl mb-3 text-gray-700">Customer Details</h4>
                    <p className='capitalize'><span className='font-semibold'>Name:</span> {order.customerName}</p>
                    <p><span className='font-semibold'>Contact:</span> {order.customerContactNumber}</p>
                    <p><span className='font-semibold'>Address:</span> {order.address}</p>
                    <p><span className='font-semibold'>Pin Code:</span> {order.pinCode}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-xl mb-3 text-gray-700">Payment Details</h4>
                    <p className='capitalize'><span className='font-semibold'>Status:</span> {order.paymentStatus}</p>
                    <p className='break-words'><span className='font-semibold'>Transaction ID:</span> {order.transactionId}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-4 text-2xl text-gray-800">Products</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.product.map((product, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-bold text-lg mb-2 text-gray-800">{product.productName}</p>
                        <p><span className='font-semibold'>Price:</span> ₹{product.productPrice}</p>
                        <p className="line-clamp-2 hover:line-clamp-none"><span className='font-semibold'>Description:</span> {product.productDesc}</p>
                        <p><span className='font-semibold'>Category:</span> {product.productCategory}</p>
                        <p className='capitalize'><span className='font-semibold'>Status:</span> 
                          <span className={`ml-1 ${
                            product.status === 'delivered' ? 'text-green-600' : 
                            product.status === 'cancelled' ? 'text-red-600' : 'text-blue-600'
                          }`}>
                            {product.status === "true" ? "Pending" : product.status}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  {canCancelOrder(order.product) && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition duration-300 font-semibold"
                    >
                      Cancel Order
                    </button>
                  )}
                  {order.product.some(product => product.status === 'cancelled') && (
                    <p className="text-red-500 mt-2 font-semibold">This order has been cancelled.</p>
                  )}
                  {order.product.every(product => product.status === 'delivered') && (
                    <p className="text-green-500 mt-2 font-semibold">This order has been delivered.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;