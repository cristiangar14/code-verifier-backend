import { IKataController } from "./interfaces";
import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { LogSuccess, LogWarning } from "../utils/logger";

// ORM
import { getAllKatas, getKataByID, createKata,deleteKataById, updateKataById } from "../domain/orm/Kata.orm";
import { IKata } from "../domain/interfaces/Ikata.interface";


@Route("/api/katas")
@Tags("KatasController")
export class KatasController implements IKataController {
    
   /**
     * Endpoint to retrive the katas in the collection "Katas" of DB
     * @param { number } page
     * @param { number } limit
     * @param { string | undefined } id Id of kata to retreive (optional)
     * @returns All katas or kata found by id
     */
   @Get("/")
   public async getKatas(@Query()page: number, @Query()limit:number,@Query()id?: string): Promise<any> {
       let response: any = '';

       if (id) {
           LogSuccess(`[/api/katas?id=] Get kata by ID: ${id}`)
           response = await getKataByID(id);
       } else {
           LogSuccess('[/api/katas] Get all katas Request')
           response = await getAllKatas(page, limit);
       }

       return response;
   }

   /**
     * Endpoint to delete Kata by id
     * @param { string } id Id of kata to delete (optional)
     * @returns message informing if delteing was correct
     */
   @Delete("/")
   public async deleteKata(@Query()id?: string): Promise<any> {
       let response: any = '';

       if (id) {
           LogSuccess(`[/api/katas?id=] DELETE kata by ID: ${id}`)
           await deleteKataById(id).then((r) => {
               response = {
                   message: `Kata with id ${id} deleted successfully`
               }
           });
       } else {
           LogWarning('[/api/katas] Delte kata Request WITHOUT ID')
           response = {
               message: `Please, provide an Id to remove from database`
           }
       }

       return response;
   }

   /**
     * Endpoint to update kata by id
     * @param {kata} user 
     * @param {string} id 
     */
   @Put("/")
   public async updateKata(@Query()kata: IKata, @Query()id: string): Promise<any> {
       let response: any = '';
       if (id) {
           LogSuccess(`[/api/katas?id=] UPDATE kata by ID: ${id}`)
           await updateKataById(kata,id).then((r) => {
               response = {
                   message: `Kata with id ${id} updating successfully`
               }
           });
       } else {
           LogWarning('[/api/katas] Update kata Request WITHOUT ID')
           response = {
               message: `Please, provide an Id to Uptade in the database`
           }
       }

       return response;
   }

   /**
    * Endpoint to create new kata
    * @param { IKata } kata 
    */
    @Post('/')
    public async createKata(kata: IKata): Promise<any> {
        let response: any = '';

        if (kata) {
            LogSuccess(`[/api/katas] Create new kata: ${kata.name}`)
            await createKata(kata).then((r) => {
                LogSuccess(`[/api/katas] Created kata: ${kata.name}`)
                response = {
                    message: `Kata created successfully: ${kata.name}`
                }
            });
        } else {
            LogWarning('[/api/katas] Register needs kata entity')
            response = {
                message: `Kata not register: Please, provide a kata entity to create one`
            }
        }
 
        return response;
    }

}