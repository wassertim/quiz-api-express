import { NextFunction } from "express";

export function loginParams(req: any, res: any, next: NextFunction) {
    req.baseUrlParams = { login: req.params.login };
    next();
}
