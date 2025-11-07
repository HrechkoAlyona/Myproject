import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../api/axiosClient';  // Импортируем axiosClient по умолчанию

// Асинхронный запрос для получения категорий
export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async () => {
    const response = await axiosClient.get('/categories/all');  // Запрос на сервер
    return response.data;  // Возвращаем данные (список категорий)
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],  // Массив для хранения категорий
    status: 'idle',  // Статус загрузки (idle, loading, succeeded, failed)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';  // Когда запрос выполняется
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';  // Когда запрос успешен
        state.items = action.payload;  // Сохраняем полученные данные в состоянии
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = 'failed';  // Когда запрос не удался
      });
  },
});

export default categoriesSlice.reducer;
