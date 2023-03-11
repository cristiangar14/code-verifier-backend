/**
 * Root Router
 * Redirections to Routers 
 */

import express, {Request, Response} from 'express';
import helloRouter from './HelloRouter';
import { LogInfo } from '../utils/logger';
import goodbyeRouter from './GoodbyeRouter';
import usersRouter from './UserRouter';
import authRouter from './AuthRouter';
import katasRouter from './KataRouter';

//Server instance
let server = express();

//Router instance 
let rootRouter = express.Router();

//Active for request to http://localhost:8000/api
//GET http://localhost:8000/api/
rootRouter.get('/', (req:Request, res:Response) => {
    //Send Hello Worls
    LogInfo(`GET:  http://localhost:8000/api/`)
    res.send('API Rest full Express + TS + Swagger + Mongoose + nodemon')
});

//Redirection to Routers & Controllers
server.use('/', rootRouter); // http://localhost:8000/api/
server.use('/hello', helloRouter); //http://localhost:8000/api/hello -> helloRouter
server.use('/goodbye', goodbyeRouter); //http://localhost:8000/api/goodbyeRouter -> goodbyeRouter
server.use('/users', usersRouter); //http://localhost:8000/api/users -> usersRouter
// Auth routes
server.use('/auth', authRouter); //http://localhost:8000/api/auth -> authRouter
// Katas routes
server.use('/katas', katasRouter); //http://localhost:8000/api/auth -> authRouter

// Add more routes to the app

export default server;



