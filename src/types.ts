export type Paragraph = {
    _id?: string;
    text: string;
    questions: Question[];
    ParagraphId?: string;
}

type Question = {
    question :string;
    answer: string;
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
    learningGroups?: LearningGroup;
    chapters_num: number;
    paragraphs_num: number;
    firstParagraphText?: string;
    paragraphsCountPerChapter?: number[];
}
export type UserBook = {
    book_id: string;
    book_name: string;
    chapter_id: number;
    section_id: number;
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
