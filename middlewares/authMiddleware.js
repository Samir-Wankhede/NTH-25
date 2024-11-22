import jwt from 'jsonwebtoken';

const authenticate = (requiredRoles = []) => (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        req.user = decoded;

        if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
            return res.status(403).json({ error: 'Forbidden: You do not have the required permissions' });
        }

        next();
    });
};

export default authenticate;
