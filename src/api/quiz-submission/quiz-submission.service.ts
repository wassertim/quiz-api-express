import { err, ok } from "neverthrow";
import { QuizSubmissions } from "../../db";
import { QuizSubmission } from "../../model";
import { ApiError } from "../../errors/errors";

export async function insertQuizSubmission(quiz: QuizSubmission) {        
    try {        
        const result = await QuizSubmissions().insertOne({...quiz});

        return ok({ ...quiz, id: result.insertedId + "" } as QuizSubmission);
    } catch (e) {
        return err({ code: ApiError.UNKNOWN_ERROR, message: e + "" });
    }
}
