# Meeting Room Booking System

A fullstack web application for managing meeting rooms and bookings.

## 🚀 Features

### Authentication
- JWT-based authentication
- Login / Signup
- Protected routes

### Rooms
- Create meeting rooms
- View rooms you own (ADMIN)
- View rooms you joined (USER)
- Add users to rooms

### Bookings
- Create bookings for rooms
- View all your bookings
- Time-based scheduling

### Dashboard
- Overview of:
  - Owned rooms
  - Joined rooms
  - Bookings

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express
- Prisma ORM

### Database
- PostgreSQL

### Auth
- JWT (JSON Web Token)

---

## 📦 Installation

### 1. Clone repo
```bash
git clone <repo_url>
cd project
````

### 2. Backend setup

```bash
cd backend
npm install
```

Create `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/db
JWT_SECRET=your_secret
```

Run migrations:

```bash
npx prisma migrate dev
```

Start backend:

```bash
npm run dev
```

---

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 API Endpoints (main)

### Auth

* POST `/auth/signup`
* POST `/auth/login`
* GET `/auth/me`

### Rooms

* GET `/rooms`
* POST `/rooms`
* POST `/rooms/:id/add-member`

### Bookings

* GET `/bookings/:roomId`
* POST `/bookings`

---

## ⚠️ Limitations

* Room deletion is not implemented in UI
* Booking deletion is not implemented
* No role management UI (only basic roles)
* No validation for overlapping bookings

---

## 💡 Notes

* Rooms are filtered based on user role:

  * ADMIN → "My Rooms"
  * USER → "Joined Rooms"
* Authentication is handled via JWT stored in localStorage
* User data is fetched via `/auth/me`

---

## 📸 Screenshots

(Add screenshots here if needed)

---

## 👨‍💻 Author

* Fullstack Developer (React + Node.js)

````

---

# 📑 Звіт (для проверяющего / препода)

```md
# Звіт по проєкту: Meeting Room Booking System

## 📌 Опис проєкту

Було розроблено веб-додаток для управління переговорними кімнатами та бронюванням зустрічей.

Система дозволяє:
- створювати кімнати
- додавати користувачів у кімнати
- бронювати час
- переглядати власні бронювання

---

## ⚙️ Реалізований функціонал

### Аутентифікація
- Реєстрація та логін користувача
- JWT авторизація
- Захист маршрутів

### Робота з кімнатами
- Створення кімнат
- Перегляд кімнат:
  - де користувач є ADMIN
  - де користувач є учасником (USER)
- Додавання користувачів у кімнати

### Бронювання
- Створення бронювання
- Перегляд усіх бронювань користувача
- Прив’язка до кімнати

### Інтерфейс
- Dashboard з розділенням:
  - My Rooms
  - Joined Rooms
  - My Bookings
- Модальні вікна для створення сутностей

---

## 🛠 Використані технології

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Node.js, Express
- ORM: Prisma
- Database: PostgreSQL
- Auth: JWT

---

## ❗ Обмеження

- Не реалізовано видалення кімнат через UI
- Не реалізовано видалення бронювань
- Мінімальна система ролей

---

## 🧠 Висновок

Було реалізовано повноцінний fullstack додаток із розділенням логіки на frontend та backend.

Проєкт демонструє:
- роботу з REST API
- авторизацію через JWT
- роботу з базою даних через ORM
- побудову UI на React