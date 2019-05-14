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