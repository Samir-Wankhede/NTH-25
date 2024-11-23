import sqlite3 from 'sqlite3';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../data/nth-db.sqlite');

const db = new sqlite3.Database(dbPath, (err)=>{
    if (err){
        console.log("Error Opening DB: ", err.message);
    }else{
        console.log("Connected to DB.");
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE,
            password TEXT,
            role TEXT DEFAULT 'user',
            phone_number TEXT,
            curr_level INT DEFAULT 1,
            hint_taken BOOLEAN DEFAULT 0,
            curr_keys INT DEFAULT 3,
            hidden BOOLEAN default 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            img1 TEXT NOT NULL,
            img2 TEXT,
            img3 TEXT,
            img4 TEXT,
            hint TEXT,
            paid_hint TEXT,
            hint_cost INTEGER NOT NULL,
            level INTEGER NOT NULL,
            tooltip TEXT NOT NULL,
            close_answers TEXT,
            answer TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS answer_histories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            level INTEGER,
            answers TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (username) REFERENCES users(username),
            FOREIGN KEY (level) REFERENCES questions(level),
            UNIQUE (username, level)
        )`);
    }
})

export default db;