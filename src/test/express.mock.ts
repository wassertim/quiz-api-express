import { Response } from "express";

export const mockResponse = () => {
    const response = {
        status: jest.fn().mockImplementation(() => {
            return response;
        }),
        send: jest.fn().mockImplementation(() => {
            return response;
        }),
        set: jest.fn().mockImplementation(() => {
            return response;
        }),
    } as Partial<Response>;

    return response;
};
