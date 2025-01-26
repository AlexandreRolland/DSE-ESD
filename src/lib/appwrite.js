import { Client, Databases } from "appwrite";

const client = new Client();
const DB_ID = "67965a85000507c9d079";
const COLLECTION_ID = "67965a95000a144f2b08";

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("67965a0f00031a4ac301");

export const databases = new Databases(client);

export { client, DB_ID, COLLECTION_ID };
