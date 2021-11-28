import { Answer, Question, Quiz } from "@prisma/client";
import request from "supertest";
import { app } from "../../src/app";
import { QuizSubmission } from "../../src/model";
import { User } from "../../src/model/user.model";

async function makePost<T extends object>(path: string, entity: T): Promise<T> {
    const response = await request(app).post(path).send(entity);

    return response.body;
}

export async function createQuiz(login: string, token: string, quiz: Quiz) {
    const response = await request(app).post(`/profiles/${login}/quizzes`).set({ Authorization: token }).send(quiz);
    
    return response.body as Quiz;
}

export const login = async (user: User) => {
    const response = await request(app).post("/users/login").send(user);

    return response.body;
};
export const createAnswer = (answer: Answer) => makePost("/answers", answer);
export const registerUser = (user: User) => makePost("/users/register", user);
export const submitQuiz = (quizSubmission: QuizSubmission) => makePost("/quiz-submissions", quizSubmission);
export const createQuestion = (question: Question) => makePost("/questions", question);
