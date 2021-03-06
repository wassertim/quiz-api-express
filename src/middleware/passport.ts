import { BasicVerifyFunction } from "passport-http";
import { validateUser } from "../api/user/user.service";
import passport from "passport";

export const verify: BasicVerifyFunction = async (login, password, done) => {
    const user = { login, password };

    return (await validateUser(user))
        .map(() => done(null, user))
        .mapErr(() => done(null, false))
        .unwrapOr(() => done(null, false));
};

export const withAuthentication = passport.authenticate("basic", { session: false });
