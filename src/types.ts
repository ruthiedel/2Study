type Paragraph = {
    _id?: string;
    text: string;
    questions: string[];
}
export type Chapter = {
    _id?: string;
    paragraphs: Paragraph[];
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

type category = {
    type: string;
    subject: string;
}
export type Book = {
    _id?: string;
    name: string;
    author: string;
    category: category;
    chapters: Chapter[];
    coverImage: string;
    users?: string;
    learningGroups?: LearningGroup;
    chapters_num: number;
    paragraphs_num: number;
    rating?: number;
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
    userImagePath: string;
}
export type Mail = {
    name: string;
    email: string;
    message: string
}
