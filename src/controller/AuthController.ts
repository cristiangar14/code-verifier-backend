import { Delete, Get, Post, Put, Query, Route, Tags, Body } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";


//ORM import 
import { registerUser, loginUser, logoutUser, getUserByID } from "../domain/orm/User.orm";
import { AuthResponse, ErrorResponse } from "./types";


@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {

    @Post("/register")
    public async registerUser(@Body()user: IUser): Promise<any> {
        let response: any = '';

        if (user) {
            LogSuccess(`[/api/auth/register] REGISTER new user: ${user.email}`)
            await registerUser(user).then((r) => {
                response = {
                    message: `User created successfully: ${user.name}`
                }
            });
        } else {
            LogWarning('[/api/auth/register] Register needs user entity')
            response = {
                message: `User not register: Please, provide an user to create one`
            }
        }

        return response;
    }


    @Post("/login")
    public async loginUser(@Body()auth: IAuth): Promise<any> {
        
        let response: AuthResponse | ErrorResponse| undefined;
        
        if (auth) {
            LogSuccess(`[/api/auth/login] logged in user: ${auth.email}`);

            let data = await loginUser(auth);
            response = {
                token: data.token,
                message: `Welcome, ${data.user.name}`
            }

        } else {
            LogWarning('[/api/auth/login] Login needs auth entity(email and password)')
            response = {
                message: `Please, provide email and password to login`,
                error: '[AUTH ERROR]: Email & password are needed'
            }
        }

        return response;
    }


    /**
     * Endpoint to retrive the users in the collection "Users" of DB
     * Middleware: Validate JWT
     * In header you must add the x-access-token with a valid token
     * @param { string } id Id of user to retreive (optional)
     * @returns All users or user found by id
     */
    @Get("/me")
    public async userData(@Query()id: string): Promise<any> {
        let response: any = '';

        if (id) {
            LogSuccess(`[/api/users?id=] Get user Data by ID: ${id}`)
            response = await getUserByID(id);
        }

        return response;
    }

    @Post("/logout")
    public async logoutUser(): Promise<any> {
        let response: any = '';
        // TODO: Close session of user
        throw new Error("Method not implemented.");
    }

}
