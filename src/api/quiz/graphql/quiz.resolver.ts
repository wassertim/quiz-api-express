import { createQuiz, editQuiz } from "../quiz.service";

export const createQuizResolver = async (root: any, { quiz }: any) => {
    return (await createQuiz(quiz))
        .map((quiz) => quiz)
        .mapErr((err) => {
            throw new Error(err.message);
        })
        .unwrapOr(() => {
            throw new Error("Unknown error");
        });
};

export const editQuizResolver = async (root: any, args: any) => {
    return (await editQuiz(args._id, args.quiz))
        .map((quiz) => quiz)
        .mapErr((err) => {
            throw new Error(err.message);
        })
        .unwrapOr(() => {
            throw new Error("Unknown Error");
        });
};
