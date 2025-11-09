import { Package, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { ordersAPI } from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'
import { formatCurrency, formatDate } from '../../lib/utils'

const statusConfig = {
  Pending: { icon: Clock, variant: 'warning', label: 'Pending' },
  Confirmed: { icon: CheckCircle, variant: 'default', label: 'Confirmed' },
  Delivered: { icon: CheckCircle, variant: 'success', label: 'Delivered' },
  Cancelled: { icon: XCircle, variant: 'destructive', label: 'Cancelled' },
}

export default function Orders() {
  const { user } = useAuth()
  const orders = ordersAPI.getByBuyer(user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  if (orders.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <Package className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-2xl font-bold">No orders yet</h2>
            <p className="text-muted-foreground">
              When you place orders, they will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => {
            const StatusIcon = statusConfig[order.status]?.icon || Package
            const statusVariant = statusConfig[order.status]?.variant || 'default'

            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <Badge variant={statusVariant}>
                      <StatusIcon className="mr-1 h-3 w-3" />
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 rounded-md bg-muted p-3">
                    <p className="text-sm font-medium">Seller: {order.sellerName}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Items:</h4>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>
                          {item.productName} × {item.qty} {item.unit}
                        </span>
                        <span className="font-medium">
                          {formatCurrency(item.unitPrice * item.qty)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {order.notes && (
                    <div className="mt-4 rounded-md border bg-background p-3">
                      <p className="text-sm font-medium">Delivery Notes:</p>
                      <p className="text-sm text-muted-foreground">{order.notes}</p>
                    </div>
                  )}

                  <div className="mt-4 flex justify-between border-t pt-4">
                    <span className="font-semibold">Total</span>
                    <span className="text-lg font-bold text-primary">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

