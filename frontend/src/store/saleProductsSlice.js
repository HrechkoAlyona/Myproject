// src/store/saleProductsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productsAPI } from '../api/axiosClient';  // Используем относительный путь

// Создаем экшн для получения товаров со скидкой
export const fetchSaleProductsData = createAsyncThunk(
  'saleProducts/fetchSaleProductsData',  // Название экшна
  async (_, { rejectWithValue }) => {
    try {
      const response = await productsAPI.getSales();  // API запрос для получения товаров со скидкой
      return response.data;  // Возвращаем данные, которые получаем от API
    } catch (error) {
      // Улучшенная обработка ошибок, чтобы возвращать более четкие сообщения
      const message = error.response?.data?.message || 'Не удалось загрузить товары со скидкой';
      return rejectWithValue(message);
    }
  }
);

const saleProductsSlice = createSlice({
  name: 'saleProducts',  // Название слайса
  initialState: {
    items: [],  // Храним полученные товары со скидками
    loading: false,
    error: null,
  },
  reducers: {},  // Пока нет дополнительных редьюсеров
  extraReducers: (builder) => {
    builder
      // Обрабатываем состояние при ожидании данных
      .addCase(fetchSaleProductsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Обрабатываем состояние, когда данные успешно получены
      .addCase(fetchSaleProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;  // Сохраняем полученные товары
      })
      // Обрабатываем ошибку, если запрос не удался
      .addCase(fetchSaleProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Сохраняем ошибку
      });
  },
});

// Селекторы
export const selectSaleProducts = (state) => state.saleProducts.items;
export const selectSaleProductsLoading = (state) => state.saleProducts.loading;
export const selectSaleProductsError = (state) => state.saleProducts.error;

export default saleProductsSlice.reducer;
