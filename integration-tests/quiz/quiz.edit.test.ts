import { Operation } from "express-openapi-validate/dist/OpenApiDocument";
import { createQuiz, login, registerUser } from "../util/api";
import { initDatabase } from "../util/init.db";
import request from "supertest";
import { app } from "../../src/app";
import { openapi } from "../util/openapi";
import { constants } from "http2";
import { Quiz } from "@prisma/client";

describe("Edit Quiz API", () => {
    initDatabase();
    const user = { login: "laura", password: "mypassword" };
    const anotherUser = { login: "tim", password: "mypassword" };
    beforeEach(async () => {
        await registerUser(user);
        await registerUser(anotherUser);
    });
    test("Should update a quiz", async () => {
        const { basicAuth } = await login(user);
        const originalQuiz = {
            questionIds: ["619e9fa874959e2e053aec4e", "619e9fa874959e2e053aec4e"],
        } as Quiz;
        const { id } = await createQuiz(user.login, basicAuth, originalQuiz);
        const updatedQuiz = {
            questionIds: ["619e9fa874959e2e053aec4e"],
        } as Quiz;

        const response = await request(app)
            .put(`/profiles/${user.login}/quizzes/${id}`)
            .set({ Authorization: basicAuth })
            .send(updatedQuiz);

        expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
        expect(response.body.questionIds.length).toBe(1);
    });
    test("Should allow edit only to creators of quiz", async () => {        
        const token = await login(user);
        const { basicAuth } = await login(anotherUser);

        const originalQuiz = {
            questionIds: ["619e9fa874959e2e053aec4e", "619e9fa874959e2e053aec4e"],
        } as Quiz;
        const { id } = await createQuiz(user.login, token, originalQuiz);
        const updatedQuiz = {
            questionIds: ["619e9fa874959e2e053aec4e"],
        } as Quiz;

        const response = await request(app)
            .put(`/profiles/${user.login}/quizzes/${id}`)
            .set({ Authorization: basicAuth })
            .send(updatedQuiz);
        
        expect(response.statusCode).toBe(constants.HTTP_STATUS_UNAUTHORIZED);
        expect(response.text).toBe("You are not authorized to modify this resource");
    });
});
