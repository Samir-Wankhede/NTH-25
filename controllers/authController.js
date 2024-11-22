import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../models/db.js'

export const register = (req, res)=>{
    const {username, password, email, phone} = req.body
    const checkQuery = 'SELECT * FROM users WHERE username = ? OR email = ? OR phone = ?';
    db.get(checkQuery, [username, email, phone], (err, row)=>{
        if (err){
            return res.status(500).json({error: "Error checking user informatio "})
        }if (row){
            if (row.username == username){
                return res.status(409).json({error: "Username already exists"});
            }
            if (row.email == email){
                return res.status(409).json({error: "email already exists"});
            }if (row.phone_number == phone){
                return res.status(409).json({error: "Phone number already exists"});
            }
        }

        bcrypt.hash(password, 10, (err, hashedPassword)=>{
            if (err){
                return res.status(500).json({error: "Error hashing pw"})
            }

            const insertQuery = 'INSERT INTO users (username, email, phone_number, password) VALUES (?,?,?,?)';
            db.run(insertQuery, [username, email, phone, hashedPassword], (err)=>{
                if (err){
                    return res.status(500).json({error: "Error registering user"});
                }
                res.status(201).json({message: "User created successfully"});
            })
        })
    })
}

export const login = (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.get(query, [username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: 'Error verifying password' });
            }

            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            
            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'Strict', // Prevent cross-site request forgery
                maxAge: 27 * 60 * 60 * 60 * 1000, 
            });

            res.status(200).json({ message: 'Login successful' });
        });
    });
};


