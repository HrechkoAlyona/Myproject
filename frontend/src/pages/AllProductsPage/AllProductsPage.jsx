// src/pages/AllProductsPage/AllProductsPage.jsx

import { useEffect, useState } from 'react'
import axios from "../../api/axiosClient";
import { getImageUrl } from "../../api/axiosClient";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/basketSlice";

import styles from './AllProductsPage.module.css'

export default function AllProductsPage() {

  const dispatch = useDispatch();

  const [products, setProducts] = useState([])
  const [showCount, setShowCount] = useState(12)

  useEffect(() => {
    axios.get('/products/all')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))
  }, [])

  const showMore = () => setShowCount(prev => prev + 12)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Products</h1>

      <div className={styles.productGrid}>
        {products.slice(0, showCount).map(p => {

          const discountPercent = p.discont_price
            ? Math.round((1 - p.discont_price / p.price) * 100)
            : 0

          return (
            <div className={styles.productCard} key={p.id}>

              {p.discont_price && (
                <span className={styles.badge}>
                  -{discountPercent}%
                </span>
              )}

              <img src={getImageUrl(p.image)} alt={p.title} className={styles.productImage} />

              <p className={styles.name}>{p.title}</p>

              <div className={styles.priceRow}>
                {p.discont_price && <span className={styles.newPrice}>${p.discont_price}</span>}
                <span className={p.discont_price ? styles.oldPrice : styles.newPrice}>
                  ${p.price}
                </span>
              </div>

              <div className={styles.addBtnWrap}>
                <button className={styles.addBtn} onClick={() => dispatch(addToCart(p))}>
                  Add to cart
                </button>
              </div>

            </div>
          )
        })}
      </div>

      {showCount < products.length && (
        <button className={styles.showMoreBtn} onClick={showMore}>
          Show more
        </button>
      )}

    </div>
  )
}
