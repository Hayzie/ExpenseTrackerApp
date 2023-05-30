import { json } from '@sveltejs/kit';
import clientPromise from '../../../lib/mongo';

export async function POST(event) {
 const dbConnection = await clientPromise;
 const db = dbConnection.db('expenses_tracking_db');
 const collection = db.collection('expenses');
 
 const {title, amount} = await event.request.json();
 console.log('new expense',title);
 
 let str = JSON.stringify({title:title, amount: amount, date: Date.now()});
 let _expense = JSON.parse(str)
 const db_expense = await collection.insertOne(_expense);
 console.log(db_expense);

return json(db_expense);
}