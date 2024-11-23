import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../models/db.js'

export const register = (req, res)=>{
    const {username, password, email, phone} = req.body
    const checkQuery = 'SELECT * FROM users WHERE username = ? OR email = ? OR phone_number = ?';
    db.get(checkQuery, [username, email, phone], (err, row)=>{
        if (err){
            console.log(err.message)
            return res.status(500).json({error: "Error checking user information "})
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
            db.run(insertQuery, [username, email, phone, hashedPassword], function (err){
                if (err){
                    return res.status(500).json({error: "Error registering user"});
                }
                const userId = this.lastID; 
                const token = jwt.sign(
                    { id: userId, username, role: 'user' },
                    process.env.JWT_SECRET,
                    { expiresIn: '27h' } 
                );
                const userQuery = 'SELECT username, email, phone_number FROM users WHERE id = ?';
                db.get(userQuery, [userId], (err, user) => {
                    if (err) {
                        return res.status(500).json({ error: "Error retrieving user data" });
                    }
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'Strict',
                        maxAge: 27 * 60 * 60 * 1000, 
                    });

                    res.status(201).json({
                        message: 'User registered and logged in successfully',
                        user,
                    });
                });
             
            })
        })
    })
}

export const login = (req, res) => {
    const { username, password } = req.body;
    console.log(username,password)
    const query = 'SELECT * FROM users WHERE username = ?';
    db.get(query, [username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(user.password)
     
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
                { expiresIn: '27h' }
            );

            
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'Strict', 
                maxAge: 27 * 60 * 60 * 60 * 1000, 
            });

            res.status(200).json({ message: 'Login successful' , user : {username : user.username, email : user.email, phone : user.phone_number}});
        });
    });
};

export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    });
    res.status(200).json({ message: 'Logout successful' });
};

//for test/ development only !!!!!!
export const updateUser = (req, res)=>{
    const {id} = req.user
    const {level}  = req.body
    const query  = `UPDATE users SET curr_level = ? where id = ?`

    db.run(query, [level, id], function(err){
        if (err){
            console.log(err.message)
            res.status(500).json({error: "Error updating user info"})
        }
        res.status(201).json({message : "User updated"})
    })
}

