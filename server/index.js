import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";
import tweetRoutes from "./routes/tweets.js"
import cors from "cors"
import fileUpload from "express-fileupload";

const port = 8000;
const app = express();
dotenv.config();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://twitter-clone-frontend-git-main-yogi-codes.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
    res.setHeader('Access-Control-Allow-Credentials', 'true'); 
    next();
});



const connect = () => {

    mongoose.connect(process.env.MONGO).then(() => {
        console.log("Database connected Successfully!");
    }).catch((err) => {

        console.log("DB Error: ", err);
    })

};
app.use(express.json())
app.use(cookieParser())
app.use(
    fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
    })
 )

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/tweets",tweetRoutes);




app.listen(port, () => {
    connect();

    console.log("App is listening on port : ", port);

})