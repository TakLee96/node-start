module.exports = function (app) {
    require('./routes').forEach(function (route) {
        require('./' + route)(app);
    });
};
