import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ShoppingCart, Package, Store, ArrowLeft, Minus, Plus } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { productsAPI } from '../../services/api'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { formatCurrency } from '../../lib/utils'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isBuyer } = useAuth()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const product = productsAPI.getById(id)

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Product not found</h2>
          <Button onClick={() => navigate('/buyer/browse')}>Back to Browse</Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000) // Reset after 2 seconds
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    navigate('/buyer/cart')
  }

  const relatedProducts = productsAPI
    .getByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.src = '/images/placeholder.jpg'
              }}
            />
            {product.stock === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Badge variant="destructive" className="text-lg">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="mb-2 text-4xl font-bold">{product.name}</h1>
              <Link
                to={`/buyer/browse?seller=${product.sellerId}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <Store className="h-4 w-4" />
                <span>{product.sellerName}</span>
              </Link>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">
                {formatCurrency(product.price)}
              </span>
              <span className="text-xl text-muted-foreground">per {product.unit}</span>
            </div>

            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-muted-foreground" />
              <span className="text-lg">
                {product.stock} {product.unit} available
              </span>
              {product.stock > 0 && product.stock < 10 && (
                <Badge variant="warning">Low Stock</Badge>
              )}
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </CardContent>
            </Card>

            {product.stock > 0 ? (
              <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {addedToCart ? 'Added!' : 'Add to Cart'}
                  </Button>
                  <Button onClick={handleBuyNow} size="lg" className="w-full">
                    Buy Now
                  </Button>
                </div>
              </div>
            ) : (
              <Button size="lg" disabled className="w-full">
                Out of Stock
              </Button>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/products/${p.id}`}>
                  <Card className="group cursor-pointer transition-all hover:shadow-lg">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = '/images/placeholder.jpg'
                        }}
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="mb-1 font-semibold">{p.name}</h3>
                      <p className="text-sm text-muted-foreground">{p.sellerName}</p>
                      <p className="mt-2 text-lg font-bold text-primary">
                        {formatCurrency(p.price)}/{p.unit}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

