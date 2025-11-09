import { Link } from 'react-router-dom'
import { Package, ShoppingCart, TrendingUp, IndianRupee } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { productsAPI, ordersAPI } from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'
import { formatCurrency, formatDate } from '../../lib/utils'

export default function SellerHome() {
  const { user } = useAuth()
  const myProducts = productsAPI.getBySeller(user.id)
  const myOrders = ordersAPI.getBySeller(user.id)

  const stats = {
    totalProducts: myProducts.length,
    activeOrders: myOrders.filter((o) => o.status === 'Pending' || o.status === 'Confirmed').length,
    totalRevenue: myOrders
      .filter((o) => o.status === 'Delivered')
      .reduce((sum, o) => sum + o.totalAmount, 0),
    lowStock: myProducts.filter((p) => p.stock > 0 && p.stock < 10).length,
  }

  const recentOrders = myOrders
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  const statusVariants = {
    Pending: 'warning',
    Confirmed: 'default',
    Delivered: 'success',
    Cancelled: 'destructive',
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Welcome, {user?.businessName || user?.name}!</h1>
          <p className="text-xl text-muted-foreground">Manage your products and orders</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                {stats.lowStock > 0 && `${stats.lowStock} low stock`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeOrders}</div>
              <p className="text-xs text-muted-foreground">Pending/Confirmed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myOrders.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">Delivered orders</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link to="/seller/products/add">
              <Card className="group cursor-pointer transition-all hover:shadow-lg">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Add Product</h3>
                    <p className="text-sm text-muted-foreground">List a new product</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/seller/products">
              <Card className="group cursor-pointer transition-all hover:shadow-lg">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Manage Products</h3>
                    <p className="text-sm text-muted-foreground">Edit or update products</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/seller/orders">
              <Card className="group cursor-pointer transition-all hover:shadow-lg">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">View Orders</h3>
                    <p className="text-sm text-muted-foreground">Manage customer orders</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Orders</h2>
            <Link to="/seller/orders">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          {recentOrders.length > 0 ? (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-4 hover:bg-muted/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.buyerName}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={statusVariants[order.status]}>{order.status}</Badge>
                          <p className="mt-1 font-bold">{formatCurrency(order.totalAmount)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No orders yet
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

