import { createUser } from "../../../api/user/user.service";
import { err, ok } from "neverthrow";
import { ApiError, ServiceError } from "../../../errors/errors";
import { User } from "@prisma/client";
import { prisma } from "../../db";
import { mocked } from "ts-jest/utils";

jest.mock("bcrypt");

describe("User Service Create User", () => {
    const mockedPrisma = mocked(prisma);
    const mockedUser = mocked(mockedPrisma.user);
    test("Should return ok when normal flow", async () => {
        const user = { login: "laura", password: "mypassword" } as User;        
        
        mockedUser.findFirst = jest.fn().mockImplementation(() => undefined);
        mockedUser.create = jest.fn().mockImplementation(() => user);

        const result = await createUser(user);

        expect(mockedUser.findFirst).toBeCalledWith({ where: { login: user.login }});
        expect(result).toStrictEqual(ok(user));
    });
    test("Should return err when user found", async () => {
        const user = { login: "laura", password: "mypassword" } as User;        
        mockedUser.findFirst = jest.fn().mockImplementation(() => ({}));
        const errObj = {
            code: ApiError.ENTITY_EXISTS,
            message: "User with login laura already exists",
        } as ServiceError;

        const result = await createUser(user);

        expect(mockedUser.findFirst).toBeCalledWith({ where: { login: user.login }});
        expect(result).toStrictEqual(err(errObj));
    });
});
