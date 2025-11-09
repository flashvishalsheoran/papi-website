import { Users, Package, ShoppingCart, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { usersAPI, productsAPI, ordersAPI } from '../../services/api'
import { formatCurrency, formatDate } from '../../lib/utils'

export default function AdminDashboard() {
  const users = usersAPI.getAll()
  const products = productsAPI.getAll()
  const orders = ordersAPI.getAll()

  const stats = {
    totalUsers: users.length,
    buyers: users.filter((u) => u.role === 'buyer').length,
    sellers: users.filter((u) => u.role === 'seller').length,
    totalProducts: products.length,
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === 'Pending').length,
    totalRevenue: orders
      .filter((o) => o.status === 'Delivered')
      .reduce((sum, o) => sum + o.totalAmount, 0),
  }

  const recentOrders = orders
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  const statusVariants = {
    Pending: 'warning',
    Confirmed: 'default',
    Delivered: 'success',
    Cancelled: 'destructive',
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground">Manage your marketplace</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {stats.buyers} buyers, {stats.sellers} sellers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                {stats.pendingOrders} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">From delivered orders</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link to="/admin/users">
              <Card className="group cursor-pointer transition-all hover:shadow-lg">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Manage Users</h3>
                    <p className="text-sm text-muted-foreground">{stats.totalUsers} users</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/admin/products">
              <Card className="group cursor-pointer transition-all hover:shadow-lg">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Manage Products</h3>
                    <p className="text-sm text-muted-foreground">{stats.totalProducts} products</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/admin/orders">
              <Card className="group cursor-pointer transition-all hover:shadow-lg">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">View Orders</h3>
                    <p className="text-sm text-muted-foreground">{stats.totalOrders} orders</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/admin/categories">
              <Card className="group cursor-pointer transition-all hover:shadow-lg">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Categories</h3>
                    <p className="text-sm text-muted-foreground">Manage categories</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">Recent Orders</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentOrders.map((order) => (
                  <div key={order.id} className="p-4 hover:bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.buyerName} → {order.sellerName}
                        </p>
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
        </div>
      </div>
    </div>
  )
}

