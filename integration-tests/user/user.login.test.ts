import { constants } from "http2";
import { app } from "../../src/app";
import { registerUser } from "../util/api";
import { initDatabase } from "../util/init.db";
import request from "supertest";

describe("Login User API", () => {
    initDatabase();
    const user = { login: "laura", password: "mypassword" };
    beforeEach(() => {
        return registerUser(user);
    });
    test("Should login user", async () => {
        const response = await request(app).post("/users/login").send(user);

        expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
        expect(response.body).toHaveProperty("basicAuth", "Basic bGF1cmE6bXlwYXNzd29yZA==");
        expect(response.body).toHaveProperty("login", "laura");
    });
    test("Should return BAD_REQUEST when invalid user", async () => {
        const response = await request(app).post("/users/login").send({ login: "laura" });

        expect(response.statusCode).toBe(constants.HTTP_STATUS_BAD_REQUEST);
        expect(response.text).toBe('"password" is required');
    });
    test("Should return UNAUTHORIZED when password is wrong", async () => {
        const { login } = user;
        const response = await request(app).post("/users/login").send({ login, password: "wrong" });

        expect(response.statusCode).toBe(constants.HTTP_STATUS_UNAUTHORIZED);
        expect(response.text).toBe("Username or password are incorrect");
    });
});
