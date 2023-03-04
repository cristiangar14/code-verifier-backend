import express, { Express, Request, Response} from "express";
import dotenv from "dotenv";

//Configuration the .env file
dotenv.config();

//Create Express App
const app: Express = express();
const port: string | number = process.env.PORT || 8000;

//Define the first Route of APP
app.get('/', (req:Request, res:Response) => {
    //Send Hello Worls
    res.send('API Rest full Express + TS + Swagger + Mongoose + nodemon')
});

app.get('/hello', (req:Request, res:Response) => {
    //Send Hello Worls
    res.send('Hello world')
});

//Execute APP and Lisnten requests to PORT
app.listen(port, () => console.log(`EXPRESS SERVER: Running at http://localhost:${port}`))
