# Blogging Website

Live Demo: [Sachin Kumar Yadav’s Blogging Website](https://blogging-website-project-zidio-dev.vercel.app/)  

A modern, responsive blogging platform where the author (Sachin Kumar Yadav) publishes articles, allows readers to comment, search posts, and browse content by category or tag.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack & Architecture](#tech-stack--architecture)  
- [Getting Started](#getting-started)  
- [Usage](#usage)  
- [API / Routes](#api--routes)  
- [Folder Structure](#folder-structure)  

---

## Features

- Author (Sachin Kumar Yadav) can create, edit, and delete blog posts  
- Posts support title, content (rich text / Markdown), tags, categories, featured images  
- Users / visitors can view posts, browse by category or tag  
- Search functionality for posts  
- Commenting system (guest or authenticated)  
- Responsive UI — works across devices  
- SEO optimization (meta tags, friendly URLs)  
- Pagination for posts  
- Dark / light mode (if implemented)  
- Admin / author dashboard (if implemented)  
- Social sharing links on posts  

*(Modify this list based on your actual implemented features.)*

---

## Tech Stack & Architecture

| Layer | Technology |
|---|---|
| Frontend | React.js (or Next.js), React Router (or file-based routing), Axios / fetch, CSS / Tailwind / Styled Components / Material‑UI |
| Backend | Node.js, Express.js (or Next.js API routes) |
| Database | MongoDB (via Mongoose) or any DB you use |
| Authentication / Authorization | JWT, session, or NextAuth (if using Next.js) |
| Deployment | Vercel (frontend / full‑stack), or separate backend host |
| Utilities / Libraries | Markdown parser, rich text editor, image upload (Cloudinary / local / S3), slug generation, SEO helpers |

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/blogging-website.git
   cd blogging-website

## Usage

-Visit homepage to see recent blog posts
-Browse posts by clicking on categories or tags
-Use search bar to find posts
-As author (once logged in), you can create new posts, edit, delete
-Comment on posts
-Share posts via social media buttons

## API / routes

| Method                    | Route                 |Description                       |
| ------------------------------ | -------------------------- | ------------------------------------ |
| `GET /api/posts`               | `/api/posts`                 | Fetch list of all blog posts           |
| `GET /api/posts/:slug`      | `/api/posts/:slug`         | Fetch a single post by slug or ID |
| `POST /api/posts`            | `/api/posts`                  | Create a new blog post                 |
| `PUT /api/posts/:id`         | `/api/posts/:id`            | Update an existing post                |
| `DELETE /api/posts/:id`   | `/api/posts/:id`            | Delete a post                                |
| `POST /api/comments`     | `/api/comments`           | Add a comment to a post              |
| `GET /api/categories`       | `/api/categories`         | Fetch all categories                      |
| `GET /api/tags`                 | `/api/tags`                   | Fetch all tags                               |
| `POST /api/auth/login`      | `/api/auth/login`         | Login (if authentication exists)    |


## Folder Structure

blogging-website/
│
├── server/                    
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js / app.js
│
|
├── client/                   
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/ (or views)
│   │   └── App.js, index.js
│   └── package.json
│
├── README.md
└── package.json

