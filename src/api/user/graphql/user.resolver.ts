import {createUser, validateUser} from "../user.service";

export const registerUser = async (root: any, {user}: any) => {
    return (await createUser(user))
        .map((user) => user)
        .mapErr((err) => {
            throw new Error(err.message);
        })
        .unwrapOr(() => {
            throw new Error("Unknown Error");
        });
};

export const loginUser = async (root: any, {user}: any) => {
    return (await validateUser(user))
        .map((token) => {
            console.log(token);
            return token;
        })
        .mapErr((err) => {
            throw new Error(err.message);
        })
        .unwrapOr(() => {
            throw new Error("Unknown Error");
        });
};
