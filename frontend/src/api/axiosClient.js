// frontend\src\api\axiosClient.js
import axios from 'axios';

// Базовый URL для API
const API_BASE_URL = 'http://localhost:3333';

// Утилита для создания полного URL изображения
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';  // Если путь пустой, возвращаем пустую строку
  if (imagePath.startsWith('http')) return imagePath;  // Если путь уже полный (начинается с http), возвращаем его как есть
  return `${API_BASE_URL}${imagePath}`;  // В остальных случаях добавляем базовый URL к пути
};

// Создание экземпляра axios с базовой конфигурацией
const api = axios.create({
  baseURL: API_BASE_URL,  // Устанавливаем базовый URL для всех запросов
  timeout: 10000,  // Устанавливаем таймаут 10 секунд
  headers: {
    'Content-Type': 'application/json',  // Устанавливаем заголовки для всех запросов (формат JSON)
  },
});

// Интерсептор для обработки ответов от API
api.interceptors.response.use(
  (response) => response,  // Если ответ успешный, возвращаем его
  (error) => {
    console.error('Ошибка API:', error);  // Логируем ошибку в консоль
    return Promise.reject(error);  // Отказываемся от выполнения запроса с ошибкой
  }
);

// Методы API для категорий товаров
export const categoriesAPI = {
  // Получить все категории товаров
  getAll: () => api.get('/categories/all'),
  
  // Получить категорию по ID
  getById: (id) => api.get(`/categories/${id}`),
};

// Методы API для продуктов
export const productsAPI = {
  // Получить все товары
  getAll: () => api.get('/products/all'),
  
  // Получить продукт по ID
  getById: (id) => api.get(`/products/${id}`),
  
  // Получить продукты по категории
  getByCategory: (categoryId) => api.get(`/categories/${categoryId}`),
  
  // Получить товары со скидкой
  getSales: async () => {
    const response = await api.get('/products/all');  // Получаем все продукты
    // Фильтруем продукты, у которых есть цена со скидкой
    const saleProducts = response.data.filter((product) => 
      product.discont_price !== null &&
      product.discont_price !== undefined && 
      product.discont_price < product.price  // Проверка, что скидка меньше оригинальной цены
    );
    return { ...response, data: saleProducts };  // Возвращаем данные с фильтрованными товарами
  },
};

// Экспортируем созданный экземпляр axios и методы API
export default api;
