import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Label from '../../components/ui/Label'
import { useCart } from '../../contexts/CartContext'
import { formatCurrency } from '../../lib/utils'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, placeOrder, clearCart } = useCart()
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate()

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const orders = placeOrder(notes)
      setShowSuccess(true)
      setTimeout(() => {
        navigate('/buyer/orders')
      }, 2000)
    } catch (error) {
      alert(error.message)
    }
    setLoading(false)
  }

  if (showSuccess) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-green-50 to-white">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <ShoppingBag className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="mb-2 text-2xl font-bold">Order Placed Successfully!</h2>
            <p className="mb-4 text-muted-foreground">
              The seller will contact you to confirm delivery details.
            </p>
            <p className="text-sm text-muted-foreground">Redirecting to orders...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-2xl font-bold">Your cart is empty</h2>
            <p className="mb-6 text-muted-foreground">
              Browse fresh produce near you and add items to your cart.
            </p>
            <Link to="/buyer/browse">
              <Button>Start Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({cart.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => (
                  <div key={item.productId} className="flex gap-4 border-b pb-4 last:border-b-0">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.src = '/images/placeholder.jpg'
                        }}
                      />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold">{item.productName}</h3>
                          <p className="text-sm text-muted-foreground">{item.sellerName}</p>
                          <p className="mt-1 text-sm text-primary">
                            {formatCurrency(item.unitPrice)} per {item.unit}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-lg font-bold">
                          {formatCurrency(item.unitPrice * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatCurrency(getCartTotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">{formatCurrency(getCartTotal())}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                  <Input
                    id="notes"
                    placeholder="e.g., Leave at door, Call before delivery"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <Button className="w-full" size="lg" onClick={handleCheckout} disabled={loading}>
                  {loading ? 'Placing Order...' : 'Place Order'}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  The seller will contact you to confirm delivery details
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

