import { useState } from 'react'
import { Package, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Input from '../../components/ui/Input'
import { productsAPI } from '../../services/api'
import { formatCurrency } from '../../lib/utils'

export default function AdminProducts() {
  const [products, setProducts] = useState(productsAPI.getAll())
  const [search, setSearch] = useState('')

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      productsAPI.delete(productId)
      setProducts(productsAPI.getAll())
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      search === '' ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sellerName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Product Management</h1>
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              All Products ({filteredProducts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold">Product</th>
                    <th className="p-4 text-left text-sm font-semibold">Seller</th>
                    <th className="p-4 text-left text-sm font-semibold">Category</th>
                    <th className="p-4 text-left text-sm font-semibold">Price</th>
                    <th className="p-4 text-left text-sm font-semibold">Stock</th>
                    <th className="p-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-muted/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src = '/images/placeholder.jpg'
                              }}
                            />
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">{product.sellerName}</td>
                      <td className="p-4">
                        <Badge variant="outline">{product.category}</Badge>
                      </td>
                      <td className="p-4 font-medium">
                        {formatCurrency(product.price)}/{product.unit}
                      </td>
                      <td className="p-4">
                        <span
                          className={
                            product.stock === 0
                              ? 'text-destructive'
                              : product.stock < 10
                              ? 'text-warning'
                              : ''
                          }
                        >
                          {product.stock} {product.unit}
                        </span>
                      </td>
                      <td className="p-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

