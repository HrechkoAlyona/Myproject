import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../store/categoriesSlice";
import { Link } from "react-router-dom"; // Для навигации
import styles from './CategoriesPage.module.css'; // Импортируем стили

export default function CategoriesPage() {
  const dispatch = useDispatch();
  
  // Получаем категории из Redux
  const categories = useSelector((state) => state.categories.items);
  const status = useSelector((state) => state.categories.status); // Статус загрузки

  // Загружаем категории, если они еще не загружены
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  // Если статус загрузки "loading", показываем сообщение о загрузке
  if (status === "loading") {
    return <div>Loading categories...</div>;
  }

  // Если запрос не удался
  if (status === "failed") {
    return <div>Failed to load categories.</div>;
  }

 return (
  <div className={styles.page}>

    <div className={styles.categoriesWrapper}>
      <h1 className={styles.title}>Categories Page</h1>

      <div className={styles.categoriesList}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryCard}>
            <Link to={`/categories/${category.id}`}>
              <img src={`http://localhost:3333${category.image}`} alt={category.title} />
              <h2>{category.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>

  </div>
)

}
