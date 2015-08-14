var models = require('./models');

models.forEach(function (model) {
    exports[model] = require('./' + model);
});
