import { Link } from "react-router-dom"
import instagram from '../../assets/icons/ic-instagram.svg'
import whatsapp from '../../assets/icons/ic-whatsapp.svg'
import styles from './Footer.module.css'

const Footer = () => {
  return (
   <div className={styles.container}>
  <div className={styles.inner}>  
      <h2 className={styles.title}>Contact</h2>

      <div className={styles.footerAbout}>

        <div className={styles.footerAboutRowTop}>
          <div className={styles.footerCard}>
            <p>Phone</p>
            <a href="+49 30 915-88492">+49 30 915-88492</a>
          </div>

          <div className={styles.footerCard}>
            <p>Socials</p>
            <div className={styles.socials}>
              <img src={instagram} alt="" />
              <img src={whatsapp} alt="" />
            </div>
          </div>
        </div>

        <div className={styles.footerAboutRowBottom}>
          <div className={styles.footerCard}>
            <p>Address</p>
            <address>Wallstraße 9-13, 10179 Berlin<br />Deutschland</address>
          </div>

          <div className={styles.footerCard}>
            <p>Working Hours</p>
            <p>24 hours a day</p>
          </div>
        </div>

      </div>

      <div className={styles.mapContainer}>
    <iframe
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.826268337366!2d13.414859276739949!3d52.51314577981495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851e56fa34a65%3A0x80b6a3f172a2270b!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin%2C%20Germany!5e0!3m2!1sen!2sus!4v1622039898429!5m2!1sen!2sus&zoom=15&disableDefaultUI=true&scrollwheel=false"
        ></iframe>
      </div>
    </div>
    </div>
  )
}

export default Footer
