import { MongoClient, Db } from "mongodb";
import { Quiz, QuizSubmission, User } from "./model";
import { config } from "dotenv";
config();

let _db: Db;
const uri = `mongodb://${process.env.MONGO_HOST}:27017/quiz`;

export const mongoConnect = async () => {
    const client = await MongoClient.connect(uri);
    _db = client.db("quiz");
    await _db.collection("users").createIndex({ login: 1 }, { unique: true });
    await _db.collection("quizzes").createIndex({ createdBy: 1 }, { unique: false });

    return { _db, client };
};

export const getDB = () => {
    if (_db) {
        return _db;
    } else {
        throw new Error("DB connect failed");
    }
};

export const Users = () => getDB().collection<User>("users");
export const Quizzes = () => getDB().collection<Quiz>("quizzes");
export const QuizSubmissions = () => getDB().collection<QuizSubmission>("quiz-submissions");
