import React from 'react'
import { useNavigate } from 'react-router-dom'
import CustomButton from "../UI/CustomButton/CustomButton";
import { ROUTES } from "../../utils/routes";
import styles from './Banner.module.css'

const Banner = () => {
  const navigate = useNavigate()

  const handleCheckOutClick = () => {
    navigate(ROUTES.SALE)
  }

  return (
    <section className={styles.promoSection}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Amazing Discounts<br />
          on Pets Products!
        </h1>
        <CustomButton 
          onClick={handleCheckOutClick}
          className={styles.button}
        >
          Check out
        </CustomButton>
      </div>
    </section>
  )
}

export default Banner
