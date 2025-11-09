# PAPI — Cursor Project Spec

**Purpose:** A concise spec file you can feed to Cursor (or use as a README) to scaffold a React + Tailwind + shadcn UI demo marketplace for fruits & vegetables (buyers & sellers). All data is static (no DB). Auth is mocked/local-storage. Modern, minimal UI with high-quality images.

---

## TL;DR (what Cursor should generate)

- React (V18+) app (Vite or Next.js — this spec uses **Vite + React** for simplicity)
- TailwindCSS + shadcn/ui (component primitives) + lucide-react icons
- Routing with React Router (or simple file-based routing if you prefer Next)
- Static JSON files for users, products, orders (in `/data/*.json`), and an in-memory service layer that reads/writes to localStorage
- Pages: Landing (image + Buyer / Seller split), Buyer Dashboard, Seller Dashboard, Admin Panel, Auth pages, Product pages, Cart, Orders, Profile
- Minimal state management using React Context (AuthContext, CartContext)
- Build & run with `npm run dev`

---

## Project Settings & Commands (Cursor-friendly)

```
name: papi
type: vite-react
packageManager: npm
node: 18
framework: react
css: tailwind
ui: shadcn-ui
routes:
  - / (landing)
  - /auth/login
  - /auth/register
  - /buyer/*
  - /seller/*
  - /admin/*
  - /products/:id
  - /search

database: static-json (data/*.json + localStorage)
```

**Dev commands** (what the generated repo should include):

```bash
npm install
npm run dev          # starts vite dev server
npm run build        # builds production bundle
npm run preview      # preview build
```

Add helpful scripts to `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "format": "prettier --write ."
}
```

---

## Dependencies (package.json)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.12.0",
    "@radix-ui/react-icons": "^1.0.0",
    "lucide-react": "^0.300.0",
    "@shadcn/ui": "*compatible-version*",
    "tailwindcss": "^4.0.0",
    "clsx": "^1.2.1"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "postcss": "^8.0.0",
    "autoprefixer": "^10.0.0",
    "prettier": "^2.8.0"
  }
}
```

> Note: Cursor may pick exact compatible `shadcn/ui` packages (shadcn uses a component library built with radix + tailwind; Cursor can run `npx shadcn-ui@latest init` to scaffold components). If Cursor supports Next you could also switch to Next.js and `app` directory.

---

## File structure (recommended)

```
/papi
  /public
    /images (downloaded assets)
  /src
    /components
      AuthForm.jsx
      BuyerCard.jsx
      SellerCard.jsx
      ProductCard.jsx
      Header.jsx
      Footer.jsx
      SplitHero.jsx
      AdminNav.jsx
    /contexts
      AuthContext.jsx
      CartContext.jsx
    /pages
      Landing.jsx
      Login.jsx
      Register.jsx
      Buyer
        BuyerHome.jsx
        Browse.jsx
        ProductDetails.jsx
        Cart.jsx
        Orders.jsx
        Profile.jsx
      Seller
        SellerHome.jsx
        Dashboard.jsx
        AddProduct.jsx
        EditProduct.jsx
        Orders.jsx
        Profile.jsx
      Admin
        Dashboard.jsx
        Users.jsx
        Products.jsx
        Orders.jsx
        Categories.jsx
    /services
      api.js           # reads data/*.json and writes to localStorage
      auth.js
    /data
      users.json
      products.json
      orders.json
      categories.json
    /styles
      tailwind.css
    main.jsx
    App.jsx
  tailwind.config.cjs
  postcss.config.cjs
  vite.config.js
  package.json
  README.md
```

---

## UX / Screens & Flow

### Landing Page (exact ask)
- Full-bleed hero image.
- Center-left: **Buyer** card/button. Center-right: **Seller** card/button.
- No other UI on homepage.
- Clicking Buyer -> route to `/buyer` or `/auth/login?role=buyer`.
- Clicking Seller -> route to `/seller` or `/auth/login?role=seller`.

**Component:** `SplitHero.jsx` — uses CSS grid or flex to split the hero into two clickable overlay panels.

### Buyer flow
- Auth -> BuyerHome -> Browse sellers/products -> Product details -> Add to cart -> Place order -> Orders history.
- Mock checkout sends order to `/data/orders.json` via `api.js` write that pushes to localStorage (no real DB).

### Seller flow
- Auth -> SellerHome -> Add/Edit/Delete products (writes to localStorage) -> View order requests -> Update order status.

### Admin flow
- Admin login (use seeded `admin@papi.test` in `users.json`) -> Dashboard overview -> Manage users/products/orders/categories -> Approve/Block users (sets `status` in users JSON/localStorage)

---

## Authentication (static/mock)

- Use `AuthContext` that reads `data/users.json` for seed accounts and uses LocalStorage to persist new users and session token.
- Seed accounts sample:

```json
// data/users.json (excerpt)
[
  {
    "id": "admin-1",
    "role": "admin",
    "email": "admin@papi.test",
    "password": "Admin@123",
    "name": "Papi Admin"
  },
  {
    "id": "buyer-1",
    "role": "buyer",
    "email": "buyer1@papi.test",
    "password": "Buyer@123",
    "name": "Test Buyer",
    "phone": "",
    "address": "",
    "pincode": ""
  },
  {
    "id": "seller-1",
    "role": "seller",
    "email": "seller1@papi.test",
    "password": "Seller@123",
    "businessName": "Green Farms",
    "address": "",
    "pincode": "",
    "organicCertification": ""
  }
]
```

- Login checks `data/users.json` + localStorage (so registering adds to localStorage). Passwords stored plaintext in this demo (clearly called out as only for demo).
- Forgot password: simple UI that sets a new password after verifying email exists (no email sending).

---

## Data models (static JSON)

`products.json` sample entry:

```json
{
  "id": "prod-1",
  "sellerId": "seller-1",
  "name": "Organic Tomatoes",
  "category": "vegetables",
  "unit": "Kg",
  "price": 80,
  "stock": 120,
  "image": "/images/tomatoes.jpg",
  "description": "Fresh local organic tomatoes."
}
```

`orders.json` sample entry:

```json
{
  "id": "order-1",
  "buyerId": "buyer-1",
  "sellerId": "seller-1",
  "items": [{ "productId": "prod-1", "qty": 2, "unitPrice": 80 }],
  "status": "Pending",
  "createdAt": "2025-11-09T10:00:00.000Z",
  "notes": "Leave at door"
}
```

---

## Service Layer (api.js)

- `readData(filename)` — loads `/src/data/<filename>.json` (via import or fetch) and merges with localStorage overlays.
- `saveUsers(users)`/`saveProducts(products)`/`saveOrders(orders)` — persist to localStorage under keys like `papi_users`.
- `createOrder(order)` — append to localStorage and return updated list.

This abstraction keeps file-based seeding and then persists to localStorage for the demo session.

---

## UI Notes (shadcn + Tailwind)

- Use `SplitHero` (two large panels with subtle hover lift). Each panel contains a big label (Buyer / Seller) and a small subtitle.
- Keep the palette natural: soft greens, off-white backgrounds, warm neutrals. Minimal typography (Inter or system fonts).
- Use `ProductCard` with image, name, unit price, seller name and an `Add` button.
- `AdminDashboard` uses simple cards with counts and a table of recent orders.
- Follow shadcn patterns: `Button`, `Input`, `Card`, `Dialog` where helpful. Cursor may scaffold these via `shadcn-ui` commands.

---

## Accessibility & Responsiveness

- Hero split collapses to stacked (Buyer first, Seller second) on narrow screens.
- Use semantic HTML, alt tags on images, and focus states.

---

## Assets (images) — where to get high-quality images

> **I attempted to fetch images from the client's site you shared (`https://produce-leads-hulapunk.replit.app/`) but the automated fetch timed out.** Cursor can still proceed using placeholder images or you can provide the assets folder. Below are steps for both:

### Option A — Script to download images from the client's site (if accessible)

```bash
# Run this locally to mirror images into public/images
mkdir -p public/images
# Replace the list below with the actual image URLs from the client's site
urls=(
  "https://produce-leads-hulapunk.replit.app/assets/hero.jpg"
  "https://produce-leads-hulapunk.replit.app/assets/tomatoes.jpg"
)
for u in "${urls[@]}"; do
  wget -P public/images "$u"
done
```

> If the site blocks scraping or is not reachable from Cursor, use Option B.

### Option B — Use Unsplash / Pexels high-quality free images (recommended)

Suggested queries (use these in Unsplash or Pexels):
- `organic vegetables market`
- `fresh produce farm market`
- `tomatoes close up`
- `green leafy vegetables`
- `fruit close up`

Example Unsplash collections to copy images from:
- `https://unsplash.com/s/photos/fresh-vegetables`
- `https://unsplash.com/s/photos/farmers-market`

**Script** (download representative images from Unsplash with known URLs):

```bash
mkdir -p public/images
wget -O public/images/hero.jpg "https://images.unsplash.com/photo-1518976024611-0b8a0a78d2b6..."
wget -O public/images/tomatoes.jpg "https://images.unsplash.com/photo-1501004318641-b39e6451bec6..."
# (Replace the ... with full image query URLs you choose)
```

*(Cursor cannot legally rehost some images — ensure proper attribution in production; for a demo it's OK to use Unsplash images.)*

---

## Cursor-specific notes (how to feed this spec)

1. Open Cursor and create a new project from a spec/manifest.
2. Paste this `.md` content or upload it as `PAPI_Cursor_Spec.md`.
3. Tell Cursor to scaffold a `vite-react` project with Tailwind and the above file structure. You may include the `data/*.json` seeds as part of the repo.
4. After scaffolding, run `npm install` and `npm run dev`.

If Cursor allows you to run post-generation scripts, add these steps:

```bash
npx shadcn-ui@latest init
# choose tailwind, etc. Install the components you want (Button, Input, Card)
```

---

## UX Copy & Microcopy (short list for developer)

- Landing: "Welcome to PAPI — Fresh. Local. Organic." Buttons: `I am a Buyer` / `I am a Seller`
- Buyer empty cart: "Your cart is empty. Browse fresh produce near you."
- Seller product list empty: "No products yet. Add your first product to get orders."
- Order confirmation modal: "Order request sent. The seller will contact you to confirm delivery."

---

## Admin Seeding & Test Accounts (include in data/users.json)

- `admin@papi.test` / `Admin@123` (admin)
- `buyer1@papi.test` / `Buyer@123` (buyer)
- `seller1@papi.test` / `Seller@123` (seller)

Include sample products and orders matching these IDs.

---

## Security & Limitations (be explicit for the client / Cursor)

- This is a **demo** / POC with static data and localStorage persistence. Do **not** use in production with real users/passwords.
- Passwords stored in plaintext in demo JSON/localStorage for simplicity — highlight in the README that production must use hashed passwords, HTTPS, and a real backend.

---

## Acceptance Checklist (what to deliver)

- [ ] Vite React project scaffolding + Tailwind + shadcn-ui
- [ ] Landing page with split hero and Buyer/Seller buttons
- [ ] Mock auth (register/login) with role selection
- [ ] Buyer pages: browse, product details, cart, orders, profile
- [ ] Seller pages: product CRUD, orders list, order status update
- [ ] Admin pages: users, products, orders, categories (read/write to localStorage)
- [ ] Seed data in `/src/data/*.json` and commands to replace with real backend later
- [ ] `public/images` with downloaded high-quality images (or documented replacement steps)

---

## Deliverables (what Cursor should output)

1. A Git repo (or zip) named `papi` with the structure above.
2. A `PAPI_Cursor_Spec.md` in the repo (this file).
3. README with setup steps and image download instructions.

---

## Next steps I can do for you (if you want me to continue here)
- I can generate the full `data/*.json` seed files and example React components (AuthContext, SplitHero, ProductCard) and paste them into the repo.
- I can also produce an automated `download-assets.sh` script with curated Unsplash URLs.

> NOTE: I attempted to fetch the client's existing site you referenced (`https://produce-leads-hulapunk.replit.app/`) to pull image assets, but the automated fetch timed out. If you want me to include exact assets from that site, please either: (A) attach the images here, or (B) confirm I should scrape them and provide working image URLs.

---

**End of spec**

