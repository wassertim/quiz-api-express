import { Quiz } from "../../src/model";

export const testQuiz = {
    questions: [
        {
            questionText: "what is the answer to life the universe and everything",
            questionScore: 5,
            answers: [
                {
                    text: "42",
                    isCorrect: true,
                },
                {
                    text: "41",
                    isCorrect: false,
                },
            ],
        },
    ],
} as Quiz;