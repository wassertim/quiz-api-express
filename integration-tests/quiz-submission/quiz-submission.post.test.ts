import { initDatabase } from "../util/init.db";
import { createQuiz, login, registerUser } from "../util/api";
import request from "supertest";
import { app } from "../../src/app";
import { constants } from "http2";
import { Operation } from "express-openapi-validate/dist/OpenApiDocument";
import { openapi } from "../util/openapi";
import { QuizSubmission } from "../../src/model";
import { testQuiz } from "../util/mock.data";

describe("Create Quiz API", () => {
    initDatabase();
    const user = { login: "laura", password: "mypassword" };
    beforeEach(() => {
        return registerUser(user);
    });
    test("Should submit a solved quiz", async () => {
        const [method, path] = ["post" as Operation, "/quiz-submissions"];
        const token = await login(user);
        const {id} = await createQuiz(user.login, token, testQuiz);

        const response = await request(app)[method](path)            
            .send({
                quizId: id,
                questionsAndAnswers: [{questionIndex: 0, answerIndicies: [0]}]                
            } as QuizSubmission);

        expect(openapi.validateResponse(method, path)(response)).toBeUndefined();
        expect(response.statusCode).toBe(constants.HTTP_STATUS_CREATED);        
    });
});
