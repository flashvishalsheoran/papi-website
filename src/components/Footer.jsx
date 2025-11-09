import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold text-primary">PAPI</h3>
            <p className="text-sm text-muted-foreground">
              Fresh. Local. Organic. Connecting local farmers with conscious consumers.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">For Buyers</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/buyer/browse" className="hover:text-primary">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link to="/buyer/orders" className="hover:text-primary">
                  My Orders
                </Link>
              </li>
              <li>
                <Link to="/buyer/profile" className="hover:text-primary">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">For Sellers</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/seller" className="hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/seller/products" className="hover:text-primary">
                  Manage Products
                </Link>
              </li>
              <li>
                <Link to="/seller/orders" className="hover:text-primary">
                  Manage Orders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Terms & Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 PAPI. All rights reserved. Demo/POC - Not for production use.</p>
        </div>
      </div>
    </footer>
  )
}

