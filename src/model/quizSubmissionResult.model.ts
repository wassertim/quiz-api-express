import { QuestionResult } from '.';

export interface QuizSubmissionResult { 
    id: string;    
    totalQuestionsInQuiz: number;
    totalCompletedQuestions: number;
    questionsAndAnswers: QuestionResult[];
    scoreTotal: number;
    correctAnswersCount: number;
}