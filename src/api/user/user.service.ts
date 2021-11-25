import { err, ok, Result } from "neverthrow";
import { ApiError, ServiceError } from "../../errors/errors";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { prisma } from "../db";

const getHash = (password: string) => bcrypt.hash(password, 10);

export async function createUser(user: User): Promise<Result<User, ServiceError>> {
    const { login, password } = user;
    try {
        if (await prisma.user.findFirst({ where: { login } })) {
            return err({
                code: ApiError.ENTITY_EXISTS,
                message: `User with login ${login} already exists`,
            });
        }

        const user = await prisma.user.create({ data: { login, password: await getHash(password) } });

        return ok(user);
    } catch (e) {
        return err({ code: ApiError.UNKNOWN_ERROR, message: `${e}` });
    }
}

export function getToken(user: User) {
    const { login, password, id } = user;
    const token = Buffer.from(`${login}:${password}`).toString("base64");
    const basicAuth = `Basic ${token}`;

    return { basicAuth, login, id };
}

export async function validateUser({ login, password }: User): Promise<Result<User, ServiceError>> {
    try {
        const foundUser = await prisma.user.findFirst({ where: { login } });
        const unauthorizedMessage = "Username or password are incorrect";
        if (!foundUser) {
            return err({
                code: ApiError.UNAUTHORIZED,
                message: unauthorizedMessage,
            });
        }
        const isUserValid = await bcrypt.compare(password, foundUser.password);
        if (!isUserValid) {
            return err({
                code: ApiError.UNAUTHORIZED,
                message: unauthorizedMessage,
            });
        }

        return ok({ login, password, id: foundUser.id } as User);
    } catch (e) {
        return err({ code: ApiError.UNKNOWN_ERROR, message: `${e}` });
    }
}
