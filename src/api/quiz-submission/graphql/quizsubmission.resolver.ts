import {insertQuizSubmission} from '../quiz-submission.service';

export const createQuizSubmission = async (root: any, {quizSubmission}: any) => {
    return (await insertQuizSubmission(quizSubmission))
        .map((quizSubmission) => quizSubmission)
        .mapErr((err) => {
            throw new Error(err.message);
        })
        .unwrapOr(() => {
            throw new Error("Unknown Error");
        });
};