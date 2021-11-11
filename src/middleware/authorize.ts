import { NextFunction, Request, Response } from "express";
import { constants } from "http2";
import { User } from "../model";

export const withAuthorization = (req: Request, res: Response, next: NextFunction) => {
    if ((<User>req.user).login !== (req as any).baseUrlParams.login) {
        return res.status(constants.HTTP_STATUS_UNAUTHORIZED).send("You are not authorized to modify this resource");
    }
    return next();
};