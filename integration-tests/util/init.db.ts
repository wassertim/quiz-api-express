import { Db, MongoClient } from "mongodb";
import { mongoConnect } from "../../src/db";

async function deleteCollections(db: Db) {
    const collectionsToDelete = (await db.collections()).filter((c) => !c.collectionName.includes("system."));
    for (let i = 0; i < collectionsToDelete.length; i++) {
        await collectionsToDelete[i].deleteMany({});
    }
}

export function initDatabase() {
    let mongoClient: MongoClient;
    let db: Db;
    beforeAll(async () => {
        const { _db, client } = await mongoConnect();
        mongoClient = client;
        db = _db;
    });
    beforeEach(async () => {
        await deleteCollections(db);
    });
    afterAll(async () => {
        try {
            await mongoClient.close();
        } catch (e) {
            console.log(e);
        }
    });
}

export function cleanUpDatabase() {    
    beforeEach(async () => {
        const { _db, client } = await mongoConnect();            
        await deleteCollections(_db);
        try {
            await client.close();
        } catch (e) {
            console.log(e);
        }
    });
}
