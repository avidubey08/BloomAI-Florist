# 🌸 BloomAI Florist • Complete Business AI Website

> **Internship Project Submission**  
> **Theme:** Florist + AI Business Website  
> **Aesthetic:** Soft Luxury (Glass Cards, 3D Shadows, Smooth Animations)  
> **Primary Color:** `#2B1A2E` | **Secondary Color:** `#FF8FB1` | **Accent:** `#FFFFFF`  
> **Primary Font:** *Cormorant Garamond* (Headings & Brand) + *Plus Jakarta Sans* (Body)

[![Node.js Version](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.21.2-lightgrey.svg)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20Ready-brightgreen.svg)](https://mongodb.com)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel%20%2B%20Render-blueviolet.svg)](https://vercel.com)

---

## 📖 Executive Summary

**BloomAI Florist** is a full-stack, production-ready luxury botanical e-commerce and floral consultation platform designed for high-end clientele, bridal ceremonies, and residential floral subscriptions.

The platform bridges timeless haute floristry with next-generation artificial intelligence. Customers can consult with an **Intelligent 24/7 Botanical Stylist AI** that understands flower symbolism, stem longevity, color theory, and bespoke event styling, while reserving deliveries and bespoke consultations directly through a seamless real-time booking engine.

---

## 🎨 UI/UX & Design System

The visual identity is crafted to deliver a **Soft Luxury** experience adhering strictly to the design brief:

- **Color Palette**:
  - `Primary (#2B1A2E)`: Royal Deep Plum / Luxury Eggplant background.
  - `Secondary (#FF8FB1)`: Soft floral rose / blush pink accents and glow states.
  - `Neutral / Light (#FFFFFF)`: Crisp high-contrast typography and subtle glass borders.
- **Typography**:
  - `Cormorant Garamond`: High-fashion editorial serif used for headers, pricing, and logos.
  - `Plus Jakarta Sans`: Modern, legible geometric sans-serif for body copy and inputs.
- **Visual Effects**:
  - **Glassmorphism**: `backdrop-filter: blur(20px)`, translucent layers (`rgba(43, 26, 46, 0.55)`), and soft borders (`1px solid rgba(255, 143, 177, 0.16)`).
  - **3D Soft Shadows**: Deep layered ambient drop-shadows with subtle blush pink specular glows.
  - **Rounded 22px Corners**: Fluid, ergonomic borders applied across cards, modals, and input fields.
  - **Fluid Animations**: Smooth scrolling, hover zoom image expansion, bouncing typing indicators, and floating ambient orbs.

---

## ✨ Features Walkthrough

### 1. ✦ Sticky Glass Navigation
- Floating pill navbar with translucent glass effect (`header.glass`).
- Brand logo with glowing floral emblem.
- Dynamic smooth-scrolling links: `Home | Services | AI Demo | Gallery | Pricing | Booking | Reviews`.
- **Admin Bookings Drawer**: Instant button allowing recruiters and evaluators to inspect live bookings directly from the database.
- Responsive mobile hamburger menu with animated drawer navigation.

### 2. ✦ Premium Gradient Hero
- High-impact luxury gradient header with floating badge.
- Interactive hero AI search input (`#aiInput`) with **Ask AI** and **Book Now** buttons.
- Quick-prompt suggestion chips (*Anniversary Peonies*, *Intimate Wedding*, *Flower Care Tips*, *Weekly Subscription*) that trigger instant AI consultations.

### 3. ✦ Bespoke Floral Services (3+ Premium Glass Cards)
- Handcrafted cards with high-definition curated imagery and custom price badges:
  - **Bespoke Bridal & Haute Floral Design** ($280 / bespoke)
  - **The Empress Orchid & Peony Arrangement** ($185 / centerpiece)
  - **Weekly Luxury Residence Subscription** ($95 / week)
  - **Eternal Preserved Velvet Roses** ($340 / 3+ years)
- Features list and direct **Book This Service** actions that pre-populate the reservation form.

### 4. ✦ 24/7 AI Botanical Concierge (Interactive AI Demo)
- Live interactive chat interface with real-time response generation.
- **Dual Engine Architecture**:
  - **OpenAI GPT Integration**: When an `OPENAI_API_KEY` is provided, queries are processed via OpenAI's chat completions with an editorial luxury florist prompt.
  - **Intelligent Botanical Knowledge Fallback**: If no API key is configured or offline, a built-in botanical knowledge engine handles questions regarding occasions, meanings (floriography), stem care, and pricing.
- Bouncing typing indicator and chat history reset options.

### 5. ✦ The Floral Lookbook (Gallery with Filter + Hover Zoom)
- Dynamic category filters: `All Arrangements`, `Weddings`, `Luxury Bouquets`, `Installations`, and `Preserved Roses`.
- Smooth CSS scale transitions on hover (`scale(1.12)`).
- Fullscreen **Lightbox Zoom Modal** revealing high-res photography, stem composition, pricing, and an **Order This Arrangement** CTA.

### 6. ✦ Subscription Pricing with Monthly / Yearly Toggle
- Interactive billing toggle with a glowing pill switch and a **"Save 20%"** discount badge.
- 3 Luxury Tiers:
  - **The Petite Bloom** ($75/mo or $60/yr)
  - **The Grand Luxe** ($145/mo or $116/yr) — *Featured Tier*
  - **The Imperial Maison** ($280/mo or $224/yr)
- Direct subscription selection pre-fills the booking section.

### 7. ✦ Real-Time Booking System (`POST /api/bookings`)
- Responsive glass reservation form with field validations:
  - Full Name
  - Phone Number
  - Service Selection (dynamically pre-selected from anywhere on the page)
  - Delivery / Consultation Date picker (min-date set to current day)
  - Email (Optional)
  - Notes / Custom Floral Preferences
- Instant feedback toast upon submission with server confirmation.

### 8. ✦ Endorsements of Elegance (Client Reviews)
- 5-Star luxury testimonials from private collectors, estate managers, and bridal stylists.
- Verified client avatars, credentials, and elegant quotes.

### 9. ✦ Luxury Footer & Instant Channels
- Physical Atelier address in the Luxury Design District.
- Hours of operation (including 24/7 AI Concierge highlight).
- **Direct WhatsApp Chat**: One-click link (`https://wa.me/...`) pre-configured with a consultation greeting.
- **Instagram Handle**: Social link to `@bloomai.florist`.
- VIP newsletter subscription input.

---

## 🏛 Project Architecture

```
pro-1/
├── backend/
│   ├── models/
│   │   ├── Booking.js          # Mongoose schema for customer reservations
│   │   ├── Service.js          # Mongoose schema for floral services
│   │   └── Review.js           # Mongoose schema for client testimonials
│   ├── server.js               # Node.js + Express API server with MongoDB & AI engine
│   ├── package.json            # Backend dependencies (express, mongoose, cors, dotenv)
│   ├── .env                    # Local environment variables
│   └── .env.example            # Environment template for deployment
├── frontend/
│   ├── css/
│   │   └── style.css           # Soft Luxury CSS (Glass, 3D shadows, 22px radius, animations)
│   ├── js/
│   │   └── app.js              # Vanilla ES Module: AI chat, filters, lightbox, booking logic
│   ├── config.js               # Frontend business & color configuration
│   └── index.html              # Semantic HTML5 luxury landing page
├── test-server.js              # Automated end-to-end integration test suite
├── vercel.json                 # Vercel deployment configuration for frontend
├── render.yaml                 # Render web service configuration for backend
├── package.json                # Root orchestration & test scripts
├── .gitignore                  # Git ignore rules
└── README.md                   # Complete documentation
```

---

## 🔌 API Reference

Base URL (Local): `http://localhost:5000`

### 1. AI Chat Consultation
- **Endpoint**: `POST /api/ai/chat`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "question": "What flowers do you recommend for an anniversary?"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "answer": "For anniversaries and romance, our premier choice is 'The Empress Orchid & Peony Arrangement' ($185)...",
    "business": "BloomAI Florist",
    "timestamp": "2026-11-24T13:21:30.223Z"
  }
  ```

### 2. Create Reservation
- **Endpoint**: `POST /api/bookings`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Princess Sophia",
    "phone": "+1 (555) 345-6789",
    "service": "The Empress Orchid & Peony Arrangement",
    "date": "2026-12-20",
    "email": "sophia@palace.org",
    "notes": "Morning delivery with custom gold-foil envelope."
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "success": true,
    "message": "Booking Confirmed!",
    "booking": {
      "_id": "bk-1795526529862",
      "name": "Princess Sophia",
      "phone": "+1 (555) 345-6789",
      "service": "The Empress Orchid & Peony Arrangement",
      "date": "2026-12-20",
      "status": "pending"
    }
  }
  ```

### 3. Retrieve All Bookings
- **Endpoint**: `GET /api/bookings`
- **Response** (`200 OK`): Array of all customer bookings sorted chronologically.

### 4. Retrieve Floral Services
- **Endpoint**: `GET /api/services`
- **Response** (`200 OK`): Array of services with prices, descriptions, and imagery.

### 5. Health & Diagnostic Check
- **Endpoint**: `GET /api/health`
- **Response** (`200 OK`): Returns server status, database state, and uptime.

---

## 🚀 Local Setup & Quick Start

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### 1. Clone & Navigate
```bash
cd pro-1
```

### 2. Install Dependencies
```bash
npm run install:all
```
*(Or navigate to `backend/` and run `npm install`)*

### 3. Run Automated End-to-End Tests
Verify all 6 core API and frontend serving capabilities with one command:
```bash
npm test
```

### 4. Start the Application
```bash
npm start
```
The server will initialize on port **5000**:
- **Website & Frontend**: Open your browser at [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🌐 Deployment Guide

### Target Architecture:
- **Frontend**: [Vercel](https://vercel.com)
- **Backend API**: [Render](https://render.com)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

### Step 1: Deploy Database on MongoDB Atlas
1. Create a free M0 cluster at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user (e.g., `bloom_admin`) and whitelist access (`0.0.0.0/0` or your Render IP).
3. Copy your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/bloomai_florist?retryWrites=true&w=majority
   ```

---

### Step 2: Deploy Backend to Render
1. Push this repository to GitHub or GitLab.
2. In the [Render Dashboard](https://dashboard.render.com), click **New +** > **Web Service**.
3. Select your repository and configure:
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. In the **Environment Variables** section, add:
   - `MONGO_URI`: *Your MongoDB Atlas connection URI*
   - `OPENAI_API_KEY`: *(Optional) Your OpenAI API key for live GPT-4o-mini responses*
   - `PORT`: `5000`
5. Click **Create Web Service**. Note your Render URL (e.g., `https://bloomai-florist-backend.onrender.com`).

---

### Step 3: Deploy Frontend to Vercel
1. In the [Vercel Dashboard](https://vercel.com), click **Add New...** > **Project**.
2. Import this repository.
3. In project settings:
   - **Root Directory**: `./` (or select `frontend`)
   - **Framework Preset**: `Other`
4. Update `frontend/config.js` with your production Render backend URL:
   ```javascript
   export const config = {
     businessName: "BloomAI Florist",
     category: "Florist + AI",
     primary: "#2B1A2E",
     secondary: "#FF8FB1",
     font: "Cormorant Garamond",
     apiBaseUrl: "https://bloomai-florist-backend.onrender.com"
   };
   ```
5. Click **Deploy**. Your Vercel frontend is live!

---

### Alternative: 1-Click Unified Fullstack Deployment
Because `backend/server.js` serves the `frontend/` static assets automatically, you can also deploy the entire full-stack application as a single web service on **Render**, **Railway**, or **Heroku** simply by running `npm start` from root.

