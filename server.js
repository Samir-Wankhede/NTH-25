import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './models/db.js';
import authRoutes from './routes/authRoutes.js'


dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes)

app.listen(PORT, ()=>{
    console.log("server running...")
})