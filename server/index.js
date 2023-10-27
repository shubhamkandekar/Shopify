import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRout from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";

//configure env
dotenv.config();

//database config
connectDB();

// rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/api/v1/auth", authRout);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

//rest api
app.get("/", (req, res) => {
  res.send("welcome to ecommerce app");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.bgYellow.white);
});
