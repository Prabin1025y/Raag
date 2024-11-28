import express from 'express'
import cors from 'cors'
import fileupload from 'express-fileupload';
import path from 'path';
import "dotenv/config"
import cookieParser from 'cookie-parser'
import cron from 'node-cron'
import fs from 'fs'

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
app.use(cors(
    {
        origin: "http://192.168.1.88:5173",
        methods: ["POST", "GET", "DELETE"],
        credentials: true
    }
));
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

//cron jobs
const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", (req, res) => {
    if (fs.existsSync(tempDir)) {
        fs.readdir(tempDir, (err, files) => {
            if (err) {
                console.log("error", err);
                return;
            }
            for (const file of files) {
                fs.unlink(path.join(tempDir, file), (err) => { });
            }
        });
    }
})


app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);
app.use("/api/user", userRouter);
app.use("/api/stat", statRouter);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")))
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
//     })
// }

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
})

app.listen(PORT, () => {
    console.log("listening to port " + PORT);
    connectToDb();
})