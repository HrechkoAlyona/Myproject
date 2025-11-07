// frontend/src/components/Header/Header.jsx

import React, { useEffect, useState } from 'react'               // <<< добавил useEffect, useState
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ROUTES } from '../../utils/routes'
import logo from '../../assets/icons/logo.svg'
import basketIcon from '../../assets/icons/basket-empty.svg'
import styles from './Header.module.css'

const Header = () => {
  const cartCount = useSelector(state =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
)

  const location = useLocation()

  // <<< state: обычный/компактный хедер
  const [compact, setCompact] = useState(false)

  // <<< слушаем скролл
  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 20) // если прокрутили вниз > 20px → сжимаем
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActiveLink = (path) => {
    if (path === ROUTES.HOME) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    // <<< добавил класс compact
    <header className={`${styles.topBar} ${compact ? styles.compact : ''}`}>
      <div className={styles.wrap}>

        <Link to={ROUTES.HOME} className={styles.brandBlock}>
          <img src={logo} alt="Pet Shop Logo" />
        </Link>

        <nav className={styles.navGroup}>
          <Link 
            to={ROUTES.HOME}
            className={`${styles.navItem} ${isActiveLink(ROUTES.HOME) ? styles.navItemActive : ''}`}
          >
            Main Page
          </Link>
          <Link 
            to={ROUTES.CATEGORIES}
            className={`${styles.navItem} ${isActiveLink(ROUTES.CATEGORIES) ? styles.navItemActive : ''}`}
          >
            Categories
          </Link>
          <Link 
            to={ROUTES.ALL_PRODUCTS}
            className={`${styles.navItem} ${isActiveLink(ROUTES.ALL_PRODUCTS) ? styles.navItemActive : ''}`}
          >
            All products
          </Link>
          <Link 
            to={ROUTES.SALE}
            className={`${styles.navItem} ${isActiveLink(ROUTES.SALE) ? styles.navItemActive : ''}`}
          >
            All sales
          </Link>
        </nav>

        <Link to={ROUTES.CART} className={styles.cartBadge}>
          <img src={basketIcon} alt="Shopping Cart" className={styles.basketPic} />
          {cartCount > 0 && (
            <span className={styles.cartCounter}>{cartCount}</span>
          )}
        </Link>

      </div>
    </header>
  )
}

export default Header
