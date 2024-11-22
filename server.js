import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './models/db.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log("server running...")
})