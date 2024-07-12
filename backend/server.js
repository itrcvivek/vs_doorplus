const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Server is shutting down due to uncaught exception');
    process.exit(1);
});

// Load environment variables
dotenv.config({ path: "backend/config/config.env" });
console.log('Environment variables loaded');

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log('Cloudinary configured');

// Connect to the database
connectDatabase();
console.log('Database connected');

// Start the server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Server is shutting down due to unhandled promise rejection');
    server.close(() => {
        process.exit(1);
    });
});
