import { usersAPI } from './api'
import { generateId } from '../lib/utils'

const AUTH_STORAGE_KEY = 'papi_auth'

export const authService = {
  // Login
  login: (email, password) => {
    const user = usersAPI.getByEmail(email)

    if (!user) {
      throw new Error('User not found')
    }

    if (user.password !== password) {
      throw new Error('Invalid password')
    }

    if (user.status !== 'active') {
      throw new Error('Account is not active. Please contact admin.')
    }

    // Create session
    const session = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        ...(user.role === 'buyer'
          ? {
              phone: user.phone,
              address: user.address,
              pincode: user.pincode,
            }
          : {}),
        ...(user.role === 'seller'
          ? {
              businessName: user.businessName,
              phone: user.phone,
              address: user.address,
              pincode: user.pincode,
              organicCertification: user.organicCertification,
            }
          : {}),
      },
      token: generateId('token'),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
    return session
  },

  // Register
  register: (userData) => {
    const existingUser = usersAPI.getByEmail(userData.email)

    if (existingUser) {
      throw new Error('Email already registered')
    }

    // Create new user
    const newUser = {
      id: generateId('user'),
      ...userData,
      status: 'active',
    }

    usersAPI.create(newUser)

    // Auto login after registration
    return authService.login(userData.email, userData.password)
  },

  // Logout
  logout: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  },

  // Get current session
  getSession: () => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY)
      if (!stored) return null

      const session = JSON.parse(stored)

      // Check if session expired
      if (session.expiresAt < Date.now()) {
        authService.logout()
        return null
      }

      return session
    } catch (error) {
      console.error('Error reading session:', error)
      return null
    }
  },

  // Get current user
  getCurrentUser: () => {
    const session = authService.getSession()
    return session?.user || null
  },

  // Update current user profile
  updateProfile: (updates) => {
    const session = authService.getSession()
    if (!session) throw new Error('Not authenticated')

    const updatedUser = usersAPI.update(session.user.id, updates)
    if (!updatedUser) throw new Error('Failed to update profile')

    // Update session
    session.user = {
      ...session.user,
      ...updates,
    }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))

    return updatedUser
  },

  // Reset password (demo - no email verification)
  resetPassword: (email, newPassword) => {
    const user = usersAPI.getByEmail(email)
    if (!user) {
      throw new Error('Email not found')
    }

    usersAPI.update(user.id, { password: newPassword })
    return true
  },

  // Check if authenticated
  isAuthenticated: () => {
    return authService.getSession() !== null
  },

  // Check user role
  hasRole: (role) => {
    const user = authService.getCurrentUser()
    return user?.role === role
  },
}

