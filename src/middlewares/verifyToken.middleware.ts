import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, response } from "express";

/**
 * 
 * @param { Request } req Original request previous middleware of verification JWT
 * @param { Response } res Response to verification of JWT
 * @param { NextFunction } next Next funtion to be execute
 * @returns Errorsof verification or next execution
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    //Check header from request for 'x-access-token'
    let token: any = req.headers['x-access-token'];

    //Verifi if jwtToken is present
    if (!token){
        return response.status(403).send({
            authenticationError: 'Missing JWT in request',
            message: 'Not authorized to consume this endpoint'
        })
    }

    // Verify th token obtain
    jwt.verify(token, '', (err:any, decode:any) => {
        if (err) {
            return response.status(500).send({
                authenticationError: 'JWT verification failed',
                message: 'Failed to verufy JWT token in request'
            })
        }
    })

    // Pass something to next request (id of user || other info)
    // Execute Next function -> Protected Eoutes will be execute
    next()

}
