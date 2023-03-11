import express, { Request, Response } from "express";
import { LogInfo } from "../utils/logger";
import { KatasController } from "../controller/KatasController";

// Body Parser to read BODY from request
import bodyParser from "body-parser";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { IKata, KataLevel } from "../domain/interfaces/Ikata.interface";
let jsonParser = bodyParser.json();

// Router from express
let katasRouter = express.Router();
    

katasRouter.route('/')
    //ttp://localhost:800/api/users?id=6407ef0adc563ff477338441
    .get(verifyToken, async (req:Request, res: Response) => {
        // Obtain a Query Param
        let id: any = req?.query?.id;

        //Pagination 
        let page: any = req?.query?.page || 1;
        let limit: any = req?.query?.limit || 10;

        LogInfo(`Query Param: ${id}`);
        //Controller instance to execute method
        const controller: KatasController = new KatasController();
        //Obtain Response
        const response: any = await controller.getKatas(page, limit, id);
        //Send to the client teh response
        return res.status(200).send(response);
    })
    //  DELETE: 
    .delete(verifyToken, async (req: Request, res: Response) => {
        // Obtain a Query Param
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        //Controller instance to execute method
        const controller: KatasController = new KatasController();
        //Obtain Response
        const response: any = await controller.deleteKata(id);
        //Send to the client teh response
        return res.status(200).send(response);
    })
    // Put
    .put(jsonParser,verifyToken, async (req: Request, res: Response) => {

        let id: any = req?.query?.id;
        
        //Read from body
        let name: string = req?.body?.name,
            description: string = req?.body?.description || '',
            level: KataLevel = req?.body?.level || KataLevel.BASIC,
            intents: number = req?.body?.intents || 0,
            stars: number = req?.body?.start || 0,
            creator: string = req?.body?.creator, 
            solution: string = req?.body?.solution || '',
            participant: string[] = req?.body?.participant || [];

        if (
            name &&
            description &&
            level &&
            intents >= 0 &&
            stars >= 0&&
            creator &&
            solution &&
            participant.length >= 0) {

                let kata: IKata = {
                    name,
                    description,
                    level,
                    intents,
                    stars,
                    creator, 
                    solution,
                    participant
                }
        
                //Controller instance to execute method
                const controller: KatasController = new KatasController();
                //Obtain Response
                const response: any = await controller.updateKata(kata, id);
                //Send to the client teh response
                return res.status(200).send(response);
            
        } else {
            return res.status(400).send({
                messge: '[ERROR] Updating kata. you nedd to send all attrs of kata '
            })
        }
        
    })
    // Create
    .post(jsonParser,verifyToken, async (req: Request, res: Response) => {

        //Read from body
        let name: string = req?.body?.name,
            description: string = req?.body?.description || 'Default description',
            level: KataLevel = req?.body?.level || KataLevel.BASIC,
            intents: number = req?.body?.intents || 0,
            stars: number = req?.body?.stars || 0,
            creator: string = req?.body?.creator, 
            solution: string = req?.body?.solution || 'Default Solutions',
            participant: string[] = req?.body?.participant || [];

            let katasend: IKata = {
                name,
                description,
                level,
                intents,
                stars,
                creator, 
                solution,
                participant
            }

            console.log(katasend)

        if (
            name &&
            description &&
            level &&
            intents >= 0 &&
            stars >= 0&&
            creator &&
            solution &&
            participant.length >= 0) {

                let kata: IKata = {
                    name,
                    description,
                    level,
                    intents,
                    stars,
                    creator, 
                    solution,
                    participant
                }
        
                //Controller instance to execute method
                const controller: KatasController = new KatasController();
                //Obtain Response
                const response: any = await controller.createKata(kata);
                //Send to the client teh response
                return res.status(201).send(response);
            
        } else {
            return res.status(400).send({
                messge: '[ERROR] creating kata. you need to send all attrs of kata '
            })
        }
        
    })

export default katasRouter;