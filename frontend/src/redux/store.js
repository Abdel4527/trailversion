import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import checkoutReducer from './slices/checkoutSlice'; // Import the checkout slice if needed
import orderReducer from './slices/orderSlice'; // Import the order slice if needed
import adminReducer from './slices/adminSlice'; // Import the admin slice if needed
import adminProductReducer from './slices/adminProductSlice'; // Import the admin product slice if needed
import adminOrderReducer from './slices/adminOrderSlice'; // Import the admin order slice if needed



const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    
    checkout: checkoutReducer,
    orders: orderReducer, // Add the order slice here if needed
    admin: adminReducer, // Add the admin slice here if needed
    adminProducts: adminProductReducer,
    adminOrders: adminOrderReducer, // Add the admin order slice here if needed

    // Add other slices here if needed
  }, // Add your reducers here
});

export default store;