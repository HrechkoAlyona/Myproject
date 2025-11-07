// src/pages/SaleProductsPage/SaleProductsPage.jsx
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchSaleProductsData } from "../../store/saleProductsSlice"
import { Link } from "react-router-dom"
import { getImageUrl } from "../../api/axiosClient"
import styles from './SaleProductsPage.module.css'

export default function SaleProductsPage() {
  const dispatch = useDispatch()

  const saleProducts = useSelector(s => s.saleProducts.items)

  useEffect(() => {
    dispatch(fetchSaleProductsData())
  }, [dispatch])

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>All Sale</h1>

      <div className={styles.grid}>
        {saleProducts.map(p => (
          <Link key={p.id} to={`/products/${p.id}`} className={styles.card}>
            <span className={styles.badge}>
              -{ Math.round((1 - p.discont_price/p.price) * 100) }%
            </span>

            <img src={getImageUrl(p.image)} alt={p.title} />

            <p className={styles.name}>{p.title}</p>

            <div className={styles.priceRow}>
              <span className={styles.newPrice}>${p.discont_price}</span>
              <span className={styles.oldPrice}>${p.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
