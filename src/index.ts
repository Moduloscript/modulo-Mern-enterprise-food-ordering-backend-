import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute"
import restaurantRoute from "./routes/RestaurantRoute"

import { v2 as cloudinary } from "cloudinary";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("connected to Database"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();
app.use(express.json());

app.use(cors());

// Our health EndPoint
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

//  /api/my/user
app.use("/api/my/user", myUserRoute);

//  /api/my/restaurant
app.use("/api/my/restaurant", myRestaurantRoute)

app.use("/api/restaurant", restaurantRoute)

app.listen(7000, () => {
  console.log("server started on Localhost:7000");
});
