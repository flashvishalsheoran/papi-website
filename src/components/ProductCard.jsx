import { Link } from 'react-router-dom'
import { ShoppingCart, Package, Star, TrendingUp, Heart } from 'lucide-react'
import { Card, CardContent, CardFooter } from './ui/Card'
import Button from './ui/Button'
import Badge from './ui/Badge'
import { formatCurrency } from '../lib/utils'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { isBuyer } = useAuth()
  const [isLiked, setIsLiked] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product, 1)
  }

  const handleLike = (e) => {
    e.preventDefault()
    setIsLiked(!isLiked)
  }

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="group relative h-full overflow-hidden border-0 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-green-500/0 via-transparent to-green-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-10"></div>
        
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-transparent to-amber-100/50 opacity-0 transition-opacity duration-700 group-hover:opacity-100"></div>
          
          <img
            src={product.image}
            alt={product.name}
            className="relative z-10 h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            onError={(e) => {
              e.target.src = '/images/placeholder.jpg'
            }}
          />
          
          {/* Overlay gradient on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

          {/* Stock badges */}
          {product.stock === 0 && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <Badge variant="destructive" className="px-4 py-2 text-base font-bold shadow-2xl">
                Out of Stock
              </Badge>
            </div>
          )}
          {product.stock > 0 && product.stock < 10 && (
            <Badge className="absolute right-3 top-3 z-20 animate-pulse bg-amber-500 px-3 py-1 font-semibold shadow-xl">
              Only {product.stock} left!
            </Badge>
          )}
          {product.stock >= 10 && (
            <div className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-3 py-1.5 text-xs font-bold text-white shadow-xl">
              <Star className="h-3.5 w-3.5 fill-current" />
              Fresh
            </div>
          )}

          {/* Like button */}
          <button
            onClick={handleLike}
            className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white"
          >
            <Heart
              className={`h-5 w-5 transition-all duration-300 ${
                isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-600'
              }`}
            />
          </button>

          {/* Quick view badge on hover */}
          <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 transform opacity-0 transition-all duration-300 group-hover:bottom-6 group-hover:opacity-100">
            <div className="rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-gray-800 shadow-xl backdrop-blur-sm">
              Click to view details
            </div>
          </div>
        </div>

        <CardContent className="relative z-10 p-5">
          {/* Seller info with icon */}
          <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
            <Package className="h-3.5 w-3.5" />
            <span className="font-medium">{product.sellerName}</span>
          </div>

          {/* Product name with gradient on hover */}
          <h3 className="mb-3 text-xl font-bold leading-tight text-gray-900 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-green-700 group-hover:to-green-600 group-hover:bg-clip-text group-hover:text-transparent">
            {product.name}
          </h3>

          {/* Price section with enhanced styling */}
          <div className="mb-4 flex items-baseline gap-2">
            <span className="bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-3xl font-black text-transparent">
              {formatCurrency(product.price)}
            </span>
            <span className="text-sm font-medium text-gray-500">/ {product.unit}</span>
          </div>

          {/* Stock progress bar with gradient */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-gray-600">
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-green-600" />
                Stock Level
              </span>
              <span className="font-bold text-gray-800">
                {product.stock} {product.unit}
              </span>
            </div>
            <div className="relative h-2.5 overflow-hidden rounded-full bg-gray-100">
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-inner transition-all duration-700 group-hover:from-green-600 group-hover:to-green-700"
                style={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="relative z-10 p-5 pt-0">
          {isBuyer && product.stock > 0 ? (
            <Button 
              className="group/btn relative w-full overflow-hidden bg-gradient-to-r from-green-600 to-green-700 shadow-lg transition-all duration-300 hover:from-green-700 hover:to-green-800 hover:shadow-xl" 
              onClick={handleAddToCart}
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover/btn:translate-x-[100%]"></div>
              <ShoppingCart className="relative mr-2 h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
              <span className="relative">Add to Cart</span>
            </Button>
          ) : (
            <Button 
              className="w-full" 
              variant="outline" 
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'View Details'}
            </Button>
          )}
        </CardFooter>

        {/* Corner decoration */}
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-green-400/20 to-green-600/20 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
      </Card>

      {/* Shimmer animation keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </Link>
  )
}

