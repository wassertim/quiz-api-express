import { Router } from "express";
import { getQuizStatistics } from "./quiz-statistics.controller";

export const quizStatisticsRoute = Router()
    .get("/:quizId", getQuizStatistics);
