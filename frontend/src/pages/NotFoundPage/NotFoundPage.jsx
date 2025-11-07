import styles from './NotFound.module.css'
import image from '../../assets/error.png'

export default function NotFoundPage() {
  return (
    <section className="container">
      <div className={styles.notfound}>
        <img src={image} alt="" />
        <h1>Page Not Found</h1>
        <p>
          We’re sorry, the page you requested could not be found. Please go back
          to the homepage.
        </p>
      </div>
    </section>
  )
}
