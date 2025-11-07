// C:\Users\ICH\Desktop\pets\myproject\frontend\src\store\basketSlice.js

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalPrice: 0,
}

function calc(items) {
  return items.reduce((sum, i) => sum + (i.discont_price || i.price) * i.quantity, 0)
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exist = state.items.find(i => i.id === action.payload.id)
      if (exist) exist.quantity += 1
      else state.items.push({ ...action.payload, quantity: 1 })
      state.totalPrice = calc(state.items)
    },
    removeFromCart: (state, action) => {
      const it = state.items.find(i => i.id === action.payload)
      if (!it) return
      if (it.quantity > 1) it.quantity -= 1
      else state.items = state.items.filter(i => i.id !== action.payload)
      state.totalPrice = calc(state.items)
    },

   
    deleteItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload)
      state.totalPrice = calc(state.items)
    },

    clearCart: (state) => {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const { addToCart, removeFromCart, clearCart, deleteItem } = cartSlice.actions
export default cartSlice.reducer
