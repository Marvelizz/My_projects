# 📰 Hacker News Reader Clone

A simple React.js application that clones the functionality of a Hacker News reader. It fetches and displays top stories from the official [Hacker News API](https://github.com/HackerNews/API).

## 🚀 Features

- View top stories from Hacker News
- Click to read full articles
- Clean and responsive UI

📁 Project Structure & Files
  -src/types.ts: Defines TypeScript types (e.g., story, comment) for type-safe API responses.
  -src/api.ts: Handles API calls to fetch stories and comments from Hacker News.
  -src/components/StoryCard.tsx: Renders individual story cards (title, author, score, etc.).
  -src/components/Comment.tsx: Displays comments with support for nested replies and collapsible threads.
  -src/pages/HomePage.tsx: The homepage showing a list of top stories with infinite scrolling.
  -src/pages/StoryPage.tsx: A detailed view of a selected story with comments and back navigation.
  -src/App.tsx: Main app routing and layout.
  -package.json: Lists project dependencies and scripts.
  -tailwind.config.js: Config for Tailwind CSS, including plugins and file paths.

## 🛠️ Built With

- React + TypeScript
- Vite (assumed for tooling)
- Tailwind CSS + Typography plugin
- Lucide Icons
- Hacker News API

## 📦 Installation

```bash
git clone https://github.com/your-username/hacker-news-clone.git
cd hacker-news-clone
npm install
npm run dev


🌐 Live Demo
Check out the deployed version on https://project-new-c5788.netlify.app/
