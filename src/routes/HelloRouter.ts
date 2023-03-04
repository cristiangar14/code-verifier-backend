import express, { Request, Response } from "express";
import { HelloController } from "@/controller/HelloController";
import { LogInfo } from "@/utils/logger";

// Router from express
let helloRouter = express.Router();

helloRouter.route('/')
    //ttp://localhost:800/api/hello?name=cristian/
    .get(async (req:Request, res: Response) => {
        // Obtain a Query Parama
        let name: any = req?.params?.name;
        LogInfo(`Query Param: ${name}`);
        //Controller instance to execute method
        const controller: HelloController = new HelloController();
        //Obtain Response
        const response = await controller.getMessage(name);
        //Send to the client teh response
        return res.send(response);
    })

export default helloRouter;