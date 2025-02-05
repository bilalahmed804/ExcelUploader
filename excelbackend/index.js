import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";  // dotenv ko import karo
import uploadRoutes from "./routes/uploadRoute.js";  // Import the route

const app = express();
dotenv.config();

// Middleware setup
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODBURI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Connection Error:", err));

// Use the uploaded data route
app.use("/api", uploadRoutes);  // Apply the route for API requests

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


