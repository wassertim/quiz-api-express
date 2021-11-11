import { Collection } from "mongodb";
import { mocked } from "ts-jest/utils";

export const getMockedCollection = <T>(collectionFunction: () => Collection<T>) => {
    const mockCollection = {
        findOne: jest.fn(),
        insertOne: jest.fn(),
    } as Partial<Collection>;
    mocked(collectionFunction, true).mockImplementation(<T>() => mockCollection as Collection<T>);

    return mockCollection;
};
