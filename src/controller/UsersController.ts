import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IUserController } from "./interfaces";
import { LogSuccess, LogWarning } from "../utils/logger";

// ORM
import { getAllUsers, getUserByID, deleteUserById, createUser, updateUserById } from "../domain/orm/User.orm";


@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {
    
    
    /**
     * Endpoint to retrive the users in the collection "Users" of DB
     * @param { string | undefined } id Id of user to retreive (optional)
     * @returns All users or user found by id
     */
    @Get("/")
    public async getUsers(@Query()page: number, @Query()limit:number,@Query()id?: string): Promise<any> {
        let response: any = '';

        if (id) {
            LogSuccess(`[/api/users?id=] Get user by ID: ${id}`)
            response = await getUserByID(id);
        } else {
            LogSuccess('[/api/users] Get all users Request')
            response = await getAllUsers(page, limit);
        }

        return response;
    }
    /**
     * Endpoint to delete user by id
     * @param { string } id Id of user to delete (optional)
     * @returns message informing if delteing was correct
     */
    @Delete("/")
    public async deleteUser(@Query()id?: string): Promise<any> {
        let response: any = '';

        if (id) {
            LogSuccess(`[/api/users?id=] DELETE user by ID: ${id}`)
            await deleteUserById(id).then((r) => {
                response = {
                    message: `User with id ${id} deleted successfully`
                }
            });
        } else {
            LogWarning('[/api/users] Delte user Request WITHOUT ID')
            response = {
                message: `Please, provide an Id to remove from database`
            }
        }

        return response;
    }

    /**
     * 
     * @param {user} user 
     * @param {string} id 
     */
    @Put("/")
    public async updateUser(@Query()user: any, @Query()id: string): Promise<any> {
        let response: any = '';
        if (id) {
            LogSuccess(`[/api/users?id=] UPDATE user by ID: ${id}`)
            await updateUserById(user,id).then((r) => {
                response = {
                    message: `User with id ${id} updating successfully`
                }
            });
        } else {
            LogWarning('[/api/users] Update user Request WITHOUT ID')
            response = {
                message: `Please, provide an Id to Uptade in the database`
            }
        }

        return response;
    }


}