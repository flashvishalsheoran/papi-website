import { useState } from 'react'
import { Users as UsersIcon, Ban, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Input from '../../components/ui/Input'
import { usersAPI } from '../../services/api'

export default function AdminUsers() {
  const [users, setUsers] = useState(usersAPI.getAll())
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const handleToggleStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active'
    usersAPI.update(userId, { status: newStatus })
    setUsers(usersAPI.getAll())
  }

  const filteredUsers = users.filter((user) => {
    const matchesFilter = filter === 'all' || user.role === filter
    const matchesSearch =
      search === '' ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const roleVariants = {
    admin: 'default',
    buyer: 'success',
    seller: 'warning',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">User Management</h1>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All ({users.length})
            </Button>
            <Button
              variant={filter === 'buyer' ? 'default' : 'outline'}
              onClick={() => setFilter('buyer')}
            >
              Buyers ({users.filter((u) => u.role === 'buyer').length})
            </Button>
            <Button
              variant={filter === 'seller' ? 'default' : 'outline'}
              onClick={() => setFilter('seller')}
            >
              Sellers ({users.filter((u) => u.role === 'seller').length})
            </Button>
            <Button
              variant={filter === 'admin' ? 'default' : 'outline'}
              onClick={() => setFilter('admin')}
            >
              Admins ({users.filter((u) => u.role === 'admin').length})
            </Button>
          </div>

          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:w-64"
          />
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5" />
              Users ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold">Name</th>
                    <th className="p-4 text-left text-sm font-semibold">Email</th>
                    <th className="p-4 text-left text-sm font-semibold">Role</th>
                    <th className="p-4 text-left text-sm font-semibold">Status</th>
                    <th className="p-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          {user.businessName && (
                            <p className="text-sm text-muted-foreground">{user.businessName}</p>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-sm">{user.email}</td>
                      <td className="p-4">
                        <Badge variant={roleVariants[user.role]}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant={user.status === 'active' ? 'success' : 'destructive'}>
                          {user.status === 'active' ? (
                            <>
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Active
                            </>
                          ) : (
                            <>
                              <Ban className="mr-1 h-3 w-3" />
                              Blocked
                            </>
                          )}
                        </Badge>
                      </td>
                      <td className="p-4">
                        {user.role !== 'admin' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleStatus(user.id, user.status)}
                          >
                            {user.status === 'active' ? 'Block' : 'Activate'}
                          </Button>
                        )}
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

