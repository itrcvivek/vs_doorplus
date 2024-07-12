module.exports = catchFun => (req, res, next) => {
    Promise.resolve(catchFun(req, res, next)).catch(next)
}