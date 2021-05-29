const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req , res , next) => {
// Get The Token from the Header
const token = req.header('x-auth-token');

// Check If Not Token
if(!token) {
    return res.status(401).json({ msg : 'No Token , Authorization denied' })
}

// If There is a Token We Need To Verify
try {
    const decoded = jwt.verify(token , config.get('jwtSecret'));
    req.user = decoded.user;
    next();
} catch (error) {
    res.status(401).json({ msg : 'Token is Not Valid' })
}
}