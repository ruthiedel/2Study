type section = {
    _id?: string;
    text: string;
    questions: string[];
}
type chapter = {
    _id?: string;
    sections: section[];
}
type message = {
    _id?: string;
    userId: string;
    userName: string;
    text: string;
    time: Date;
}
type learningGroupUser = {
    userId: string;
    userName: string;
}
export type book = {
    _id?: string;
    book_name: string;
    author: string;
    categories: string[];
    chapters: chapter[];
    coverImage: string;
    users: string;
    learningGroups: learningGroup;
}
type userBook = {
    book_id: string;
    chapter_id: string;
    section_id: string;
    rate: number;
}
 type learningGroup = {
    users: learningGroupUser[];
    message: message[];
}
export type User = {
    age?: number;
    userId: string;
    name: string;
    email: string;
    books: userBook[];
}







