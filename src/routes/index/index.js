import clientPromise from '../../lib/mongo';

export async function post ({request}) {
 const dbConnection = await clientPromise;
 const db = dbConnection.db('expenses_tracking_db');
 const collection = db.collection('expenses');
 let apothegm = await request.json();
 const dbApothegm = await collection.insertOne(apothegm);
 return { status: 200, body: { dbApothegm } }
}