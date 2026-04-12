# HopeLink – Donation Management Platform

A full-stack MERN donation management frontend built with React.js + Tailwind CSS.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## 📁 Project Structure

```
src/
├── components/
│   ├── common/        # Button, Input, Modal, Spinner
│   ├── layout/        # Navbar, Footer
│   └── posts/         # PostCard, PostForm
├── context/
│   └── AuthContext.jsx
├── hooks/
│   ├── useAuth.js
│   ├── usePosts.js
│   └── useClaims.js
├── pages/
│   ├── auth/          # Login, Register
│   ├── dashboard/     # Dashboard
│   ├── posts/         # PostsList, PostDetail, CreatePost, EditPost
│   ├── claims/        # ClaimsHistory
│   ├── profile/       # Profile
│   ├── admin/         # AdminPanel
│   └── HomePage.jsx
├── routes/
│   └── ProtectedRoute.jsx
├── services/
│   └── api.js         # Axios instance + all API calls
└── utils/
    ├── constants.js
    ├── formatters.js
    └── validators.js
```

## 🎨 Design System

- **Primary**: Orange `#f97316` (warmth, energy)
- **Accent**: Charity Green `#2d7a4f`
- **Background**: Cream `#fef9f0`
- **Fonts**: Playfair Display (headings) + DM Sans (body)

## 🔑 Environment

Create a `.env` file:
```
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Then update `src/utils/constants.js` → `API_BASE_URL`.

## 🛣️ Routes

| Route | Access | Page |
|-------|--------|------|
| `/` | Public | HomePage |
| `/login` | Public | Login |
| `/register` | Public | Register |
| `/posts` | Public | PostsList |
| `/posts/:id` | Public | PostDetail |
| `/posts/create` | Donor | CreatePost |
| `/posts/:id/edit` | Donor | EditPost |
| `/dashboard` | Auth | Dashboard |
| `/profile` | Auth | Profile |
| `/claims` | Charity | ClaimsHistory |
| `/admin` | Admin | AdminPanel |

## 🧩 Features

- ✅ JWT authentication with auto-refresh
- ✅ Role-based access (Donor / Charity / Admin)
- ✅ Post CRUD for donors
- ✅ Donation claiming with quantity validation
- ✅ Real-time progress bars on donations
- ✅ Filter/search donations by type & status
- ✅ Responsive mobile-first design
- ✅ Animated page transitions
- ✅ Claims history for charities
- ✅ Admin panel with post/claim management
