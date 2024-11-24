const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
//const secretKey = 'xxxxxxxxxx'; // Use the same secret key used to generate the JWT
//const publicKEY = fs.readFileSync('./auth/pub.key', 'utf8')
const publicKEY = fs.readFileSync(path.join(__dirname, './pub.key'), 'utf8');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(403).send('Token is required');
    }

    jwt.verify(token, publicKEY, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        req.user = decoded; // Save decoded user info to use in routes if needed
        next();
    });
}

module.exports = verifyToken;
