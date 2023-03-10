import express, { Request, Response } from "express";
import { UserController } from "../controller/UsersController";
import { LogInfo } from "../utils/logger";

// Body Parser to read BODY from request
import bodyParser from "body-parser";
let jsonParser = bodyParser.json();

// Router from express
let usersRouter = express.Router();

usersRouter.route('/')
    //ttp://localhost:800/api/users?id=6407ef0adc563ff477338441
    .get(async (req:Request, res: Response) => {
        // Obtain a Query Param
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        //Controller instance to execute method
        const controller: UserController = new UserController();
        //Obtain Response
        const response: any = await controller.getUsers(id);
        //Send to the client teh response
        return res.status(200).send(response);
    })
    //  DELETE: 
    .delete(async (req: Request, res: Response) => {
        // Obtain a Query Param
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        //Controller instance to execute method
        const controller: UserController = new UserController();
        //Obtain Response
        const response: any = await controller.deleteUser(id);
        //Send to the client teh response
        return res.status(200).send(response);
    })
    // Put
    .put(async (req: Request, res: Response) => {

        let id: any = req?.query?.id;
        let name: any = req?.query?.name;
        let email: any = req?.query?.email;
        let age: any = req?.query?.age;
        LogInfo(`Query params: ${id}, ${name}, ${email}, ${age}`)


        let user = {
            name: name || 'Default',
            email: email || 'Default email',
            age: age || 18
        }

        //Controller instance to execute method
        const controller: UserController = new UserController();
        //Obtain Response
        const response: any = await controller.updateUser(user, id);
        //Send to the client teh response
        return res.status(200).send(response);
    })

export default usersRouter;

/**
 * Get Documents => 200
 * Creation Documents => 201 ok
 * Deletion of document => 200 (entity) / 204 (No return)
 * Update of document => 200 (entity) / 204 (No return)
 */