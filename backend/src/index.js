import express from 'express';
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";    
import { connectDB } from './lib/db.js';
import job from './lib/cron.js';
import cors from 'cors';    

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

job.start(); // Start the cron job

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes); // Added missing slash

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
    }
);