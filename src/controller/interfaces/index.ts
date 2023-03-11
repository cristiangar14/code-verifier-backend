import { IKata } from "../../domain/interfaces/Ikata.interface";
import { IUser } from "../../domain/interfaces/IUser.interface";
import { BasicResponse, GoodbyeResponse } from "../types";

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>;
}

export interface IGoodbyeController {
    getMessage(name?:string): Promise<GoodbyeResponse>;
}

export interface IUserController {
    //Read all users from database || get user by id
    getUsers(page: number, limit:number, id?: string): Promise<any>
    // Get Katas of user
    getKatas(page: number, limit:number, id: string): Promise<any>
    // Delete user by id
    deleteUser(id?: string): Promise<any>
    // Update user
    updateUser(user: any, id:string): Promise<any>
}

export interface IAuthController {
    // Register User
    registerUser(user: IUser): Promise<any>
    // Login user
    loginUser(auth:any): Promise<any>
}

export interface IKataController {
    //Create new kata
    createKata(kata: IKata): Promise<any>
    //Read all katas from database || get kata by id
    getKatas(page: number, limit:number, id?: string): Promise<any>
    // Update kata
    updateKata(kata: IKata, id:string): Promise<any>
    // Delete kata by id
    deleteKata(id?: string): Promise<any>
}