const jwt = require('jsonwebtoken')

function requireAuth(req, res, next) {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            return res.status(401).json({
                error: "Missing Authorization Header"
            })
        }
        const parts = auth.split(' ')
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                error: "Invalid Authorization format"
            })
        }
        const token = parts[1]
        jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, payload) => {
            if (err) {
                return res.status(401).json({
                    error: "Invalid token"
                })
            }
            req.user = payload
            next()
        })
    }
    catch (err) {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = requireAuth