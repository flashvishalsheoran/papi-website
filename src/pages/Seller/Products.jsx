import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, Package } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { productsAPI } from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'
import { formatCurrency } from '../../lib/utils'

export default function Products() {
  const { user } = useAuth()
  const [products, setProducts] = useState(productsAPI.getBySeller(user.id))

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      productsAPI.delete(productId)
      setProducts(productsAPI.getBySeller(user.id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">My Products</h1>
          <Link to="/seller/products/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>

        {products.length === 0 ? (
          <Card className="text-center">
            <CardContent className="p-16">
              <Package className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-semibold">No products yet</h3>
              <p className="mb-6 text-muted-foreground">
                Add your first product to start receiving orders
              </p>
              <Link to="/seller/products/add">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative aspect-square bg-gray-100">
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
                      <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                  )}
                  {product.stock > 0 && product.stock < 10 && (
                    <Badge className="absolute right-2 top-2" variant="warning">
                      Low Stock
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="mb-1 text-lg font-semibold">{product.name}</h3>
                  <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
                    {product.description}
                  </p>

                  <div className="mb-4 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="text-sm text-muted-foreground">per {product.unit}</span>
                  </div>

                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Stock:</span>
                    <span className="font-medium">
                      {product.stock} {product.unit}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/seller/products/edit/${product.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

