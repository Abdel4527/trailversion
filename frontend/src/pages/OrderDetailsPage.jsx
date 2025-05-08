import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-gradient-to-b from-emerald-50 to-white min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Order Details</h2>
      {!orderDetails ? (
        <p className="text-gray-500 text-lg">No Order details found</p>
      ) : (
        <div className="p-6 bg-white shadow-lg rounded-lg">
          {/* Order Info */}
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Order ID: #{orderDetails._id}
              </h3>
              <p className="text-gray-600">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  orderDetails.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isPaid ? "Approved" : "Pending"}
              </span>
              <span
                className={`${
                  orderDetails.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                } px-3 py-1 rounded-full text-sm font-medium`}
              >
                {orderDetails.isDelivered ? "Delivered" : "Pending"}
              </span>
            </div>
          </div>

          {/* Customer, Payment, Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Payment Info
              </h4>
              <p className="text-gray-600">
                Payment Method: {orderDetails.paymentMethod}
              </p>
              <p className="text-gray-600">
                Status:{" "}
                <span
                  className={`${
                    orderDetails.isPaid ? "text-green-600" : "text-red-600"
                  } font-medium`}
                >
                  {orderDetails.isPaid ? "Paid" : "Unpaid"}
                </span>
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Shipping Info
              </h4>
              <p className="text-gray-600">
                Shipping Method: {orderDetails.shippingMethod}
              </p>
              <p className="text-gray-600">
                Address:{" "}
                {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
              </p>
            </div>
          </div>

          {/* Product list */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Products
            </h4>
            <table className="min-w-full text-gray-600 mb-4 border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Unit Price</th>
                  <th className="py-2 px-4 text-left">Quantity</th>
                  <th className="py-2 px-4 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId} className="border-b">
                    <td className="py-2 px-4 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg mr-4"
                      />
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-blue-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-2 px-4">
                      {item.currency || "USD"} {item.price}
                    </td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">
                      {item.currency || "USD"}{" "}
                      {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back to Orders Link */}
          <Link
            to="/my-orders"
            className="text-emerald-500 hover:underline font-medium"
          >
            Back to My Orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
