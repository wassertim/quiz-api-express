import { Request, Response } from "express";
import { createUser, getToken, validateUser } from "./user.service";
import { constants } from "http2";
import { mapToStatusCode } from "../../errors/error.mapper";
import { User } from "@prisma/client";

export async function register(req: Request<unknown, unknown, User>, res: Response<User | string>) {
    return (await createUser(req.body))
        .map((user) => res.status(constants.HTTP_STATUS_CREATED).send(user))
        .mapErr((err) => res.status(mapToStatusCode(err.code)).send(err.message))
        .unwrapOr(() => res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send("Unknown Error"));
}

export async function login(req: Request, res: Response) {
    const user = await validateUser(req.body);    
    
    return user
        .map(getToken)
        .map((token) => res.status(constants.HTTP_STATUS_OK).send(token))
        .mapErr((err) => res.status(mapToStatusCode(err.code)).send(err.message))
        .unwrapOr(() => res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send("Unknown Error"));
}
