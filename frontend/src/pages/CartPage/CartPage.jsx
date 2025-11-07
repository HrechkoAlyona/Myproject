// src/pages/CartPage.jsx

import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import CartItem from "../../components/Cart/CartItem"
import OrderForm from "../../components/Cart/OrderForm"
import { clearCart } from "../../store/basketSlice"
import Modal from "../../components/UI/Modal/Modal"
import SmallNavButton from "../../components/UI/SmallNavButton/SmallNavButton"
import styles from "./CartPage.module.css"

export default function CartPage() {

  const dispatch = useDispatch()
  const items = useSelector((s) => s.cart.items)
  const [showModal, setShowModal] = useState(false)

  const total = items.reduce(
    (sum, i) => sum + (i.discont_price || i.price) * i.quantity,
    0
  )

  const handleOrderSuccess = () => {
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
    dispatch(clearCart())
  }

  return (
    <section className={styles.page}>

      {/* HEADER ROW like CategoriesSection */}
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Shopping cart</h1>
        <div className={styles.divider}></div>
        <SmallNavButton to="/">Back to the store</SmallNavButton>
      </div>

      {/* если корзина пустая */}
      {items.length === 0 ? (
        <div className={styles.emptyBlock}>
          <p className={styles.empty}>
            Looks like you have no items in your basket currently.
          </p>
          <SmallNavButton to="/">
            Continue shopping
          </SmallNavButton>
        </div>
      ) : (
        // если есть товары
        <div className={styles.cartContent}>
          <div className={styles.left}>
            {items.map((p) => (
              <CartItem key={p.id} item={p} />
            ))}

            <button className={styles.clear} onClick={() => dispatch(clearCart())}>
              Clear cart
            </button>
          </div>

          <div className={styles.cartSidebar}>
            <OrderForm
              total={total}
              count={items.length}
              onSuccess={handleOrderSuccess}
            />
          </div>
        </div>
      )}

      {/* модалка */}
      {showModal && (
        <Modal onClose={handleModalClose}>
          <>
            <h2>Congratulations!</h2>
            <p>
              Your order has been successfully placed on the website.<br />
              A manager will contact you shortly to confirm your order.
            </p>
            <SmallNavButton to="/">Back to the Start</SmallNavButton>
          </>
        </Modal>
      )}

    </section>
  )
}
