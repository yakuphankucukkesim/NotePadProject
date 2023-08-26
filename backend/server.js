import express, { urlencoded } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import notesRoutes from "./routes/noteRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from 'cors';
dotenv.config()

const port = process.env.PORT || 5001
const app = express();

app.use(cors({
    origin: '*'
}));

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_CONNECT);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('Error');
        process.exit(1)
    }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Selam');
})

app.use("/api/notes", notesRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(port, (() => {
    connectDb();
    console.log(`Server is running on port ${port}`);
}))