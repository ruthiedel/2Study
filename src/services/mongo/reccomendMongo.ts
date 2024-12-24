import { User, Book } from "../../types";
import { MongoClient } from 'mongodb';
import { connectDatabase } from "./mongoConection";

type BookWithoutCoverImage = Omit<Book, 'coverImage'>; 

function calculateSimilarity(userA: User, userB: User): number {
  const booksA = userA.books?.map(book => ({ book_id: book.book_id, rate: book.rate })) || [];
  const booksB = userB.books?.map(book => ({ book_id: book.book_id, rate: book.rate })) || [];

  const commonBooks = booksA.filter(bookA => booksB.some(bookB => bookA.book_id === bookB.book_id));

  if (commonBooks.length === 0) return 0;

  const sumSimilarity = commonBooks.reduce((sum, bookA) => {
    const bookB = booksB.find(book => book.book_id === bookA.book_id)!;
    return sum + Math.abs(bookA.rate - bookB.rate);
  }, 0);

  return 1 / (1 + sumSimilarity);
}

async function getAllUsers(client: MongoClient): Promise<User[]> {
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

export async function recommend(client: MongoClient, userId: string, books: BookWithoutCoverImage[]) {
  const users = await getAllUsers(client);
  const currentUser = users.find(user => user._id === userId);
  
  if (!currentUser) {
    return books
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 2)
      .map(book => book._id!);
  }
  let recommendations = getRecommendations(currentUser, users);

  recommendations = recommendations.filter(bookId =>
    books.some(book => book._id === bookId)
  );

  if (currentUser.books.length >= books.length - 1) {
    recommendations = books
      .filter(book => !currentUser.books.some(b => b.book_id === book._id))
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 2)
      .map(book => book._id!);
  }

  if (recommendations.length < 2) {
    const additionalBooks = books
      .filter(book => 
        !recommendations.includes(book._id!) && 
        !currentUser.books.some(b => b.book_id === book._id)
      )
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 2 - recommendations.length)
      .map(book => book._id!);

    recommendations = [...recommendations, ...additionalBooks];
  }

  return recommendations.slice(0, 2);
}
