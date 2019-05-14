# Learning Angular and NodeJS
This tutorials will go through step by step building simple website using Angular, and NodeJS from scratch

## Getting started
These instructions will get you a copy of project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy a project into production.
### Prerequisites
Before you begin make sure your development environment include following tools and softwares:
1. Node.JS (10.x): to check version, open command window and run this command
```bash
node -v
v10.15.3
```
2. NPM package manager: this is installed with Node.JS by default. To check that you have NPM client installed, open command window and run this command
```bash
npm -v
6.4.1
```
3. Angular CLI: you use Angular CLI to create projects, generate application and library code, and perform variaty of ongoing development tasks such as testing, bundling, and deployment. 
3.1 To check Angular CLI version, open command window and run this command:
```bash
ng version

     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/


Angular CLI: 7.3.9
Node: 10.15.3
OS: win32 x64
Angular:
...

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.13.9
@angular-devkit/core         7.3.9
@angular-devkit/schematics   7.3.9
@schematics/angular          7.3.9
@schematics/update           0.13.9
rxjs                         6.3.3
typescript                   3.2.4
```
3.2 To install Angular CLI, open command window and run this command:
```bash
npm install -g @angular/cli
```
### Setup environment
Assumption you create the following folders as below:
```
D:\learning
|__ |__practices
|__ |__ |__web
|__ |__ |__services
```
Which mean the folder practices will be your root for all project, folder web will be using for frontend, and services will be your backed restful  service.
#### Initialize the RESTFUL web service
 1. Open command window, navigate to the folder `services` and run this command
```bash
D:\Learning\practices\services>npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (services)
version: (1.0.0)
description: a simple restful api
entry point: (index.js)
test command:
git repository:
keywords: restful, angular, nodejs
author: ha doan
license: (ISC)
About to write to D:\Learning\practices\services\package.json:

{
  "name": "services",
  "version": "1.0.0",
  "description": "a simple restful api",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "restful",
    "angular",
    "nodejs"
  ],
  "author": "ha doan",
  "license": "ISC"
}


Is this OK? (yes)

D:\Learning\practices\services>
```
This will generate a `package.json` file

 2. Install dependencies components: nodemon, body-parser and express
 

> **nodemon** will help to keep track of changes to application by watching changed files and automatically restart server.
> **express** will be web server let your restfull api running on it.
> **body-parser** using for parse incoming request's body

```bash
 npm install --save-dev nodemon
 
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN services@1.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.9 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.9: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

+ nodemon@1.19.0
added 223 packages from 129 contributors and audited 2236 packages in 13.274s
found 0 vulnerabilities
```
```
npm install --save @types/express express body-parser mongoose
npm WARN services@1.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.9 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.9: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

+ @types/express@4.16.1
+ body-parser@1.19.0
+ express@4.16.4
+ mongoose@5.5.8
added 90 packages from 104 contributors and audited 2441 packages in 8.55s
found 0 vulnerabilities
```
 3. Configure typescript configuration file (tsconfig.json)
```
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "pretty": true,
    "sourceMap": true,
    "target": "es6",
    "outDir": "./build",
    "baseUrl": "./src"
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```
4. Adding some scripts in package.json
```
{
  "name": "services",
  "version": "1.0.0",
  "description": "a simple restful api",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "tsc",
    "dev": "ts-node ./src/server.ts",
    "start": "nodemon ./build/server.js",
    "prod": "npm run build && npm run start"
  },
  "keywords": [
    "restful",
    "angular",
    "nodejs"
  ],
  "author": "ha doan",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^1.19.0"
  },
  "dependencies": {
    "@types/express": "^4.16.1",
    "body-parser": "^1.19.0",
    "express": "^4.16.4",
    "mongoose": "^5.5.8"
  }
}

```
For development, we can run and test by using following command:
```
npm run dev
```
For production, we can use this command to build and publish into /build folder
```
npm run prod
```
4. Add `src/app.ts` file
```
import * as express from "express";
import * as bodyParser from "body-parser";
class App {
    //declare variable
    public app: express.Application;

    //declare constructor
    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        //support json data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
export default new App().app;
```
5. Add `src/server.ts` file
```
import app from "./app";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})
```
### Development
#### Implement Routing
1. Add `src/routes/bookRoutes.ts` file
```typescript
import { Request, Response } from "express";
export class Routes {
    //define method
    public routes(app): void {
        //define route
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200)
                    .send({ message: 'welcome restful api - demo' });
            });
    }

}
```
2. Import routes into application, open `src/app.ts` add following codes
```typescript
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/bookRoutes";

class App {
    //declare variable
    public app: express.Application;
    private routesEngine: Routes = new Routes();

    //declare constructor
    constructor() {
        this.app = express();
        this.routesEngine.routes(this.app);
        this.config();
    }

    private config(): void {
        //support json data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
export default new App().app;
```
#### Using model
3. Add book model by adding `src/models/bookModel.ts` file
```
import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
export const BookSchema = new Schema({
    isbn: {
        type: String,
        required: 'Enter ISBN number'
    },
    title: {
        type: String,
        required: 'Enter book title'
    },
    author: {
        type: String,
        required: 'Enter author name'
    },
    publish: {
        type: Date,
        default: Date.now
    }
});
```
#### Using controller
4. Add controller by adding `src/controllers/bookController.ts` file
```typescript
import * as mongoose from "mongoose";
import { BookSchema } from "../models/bookModel";
import { Request, Response } from "express";

const Book = mongoose.model('Book', BookSchema);

export class BookController {
    public all(req: Request, res: Response) {
        Book.find({}, (err, data) => {
            if (err)
                res.send(err);
            res.json(data);
        });
    }
    public find(req: Request, res: Response) {
        Book.find({ isbn: req.params.isbn }, (err, data) => {
            if (err)
                res.send(err);
            res.json(data);
        })
    }
    public add(req: Request, res: Response) {
        var new_book = new Book(req.body);
        new_book.save((err, data) => {
            if (err)
                res.send(err);
            res.json(data);
        });
    }
    public update(req: Request, res: Response) {
        Book.findOneAndUpdate({ isbn: req.params.isbn }, req.body, { new: true }, (err, data) => {
            if (err)
                res.send(err);
            res.json(data);
        });
    }
    public delete(req: Request, res: Response) {
        Book.remove({ isbn: req.params.isbn }, (err, data) => {
            if (err)
                res.send(err);
            res.json(data);
        });
    }
}
```
#### Combine Routes and Controller together
5. Modify Routes, open `src/routes/bookRoutes.ts` file and update as below codes
```typescript
import { BookController } from "../controllers/bookController";
export class Routes {
    private bookController: BookController = new BookController();
    //define method
    public routes(app): void {
        //define route
        app.route('/')
            .get(this.bookController.welcome);
        app.route('/book')
            .get(this.bookController.all)
            .post(this.bookController.add);
        app.route('/book/:isbn')
            .get(this.bookController.find)
            .put(this.bookController.update)
            .delete(this.bookController.delete);
    }

}
```
#### Initial MongoDb by using mongoose
6. Modify Application, open `src/app.ts` file and update as below codes
```typescript
import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { Routes } from "./routes/bookRoutes";

class App {
    //declare variable
    public app: express.Application;
    private routesEngine: Routes = new Routes();
    private dbName: String = "bookstore";
    private server: String = "localhost";
    //declare constructor
    constructor() {
        this.app = express();
        this.routesEngine.routes(this.app);
        this.config();
        this.setupDatabase();
    }

    private config(): void {
        //support json data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private setupDatabase(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(`mongodb://${this.server}/${this.dbName}`, { useNewUrlParser: true });
    }
}
export default new App().app;
```
7. Testing
Use a testing tool for Restful service to try some requests
#### Some advance tips
1. Using SSL: 
1.1 Open command window and run below scripts to generate certificate files
```bash
openssl req -newkey rsa:2048 -nodes -keyout D:\OpenSSL-Win64\mykeys\keytemp.pem -x509 -days 365 -out D:\OpenSSL-Win64\mykeys\cert.pem

openssl rsa -in D:\OpenSSL-Win64\mykeys\keytemp.pem -out D:\OpenSSL-Win64\mykeys\key.pem
```
1.2 copy key.pem and cert.pen into `src/config` folder
1.3 Update `src/server.ts` to enable HTTPS
```typescript
import * as https from "https";
import * as fs from "fs";
import app from "./app";
const PORT = process.env.PORT || 3000;

//declare configuration object
const httpOptions = {
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem')
};

https.createServer(httpOptions, app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})
```