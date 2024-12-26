import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import AuthRoute from "./Routes/AuthRoute.js";
import ProductRoute from "./Routes/ProductRoute.js";
import CategoryRoute from "./Routes/CategoryRoute.js";
import DiamondRoute from "./Routes/DiamondRoute.js";
import MaterialRoute from "./Routes/MaterialRoute.js";
import S3Route from "./Routes/S3Route.js";

import cookieParser from "cookie-parser";
import cors from "cors";

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173', ''],
    methods: ["GET", "PUT", "POST", "DELETE"],
}))
app.use(cookieParser());
const port = process.env.PORT || 5000;

app.use("/api/auth", AuthRoute);
app.use("/api/product", ProductRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/diamond", DiamondRoute);
app.use("/api/material", MaterialRoute);
app.use("/api/s3", S3Route);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected With DB Successfull"))
    .catch((e) => console.log("Db Connection Failed", e));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "/client/dist")));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is Listening on PORT ${port}`);
})