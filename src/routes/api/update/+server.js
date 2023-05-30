import { json } from '@sveltejs/kit';
import clientPromise from '../../../lib/mongo';
import { ObjectId } from 'mongodb';



 
/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }) {
  const { id, title, amount } = await request.json();
  const dbConnection = await clientPromise;
  const db = dbConnection.db('expenses_tracking_db');
  const collection = db.collection('expenses');
  console.log({id,amount,title});
  console.log('id',id);

  try{
     collection.updateOne(
    { _id:new ObjectId(id) },
    
      [ { $set: { 'title':title,'amount':amount } }]
      
    
   )
  } catch (e) {
    console.log(e);
 }
 
  return json('updated');
}