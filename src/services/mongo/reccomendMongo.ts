import { User, Book } from "../../types";
import { MongoClient} from 'mongodb';

type BookWithoutCoverImage = Omit<Book, 'coverImage'>; 

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

export async function connectDatabase() {
  if (!client) {
    const dbConnectionString = process.env.PUBLIC_DB_CONNECTION;
    if (!dbConnectionString) {
      throw new Error('Database connection string is not defined');
    }
    client = new MongoClient(dbConnectionString);
    clientPromise = client.connect();
  }
  return clientPromise;
}

function calculateSimilarity(userA: User, userB: User): number {
  const booksA = userA.books.map(book => ({ book_id: book.book_id, rate: book.rate }));
  const booksB = userB.books.map(book => ({ book_id: book.book_id, rate: book.rate }));

  const commonBooks = booksA.filter(bookA => booksB.some(bookB => bookA.book_id === bookB.book_id));

  if (commonBooks.length === 0) return 0;

  const sumSimilarity = commonBooks.reduce((sum, bookA) => {
    const bookB = booksB.find(book => book.book_id === bookA.book_id)!;
    return sum + Math.abs(bookA.rate - bookB.rate);
  }, 0);

  return 1 / (1 + sumSimilarity);
}

async function getAllUsers(): Promise<User[]> {
  const client = await connectDatabase();
  const db = client.db('Books');
  const usersCollection = db.collection('users');

  const users = await usersCollection.find({}).toArray();
  return users.map(user => ({
    ...user,
    _id: user._id.toString(),
  })) as User[];
}

function getRecommendations(
  currentUser: User,
  allUsers: User[],
  books: BookWithoutCoverImage[]
): string[] {
  const userSimilarity = allUsers
    .filter(user => user._id !== currentUser._id)
    .map(user => ({
      user,
      similarity: calculateSimilarity(currentUser, user),
    }))
    .sort((a, b) => b.similarity - a.similarity);

  const topUsers = userSimilarity.slice(0, 5);

  const recommendedBooks = topUsers.flatMap(({ user }) =>
    user.books
      .filter(book => !currentUser.books.some(b => b.book_id === book.book_id))
      .map(book => book.book_id)
  );

  return Array.from(new Set(recommendedBooks));
}

export async function recommend(userId: string, books: BookWithoutCoverImage[]) {
  const users = await getAllUsers();
  const currentUser = users.find(user => user._id === userId);
  if (!currentUser) return [];

  let recommendations = getRecommendations(currentUser, users, books);

  if (recommendations.length === 0) {
    recommendations = books
    .filter(book => !currentUser.books.some(b => b.book_id === book._id))
    .sort((a, b) => (b.rating || 0) - (a.rating || 0)) 
    .map(book => book._id) 
    .filter((id): id is string => id !== undefined);
  }

  if (recommendations.length === 1) {
      const highestRatedBook = books
      .filter(book => !currentUser.books.some(b => b.book_id === book._id) && !recommendations.includes(book._id!)) 
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))[0]; 

    if (highestRatedBook && highestRatedBook._id) {
      recommendations.push(highestRatedBook._id); 
    }
  }

  if(recommendations.length >=2)
     return recommendations.slice(0, 2);

  return recommendations
}