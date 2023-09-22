module.exports = (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            next()
        } else {
            res.status(401).json({ error: true, message: 'unauthorization access' })
        }
    } catch (error) {
        next(error)
    }
}