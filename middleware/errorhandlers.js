exports.notFound = function notFound(req, res, next){
    res.status(400).send('You seem lost, kindly retrace your steps')
};
exports.error = function error(err, req, res, next) {
    console.log(err)
    res.status(500).send('oops, something went wrong')
};