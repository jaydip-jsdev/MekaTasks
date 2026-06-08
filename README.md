# 🎓 MekaLearn - Learning Management System (LMS)

MekaLearn is a modern Learning Management System built with Next.js, MongoDB, and Cloudinary. The platform allows students to enroll in courses, watch lessons, track learning progress, and manage their learning journey while providing administrators with powerful course management tools.

---

## 🚀 Features

### 👨‍🎓 Student Features

* User Authentication & Authorization
* Browse Available Courses
* Course Search Functionality
* Watch Video Lessons
* Track Course Progress
* Learning History
* Resume Last Watched Lesson
* Responsive Design
* User Profile Management

### 👨‍💼 Admin Features

* Secure Admin Authentication
* Create Courses
* Edit Courses
* Delete Courses
* Manage Lessons
* Upload Course Thumbnails
* Upload Course Videos
* Category Management
* Student Progress Monitoring

### ☁️ Media Management

* Cloudinary Integration
* Thumbnail Upload & Optimization
* Video Storage & Delivery
* Automatic Media Management

---

## 🛠️ Tech Stack

### Frontend

* Next.js 15
* React.js
* TypeScript
* CSS Modules

### Backend

* Next.js API Routes
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt.js

### Cloud Services

* Cloudinary

---

## 📂 Project Structure

```bash
MekaLearn/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   ├── courses/
│   │   ├── profile/
│   │   ├── history/
│   │   ├── search/
│   │   ├── api/
│   │   └── components/
│   ├── lib/
│   ├── Types/
│   └── middleware.ts
├── public/
├── .env.local
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>
cd MekaLearn
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file in the root directory.

```env
MONGODB_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

### Run Development Server

```bash
npm run dev
```

Application will start on:

```bash
http://localhost:3000
```

---

## 📸 Key Modules

### Course Management

* Create and manage courses
* Add lessons to courses
* Upload thumbnails
* Organize courses by categories

### Learning Progress

* Track completed lessons
* Save learning history
* Resume learning from last watched lesson

### Search System

* Search courses by title
* Fast and responsive search experience

### Media Handling

* Cloudinary-based image uploads
* Video management and delivery

---

## 🔐 Authentication

The application uses:

* JWT (JSON Web Tokens)
* Secure Password Hashing with Bcrypt
* Protected Admin Routes
* User Session Management

---

## 🌟 Future Enhancements

* Course Enrollment System
* Certificates
* Course Ratings & Reviews
* Wishlist Feature
* Payment Integration
* Quiz & Assessment Module
* Instructor Dashboard
* Live Classes

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

**Yasin Memon**

Full Stack Developer | MERN Stack Developer

Built with ❤️ using Next.js, MongoDB, and Cloudinary.
