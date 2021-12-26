import {loginUser} from "../user/graphql/user.resolver";
import {getQuizStatistics} from "../quiz-statistics/graphql/quizStatistics.resolver";

export const Query = {
    getQuizStatistics,
    loginUser,
    all: () => {
        return [];
    },
};
