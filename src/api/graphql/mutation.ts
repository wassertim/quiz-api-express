import {createQuizResolver, editQuizResolver} from "../quiz/graphql/quiz.resolver";
import {createQuizSubmission} from "../quiz-submission/graphql/quizsubmission.resolver";
import {registerUser} from "../user/graphql/user.resolver";

export const Mutation = {
    createQuiz: createQuizResolver,
    editQuiz: editQuizResolver,
    createQuizSubmission,
    registerUser
};
