/** @type {import('./$types').Actions} */
import clientPromise from '../../lib/mongo';

export const actions = {
    default: async ({request}) => {
      // TODO log the user in
console.log(request);
 const dbConnection = await clientPromise;
 const db = dbConnection.db('expenses_tracking_db');
 const collection = db.collection('expenses');
 
 const data = await request.formData();
 const title = data.get('title');
 const amount = data.get('amount');
    
 let str = JSON.stringify({title:title, amount: amount, date: Date.now()});
 let _expense = JSON.parse(str)
 const db_expense = await collection.insertOne(_expense);
 console.log(db_expense);
//  return JSON.parse({ status: 200, body: { dbApothegm } }) 
    }
  };

  import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const dbConnection = await clientPromise;
  const db = dbConnection.db('expenses_tracking_db');
  const collection = db.collection('expenses');
  const db_expense = await collection.find().toArray();
  const _expense = await JSON.parse(JSON.stringify(db_expense));
  if (db_expense) {
    let total;
    _expense.forEach(element => {
      total+= element.amount;

    });
    return {expenses: _expense,totExpenses:total};
  }
 
  throw error(404, 'Not found');
}

