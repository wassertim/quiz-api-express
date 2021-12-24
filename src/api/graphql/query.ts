import { getQuizStatistics } from "../quiz-statistics/graphql/quizStatistics.resolver";

export const Query = {
    getQuizStatistics,
    all: () => {
        return [];
    },
};