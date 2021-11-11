import { Question, QuestionResult, Quiz, QuizStatistics, QuizSubmission, QuizSubmissionResult } from "../../model";

function equalsIgnoreOrder(a: number[], b: number[]) {
    if (a.length !== b.length) return false;
    const uniqueValues = new Set([...a, ...b]);
    let result = true;
    uniqueValues.forEach((v) => {
        const aCount = a.filter((e) => e === v).length;
        const bCount = b.filter((e) => e === v).length;
        if (aCount !== bCount) {
            result = false;
        }
    });
    return result;
};

function getCorrectIndicies(quizQuestion: Question) {
    return quizQuestion.answers?.filter((a) => a.isCorrect).map((a, i) => i);
}

export function buildStatistics(quiz: Quiz, submissions: QuizSubmission[]): QuizStatistics {
    const submissionsStat = submissions.map((quizSubmission) => {
        const questionsAndAnswers = quiz.questions.map((quizQuestion, index) => {
            const qa = quizSubmission.questionsAndAnswers?.find((qa) => qa.questionIndex === index);
            const isCorrect = !!qa && equalsIgnoreOrder(qa.answerIndicies!, getCorrectIndicies(quizQuestion)!);
            const completed = !!qa;
            const questionResult: QuestionResult = {
                questionIndex: index,
                questionText: quizQuestion.questionText,
                isCorrect,
                completed,
                score: isCorrect ? quizQuestion.questionScore : 0,
            };

            return questionResult;
        });
        const quizSubmissionResult: QuizSubmissionResult = {
            id: quizSubmission.id!,
            totalQuestionsInQuiz: quiz.questions?.length,
            totalCompletedQuestions: quizSubmission.questionsAndAnswers.length,
            questionsAndAnswers,
            scoreTotal: questionsAndAnswers?.reduce((acc, e) => e.score! + acc, 0),
            correctAnswersCount: questionsAndAnswers?.reduce((acc, e) => (e.isCorrect ? acc + 1 : acc), 0),
        };

        return quizSubmissionResult;
    });

    return {
        quizId: quiz.id,
        totalSubmissions: submissionsStat.length,
        submissionsStat: submissionsStat,
    };
}