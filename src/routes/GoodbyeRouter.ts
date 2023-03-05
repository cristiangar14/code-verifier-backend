import { GoodbyeController } from "../controller/GoodbyeController";
import express, { Request, Response } from "express";
import { LogInfo } from "../utils/logger";

// Router from express
let goodbyeRouter = express.Router();

goodbyeRouter.route('/')
    //ttp://localhost:800/api/hello?name=cristian/
    .get(async (req:Request, res: Response) => {
        // Obtain a Query Parama
        let name: any = req?.query?.name;
        LogInfo(`Query Param: ${name}`);
        //Controller instance to execute method
        const controller: GoodbyeController = new GoodbyeController();
        //Obtain Response
        const response = await controller.getMessage(name);
        //Send to the client the response
        return res.send(response);
    })

export default goodbyeRouter;