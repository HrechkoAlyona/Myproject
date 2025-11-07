// src\components\CategoriesSection\CategoriesSection.jsx

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/categoriesSlice";
import SmallNavButton from "../UI/SmallNavButton/SmallNavButton";
import styles from "./CategoriesSection.module.css";

export default function CategoriesSection() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.items) || [];
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -292, behavior: "smooth" });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 292, behavior: "smooth" });

  return (
    <section className={styles.section}>

      {/* top bar with title + divider + button */}
    <div className={styles.topRow}>
  <h2 className={styles.title}>Categories</h2>
  <div className={styles.divider}></div>
  <SmallNavButton to="/categories">All categories</SmallNavButton>
</div>


      <div className={styles.sliderWrapper}>
        <button className={styles.arrowLeft} onClick={scrollLeft}>‹</button>

        <div className={styles.grid} ref={scrollRef}>
          {categories.map(cat => (
            <div key={cat.id} className={styles.card}>
              <img src={`http://localhost:3333${cat.image}`} alt={cat.title} />
              <p>{cat.title}</p>
            </div>
          ))}
        </div>

        <button className={styles.arrowRight} onClick={scrollRight}>›</button>
      </div>

    </section>
  );
}
