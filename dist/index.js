"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
//Configuration the .env file
dotenv_1.default.config();
//Create Express App
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
//Define the first Route of APP
app.get('/', (req, res) => {
    //Send Hello Worls
    res.send('API Rest full Express + TS + Swagger + Mongoose + nodemon');
});
app.get('/hello/:name?', (req, res) => {
    const name = req.params.name || 'anonimo';
    const data = {
        message: `Hola, ${name}`
    };
    res.status(200).json({ data });
});
app.get('/bye', (req, res) => {
    //Send Hello Worls
    const data = {
        message: 'Goodbye, World'
    };
    res.status(200).json({ data });
});
//Execute APP and Lisnten requests to PORT
app.listen(port, () => console.log(`EXPRESS SERVER: Running at http://localhost:${port}`));
//# sourceMappingURL=index.js.map