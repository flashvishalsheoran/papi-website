import { useState } from 'react'
import { Package } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { ordersAPI } from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'
import { formatCurrency, formatDate } from '../../lib/utils'

export default function SellerOrders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState(
    ordersAPI.getBySeller(user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  )
  const [filter, setFilter] = useState('all')

  const statusOptions = ['Pending', 'Confirmed', 'Delivered', 'Cancelled']
  const statusVariants = {
    Pending: 'warning',
    Confirmed: 'default',
    Delivered: 'success',
    Cancelled: 'destructive',
  }

  const handleStatusChange = (orderId, newStatus) => {
    ordersAPI.update(orderId, { status: newStatus })
    setOrders(
      ordersAPI.getBySeller(user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    )
  }

  const filteredOrders =
    filter === 'all' ? orders : orders.filter((order) => order.status === filter)

  if (orders.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <Package className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-2xl font-bold">No orders yet</h2>
            <p className="text-muted-foreground">
              When customers place orders, they will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">Orders</h1>

        {/* Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All ({orders.length})
          </Button>
          {statusOptions.map((status) => {
            const count = orders.filter((o) => o.status === status).length
            return (
              <Button
                key={status}
                variant={filter === status ? 'default' : 'outline'}
                onClick={() => setFilter(status)}
              >
                {status} ({count})
              </Button>
            )
          })}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No {filter !== 'all' ? filter.toLowerCase() : ''} orders found
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                    </div>
                    <Badge variant={statusVariants[order.status]}>{order.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 rounded-md bg-muted p-3">
                    <p className="text-sm font-medium">Customer: {order.buyerName}</p>
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

                  {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <p className="w-full text-sm font-medium">Update Status:</p>
                      {statusOptions
                        .filter((s) => s !== order.status)
                        .map((status) => (
                          <Button
                            key={status}
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(order.id, status)}
                          >
                            Mark as {status}
                          </Button>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

