import usersData from '../data/users.json'
import productsData from '../data/products.json'
import ordersData from '../data/orders.json'
import categoriesData from '../data/categories.json'

const STORAGE_KEYS = {
  USERS: 'papi_users',
  PRODUCTS: 'papi_products',
  ORDERS: 'papi_orders',
  CATEGORIES: 'papi_categories',
}

// Initialize localStorage with seed data if empty
function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(usersData))
  }
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(productsData))
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(ordersData))
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categoriesData))
  }
}

// Initialize on module load
initializeStorage()

// Generic read function
function readData(key, defaultData = []) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultData
  } catch (error) {
    console.error(`Error reading ${key}:`, error)
    return defaultData
  }
}

// Generic write function
function writeData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error(`Error writing ${key}:`, error)
    return false
  }
}

// Users API
export const usersAPI = {
  getAll: () => readData(STORAGE_KEYS.USERS, usersData),
  getById: (id) => readData(STORAGE_KEYS.USERS, usersData).find((u) => u.id === id),
  getByEmail: (email) => readData(STORAGE_KEYS.USERS, usersData).find((u) => u.email === email),
  create: (user) => {
    const users = readData(STORAGE_KEYS.USERS, usersData)
    users.push(user)
    writeData(STORAGE_KEYS.USERS, users)
    return user
  },
  update: (id, updates) => {
    const users = readData(STORAGE_KEYS.USERS, usersData)
    const index = users.findIndex((u) => u.id === id)
    if (index !== -1) {
      users[index] = { ...users[index], ...updates }
      writeData(STORAGE_KEYS.USERS, users)
      return users[index]
    }
    return null
  },
  delete: (id) => {
    const users = readData(STORAGE_KEYS.USERS, usersData)
    const filtered = users.filter((u) => u.id !== id)
    writeData(STORAGE_KEYS.USERS, filtered)
    return true
  },
}

// Products API
export const productsAPI = {
  getAll: () => readData(STORAGE_KEYS.PRODUCTS, productsData),
  getById: (id) => readData(STORAGE_KEYS.PRODUCTS, productsData).find((p) => p.id === id),
  getBySeller: (sellerId) =>
    readData(STORAGE_KEYS.PRODUCTS, productsData).filter((p) => p.sellerId === sellerId),
  getByCategory: (category) =>
    readData(STORAGE_KEYS.PRODUCTS, productsData).filter((p) => p.category === category),
  search: (query) => {
    const products = readData(STORAGE_KEYS.PRODUCTS, productsData)
    const lowerQuery = query.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    )
  },
  create: (product) => {
    const products = readData(STORAGE_KEYS.PRODUCTS, productsData)
    products.push(product)
    writeData(STORAGE_KEYS.PRODUCTS, products)
    return product
  },
  update: (id, updates) => {
    const products = readData(STORAGE_KEYS.PRODUCTS, productsData)
    const index = products.findIndex((p) => p.id === id)
    if (index !== -1) {
      products[index] = { ...products[index], ...updates }
      writeData(STORAGE_KEYS.PRODUCTS, products)
      return products[index]
    }
    return null
  },
  delete: (id) => {
    const products = readData(STORAGE_KEYS.PRODUCTS, productsData)
    const filtered = products.filter((p) => p.id !== id)
    writeData(STORAGE_KEYS.PRODUCTS, filtered)
    return true
  },
}

// Orders API
export const ordersAPI = {
  getAll: () => readData(STORAGE_KEYS.ORDERS, ordersData),
  getById: (id) => readData(STORAGE_KEYS.ORDERS, ordersData).find((o) => o.id === id),
  getByBuyer: (buyerId) =>
    readData(STORAGE_KEYS.ORDERS, ordersData).filter((o) => o.buyerId === buyerId),
  getBySeller: (sellerId) =>
    readData(STORAGE_KEYS.ORDERS, ordersData).filter((o) => o.sellerId === sellerId),
  create: (order) => {
    const orders = readData(STORAGE_KEYS.ORDERS, ordersData)
    orders.push(order)
    writeData(STORAGE_KEYS.ORDERS, orders)
    return order
  },
  update: (id, updates) => {
    const orders = readData(STORAGE_KEYS.ORDERS, ordersData)
    const index = orders.findIndex((o) => o.id === id)
    if (index !== -1) {
      orders[index] = { ...orders[index], ...updates }
      writeData(STORAGE_KEYS.ORDERS, orders)
      return orders[index]
    }
    return null
  },
  delete: (id) => {
    const orders = readData(STORAGE_KEYS.ORDERS, ordersData)
    const filtered = orders.filter((o) => o.id !== id)
    writeData(STORAGE_KEYS.ORDERS, filtered)
    return true
  },
}

// Categories API
export const categoriesAPI = {
  getAll: () => readData(STORAGE_KEYS.CATEGORIES, categoriesData),
  getById: (id) => readData(STORAGE_KEYS.CATEGORIES, categoriesData).find((c) => c.id === id),
  getBySlug: (slug) =>
    readData(STORAGE_KEYS.CATEGORIES, categoriesData).find((c) => c.slug === slug),
  create: (category) => {
    const categories = readData(STORAGE_KEYS.CATEGORIES, categoriesData)
    categories.push(category)
    writeData(STORAGE_KEYS.CATEGORIES, categories)
    return category
  },
  update: (id, updates) => {
    const categories = readData(STORAGE_KEYS.CATEGORIES, categoriesData)
    const index = categories.findIndex((c) => c.id === id)
    if (index !== -1) {
      categories[index] = { ...categories[index], ...updates }
      writeData(STORAGE_KEYS.CATEGORIES, categories)
      return categories[index]
    }
    return null
  },
  delete: (id) => {
    const categories = readData(STORAGE_KEYS.CATEGORIES, categoriesData)
    const filtered = categories.filter((c) => c.id !== id)
    writeData(STORAGE_KEYS.CATEGORIES, filtered)
    return true
  },
}

