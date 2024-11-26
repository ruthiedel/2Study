"use client";

import React from "react";
import useUserStore from "@/services/zustand/userZustand/userStor";
import RequireAuth from "@/layout/RequireAuth";

const Homepage = () => {
    const user = useUserStore((state) => state.user);

    return (
        <RequireAuth>
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
                <main className="container mx-auto px-6 mt-12 flex flex-col items-center text-center">
                    <h2 className="text-4xl font-extrabold text-white">
                        Welcome {user?.name}
                    </h2>
                    <p className="text-gray-400 mt-4 text-lg">
                        Track your progress, stay motivated, and achieve your learning goals.
                    </p>
                    <button className="mt-8 px-6 py-3 bg-gold text-black rounded-lg shadow hover:bg-opacity-80 transition">
                        Get Started
                    </button>
                </main>

                {/* Footer */}
                <footer className="w-full bg-black text-white py-6 mt-12">
                    <div className="container mx-auto text-center">
                        <p className="text-gold">© 2024 Study Progress Tracker. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </RequireAuth>
    );
};

export default Homepage;
