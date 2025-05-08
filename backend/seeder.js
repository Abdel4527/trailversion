const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');
const products = require('./data/products');


dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
    try {
        await Product.deleteMany(); // Clear existing products
        await User.deleteMany(); // Clear existing users
        await Cart.deleteMany(); // Clear existing carts

        //create admin user
        const createdUser = await User.create({
            name: 'Admin',
            email: 'admin@example.com',
            password: 'password123',
            role: 'admin',
        });

        const UserID = createdUser._id;
        const sampleProducts = products.map((product) => {
            return { ...product, user: UserID };
        });
        await Product.insertMany(sampleProducts); // Insert sample products
        console.log('Database seeded successfully');
        process.exit(); // Exit process successfully
    } catch (error) {
        console.error('Error seeding database:', error.message);
        process.exit(1); // Exit process with failure
    }
};

seedData();