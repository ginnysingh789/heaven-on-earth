# Kashmir Travels

Full-stack MERN travel booking platform for Kashmir — hotels, packages, treks, homestays, houseboats, activities, rentals, articles, and books.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 (Vite), Tailwind CSS, React Router v6 |
| Backend | Node.js, Express.js, MongoDB, Mongoose |
| Auth | JWT + bcryptjs |
| Images | Cloudinary CDN (w_2560, q_100, f_auto) |
| Icons | Google Material Icons, Lucide React |
| Fonts | Plus Jakarta Sans, Playfair Display |

## Quick Start

```bash
# Install all deps
npm run install-all

# Seed database (creates admin + sample data)
npm run seed

# Start dev servers (client :5173, server :5000)
npm run dev
```

## Environment Variables (`.env`)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/kashmir-booking
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=dhyjy3pnz
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```


## Project Structure

```
Hotel-booking/
├── server/
│   ├── config/db.js
│   ├── middleware/auth.js
│   ├── models/               # User, Destination, Hotel, Booking, Package,
│   │                         # Trek, Activity, Rental, Homestay, Houseboat,
│   │                         # Article, Book, Enquiry
│   ├── routes/               # auth, hotels, packages, treks, activities,
│   │                         # rentals, homestays, houseboats, articles,
│   │                         # books, upload, admin, enquiries
│   ├── seed.js
│   └── index.js
├── client/
│   ├── public/               # Static assets
│   └── src/
│       ├── components/       # Navbar, Footer, Layout, HotelCard, Skeleton, etc.
│       ├── context/          # AuthContext
│       ├── data/mockData.js  # Fallback mock data (Cloudinary URLs)
│       ├── pages/
│       │   ├── admin/        # Full CRUD admin portal
│       │   └── *.jsx         # 20+ user-facing pages
│       ├── api.js
│       ├── App.jsx
│       └── main.jsx
├── .env
└── package.json
```

## Features

### User
- Hero slideshow with Cloudinary high-res images
- Hotels, Packages, Treks, Activities, Rentals, Homestays, Houseboats
- 3-step booking flow (dates → room/add-ons → payment)
- Articles & Books section
- JWT auth (register / login / protected routes)
- My Bookings dashboard

### Admin (`/admin`)
- Dashboard with revenue & booking stats
- Full CRUD for all content types
- Image upload → Cloudinary (10 MB limit, auto quality)
- Booking & enquiry management

## API

```
POST   /api/auth/register|login
GET    /api/auth/me
GET    /api/hotels | /api/hotels/:slug
GET    /api/packages | /api/packages/:slug
GET    /api/treks | /api/treks/:slug
GET    /api/activities | /api/activities/:slug
GET    /api/rentals | /api/rentals/:slug
GET    /api/homestays | /api/homestays/:slug
GET    /api/houseboats | /api/houseboats/:slug
GET    /api/articles | /api/articles/:slug
GET    /api/books | /api/books/:slug
POST   /api/bookings  (protected)
GET    /api/bookings/my  (protected)
POST   /api/upload  (admin only, → Cloudinary)
GET    /api/admin/*  (admin only)
```
