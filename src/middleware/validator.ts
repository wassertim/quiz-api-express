import { NextFunction, Request, Response } from "express";
import { constants } from "http2";
import Joi from "joi";

export const getValidator = <T>(schema: Joi.ObjectSchema<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(constants.HTTP_STATUS_BAD_REQUEST).send(validationResult.error.message);
        }
        req.body = validationResult.value;
    
        return next();
    };
};