import { QuizSubmissionResult } from "./quizSubmissionResult.model";

export interface QuizStatistics {
    quizId?: string;
    totalSubmissions: number;
    submissionsStat: QuizSubmissionResult[];
}
