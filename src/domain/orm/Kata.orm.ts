import { kataEntity } from "../entities/Kata.entity"; 

import { LogSuccess, LogError } from "../../utils/logger";
import { IKata } from "../interfaces/Ikata.interface";

// Enviroment variables
import dotenv from 'dotenv';

// Configuration of enviroment variables
dotenv.config();

//CRUD
/**
 * Method to obtain all katas from collections "Katas" is mongo Server
 */
export const getAllKatas = async (page:number, limit: number): Promise<any[] | undefined> => {
    try {
        let kataModel = kataEntity();

        let response: any = {};
        
        //Search all katas (using pagination)
        console.log(page, limit)
        await kataModel.find()
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((katas: IKata[]) => {
                response.katas = katas;
            })
        
        // count total documents in collection "Katas"
        await kataModel.countDocuments().then((total: number) => {
            response!.totalPages = Math.ceil(total/limit);
            response!.currentPage = page;

        })

        LogSuccess("[ORM SUCCESS]: Getting all Katas")
        return response;

    } catch (error) {
        LogError(`[ORM ERROR]: Getting all Katas: ${error}`);
    }
}

// - Get kata by id
export const getKataByID =async (id:string) : Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();

        //Search kata by ID
        return await kataModel.findById(id);

    } catch (error) {
        LogError(`[ORM ERROR]: Getting Kata by id: ${error}`);
    }
}

// - Delete kata by id
export const deleteKataById = async (id: string): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();
        //Deleye kata by id
        return await kataModel.deleteOne({_id: id})
    } catch (error) {
        LogError(`[ORM ERROR]: Deleting Kata by id: ${error}`);
    }
}

// - Create new kata

export const createKata =async (kata: IKata): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();
        // Create / insert new kata
        return await kataModel.create(kata);
        
    } catch (error) {
        LogError(`[ORM ERROR]: Creating Kata: ${error}`);
    }
}

// - Update kata by id
export const updateKataById =async (kata: IKata, id: string): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();
        // Update kata
        return await kataModel.findByIdAndUpdate(id, kata);
    } catch (error) {
        LogError(`[ORM ERROR]: Updating Kata ${id}: ${error}`);
    }
}

