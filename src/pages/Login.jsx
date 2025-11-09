import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Label from '../components/ui/Label'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const role = searchParams.get('role')

  useEffect(() => {
    if (user) {
      navigate(`/${user.role}`)
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(email, password)

    if (result.success) {
      // Redirect based on user role
      navigate(`/${result.user.role}`)
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-green-50 to-amber-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-3xl">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            {role === 'buyer' && 'Login to browse fresh produce'}
            {role === 'seller' && 'Login to manage your products'}
            {!role && 'Login to your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <div className="text-center text-sm">
              <Link to="/auth/register" className="text-primary hover:underline">
                Don't have an account? Register
              </Link>
            </div>

            <div className="rounded-md bg-muted p-3 text-xs">
              <p className="mb-2 font-semibold">Demo Accounts:</p>
              <div className="space-y-1">
                <p>
                  <strong>Admin:</strong> admin@papi.test / Admin@123
                </p>
                <p>
                  <strong>Buyer:</strong> buyer1@papi.test / Buyer@123
                </p>
                <p>
                  <strong>Seller:</strong> seller1@papi.test / Seller@123
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

