import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag, Upload, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Label from '../../components/ui/Label'
import { useCart } from '../../contexts/CartContext'
import { formatCurrency } from '../../lib/utils'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  })
  const [uploadedFile, setUploadedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (allowedTypes.includes(file.type)) {
        setUploadedFile(file)
      } else {
        alert('Please upload only images (JPG, PNG), PDF, or DOCX files')
      }
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
  }

  const handleCheckout = () => {
    setShowCheckoutForm(true)
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.email) {
      alert('Please fill in all required fields')
      return
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerDetails.email)) {
      alert('Please enter a valid email address')
      return
    }

    // Validate phone
    if (customerDetails.phone.length < 10) {
      alert('Please enter a valid phone number')
      return
    }

    setLoading(true)
    try {
      // Simulate order placement
      const orderData = {
        ...customerDetails,
        cart: cart,
        total: getCartTotal(),
        file: uploadedFile?.name || null,
        orderDate: new Date().toISOString()
      }
      
      // Store in localStorage for demo
      const orders = JSON.parse(localStorage.getItem('guestOrders') || '[]')
      orders.push({ id: Date.now(), ...orderData })
      localStorage.setItem('guestOrders', JSON.stringify(orders))
      
      clearCart()
      setShowSuccess(true)
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
              We've received your order. The seller will contact you soon to confirm delivery details.
            </p>
            <Link to="/buyer/browse">
              <Button className="mt-4">Continue Shopping</Button>
            </Link>
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

          {/* Order Summary / Checkout Form */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>{showCheckoutForm ? 'Contact Details' : 'Order Summary'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!showCheckoutForm ? (
                  <>
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

                    <Button className="w-full" size="lg" onClick={handleCheckout}>
                      Proceed to Checkout
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      The seller will contact you to confirm delivery details
                    </p>
                  </>
                ) : (
                  <form onSubmit={handlePlaceOrder} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={customerDetails.name}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        value={customerDetails.phone}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={customerDetails.email}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes (Optional)</Label>
                      <textarea
                        id="notes"
                        placeholder="Special delivery instructions, preferences, etc."
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={customerDetails.notes}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, notes: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="file">Upload File (Optional)</Label>
                      <div className="space-y-2">
                        <input
                          id="file"
                          type="file"
                          accept="image/*,.pdf,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label htmlFor="file">
                          <div className="flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-input bg-background px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                            <Upload className="h-4 w-4" />
                            <span>Upload Image, PDF, or DOCX</span>
                          </div>
                        </label>
                        {uploadedFile && (
                          <div className="flex items-center justify-between rounded-md bg-muted p-2">
                            <span className="text-sm">{uploadedFile.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={removeFile}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="mb-4 flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">{formatCurrency(getCartTotal())}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowCheckoutForm(false)}
                          disabled={loading}
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          disabled={loading}
                          className="flex-1"
                        >
                          {loading ? 'Placing Order...' : 'Place Order'}
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

