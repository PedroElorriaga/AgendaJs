exports.csrfError = async (err, req, res, next) => {
    if (err && 'EBADCSRFTOKEN' === err.code) {
        return await res.render('404')
    }
    next()
}

exports.csrfCreateToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}