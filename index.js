import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./DB/connectDB.js";
import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import adRoutes from "./Routes/adRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import branchRoutes from "./Routes/branchRoutes.js";

dotenv.config();
connectDB();
const app = express();
const allowedOrigin = process.env.CLIENT_URL; 
console.log("Allowed Origin:", allowedOrigin)

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});
app.use("/api/auth/", authRoutes);
app.use("/api/user/ads/", userRoutes);

app.use("/api/admin/", adminRoutes);
app.use("/api/admin/ads/", adRoutes);
app.use("/api/admin/category/", categoryRoutes);
app.use("/api/admin/branch/",  branchRoutes);
app.use("/uploads", express.static("uploads"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
