"use client";

import React from "react";
import useUserStore from "@/services/zustand/userZustand/userStor";
import RequireAuth from "@/layout/RequireAuth";
import Book from "../book/book";
import { Book as Booktype }  from "@/types";
import FilterComponent from "../filterComponent/FilterComponent";
import BookCard from "../bookCard/bookCard";

const Homepage = () => {
    const user = useUserStore((state) => state.user);
    const logout = useUserStore((state) => state.logout);

    const defaultBook: Booktype =  {
        _id: "6731ed4da24f2ac3665b5d62",
        name: "מסילת ישרים",
        author: "רבי משה חיים לוצאטו",
        coverImage: "data:image/jpeg;base64,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",
        category: {
            type: "אתיקה",
            subject: "מוסר"
        },
        chapters: [],
        chapters_num:7,
        paragraphs_num:7,
    };
      
    return (
   
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                {/* Header */}
                <header className="w-full bg-black py-4 shadow-lg">
                    <div className="container mx-auto px-6 flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gold">Study Progress Tracker</h1>
                        <nav>
                            <a
                                href="#"
                                className="text-white hover:text-gold px-4 transition"
                            >
                                Home
                            </a>
                            <a
                                href="#about"
                                className="text-white hover:text-gold px-4 transition"
                            >
                                About
                            </a>
                            <a
                                href="#contact"
                                className="text-white hover:text-gold px-4 transition"
                            >
                                Contact
                            </a>
                        </nav>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-6 mt-12 flex flex-col items-center">
                    <h2 className="text-4xl font-extrabold text-white">
                        Welcome {user?.name}
                    </h2>
                    <p className="text-gray-400 mt-4 text-lg">
                        Track your progress, stay motivated, and achieve your learning goals.
                    </p>
                    <button onClick={logout} className="mt-8 px-6 py-3 bg-gold text-black rounded-lg shadow hover:bg-opacity-80 transition">
                        Log Out
                    </button>

                    <Book book={defaultBook}/>
                    <FilterComponent/>
                    <BookCard book={defaultBook}/>
                </main>

            </div>
    );
};

export default Homepage;
