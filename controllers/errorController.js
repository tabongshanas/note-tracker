
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCOde || 500;
    err.status = err.status || 'fail';

    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        })

    } else if (process.env.NODE_ENV === 'production') {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }
}