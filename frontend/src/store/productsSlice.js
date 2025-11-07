// src/store/productsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";  // Импортируем по умолчанию


// Асинхронный запрос для получения товаров по категории
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",  // Тип экшена
  async (categoryId) => {
    const response = await axiosClient.get(`/categories/${categoryId}/products`);
    return response.data;  // Возвращаем товары для выбранной категории
  }
);

// Асинхронный запрос для получения товаров на распродаже
export const fetchSaleProducts = createAsyncThunk(
  "products/fetchSale",  // Тип экшена
  async () => {
    const response = await axiosClient.get("/sales/products");
    return response.data;  // Возвращаем товары на распродаже
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],  // Массив всех товаров по категориям
    sale: [],   // Массив товаров на распродаже
    status: "idle",  // Статус загрузки
  },
  extraReducers: (builder) => {
    // Обработка для получения товаров на распродаже
    builder
      .addCase(fetchSaleProducts.pending, (state) => {
        state.status = "loading";  // Пока идет загрузка
      })
      .addCase(fetchSaleProducts.fulfilled, (state, action) => {
        state.status = "succeeded";  // Запрос успешен
        state.sale = action.payload;  // Сохраняем товары на распродаже
      })
      .addCase(fetchSaleProducts.rejected, (state) => {
        state.status = "failed";  // Запрос не удался
      });

    // Обработка для получения товаров по категории
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";  // Пока идет загрузка
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";  // Запрос успешен
        state.items = action.payload;  // Сохраняем товары по категориям
      })
      .addCase(fetchProductsByCategory.rejected, (state) => {
        state.status = "failed";  // Запрос не удался
      });
  },
});

export default productsSlice.reducer;
