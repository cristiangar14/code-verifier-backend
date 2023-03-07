import { Get, Query, Route, Tags } from "tsoa";
import { GoodbyeResponse } from "./types";
import { IGoodbyeController } from "./interfaces";
import { LogSuccess } from "../utils/logger";

@Route("/api/goodbye")
@Tags("GoodbyeController")
export class GoodbyeController implements IGoodbyeController {
    /**
     * Endpoint to retreive a Message "Goodbye {name} " in JSON
     * @param { string | undefined } name Name of user to be  greeated
     * @returns { GoodbyeResponse } Promise of GoodbyeResponse
     */
    @Get("/")
    public async getMessage(@Query()name?: string): Promise<GoodbyeResponse> {
        LogSuccess('[api/goodbye] Get Request')

        return {
            message: `Goodbye ${name || 'Anonimos'}`,
            Date: new Date()
        }
    }
}