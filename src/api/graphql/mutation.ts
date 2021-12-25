import { createQuizResolver, editQuizResolver } from "../quiz/graphql/quiz.resolver";
import { createQuizSubmission } from "../quiz-submission/graphql/quizsubmission.resolver";

export const Mutation = {
    createQuiz: createQuizResolver,
    editQuiz: editQuizResolver,
    createQuizSubmission,
};
