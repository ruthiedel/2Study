type Section = {
    _id?: string;
    text: string;
    questions: string[];
}
export type Chapter = {
    _id?: string;
    sections: Section[];
}
type Message = {
    _id?: string;
    userId: string;
    userName: string;
    text: string;
    time: Date;
}
type LearningGroupUser = {
    userId: string;
    userName: string;
}
export type Book = {
    _id?: string;
    book_name: string;
    author: string;
    categories: string[];
    chapters: Chapter[];
    coverImage: Blob;
    users?: string;
    learningGroups?: LearningGroup;
}
export type UserBook = {
    book_id: string;
    book_name: string;
    chapter_id: string;
    section_id: string;
    rate: number;
}
type LearningGroup = {
    users: LearningGroupUser[];
    message: Message[];
}
export type User = {
    age?: number;
    _id?: string;
    name: string;
    email: string;
    books: UserBook[];
}

export type Mail = {
    name: string;
    email: string;
    message: string
}





