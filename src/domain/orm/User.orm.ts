import { userEntity } from "../entities/User.entity";

import { LogSuccess, LogError } from "../../utils/logger";

//CRUD
/**
 * Method to obtain all user from collections "Users" is mongo Server
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();

        //Search all users
        LogSuccess("[ORM SUCCESS]: Getting all Users")
        return await userModel.find();

    } catch (error) {
        LogError(`[ORM ERROR]: Getting all Users: ${error}`);
    }
}

// - Get user by id
export const getUserByID =async (id:string) : Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        //Search user by ID
        return await userModel.findById(id);

    } catch (error) {
        LogError(`[ORM ERROR]: Getting User by id: ${error}`);
    }
}
// - Delete user by id

export const deleteUserById = async (id: string): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        //Deleye user by id
        return await userModel.deleteOne({_id: id})
    } catch (error) {
        LogError(`[ORM ERROR]: Deleting User by id: ${error}`);
    }
}

// - Create new user

export const createUser =async (user: any): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        // Create / insert new user
        return await userModel.create(user);
        
    } catch (error) {
        LogError(`[ORM ERROR]: Creating User: ${error}`);
    }
}

// - Update user by id
export const updateUserById =async (user: any, id: string): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        // Update user
        return await userModel.findByIdAndUpdate(id, user);
    } catch (error) {
        LogError(`[ORM ERROR]: Updating User ${id}: ${error}`);
    }
}



// TODO: 
// - Get user by email