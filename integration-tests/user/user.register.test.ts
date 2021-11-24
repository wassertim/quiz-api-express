import { app } from "../../src/app";
import request from "supertest";
import { constants } from "http2";
import { cleanUpDatabase } from "../util/init.db";
import { registerUser } from "../util/api";
import { Operation } from "express-openapi-validate/dist/OpenApiDocument";
import { openapi } from "../util/openapi";

describe("Register User API", () => {
    cleanUpDatabase();
    test("Should register a user", async () => {
        const [method, path] = ["post" as Operation, "/users/register"];

        const response = await request(app)[method](path).send({ login: "laura", password: "mypassword" });

        expect(openapi.validateResponse(method, path)(response)).toBeUndefined();
        expect(response.statusCode).toBe(constants.HTTP_STATUS_CREATED);
    });
    test("Should return an error when user exists", async () => {
        const [method, path] = ["post" as Operation, "/users/register"];

        const user = { login: "laura", password: "mypassword" };
        await registerUser(user);

        const response = await request(app)[method](path).send(user);

        expect(openapi.validateResponse(method, path)(response)).toBeUndefined();
        expect(response.statusCode).toBe(constants.HTTP_STATUS_BAD_REQUEST);
        expect(response.text).toBe("User with login laura already exists");
    });
});
