// src/components/SaleSection/SaleSection.jsx
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SmallNavButton from "../UI/SmallNavButton/SmallNavButton";
import ButtonAdd from "../UI/ButtonAdd/ButtonAdd";
import { addToCart } from "../../store/basketSlice"; // Добавление в корзину
import { fetchSaleProductsData } from "../../store/saleProductsSlice"; // Новый экшн для получения товаров со скидкой
import { getImageUrl } from "../../api/axiosClient"
import styles from "./SaleSection.module.css";

export default function SaleSection() {
  const dispatch = useDispatch();

  // Получаем данные о товарах со скидкой из Redux
  const saleProducts = useSelector((state) => state.saleProducts.items) || [];
  const cartItems = useSelector((state) => state.cart.items); // Товары в корзине

  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  // Загружаем товары со скидкой при монтировании компонента
  useEffect(() => {
    dispatch(fetchSaleProductsData()); // Вызов экшна для загрузки данных
  }, [dispatch]);

  const safeScrollBy = (left) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left, behavior: "smooth" });
  };

  const scrollLeft = () => safeScrollBy(-316 - 20);
  const scrollRight = () => safeScrollBy(316 + 20);

  const onMouseDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    isDown.current = true;
    el.classList.add(styles.dragging);
    startX.current = e.pageX - el.offsetLeft;
    scrollStart.current = el.scrollLeft;
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    const el = scrollRef.current;
    if (!el || !isDown.current) return;
    const x = e.pageX - el.offsetLeft;
    const walk = x - startX.current;
    el.scrollLeft = scrollStart.current - walk;
  };

  const onMouseUp = () => {
    const el = scrollRef.current;
    if (!el) return;
    isDown.current = false;
    el.classList.remove(styles.dragging);
  };

  return (
    <section className={styles.section}>
      <div className={styles.topRow}>
        <h2 className={styles.title}>Sale</h2>
        <div className={styles.divider} />
       <SmallNavButton to="/products/sale">All sales</SmallNavButton>

      </div>

      <div className={styles.sliderWrapper}>
        <button
          className={styles.arrowLeft}
          onClick={scrollLeft}
          aria-label="left"
        >
          ‹
        </button>

        <div
          className={styles.grid}
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseUp}
          onMouseUp={onMouseUp}
        >
          {Array.isArray(saleProducts) &&
            saleProducts.map((prod) => {
              const added = cartItems?.some((i) => i.id === prod.id);

              return (
                <Link
                  key={prod.id}
                  to={`/products/${prod.id}`}
                  className={styles.card}
                >
                  <div className={styles.badge}>
                    -{Math.round((1 - prod.discont_price / prod.price) * 100)}%
                  </div>
                  <img
                    src={getImageUrl(prod.image)}
                    alt={prod.title}
                  />
                  <p className={styles.name}>{prod.title}</p>

                  <div className={styles.priceRow}>
                    <span className={styles.newPrice}>
                      ${prod.discont_price}
                    </span>
                    <span className={styles.oldPrice}>${prod.price}</span>
                  </div>

                  <div className={styles.addBtnWrap}>
                    <ButtonAdd
                      added={added}
                      onClick={() => dispatch(addToCart(prod))}
                    />
                  </div>
                </Link>
              );
            })}
        </div>

        <button
          className={styles.arrowRight}
          onClick={scrollRight}
          aria-label="right"
        >
          ›
        </button>
      </div>
    </section>
  );
}
