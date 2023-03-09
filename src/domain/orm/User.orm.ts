import { userEntity } from "../entities/User.entity";

import { LogSuccess, LogError } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";

//BCRYPT for passwords
import bcrypt from "bcrypt";

// JWT
import jwt from "jsonwebtoken";

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

// - register user
export const registerUser =async (user: IUser): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        // Create / insert new user
        return await userModel.create(user);
        
    } catch (error) {
        LogError(`[ORM ERROR]: Creating User: ${error}`);
    }
}


// - Login user
export const loginUser =async (auth: IAuth): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        // find user by id
        userModel.findOne({email:auth.email}, (err: any, user: IUser) => {
            if (err) {
                // TODO return ERROR --> ERROR While searching (500)
            }

            if (!user) {
                // TODO return ERROR --> ERROR USER NOT FOUND (404)
            }

            // Use Bcrypt to compare password
            let validPassword = bcrypt.compareSync(auth.password, user.password);

            if (!validPassword) {
                // TODO: -> NOT AUTHORIZED (401)
            }

            // create jwt
            // TODO: Secret must be in .env
            let token = jwt.sign({email: user.email}, 'SECRETWORD', {
                expiresIn: "2h"
            });

            return token;

        })
        
    } catch (error) {
        LogError(`[ORM ERROR]: logging User: ${error}`);
    }
    
}

// - Logout user
export const logoutUser =async (): Promise<any | undefined> => {
    // TODO: Not implemented
}

