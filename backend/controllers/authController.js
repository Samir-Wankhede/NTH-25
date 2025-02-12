import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../models/db.js'

// SQLITE

// export const register = (req, res)=>{
//     const {username, password, email, phone} = req.body

//     if (!username || username.length > 10 || /[^a-zA-Z0-9]/.test(username)) {
//         return res.status(400).json({ error: "Username must be alphanumeric and at most 10 characters long." });
//     }

//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!email || !emailRegex.test(email)) {
//         return res.status(400).json({ error: "Please enter a valid email address." });
//     }

//     const phoneRegex = /^[0-9]{10}$/;
//     if (!phone || !phoneRegex.test(phone)) {
//         return res.status(400).json({ error: "Phone number must be exactly 10 digits." });
//     }

//     if (!password || password.length < 6) {
//         return res.status(400).json({ error: "Password must be at least 6 characters long." });
//     }
    
//     const checkQuery = 'SELECT * FROM users WHERE username = ? OR email = ? OR phone_number = ?';
//     db.get(checkQuery, [username, email, phone], (err, row)=>{
//         if (err){
//             console.log(err.message)
//             return res.status(500).json({error: "Error checking user information "})
//         }if (row){
//             if (row.username == username){
//                 return res.status(409).json({error: "Username already exists"});
//             }
//             if (row.email == email){
//                 return res.status(409).json({error: "email already exists"});
//             }if (row.phone_number == phone){
//                 return res.status(409).json({error: "Phone number already exists"});
//             }
//         }

//         bcrypt.hash(password, 10, (err, hashedPassword)=>{
//             if (err){
//                 return res.status(500).json({error: "Error hashing pw"})
//             }

//             const insertQuery = 'INSERT INTO users (username, email, phone_number, password) VALUES (?,?,?,?)';
//             db.run(insertQuery, [username, email, phone, hashedPassword], function (err){
//                 if (err){
//                     return res.status(500).json({error: "Error registering user"});
//                 }
//                 const userId = this.lastID; 
//                 const token = jwt.sign(
//                     { id: userId, username, role: 'user' },
//                     process.env.JWT_SECRET,
//                     { expiresIn: '27h' } 
//                 );
//                 const userQuery = 'SELECT username, email, phone_number FROM users WHERE id = ?';
//                 db.get(userQuery, [userId], (err, user) => {
//                     if (err) {
//                         return res.status(500).json({ error: "Error retrieving user data" });
//                     }
//                     res.cookie('token', token, {
//                         httpOnly: true,
//                         secure: true,
//                         domain: ".credenz.co.in",
//                         sameSite: 'None',
//                         maxAge: 27 * 60 * 60 * 1000, 
//                     });

//                     res.status(201).json({
//                         message: 'User registered and logged in successfully',
//                         user,
//                     });
//                 });
             
//             })
//         })
//     })
// }
export const register = async (req, res) => {
    try {
        const { username, password, email, phone } = req.body;

        // **Validations**
        if (!username || username.length > 21 || /[^a-zA-Z0-9]/.test(username)) {
            return res.status(400).json({ error: "Username must be alphanumeric and at most 20 characters long." });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ error: "Please enter a valid email address." });
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phone || !phoneRegex.test(phone)) {
            return res.status(400).json({ error: "Phone number must be exactly 10 digits." });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long." });
        }

        // **Check if user already exists**
        const checkQuery = 'SELECT username, email, phone_number FROM users WHERE username = $1 OR email = $2 OR phone_number = $3';
        const existingUser = await pool.query(checkQuery, [username, email, phone]);

        if (existingUser.rows.length > 0) {
            const existing = existingUser.rows[0];
            if (existing.username === username) {
                return res.status(409).json({ error: "Username already exists" });
            }
            if (existing.email === email) {
                return res.status(409).json({ error: "Email already exists" });
            }
            if (existing.phone_number === phone) {
                return res.status(409).json({ error: "Phone number already exists" });
            }
        }

        // **Hash Password**
        const hashedPassword = await bcrypt.hash(password, 10);

        // **Start transaction**
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // **Insert new user**
            const insertQuery = 'INSERT INTO users (username, email, phone_number, password) VALUES ($1, $2, $3, $4) RETURNING id';
            const userResult = await client.query(insertQuery, [username, email, phone, hashedPassword]);

            const userId = userResult.rows[0].id;

            // **Generate JWT Token**
            const token = jwt.sign(
                { id: userId, username, role: 'user' },
                process.env.JWT_SECRET,
                { expiresIn: '27h' }
            );

            // **Retrieve the new user (excluding password)**
            const userQuery = 'SELECT username, email, phone_number FROM users WHERE id = $1';
            const userData = await client.query(userQuery, [userId]);

            await client.query('COMMIT'); // Commit transaction
            client.release(); // Release client

            // **Set cookie & send response**
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                domain: ".credenz.co.in",
                sameSite: 'None',
                maxAge: 27 * 60 * 60 * 1000, // 27 hours
            });

            return res.status(201).json({
                message: 'User registered and logged in successfully',
                user: userData.rows[0],
            });

        } catch (err) {
            await client.query('ROLLBACK'); // Rollback transaction on error
            client.release();
            console.error(err.message);
            return res.status(500).json({ error: "Error registering user" });
        }

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal error occurred" });
    }
};

//SQLITE

// export const login = (req, res) => {
//     const { username, password } = req.body;
//     console.log(username,password)
//     const query = 'SELECT * FROM users WHERE username = ?';
//     db.get(query, [username], (err, user) => {
//         if (err) {
//             return res.status(500).json({ error: 'Database error' });
//         }

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         console.log(user.password)
     
//         bcrypt.compare(password, user.password, (err, isMatch) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Error verifying password' });
//             }

//             if (!isMatch) {
//                 return res.status(401).json({ error: 'Invalid password' });
//             }

            
//             const token = jwt.sign(
//                 { id: user.id, username: user.username, role: user.role },
//                 process.env.JWT_SECRET,
//                 { expiresIn: '27h' }
//             );

            
//             res.cookie('token', token, {
//                 httpOnly: true,
//                 secure: true, 
//                 domain: ".credenz.co.in",
//                 sameSite: 'None', 
//                 maxAge: 27 * 60 * 60 * 60 * 1000, 
//             });

//             res.status(200).json({ message: 'Login successful' , user : {username : user.username, email : user.email, phone : user.phone_number}});
//         });
//     });
// };

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // console.log(username, password);

        // Fetch user from the database
        const query = 'SELECT id, username, email, phone_number, password, role FROM users WHERE username = $1';
        const result = await pool.query(query, [username]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = result.rows[0];
        // console.log(user.password);

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '27h' }
        );

        // Set secure cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            domain: ".credenz.co.in",
            sameSite: 'None',
            maxAge: 27 * 60 * 60 * 1000, // 27 hours
        });

        return res.status(200).json({ 
            message: 'Login successful',
            user: { username: user.username, email: user.email, phone: user.phone_number }
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        domain: ".credenz.co.in",
        sameSite: 'None',
    });
    res.status(200).json({ message: 'Logout successful' });
};

//for test/ development only !!!!!!
// export const updateUser = (req, res)=>{
//     const {id} = req.user
//     const {level}  = req.body
//     const query  = `UPDATE users SET curr_level = ? where id = ?`

//     db.run(query, [level, id], function(err){
//         if (err){
//             console.log(err.message)
//             res.status(500).json({error: "Error updating user info"})
//         }
//         res.status(201).json({message : "User updated"})
//     })
// }

