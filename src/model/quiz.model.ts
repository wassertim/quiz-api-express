import { Question } from "./question.model";

export interface Quiz {
    id?: string;
    createdBy?: string;
    questions: Array<Question>;
}
