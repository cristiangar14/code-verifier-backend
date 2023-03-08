import { BasicResponse, GoodbyeResponse } from "../types";

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>;
}

export interface IGoodbyeController {
    getMessage(name?:string): Promise<GoodbyeResponse>;
}

export interface IUserController {
    //Read all users from database || get user by id
    getUsers(id?: string): Promise<any>
    // Delete user by id
    deleteUser(id?: string): Promise<any>
    // Create new user
    createUser(user: any): Promise<any>
    // Update user
    updateUser(user: any, id:string): Promise<any>
}