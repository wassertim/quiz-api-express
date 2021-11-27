import { cleanUpDatabase } from "../util/init.db";
import { login, registerUser } from "../util/api";
import request from "supertest";
import { app } from "../../src/app";
import { constants } from "http2";

describe("Create Quiz API", () => {
    cleanUpDatabase();
    const user = { login: "laura", password: "mypassword" };
    beforeEach(() => {
        return registerUser(user);
    });
    test("Should create a quiz", async () => {
        const { basicAuth, id } = await login(user);        

        const quiz = {
            questionIds: ["619e9fa874959e2e053aec4e", "619e9fa874959e2e053aec4e"]            
        };

        const response = await request(app)
            .post(`/profiles/${user.login}/quizzes`)
            .set({ Authorization: basicAuth })
            .send(quiz);

        expect(response.statusCode).toBe(constants.HTTP_STATUS_CREATED);
        expect(response.body.userId).toBe(id);
    });
    test("Should give an error when invalid quiz", async () => {        
        const { basicAuth } = await login(user);
        const quiz = {
            questionIds: [],
            userId: "619e9fa874959e2e053aec4e",
        };

        const response = await request(app)
            .post(`/profiles/${user.login}/quizzes`)
            .set({ Authorization: basicAuth })
            .send(quiz);

        expect(response.statusCode).toBe(constants.HTTP_STATUS_BAD_REQUEST);
        expect(response.text).toBe('"questionIds" must contain at least 1 items');
    });
});
