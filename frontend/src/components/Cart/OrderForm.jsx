// src/components/Cart/OrderForm.jsx

import styles from "./OrderForm.module.css"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { clearCart } from "../../store/basketSlice"

export default function OrderForm({ total, count, onSuccess }) {

  const dispatch = useDispatch()
  const items = useSelector(s => s.cart.items)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = e.target
    const body = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      order: items.map(i => ({
        id: i.id,
        quantity: i.quantity,
        price: i.discont_price || i.price
      }))
    }

    await axios.post("http://localhost:3333/order/send", body)

    dispatch(clearCart())
    form.reset()

    // говорим CartPage “успех!”
    onSuccess()
  }

  return (
    <div className={styles.box}>
      <h3 className={styles.title}>Order details</h3>

      <p>{count} items</p>

      <div className={styles.totalRow}>
        <span>Total</span>
        <span className={styles.big}>${total}</span>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required />
        <input name="phone" placeholder="Phone number" required />
        <input name="email" placeholder="Email" required />
        <button type="submit" className={styles.btn}>
          Order
        </button>
      </form>
    </div>
  )
}
