var controllers = require('./controllers');

controllers.forEach(function (controller) {
    exports[controller] = require('./' + controller);
});
