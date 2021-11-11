import { QuestionAndAnswers } from "./questionAndAnswers.model";

export interface QuizSubmission {
    id?: string;
    quizId?: string;
    questionsAndAnswers: QuestionAndAnswers[];
}
