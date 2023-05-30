import { json } from '@sveltejs/kit';
import clientPromise from '../../../lib/mongo';
import { ObjectId } from 'mongodb';

 
/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request }) {
  const { id } = await request.json();
  const dbConnection = await clientPromise;
 const db = dbConnection.db('expenses_tracking_db');
 console.log('my_id',id);
 const collection = db.collection('expenses');
 collection.deleteOne({_id: new ObjectId(id)});
 //let _res;
 try {
    
    //collection.deleteOne({ title: "Streaming Services" });
 } catch (e) {
    //print(e);
 }
  return json('deleted');
}