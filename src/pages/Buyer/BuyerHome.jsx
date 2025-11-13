import { Link } from 'react-router-dom'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import ProductCard from '../../components/ProductCard'
import { productsAPI } from '../../services/api'

export default function BuyerHome() {
  const products = productsAPI.getAll().slice(0, 8)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50/30">
      {/* Simplified Hero Section */}
      <div className="bg-green-600 text-white">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">
            Fresh Produce Marketplace
          </h1>
          <p className="text-lg text-green-100">
            Discover fresh, organic produce from trusted local farmers
          </p>
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
          <div className="mt-8 text-center">
            <Link to="/buyer/browse">
              <Button className="group w-full md:w-auto">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
