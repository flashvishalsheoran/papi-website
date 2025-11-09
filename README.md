# PAPI - Fresh. Local. Organic.

A React-based marketplace connecting local farmers with conscious consumers. Buy fresh, organic produce directly from sellers.

## 🚀 Features

### For Buyers
- Browse fresh organic produce
- Search and filter products by category
- Add items to cart and place orders
- Track order history
- Manage profile

### For Sellers
- Create and manage product listings
- View and manage customer orders
- Update order status
- Track sales and revenue
- Manage business profile

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **Data Storage**: localStorage (demo/POC)
- **Icons**: Lucide React

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Demo Accounts

### Buyer Account
- Email: `buyer1@papi.test`
- Password: `Buyer@123`

### Seller Account
- Email: `seller1@papi.test`
- Password: `Seller@123`

### Admin Account
- Email: `admin@papi.test`
- Password: `Admin@123`

## 📁 Project Structure

```
papi/
├── public/
│   └── images/          # Product and hero images
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ui/         # Base UI components (Button, Card, etc.)
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── SplitHero.jsx
│   │   └── ProductCard.jsx
│   ├── contexts/       # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── pages/          # Page components
│   │   ├── Buyer/
│   │   └── Seller/
│   ├── services/       # API and auth services
│   │   ├── api.js
│   │   └── auth.js
│   ├── data/           # Static JSON data
│   │   ├── users.json
│   │   ├── products.json
│   │   ├── orders.json
│   │   └── categories.json
│   ├── lib/            # Utilities
│   │   └── utils.js
│   ├── styles/
│   │   └── tailwind.css
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## 🎨 Landing Page

The landing page features a split hero design:
- **Left Panel**: Buyer portal - Browse and buy fresh produce
- **Right Panel**: Seller portal - List products and manage sales

## 🔄 Data Flow

1. **Initial Load**: Data is loaded from JSON files in `src/data/`
2. **Storage**: All changes are persisted to `localStorage`
3. **Cart**: Buyer cart is stored per-user in `localStorage`
4. **Orders**: New orders are created and stored in `localStorage`

## ⚠️ Important Notes

### Security Warning
This is a **DEMO/POC application** with the following limitations:

- ❌ Passwords are stored in **plaintext**
- ❌ No actual backend or database
- ❌ No real payment processing
- ❌ No email verification
- ❌ Data persists only in browser localStorage

**DO NOT USE IN PRODUCTION** without implementing:
- Proper authentication and authorization
- Password hashing (bcrypt, argon2, etc.)
- Real backend API (Node.js, Django, etc.)
- Secure database (PostgreSQL, MongoDB, etc.)
- HTTPS/SSL certificates
- Email verification
- Payment gateway integration

## 🔧 Customization

### Adding Real Images

Replace placeholder images in `public/images/` with real images:

```bash
# Example: Download from Unsplash
wget -O public/images/tomatoes.jpg "https://images.unsplash.com/photo-..."
```

### Connecting to Backend

Modify `src/services/api.js` to use real API endpoints:

```javascript
// Replace localStorage calls with fetch/axios
export const productsAPI = {
  getAll: async () => {
    const response = await fetch('/api/products')
    return response.json()
  },
  // ...
}
```

## 📝 Available Scripts

- `npm run dev` - Start development server (default: http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run format` - Format code with Prettier

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Clear localStorage
Open browser DevTools → Application → Local Storage → Clear All

## 📄 License

This is a demo project for educational purposes.

## 🤝 Contributing

This is a proof-of-concept project. For production use, please implement proper security measures and backend infrastructure.

---

Built with ❤️ using React + Vite + Tailwind CSS

