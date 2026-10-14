# Drawing-program

Full-stack anime and manga drawing studio.

## Front end
HTML + CSS + JavaScript. The drawing editor remains deployable as static files to GitHub Pages.

## Back end
Node.js + Express REST API for health checks, projects, and the dynamic drawing/reference library.

## Database
MySQL 8+ stores users, projects, drawing documents, library guides, and project assets. JSON columns keep drawing documents and guide data flexible while relational indexes provide fast lookup.

## Run locally
1. Install Node.js.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and configure MySQL.
4. Run `mysql < database/schema.sql`.
5. Run `npm start`.

GitHub Pages serves the static frontend. The Node/MySQL service hosts dynamic data. Database credentials must remain server-side and never be placed in browser JavaScript.
