// src/pages/CategoryProductsPage/CategoryProductsPage.jsx
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProductsByCategory } from "../../store/productsSlice"; // Путь к слайсу
import { useParams } from "react-router-dom"; // Для получения id категории
import styles from "./CategoryProductsPage.module.css";  // Стили

export default function CategoryProductsPage() {
  const { id } = useParams();  // Получаем id категории из маршрута
  const dispatch = useDispatch();

  // Получаем товары из Redux
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsByCategory(id)); // Загружаем товары для выбранной категории
    }
  }, [id, dispatch, status]);

  if (status === "loading") {
    return <div>Loading products...</div>;
  }

  if (status === "failed") {
    return <div>Failed to load products.</div>;
  }

  return (
    <div>
      <h1>Products in Category {id}</h1>
      <div className={styles.productsList}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={`http://localhost:3333${product.image}`}
              alt={product.name}
            />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
