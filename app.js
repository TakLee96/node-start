var root_dir = process.env.PWD;
var fs = require("fs");

if (process.argv.length < 2) {
    print_help();
} else {
    switch (process.argv[1]) {
        case "init":
            if (process.argv[2]) {
                init(process.argv[2]);
            } else {
                print_help();
            }
            break;
        case "new":
            if (process.argv.length == 4) {
                if (process.argv[2] == "model") {
                    new_model(process.argv[3]);
                } else if (process.argv[2] == "route") {
                    new_route(process.argv[3]);
                } else {
                    print_help();
                }
            } else {
                print_help();
            }
            break;
        case "help":
            print_help();
            break;
        default:
    }
}

function print_help () {
    console.log("Usage: ns <command-name>");
    console.log("");
    console.log("    ns init <app-name>");
    console.log("    ns new model <model-name>");
    console.log("    ns new route <model-name>");
    console.log("    ns help");
    console.log("");
}

function init (app_name) {
    var app_dir = root_dir + "/" + app_name;
    fs.mkdirSync(app_dir);
    fs.writeFileSync(app_dir + "/.gitignore", fs.readFileSync("src/.gitignore", "utf8"));
    fs.writeFileSync(app_dir + "/app.js", fs.readFileSync("src/app.js", "utf8"));

    var pkg = require("src/package.json"); pkg.name = app_name;
    fs.writeFileSync(app_dir + "/package.json", JSON.stringify(pkg));
    fs.writeFileSync(app_dir + "/README.md", app_name);

    fs.mkdirSync(app_dir + "/controllers");
    fs.writeFileSync(app_dir + "/controllers/controllers.json", "[]");
    fs.writeFileSync(app_dir + "/controllers/index.js", fs.readFileSync("src/controllers/index.js", "utf8"));
    
    fs.mkdirSync(app_dir + "/models");
    fs.writeFileSync(app_dir + "/models/models.json", "[]");
    fs.writeFileSync(app_dir + "/models/index.js", fs.readFileSync("src/models/index.js", "utf8"));
    
    fs.mkdirSync(app_dir + "/routes");
    fs.writeFileSync(app_dir + "/routes/routes.json", "[]");
    fs.writeFileSync(app_dir + "/routes/index.js", fs.readFileSync("src/routes/index.js", "utf8"));

    fs.mkdirSync(app_dir + "/public");
    fs.writeFileSync(app_dir + "/public/index.html", fs.readFileSync("src/public/index.html", "utf8"));
    fs.mkdirSync(app_dir + "/public/css");
    fs.writeFileSync(app_dir + "/public/css/main.css", fs.readFileSync("src/public/css/main.css", "utf8"));
    fs.mkdirSync(app_dir + "/public/js");
    fs.writeFileSync(app_dir + "/public/js/main.js", fs.readFileSync("src/public/js/main.js", "utf8"));
}

function new_model(model_name) {
    var models = require(root_dir + "/models/models");
    if (models.indexOf(model_name) != -1) {
        console.error(model_name + " model already exists!");
    } else {
        models.push(model_name);
        fs.writeFileSync(root_dir + "/models/" + model_name + ".js", fs.readFileSync("src/models/Model.tpl.js", "utf8").replace(/__name__/g, model_name));
        fs.writeFileSync(root_dir + "/models/models.json", JSON.stringify(models));
    }
}

function new_route(route_name) {
    var routes = require(root_dir + "/routes/routes");
    var controllers = require(root_dir + "/controllers/controllers");
    if (routes.indexOf(route_name) != -1) {
        console.error(route_name + " route already exists!");
    } else if (controllers.indexOf(route_name) != -1) {
        console.error(route_name + " controller already exists!");
    } else {
        routes.push(route_name); controllers.push(route_name);
        fs.writeFileSync(root_dir + "/routes/" + route_name + ".js", fs.readFileSync("src/routes/Route.tpl.js", "utf8"));
        fs.writeFileSync(root_dir + "/routes/routes.json", JSON.stringify(routes));
        fs.writeFileSync(root_dir + "/controllers/" + route_name + ".js", fs.readFileSync("src/controllers/Controller.tpl.js", "utf8"));
        fs.writeFileSync(root_dir + "/controllers/controllers.json", JSON.stringify(controllers));
    }
}
