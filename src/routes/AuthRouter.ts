import express, { Request, Response } from "express";
import { AuthController } from "../controller/AuthController"; 
import { LogInfo } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

//BCRYTP for passwords
import bcrypt from 'bcrypt';

// Meddleware 
import { verifyToken } from "../middlewares/verifyToken.middleware";

// Body Parser to read BODY from request
import bodyParser from "body-parser";
// Middleware to read JSON
let jsonParser = bodyParser.json();

// Router from express
let authRouter = express.Router();

authRouter.route('/register')
    .post(jsonParser, async (req: Request, res: Response) =>{
        let { name, email, password, age} = req?.body;
        let hashedPassword = ''
        if (name && email && age && password) {
            // Obtain the password in request and cypher
            hashedPassword = bcrypt.hashSync(req.body.password, 8);

            let newUser: IUser = {
                name,
                email,
                password: hashedPassword,
                age
            }

            //Controller instance to execute method
            const controller: AuthController = new AuthController();
            //Obtain Response
            const response: any = await controller.registerUser(newUser);
            // Sen to the cliente the response
            return res.status(200).send(response);
        } else {
            // Sen to the cliente the response
            return res.status(400).send({
                message: `[ERROR user Data missing]No user can be registered`
            });
        }

    })

authRouter.route('/login')
    .post(jsonParser, async (req: Request, res: Response) =>{
        let { email, password } = req?.body;
        let hashedPassword = ''
        if (email && password) {
    
            let auth: IAuth = {
                email,
                password
            }
            //Controller instance to execute method
            const controller: AuthController = new AuthController();
            //Obtain Response
            const response: any = await controller.loginUser(auth);
            //Send to the client the response which includes the jwt to autirize request
            return res.status(200).send(response);
        } else {
            // Sen to the cliente the response
            return res.status(400).send({
                message: `[ERROR user Data missing]No user can be registered`
            });
        }

    })

// Router Protected by verify token middleware
authRouter.route('/me')
    .get(verifyToken,async (req:Request, res:Response) => {
        
        //Obtain th ID of user to check it's data
        let id: any = req?.query?.id;

        if (id) {
             //Controller: Auth controller
             const controler: AuthController = new AuthController();
             //Obtain response from controller
             let response: any = await controler.userData(id);

            // if user is authorised
            return res.status(200).send(response); 

        } else {
            return res.status(401).send({
                message: 'You are not authorised to perm¿form this action'
            })
            
        }
    })

export default authRouter;
