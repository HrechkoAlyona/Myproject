import styles from "./CartItem.module.css"
import { useDispatch } from "react-redux"
import { addToCart, removeFromCart, deleteItem } from "../../store/basketSlice"

export default function CartItem({ item }) {
  const dispatch = useDispatch()

  const price = item.price
  const discount = item.discont_price || price   // если нет скидки – обычная цена

  return (
    <div className={styles.card}>

      {/* крестик */}
      <button
        className={styles.removeBtn}
        onClick={() => dispatch(deleteItem(item.id))}
        aria-label="remove item"
      >
        ×
      </button>

      <img
        src={`http://localhost:3333${item.image}`}
        className={styles.img}
        alt={item.title}
      />

      <div className={styles.center}>
        <p className={styles.title}>{item.title}</p>

        <div className={styles.counter}>
          <button onClick={() => dispatch(removeFromCart(item.id))}>−</button>
          <span>{item.quantity}</span>
          <button onClick={() => dispatch(addToCart(item))}>+</button>
        </div>
      </div>

      <div className={styles.priceBlock}>
        <span className={styles.mainPrice}>${discount * item.quantity}</span>
        {discount < price && (
          <span className={styles.oldPrice}>${price * item.quantity}</span>
        )}
      </div>
    </div>
  )
}
