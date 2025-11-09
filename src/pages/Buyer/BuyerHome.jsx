import { Link } from 'react-router-dom'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import ProductCard from '../../components/ProductCard'
import { productsAPI } from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'

export default function BuyerHome() {
  const { user } = useAuth()
  const products = productsAPI.getAll().slice(0, 8)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <span>Fresh from Local Farms</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Welcome back,
              <br />
              <span className="text-green-200">{user?.name}! 👋</span>
            </h1>
            <p className="mb-8 text-xl text-green-100 md:text-2xl">
              Discover fresh, organic produce from trusted local farmers
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/buyer/browse">
                <Button size="lg" variant="secondary" className="group">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/buyer/orders">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700">
                  View My Orders
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Products */}
        <div className="mb-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold md:text-4xl">Featured Products</h2>
              <p className="text-lg text-muted-foreground">Handpicked fresh produce</p>
            </div>
            <Link to="/buyer/browse" className="hidden md:block">
              <Button variant="outline" className="group">
                View All
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/buyer/browse">
              <Button className="group w-full">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white shadow-2xl">
          <div className="absolute right-0 top-0 h-64 w-64 translate-x-32 -translate-y-32 rounded-full bg-white/10"></div>
          <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-24 translate-y-24 rounded-full bg-white/10"></div>
          <CardContent className="relative flex flex-col items-center justify-center p-12 text-center md:p-16">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">Start Shopping Today!</h2>
            <p className="mb-8 max-w-2xl text-lg text-green-100 md:text-xl">
              Browse fresh, organic produce from trusted local farmers. Support local, eat healthy!
            </p>
            <Link to="/buyer/browse">
              <Button size="lg" variant="secondary" className="group shadow-xl">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Browse All Products
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
