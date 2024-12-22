export type Paragraph = {
    _id?: string;
    text: string;
    questions: Question[];
    paragraphId?: number;
}

type Question = {
    question: string;
    answer: string;
}
export type Chapter = {
    chapterId?: number;
    paragraphs: Paragraph[];
}
export type Message = {
    _id?: string;
    userName: string;
    userId: string;
    message: string;
    timestamp: Date;
}

type LearningGroupUser = {
    userId: string;
    userName: string;
}

export type category = {
    type: string;
    subject: string;
}
export type Book = {
    _id?: string;
    name: string;
    author: string;
    category: category;
    chapters?: Chapter[];
    coverImage: string;
    chapters_num: number;
    paragraphs_num: number;
    rating?: number;
    number_raters: number;
    firstParagraphText?: string;
    paragraphsCountPerChapter?: number[];
}
export type UserBook = {
    book_id: string;
    book_name: string;
    chapter_id: number;
    section_id: number;
    rate: number;
    status?: boolean;
}
type Messages = {
    book_id: string;
    messages: Message[];
}
export type User = {
    age?: number;
    _id?: string;
    name: string;
    email: string;
    books: UserBook[];
    userImagePath: string;
};

export type UserWithPassword = User & {
    password: string; 
};

export type LoginCredentials = {
    email: string;
    password: string;
};

export type Mail = {
    name: string;
    email: string;
    message: string
}
export type localMessage = {
    messageId: string;
    username: string;
    userId: string;
    bookId: string;
    message: string;
    timestamp: Date;
}
