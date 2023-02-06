import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import sitesRoute from "./routes/sites.js"
import reservationsRoute from "./routes/reservations.js"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express();
dotenv.config();


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Connected to MongoDB.");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB.");
});
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB.");
});

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/sites", sitesRoute);
app.use("/api/reservations", reservationsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Internal Server Error";

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
})

app.get("/", (req, res) => {
    res.send("Hello from Room Reservation App!");
});

app.listen(8800, ()=> {
    connectDB();
    console.log("Connected to RRA backend.");
})