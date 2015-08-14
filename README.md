# node-starter
A Node.js and Express.js application starter (cli tool) that can generate some fundamental code automatically for you.

Usage:

- `ns init <app-name>` initializes the app with default package.json and file structure
- `ns new model <model-name>` creates a new mongoose schema
- `ns new route <route-name>` creates a new route with the corresponding controller

Note: please manually modify package.json and handle git.

Note: to install, run `npm install -g node-start`

Example:

- `ns init node-app` will create the folder node-app and generate the template files
- `ns new model User` will create the User schema and model, and is available through `require('models').User`
- `ns new route User` will create the User route file and the User controller, and is available through `require('controllers').User`
