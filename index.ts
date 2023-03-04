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

app.get('/hello/:name?', (req:Request, res:Response) => {
    const name = req.params.name || 'anonimo';
    const data = {
        message: `Hola, ${name}`
    }
    res.status(200).json({data})
});

app.get('/bye', (req:Request, res:Response) => {
    //Send Hello Worls
    const data = {
        message: 'Goodbye, World'
    }
    res.status(200).json({data})
});

//Execute APP and Lisnten requests to PORT
app.listen(port, () => console.log(`EXPRESS SERVER: Running at http://localhost:${port}`))
