import express from 'express'
import cors from 'cors'
import fileupload from 'express-fileupload';
import path from 'path';
import "dotenv/config"
import cookieParser from 'cookie-parser'

// import { clerkMiddleware } from '@clerk/express';

import authRouter from './routes/auth.route.js';
import adminRouter from './routes/admin.router.js';
import songRouter from './routes/song.router.js';
import albumRouter from './routes/album.router.js';
import userRouter from './routes/user.router.js';
import statRouter from './routes/stat.router.js';
import connectToDb from './database/dbConnect.js';

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(express.json());
// app.use(clerkMiddleware()); // used to store userid in req => req.auth.userId
app.use(fileupload({
    useTempFiles: true, //use a temporary file in backend to store file temporarily
    tempFileDir: path.join(__dirname, "tmp"), //temporary folder
    createParentPath: true, //create the tmp folder if doesnt exist 
    limits: {
        fileSize: 10 * 1024 * 1024 //max file size of 10mb
    }

}))

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);
app.use("/api/user", userRouter);
app.use("/api/stat", statRouter);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
})

app.listen(PORT, () => {
    console.log("listening to port " + PORT);
    connectToDb();
})