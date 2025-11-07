// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import saleProductsReducer from '../store/saleProductsSlice';  // Подключаем слайс для товаров со скидкой
import categoriesReducer from "../store/categoriesSlice";
import productsReducer from "../store/productsSlice";
import cartReducer from "../store/basketSlice";

export const store = configureStore({
  reducer: {
    saleProducts: saleProductsReducer,  // Добавляем слайс для товаров со скидкой
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer  // Слайс для корзины
  }
});