import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import cookieParser from 'cookie-parser'; 
import answerRoutes from './routes/answerRoutes.js'


dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(cors({credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes)
app.use('/api/question', questionRoutes )
app.use('/api/answer', answerRoutes)
app.listen(PORT, ()=>{
    console.log("server running...")
})