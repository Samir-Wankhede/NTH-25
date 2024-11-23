import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import cookieParser from 'cookie-parser'; 
import answerRoutes from './routes/answerRoutes.js'
import leaderboardRoutes from './routes/leaderboardRoutes.js'
import timerRoutes from './routes/timerRoutes.js'


dotenv.config();

const app = express();
const PORT = process.env.PORT


app.use(cors({origin:"http://localhost:3000" ,credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use((req,res,next)=>{
    console.log(req.method,' ',req.url)
    next()
})

app.use('/api/auth',authRoutes)
app.use('/api/question', questionRoutes )
app.use('/api/answer', answerRoutes)
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/timer', timerRoutes)

app.listen(PORT, ()=>{
    console.log("server running...")
})