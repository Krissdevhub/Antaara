# Antaara Unplugged — Editorial Podcast Platform

> A luxury editorial & conversation-led podcast platform hosted by **Kirti Jaiswal Rajpal**, exploring meaningful dialogues across spirituality, cinema, social impact, and conscious living.

---

## 🏛️ Brand & Visual Direction

Antaara Unplugged is crafted with an editorial magazine aesthetic inspired by warm ivory, blush beige, dusty rose, and deep charcoal.

- **Design Philosophy**: High-end editorial magazine layout, subtle organic curves, authentic oval portrait masks, delicate botanical line-art SVG motifs.
- **Typography**: `Cormorant Garamond` (classic serif headlines), `DM Sans` (clean sans body text), `Alex Brush` (delicate script accents).
- **Color Palette**:
  - Warm Ivory: `#F4F1EC`
  - Blush Beige: `#E4D3CC`
  - Dusty Rose: `#D9AAA6`
  - Soft Terracotta: `#D88F91`
  - Warm Taupe: `#756B67`
  - Deep Charcoal: `#292625`
  - Champagne Gold: `#C7A45B`

---

## 🚀 Tech Stack

- **Framework**: Next.js (App Router) + React + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React + Custom SVG Line Art
- **Database Engine**: Dual-mode data layer:
  - **Local In-Memory / Resilient Fallback**: Out-of-the-box readiness with full seed data for all 14 authentic guests and episodes.
  - **Supabase Integration**: Plug-and-play connection whenever environment variables are provided.

---

## 📂 Project Structure

```
├── public/
│   └── assets/             # Brand logos, host portraits, and 14 authentic guest images
├── src/
│   ├── app/
│   │   ├── page.tsx        # Editorial Homepage with Hero, Spotlight, Guests, Vision
│   │   ├── about/          # Host biography, philosophy, awards, studio heritage
│   │   ├── guests/         # Interactive Guest Directory with search & category filters
│   │   ├── guests/[slug]/  # Dedicated guest profile page with video stream
│   │   ├── episodes/       # Complete episode catalog with video players
│   │   ├── contact/        # Collaborations & Inquiries form
│   │   ├── admin/          # Admin Portal (Login, Dashboard, Leads CRUD, Guests, Episodes, Settings)
│   │   └── api/            # REST API endpoints (Leads, Guests, Episodes, Settings, Auth)
│   ├── components/         # Reusable editorial components & botanical illustrations
│   ├── data/               # Seed data for guests, episodes, and settings
│   ├── lib/                # Database abstraction layer (Dual Supabase / Local engine)
│   └── types/              # TypeScript interfaces and data models
├── .env.example            # Environment variables template
└── README.md
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the website.

### 3. Admin Portal Access
- URL: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Default Password: `antaara2024` (configurable via `ADMIN_PASSWORD` in `.env.local`)

---

## 🗄️ Connecting Supabase (When Ready)

To connect Supabase later:
1. Create a project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Set your project credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ADMIN_PASSWORD=antaara2024
   ```
4. The application will automatically detect the credentials and switch to live Supabase persistence.

---

## 📜 License
Private & Confidential — Antaara Designing Studio & Antaara Unplugged.
