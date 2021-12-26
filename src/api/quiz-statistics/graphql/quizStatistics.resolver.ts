import { findQuizStatistics } from "../quiz-statistics.service";

export const getQuizStatistics = async (root: any, args: any) => {
    return (await findQuizStatistics(args.quizId))
        .map((statistics) => statistics)
        .mapErr((err) => {
            throw new Error(err.message);
        })
        .unwrapOr(() => {
            throw new Error("Unknown error");
        });
};
