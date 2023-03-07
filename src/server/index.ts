import express, {Request, Response, Express} from 'express';

//Swagger UI
import SwaggerUi from 'swagger-ui-express';

//Security
import cors from 'cors';
import helmet from 'helmet';


// TODO: HTTPS

// root Routes
import rootRoutes from '../routes';
import mongoose from 'mongoose';


// * Create Express App
const server: Express = express();

// * Swagger config and route
server.use(
    '/docs',
    SwaggerUi.serve,
    SwaggerUi.setup(undefined, {
        swaggerOptions: {
            url:"/swagger.json",
            explorer: true
        }
    })
)

// * Define SERVER to use "/api" and use rootRouter from ' index.ts' in routes
//from this point anover: http://localhost:8000/api/....
server.use(
    '/api',
    rootRoutes
)

// Static server
server.use(express.static('public'));

//TODO: Mongoose connection
mongoose.connect('mongodb://localhost:27017/codeverification')


// * Security config
server.use(helmet());
server.use(cors());

// * Content Type config
server.use(express.urlencoded({extended: true, limit: '50mb'}));
server.use(express.json({limit:'50mb'}));


// * Redirection config
// http://localhost:8000/ --> http://localhost:8000/api/
server.get('/', (req:Request, res:Response) => {
    res.redirect('/api')
});

export default server;

