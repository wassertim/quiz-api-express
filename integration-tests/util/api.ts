import request from "supertest";
import { app } from "../../src/app";
import { Quiz, QuizSubmission } from "../../src/model";
import { User } from "../../src/model/user.model";

export async function registerUser(user: User) {
    await request(app).post("/users/register").send(user);
}

export async function login(user: User) {
    return (await request(app).post("/users/login").send(user)).body;
}

export async function createQuiz(login: string, token: string, quiz: Quiz) {
    const response = await request(app).post(`/profiles/${login}/quizzes`).set({ Authorization: token }).send(quiz);

    return response.body as Quiz;
}

export async function submitQuiz(quizSubmission: QuizSubmission) {
    const response = await request(app).post("/quiz-submissions").send(quizSubmission);

    return response.body;
}
