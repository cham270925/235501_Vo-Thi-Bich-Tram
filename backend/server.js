const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const deviceRoutes = require("./routes/deviceRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
connectDB();

// Kiểm tra trạng thái Backend
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Backend is running",
        database: "MongoDB Atlas"
    });
});

// API quản lý thiết bị
app.use("/api/devices", deviceRoutes);

// Khởi động server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});