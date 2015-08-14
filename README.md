# node-starter
A Node.js and Express.js application starter (cli tool) that can generate some fundamental code automatically for you.

Usage:

- `ns init <app-name>` initializes the app with default package.json and file structure
- `ns new model <model-name>` creates a new mongoose schema
- `ns new route <route-name>` creates a new route with the corresponding controller

Note:

- to install, run `npm install -g node-start`
- the generator assumes the usage of [jade](http://jade-lang.com) as the template engine
- please modify *ns-config.js* and *package.json*, handle git and create *favicon.ico* manually.
- there is a user login system that comes with this project; you can refer to it to learn how `ns new` command generates the proper files.

Example:

- `ns init node-app` will create the folder node-app and generate the template files
- `ns new model User` will create the User schema and model, and is available through `require('models').User`
- `ns new route User` will create the User route file and the User controller, and should be used as `require('controllers').User` and `require('routes')(app)`
