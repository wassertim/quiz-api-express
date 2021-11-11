import { Answer } from "./answer.model";

export interface Question {
    id?: string;
    questionText: string;
    questionScore: number;
    answers: Array<Answer>;
}
