import express, { Request, Response } from "express";
import { AuthController } from "../controller/AuthController"; 
import { LogInfo } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

//BCRYTP for passwords
import bcrypt from 'bcrypt';

// Router from express
let authRouter = express.Router();

authRouter.route('/auth/register')
    .post(async (req: Request, res: Response) =>{
        let { name, email, password, age} = req.body;
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
            
            return res.status(200).send(response);
        }

    })

authRouter.route('/auth/login')
    .post(async (req: Request, res: Response) =>{
        let { email, password } = req.body;
        let hashedPassword = ''
        if (email && password) {
            // TODO: use IAuth
    
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
        }

    })

export default authRouter;
