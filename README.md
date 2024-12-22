
# 2 Study

The 2study system is an innovative and advanced daily Torah study platform, designed for the ongoing study of Jewish, moral, and Halacha books. 

The app uses: 
1. **cohere-ai** to display questions and answers for review of each section
2. **nodemailer** to create communication via emails
3. **pusher** To manage chat between users
4. Provides personalized book recommendations using user-to-user collaborative filtering - **KNN** based on shared ratings and reading history. Falls back to suggesting top-rated books when insufficient user similarity data exists.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/ruthiedel/2Study.git](https://github.com/ruthiedel/2Study.git)
   ```

2. **Install dependencies:**
   ```bash
   npm i
   ```

3. **Run the development server:**

   ```bash
   npm run dev
      # or
   yarn dev
      # or
   pnpm dev
      # or
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Deploy on Vercel

Welcome to visit VERCEL to see the app in action: [2-study.vercel.app](https://2-study.vercel.app "Open in a new tab")

