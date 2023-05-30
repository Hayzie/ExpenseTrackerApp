import { json } from '@sveltejs/kit';
import clientPromise from '../../../lib/mongo';


 
/** @type {import('./$types').RequestHandler} */
export async function GET() {
   const dbConnection = await clientPromise;
   const db = dbConnection.db('expenses_tracking_db');
   const collection = db.collection('expenses');
   const db_expense = await collection.find().sort({_id:-1}).toArray();
   const _expense = await JSON.parse(JSON.stringify(db_expense));
   
   return json({expenses: _expense});
}