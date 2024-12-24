import { MongoClient } from "mongodb";



export async function getPasswordByEmail(client: MongoClient, email: string, newHashedPassword: string): Promise<{status: number, message: string}> {
  const db = client.db('Books');
  const usersCollection = db.collection('users');
  
  const user = await usersCollection.findOne({ email });
  if (!user) {
    return { status: 404, message: 'לא נמצא משתמש עם המייל הזה' };
  }

  await usersCollection.updateOne(
    { email },
    { $set: { password: newHashedPassword } }
  );

  return { status: 200, message: 'הסיסמה עודכנה בהצלחה' };
}
