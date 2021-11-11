import { Request, Response } from "express";
import { createUser, validateUser } from "./user.service";
import { constants } from "http2";
import { User } from "../../model/user.model";
import { mapToStatusCode } from "../../errors/error.mapper";

export async function register(req: Request<unknown, unknown, User>, res: Response<User | string>) {
    return (await createUser(req.body))
        .map((user) => res.status(constants.HTTP_STATUS_CREATED).send(user))
        .mapErr((err) => res.status(mapToStatusCode(err.code)).send(err.message))
        .unwrapOr(() => res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send("Unknown Error"));
}

export async function login(req: Request, res: Response) {
    return (await validateUser(req.body))
        .map((token) => res.status(constants.HTTP_STATUS_OK).send(token))
        .mapErr((err) => res.status(mapToStatusCode(err.code)).send(err.message))
        .unwrapOr(() => res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send("Unknown Error"));
}
