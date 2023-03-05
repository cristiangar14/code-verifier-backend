import { userEntity } from "../entities/User.entity";

import { LogSuccess, LogError } from "@/utils/logger";

//CRUD
/**
 * Method to obtain all user from collections "Users" is mongo Server
 */
export const GetAllUsers = async (): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();

        //Search all users
        return await userModel.find({isDelete: false});

    } catch (error) {
        LogError(`[ORM ERROR]: Getting all Users: ${error}`);
    }
}

// TODO: 
// - Get user by id
// - Get user by email
// - Delete user by id
// - Create new user
// - Update user by id