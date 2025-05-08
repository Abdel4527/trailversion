const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/ProductRoutes');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoute');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const subscribeRoute = require('./routes/subscribeRoute');
const adminRoutes = require('./routes/adminRoutes');
const productAdminRoutes = require('./routes/productAdminRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');
const openAiRoutes = require('./routes/openaiRoute');

const app = express();

app.use(express.json());

const allowedOrigins = [
  "https://trailversion-x58g.vercel.app", // your frontend Vercel deployment
  "http://localhost:3000" // local dev (optional)
];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

dotenv.config();


const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// User routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api', subscribeRoute);
app.use('/api/openai', openAiRoutes);


// Admin routes

app.use('/api/admin/users', adminRoutes);
app.use('/api/admin/products', productAdminRoutes);

app.use('/api/admin/orders', adminOrderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});