import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, LogOut, Home, Package, Settings } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import Button from './ui/Button'

export default function Header() {
  const { user, logout, isBuyer, isSeller, isAdmin } = useAuth()
  const { getCartItemsCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-primary">PAPI</div>
          <span className="hidden text-sm text-muted-foreground sm:inline-block">
            Fresh. Local. Organic.
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          {user ? (
            <>
              {isBuyer && (
                <>
                  <Link to="/buyer">
                    <Button variant="ghost" size="sm">
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </Button>
                  </Link>
                  <Link to="/buyer/browse">
                    <Button variant="ghost" size="sm">
                      Browse
                    </Button>
                  </Link>
                  <Link to="/buyer/cart" className="relative">
                    <Button variant="ghost" size="sm">
                      <ShoppingCart className="h-4 w-4" />
                      {getCartItemsCount() > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                          {getCartItemsCount()}
                        </span>
                      )}
                    </Button>
                  </Link>
                </>
              )}

              {isSeller && (
                <>
                  <Link to="/seller">
                    <Button variant="ghost" size="sm">
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/seller/products">
                    <Button variant="ghost" size="sm">
                      <Package className="mr-2 h-4 w-4" />
                      Products
                    </Button>
                  </Link>
                  <Link to="/seller/orders">
                    <Button variant="ghost" size="sm">
                      Orders
                    </Button>
                  </Link>
                </>
              )}

              {isAdmin && (
                <>
                  <Link to="/admin">
                    <Button variant="ghost" size="sm">
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/admin/users">
                    <Button variant="ghost" size="sm">
                      Users
                    </Button>
                  </Link>
                  <Link to="/admin/products">
                    <Button variant="ghost" size="sm">
                      Products
                    </Button>
                  </Link>
                </>
              )}

              <Link to={`/${user.role}/profile`}>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </Link>

              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

