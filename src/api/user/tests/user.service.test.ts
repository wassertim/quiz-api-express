import { createUser } from "../../../api/user/user.service";
import { Users } from "../../../db";
import { err, ok } from "neverthrow";
import { getMockedCollection } from "../../../test/mongo.mock";
import { ApiError, ServiceError } from "../../../errors/errors";

jest.mock("bcrypt");
jest.mock("../../../db");

describe("User Service Create User", () => {
    test("Should return ok when normal flow", async () => {
        const user = { login: "laura", password: "mypassword" };
        const mockUserCollection = getMockedCollection(Users);
        mockUserCollection.findOne = jest.fn().mockImplementation(() => undefined);
        mockUserCollection.insertOne = jest.fn().mockImplementation(() => user);

        const result = await createUser(user);

        expect(mockUserCollection.findOne).toBeCalledWith({ login: user.login });
        expect(result).toStrictEqual(ok(user));
    });
    test("Should return err when user found", async () => {
        const user = { login: "laura", password: "mypassword" };
        const mockUserCollection = getMockedCollection(Users);
        mockUserCollection.findOne = jest.fn().mockImplementation(() => ({}));
        const errObj = {
            code: ApiError.ENTITY_EXISTS,
            message: "User with login laura already exists",
        } as ServiceError;

        const result = await createUser(user);

        expect(mockUserCollection.findOne).toBeCalledWith({ login: user.login });
        expect(result).toStrictEqual(err(errObj));
    });
});
