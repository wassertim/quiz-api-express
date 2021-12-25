import { createQuiz, editQuiz } from "../quiz.service";

const createQuizResolver = async (root: any, { quiz }: any) => {
    return (await createQuiz(quiz))
        .map((quiz) => quiz)
        .mapErr((err) => {
            throw new Error(err.message);
        })
        .unwrapOr(() => {
            throw new Error("Unknown error");
        });
};

const editQuizResolver = async (root: any, args: any) => {
    return (await editQuiz(args._id, args.quiz))
    .map((quiz) => quiz)
    .mapErr((err) => {
        throw new Error(err.message);
    })
    .unwrapOr(() => {
        throw new Error("Unknown Error");
    });
};


export default {
    Mutation: {
        createQuiz: createQuizResolver,
        editQuiz: editQuizResolver
    },
    Query: {
        all: () => { return []; }
    }
};
