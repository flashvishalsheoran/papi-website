import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'

// Buyer Pages
import BuyerHome from './pages/Buyer/BuyerHome'
import Browse from './pages/Buyer/Browse'
import ProductDetails from './pages/Buyer/ProductDetails'
import Cart from './pages/Buyer/Cart'
import Orders from './pages/Buyer/Orders'
import Profile from './pages/Buyer/Profile'

// Seller Pages
import SellerHome from './pages/Seller/SellerHome'
import Products from './pages/Seller/Products'
import AddProduct from './pages/Seller/AddProduct'
import EditProduct from './pages/Seller/EditProduct'
import SellerOrders from './pages/Seller/SellerOrders'
import SellerProfile from './pages/Seller/SellerProfile'

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />
  }

  return children
}

// App Layout
function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route
        path="/auth/login"
        element={
          <AppLayout>
            <Login />
          </AppLayout>
        }
      />
      <Route
        path="/auth/register"
        element={
          <AppLayout>
            <Register />
          </AppLayout>
        }
      />

      {/* Product Details - accessible to all authenticated users */}
      <Route
        path="/products/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ProductDetails />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Buyer Routes */}
      <Route
        path="/buyer"
        element={
          <ProtectedRoute allowedRoles={['buyer']}>
            <AppLayout>
              <BuyerHome />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/buyer/browse"
        element={
          <ProtectedRoute allowedRoles={['buyer']}>
            <AppLayout>
              <Browse />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/buyer/cart"
        element={
          <ProtectedRoute allowedRoles={['buyer']}>
            <AppLayout>
              <Cart />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/buyer/orders"
        element={
          <ProtectedRoute allowedRoles={['buyer']}>
            <AppLayout>
              <Orders />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/buyer/profile"
        element={
          <ProtectedRoute allowedRoles={['buyer']}>
            <AppLayout>
              <Profile />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Seller Routes */}
      <Route
        path="/seller"
        element={
          <ProtectedRoute allowedRoles={['seller']}>
            <AppLayout>
              <SellerHome />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/products"
        element={
          <ProtectedRoute allowedRoles={['seller']}>
            <AppLayout>
              <Products />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/products/add"
        element={
          <ProtectedRoute allowedRoles={['seller']}>
            <AppLayout>
              <AddProduct />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/products/edit/:id"
        element={
          <ProtectedRoute allowedRoles={['seller']}>
            <AppLayout>
              <EditProduct />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/orders"
        element={
          <ProtectedRoute allowedRoles={['seller']}>
            <AppLayout>
              <SellerOrders />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/profile"
        element={
          <ProtectedRoute allowedRoles={['seller']}>
            <AppLayout>
              <SellerProfile />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

