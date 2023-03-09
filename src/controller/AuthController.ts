import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";


//ORM import 
import { registerUser, loginUser, logoutUser } from "../domain/orm/User.orm";


@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {

    @Post("/register")
    public async registerUser(@Query()user: IUser): Promise<any> {
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
                message: `Please, provide an user to create one`
            }
        }

        return response;
    }


    @Post("/login")
    public async loginUser(@Query()auth: IAuth): Promise<any> {
        let response: any = '';
        
        if (auth) {
            LogSuccess(`[/api/auth/login] logged in user: ${auth.email}`)
            await loginUser(auth).then((r) => {
                LogSuccess(`[/api/auth/login] logged in user: ${auth.email}`)
                response = {
                    message: `User logged in successfully: ${auth.email}`,
                    token: r.token //JWT generated for logged in user
                }
            });
        } else {
            LogWarning('[/api/auth/login] Login needs auth entity(email and password)')
            response = {
                message: `Please, provide email and password to login`
            }
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
