import { userEntity } from "../entities/User.entity";

import { LogSuccess, LogError } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";

// Enviroment variables
import dotenv from 'dotenv';

//BCRYPT for passwords
import bcrypt from "bcrypt";

// JWT
import jwt from "jsonwebtoken";
import { UsersResponse } from "../types/UsersResponse.type";

// Configuration of enviroment variables
dotenv.config();

// Obtain secret key to generate JWT
const secret = process.env.SECRETKEY || 'THISISMYSECRETTEXTFORJWT'

//CRUD
/**
 * Method to obtain all user from collections "Users" is mongo Server
 */
export const getAllUsers = async (page:number, limit: number): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();

        let response: any = {};
        
        //Search all users (using pagination)
        console.log(page, limit)
        await userModel.find()
            .select('name email age')
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((users: IUser[]) => {
                response.users = users;
            })
        
        // count total documents in collection "Users"
        await userModel.countDocuments().then((total: number) => {
            response!.totalPages = Math.ceil(total/limit);
            response!.currentPage = page;

        })

        LogSuccess("[ORM SUCCESS]: Getting all Users")
        return response;

    } catch (error) {
        LogError(`[ORM ERROR]: Getting all Users: ${error}`);
    }
}

// - Get user by id
export const getUserByID =async (id:string) : Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        //Search user by ID
        return await userModel.findById(id).select("name email age");

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

        let userFound: IUser | undefined = undefined;
        let token = undefined;

        // Checj is user exist by email
        await userModel.findOne({email:auth.email}).then( (user: IUser) => {
            userFound = user;
        }).catch((err) => {
            console.error('[ERROR AUTHENTICATION IN ORM]: Usr not found');
            throw new Error(`[ERROR AUTHENTICATION IN ORM]: Usr not found: ${err}`);
            
        })

        // Check if password is valid (compare with bcrypt)
        let validPassword = bcrypt.compareSync(auth.password, userFound!.password);

        if (!validPassword) {
            console.error('[ERROR AUTHENTICATION IN ORM]: Password not valid');
            throw new Error(`[ERROR AUTHENTICATION IN ORM]: Password not valid`);
        }

        // Generate our JWT
        token = jwt.sign({email: userFound!.email}, secret, {
            expiresIn: "2h"
        })

        return {
            user: userFound,
            token
        }
        
    } catch (error) {
        LogError(`[ORM ERROR]: logging User: ${error}`);
    }
    
}

// - Logout user
export const logoutUser =async (): Promise<any | undefined> => {
    // TODO: Not implemented
}

