import { Quiz, QuizSubmission } from "../../../model";
import { buildStatistics } from "../quiz-statistics.reducer";

const quiz: Quiz = {
    id: "asdf",
    questions: [
        {
            questionScore: 5,
            questionText: "Yes?",
            answers: [
                {
                    isCorrect: true,
                    text: "yes",
                },
                {
                    isCorrect: false,
                    text: "no",
                },
            ],
        },
        {
            questionScore: 2,
            questionText: "Question 2",
            answers: [
                {
                    isCorrect: true,
                    text: "yes",
                },
                {
                    isCorrect: false,
                    text: "no",
                },
            ],
        },
    ],
};

const qs: QuizSubmission = {
    quizId: "asdf",
    questionsAndAnswers: [
        {
            questionIndex: 0,
            answerIndicies: [0],
        },
        {
            questionIndex: 1,
            answerIndicies: [2],
        },
    ],
};

describe("Statistics", () => {
    test("should map", () => {
        const stat = buildStatistics(quiz, [qs]);

        expect(stat).toStrictEqual({
            quizId: "asdf",
            submissionsStat: [
                {
                    correctAnswersCount: 1,
                    id: undefined,
                    questionsAndAnswers: [
                        {
                            completed: true,
                            isCorrect: true,
                            questionIndex: 0,
                            questionText: "Yes?",
                            score: 5,
                        },
                        {
                            completed: true,
                            isCorrect: false,
                            questionIndex: 1,
                            questionText: "Question 2",
                            score: 0,
                        },
                    ],
                    scoreTotal: 5,
                    totalCompletedQuestions: 2,
                    totalQuestionsInQuiz: 2,
                },
            ],
            totalSubmissions: 1,
        });
    });
});
