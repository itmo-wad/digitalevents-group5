import { MongoClient } from 'mongodb'

async function initialize(){

	const mongoClient = new MongoClient("mongodb://localhost:27017/"	, { useUnifiedTopology: true });

	const client = await mongoClient.connect();

	return client.db(process.env.DB_NAME)
}

let db
export default async function getDB(collection){
	if(!db)
		db = await initialize()

	if(collection)
		return db.collection(collection);
	else
		return db;
}
