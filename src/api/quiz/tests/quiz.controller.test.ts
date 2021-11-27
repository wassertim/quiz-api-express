import { Request, Response } from "express";
import { err, ok } from "neverthrow";
import { mockResponse } from "../../../test/express.mock";
import { constants } from "http2";
import { mocked } from "ts-jest/utils";
import { postQuiz } from "../quiz.controller";
import { createQuiz } from "../quiz.service";
import { ApiError } from "../../../errors/errors";
import { Quiz } from "@prisma/client";

jest.mock("../../../api/quiz/quiz.service");

describe("Quiz API", () => {
    test("Should return created", async () => {
        const quiz = {} as Quiz;
        const req = { body: quiz, user: { login: "laura" } as any } as Request;
        const response = mockResponse();
        const mockedCreateQuiz = mocked(createQuiz, true);
        mockedCreateQuiz.mockResolvedValue(ok(quiz));

        await postQuiz(req, response as Response);

        expect(response.status).toBeCalledWith(constants.HTTP_STATUS_CREATED);
        expect(response.send).toBeCalledWith(quiz);
    });
    test("Should return bad request", async () => {
        const quiz = {};
        const req = { body: quiz, user: { login: "laura" } as any } as Request;
        const response = mockResponse();
        const mockedCreateQuiz = mocked(createQuiz, true);
        mockedCreateQuiz.mockResolvedValue(
            err({ code: ApiError.VALIDATION_ERROR, message: "Some validation error" })
        );

        await postQuiz(req, response as Response);

        expect(response.status).toBeCalledWith(constants.HTTP_STATUS_BAD_REQUEST);
        expect(response.send).toBeCalledWith("Some validation error");
    });
});
