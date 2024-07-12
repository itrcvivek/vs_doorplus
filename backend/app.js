const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const user = require("./routes/userRoute");
const category = require("./routes/CatgoreyRoute");
const subCategory = require("./routes/subCategoryRoute");
const basicInfo = require("./routes/basicInfoRoutes");
const userAddress = require("./routes/userAddressRoute");
const privacyPolicy = require("./routes/privacy&PolicyRoute");
const banner = require("./routes/bannerRoutes");
const blogRoutes = require("./routes/blogRoutes");
const frequentlyQuestion = require("./routes/FrequentlyQuestionRoutes");
const booking = require("./routes/BookingRoutes");

app.use("/api/v1/", user);
app.use("/api/v1/", category);
app.use("/api/v1/", subCategory);
app.use("/api/v1/", basicInfo);
app.use("/api/v1/", userAddress);
app.use("/api/v1/", privacyPolicy);
app.use("/api/v1/", banner);
app.use("/api/v1", blogRoutes);
app.use("/api/v1", frequentlyQuestion);
app.use("/api/v1", booking);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
