import express from "express";
import usersRoutes from "./routes/users.routes";
import mongoose from "mongoose";
import errorHandler from "./middlewares/errorHandler";
import dotenv from "dotenv";
import APIError from "./utils/APIError";
import helmet from "helmet";
import { xss } from "express-xss-sanitizer";
import hpp from "hpp";
import limiter from "./middlewares/rateLimiter";
import cors from "cors";
import postsRoutes from "./routes/posts.routes";

dotenv.config();

const app = express();

// Application level middleware
app.use(express.json()); // parse request body buffer to json and assign to req.body
app.use(helmet()); // secure the app by setting various HTTP headers
app.use(xss()); // sanitize request body and query parameters to prevent XSS attacks
app.use(hpp()); // prevent HTTP parameter pollution attacks
app.use(limiter); // rate limiter middleware
app.use(cors()); // enable CORS for all routes

// routes
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/posts", postsRoutes);

app.use((req, res, next) => {
  throw new APIError(`Route ${req.url} not found`, 404);
});

app.use(errorHandler); // error handler middleware => 1 only in the server => catch all errors

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
  mongoose
    .connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
    .then(() => {
      console.log("✅✅ Connected to MongoDB");
    })
    .catch((err) => {
      console.log("❌❌ Connected to MongoDB");
      console.log(err);
    });
});
