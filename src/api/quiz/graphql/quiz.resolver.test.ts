import {createQuizResolver} from '../graphql/quiz.resolver';
import {editQuizResolver} from '../graphql/quiz.resolver';
import {createQuiz, editQuiz} from '../quiz.service';
import {mocked} from "ts-jest/utils";
import {err, ok} from "neverthrow";
import {ApiError} from "../../../errors/errors";
import {Quiz} from "../../../model";

jest.mock('../quiz.service');

describe('createQuizResolver', () => {
    it('should return quiz when quiz was created', async () => {
        const root = {};
        const quiz = {
            questions: [
                {
                    questionText: "what is the answer to life the universe and everything",
                    questionScore: 5,
                    answers: [
                        {
                            text: "42",
                            isCorrect: true,
                        },
                        {
                            text: "41",
                            isCorrect: false,
                        },
                    ],
                },
            ],
        };
        const mockedCreateQuiz = mocked(createQuiz, true);
        mockedCreateQuiz.mockResolvedValue(ok(quiz));
        
        const result = await createQuizResolver(root, quiz);

        expect(result).toBe(quiz);
    });
    it('should trow error Some validation error', async () => {
        const root = null;
        const quiz = {};
        const mockedCreateQuiz = mocked(createQuiz, true);
        mockedCreateQuiz.mockResolvedValue(
            err({code: ApiError.VALIDATION_ERROR, message: 'Some validation error'})
        );

        await expect(createQuizResolver(root, quiz))
            .rejects
            .toMatchObject({message: 'Some validation error'});
    });
    it('should throw Unknown error', () => {
        const root = null;
        const quiz = {};
        const mockedCreateQuiz = mocked(createQuiz, true);
        mockedCreateQuiz.mockResolvedValue(
            err({code: ApiError.VALIDATION_ERROR, message: 'Unknown error'})
        );
        expect(createQuizResolver(root,quiz))
            .rejects
            .toMatchObject({message: 'Unknown error'});
    });
});

describe('editQuizResolver',  () => {
    it('should return new quiz after it was edit', async () => {
        const args = {
            id: 'id',
            quiz: {
                questions: [
                    {
                        questionText: "what is the answer to life the universe and everything",
                        questionScore: 5,
                        answers: [
                            {
                                text: "42",
                                isCorrect: true,
                            },
                            {
                                text: "41",
                                isCorrect: false,
                            },
                        ],
                    },
                ],
            } as Quiz,
        };
        const mockedEditQuiz = mocked(editQuiz, true);
        mockedEditQuiz.mockResolvedValue(ok(args.quiz));

        const editedQuiz = await editQuizResolver(null, args.quiz);

        expect(editedQuiz).toBe(args.quiz);
    });
});
