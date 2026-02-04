'use client'

import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

/**
 * Cart Provider Component
 * Wrap POS page with this to enable cart functionality
 */
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  /**
   * Add product to cart
   * If product exists, increment qty; otherwise add new item
   *
   * @param {Object} product - Product object with id, name, price, stock
   * @param {number} qty - Quantity to add (default: 1)
   */
  const addToCart = useCallback((product, qty = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(item => item.productId === product.id)

      if (existingIndex >= 0) {
        // Product exists - update qty
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + qty
        }
        return updated
      } else {
        // New product - add to cart
        return [...prev, {
          productId: product.id,
          productName: product.name,
          unitPrice: product.price,
          qty: qty,
          maxStock: product.stock // Track available stock for client-side validation
        }]
      }
    })
  }, [])

  /**
   * Remove product from cart
   *
   * @param {string} productId - Product ID to remove
   */
  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter(item => item.productId !== productId))
  }, [])

  /**
   * Update qty for specific product
   *
   * @param {string} productId - Product ID
   * @param {number} newQty - New quantity (must be > 0)
   */
  const updateCartQty = useCallback((productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prev) => {
      const updated = [...prev]
      const index = updated.findIndex(item => item.productId === productId)

      if (index >= 0) {
        updated[index] = {
          ...updated[index],
          qty: newQty
        }
      }

      return updated
    })
  }, [removeFromCart])

  /**
   * Clear entire cart
   */
  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  /**
   * Get cart summary (total items, subtotal)
   *
   * @returns {{ totalItems: number, subtotal: number }}
   */
  const getCartSummary = useCallback(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0)
    const subtotal = cartItems.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0)

    return { totalItems, subtotal }
  }, [cartItems])

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      getCartSummary
    }}>
      {children}
    </CartContext.Provider>
  )
}

/**
 * useCart hook
 * Use this hook to access cart state and actions
 *
 * @returns {{
 *   cartItems: Array,
 *   addToCart: Function,
 *   removeFromCart: Function,
 *   updateCartQty: Function,
 *   clearCart: Function,
 *   getCartSummary: Function
 * }}
 *
 * @example
 * const { cartItems, addToCart } = useCart()
 * addToCart(product, 2)
 */
export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }

  return context
}
