import { createContext, useContext, useState, useEffect } from 'react'
import { productsAPI, ordersAPI } from '../services/api'
import { useAuth } from './AuthContext'
import { generateId } from '../lib/utils'

const CartContext = createContext(null)

const CART_STORAGE_KEY = 'papi_cart'

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cart, setCart] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    if (user?.role === 'buyer') {
      const stored = localStorage.getItem(`${CART_STORAGE_KEY}_${user.id}`)
      if (stored) {
        try {
          setCart(JSON.parse(stored))
        } catch (error) {
          console.error('Error loading cart:', error)
        }
      }
    } else {
      setCart([])
    }
  }, [user])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (user?.role === 'buyer') {
      localStorage.setItem(`${CART_STORAGE_KEY}_${user.id}`, JSON.stringify(cart))
    }
  }, [cart, user])

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === product.id)

      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [
        ...prevCart,
        {
          productId: product.id,
          productName: product.name,
          sellerId: product.sellerId,
          sellerName: product.sellerName,
          unit: product.unit,
          unitPrice: product.price,
          quantity,
          image: product.image,
        },
      ]
    })
  }

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart((prevCart) =>
      prevCart.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
  }

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const getCartBySeller = () => {
    const grouped = {}
    cart.forEach((item) => {
      if (!grouped[item.sellerId]) {
        grouped[item.sellerId] = {
          sellerId: item.sellerId,
          sellerName: item.sellerName,
          items: [],
        }
      }
      grouped[item.sellerId].items.push(item)
    })
    return Object.values(grouped)
  }

  const placeOrder = (notes = '') => {
    if (!user || user.role !== 'buyer') {
      throw new Error('Only buyers can place orders')
    }

    if (cart.length === 0) {
      throw new Error('Cart is empty')
    }

    // Group cart items by seller and create separate orders
    const ordersBySeller = getCartBySeller()
    const createdOrders = []

    ordersBySeller.forEach((sellerGroup) => {
      const order = {
        id: generateId('order'),
        buyerId: user.id,
        buyerName: user.name,
        sellerId: sellerGroup.sellerId,
        sellerName: sellerGroup.sellerName,
        items: sellerGroup.items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          qty: item.quantity,
          unit: item.unit,
          unitPrice: item.unitPrice,
        })),
        totalAmount: sellerGroup.items.reduce(
          (total, item) => total + item.unitPrice * item.quantity,
          0
        ),
        status: 'Pending',
        createdAt: new Date().toISOString(),
        notes,
      }

      ordersAPI.create(order)
      createdOrders.push(order)

      // Update product stock
      sellerGroup.items.forEach((item) => {
        const product = productsAPI.getById(item.productId)
        if (product) {
          productsAPI.update(item.productId, {
            stock: Math.max(0, product.stock - item.quantity),
          })
        }
      })
    })

    clearCart()
    return createdOrders
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    getCartBySeller,
    placeOrder,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

