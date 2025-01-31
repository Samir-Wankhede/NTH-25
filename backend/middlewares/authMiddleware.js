import jwt from 'jsonwebtoken';


const authenticate = () => (req, res, next) => {
    const token = req.cookies?.token; 
    if (!token) {
        res.clearCookie('token');
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.clearCookie('token');
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Unauthorized: Token has expired' });
            }
            if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Unauthorized: Invalid token' });
            }
            return res.status(401).json({ error: 'Unauthorized: Token verification failed' });
        }

        req.user = decoded;
        next();
    });
};


export default authenticate;
