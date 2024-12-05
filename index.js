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

// import path from 'path';
import { fileURLToPath } from 'url';
// import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173'],
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

// const s3client = new S3Client({
//     region: "eu-north-1",
//     credentials: {
//         accessKeyId: "AKIA6IY353WYL7OPP345",
//         secretAccessKey: "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"
//     }
// })


// async function getObjectUrl(key) {
//     const command = new GetObjectCommand({
//         Bucket: "krivafiles",
//         Key: key
//     });
//     const url = await getSignedUrl(s3client, command);
//     return url;
// }

// async function putObjectUrl(filename, contentType) {
//     const command = new PutObjectCommand({
//         Bucket: "krivafiles",
//         Key: `/Categories/${filename}`,
//         ContentType: contentType
//     });
//     const url = await getSignedUrl(s3client, command);
//     return url;
// }

// console.log("URL for upload Image : ", await putObjectUrl(`image-${Date.now()}.jpg`, "image/jpg"));

// console.log("URL for customize2.jpg : ", await getObjectUrl("Categories/bangle1_1731785931608.jpeg"));
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, "/client/build")));


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// });

app.listen(port, () => {
    console.log(`Server is Listening on PORT ${port}`);
})