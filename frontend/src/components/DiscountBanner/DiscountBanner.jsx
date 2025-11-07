// src/components/DiscountBanner/DiscountBanner.jsx

import React, { useState } from "react";
import styles from "./DiscountBanner.module.css";
import Modal from "../UI/Modal/Modal";

const nameRe = /^[A-Za-z\s]{2,}$/;
const phoneRe = /^\+?\d{10,14}$/;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function DiscountBanner() {
  const [values, setValues] = useState({ name: "", phone: "", email: "" });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function validate(vals) {
    const e = {};
    if (!nameRe.test(vals.name)) e.name = "Invalid name";
    if (!phoneRe.test(vals.phone)) e.phone = "Invalid phone";
    if (!emailRe.test(vals.email)) e.email = "Invalid email";
    return e;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newVals = { ...values, [name]: value };
    setValues(newVals);
    setErrors(validate(newVals));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, phone: true, email: true });
    if (Object.keys(errs).length === 0) {
      setSent(true);
      setShowModal(true);
    }
  };

  return (
    <>
      <section className={styles.banner}>
        <h2 className={styles.title}>5% off on the first order</h2>

        <div className={styles.inner}>
          {/* левая часть пустая (макет) */}
          <div />

          {/* форма справа */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={() => setTouched({ ...touched, name: true })}
            />
            {touched.name && errors.name && <span className={styles.err}>{errors.name}</span>}

            <input
              name="phone"
              placeholder="Phone number"
              value={values.phone}
              onChange={handleChange}
              onBlur={() => setTouched({ ...touched, phone: true })}
            />
            {touched.phone && errors.phone && <span className={styles.err}>{errors.phone}</span>}

            <input
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={() => setTouched({ ...touched, email: true })}
            />
            {touched.email && errors.email && <span className={styles.err}>{errors.email}</span>}

            <button disabled={sent}>
              {sent ? "Request submitted" : "Get a discount"}
            </button>
          </form>
        </div>
      </section>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Congratulations!</h2>
          <p>The discount was sent to your email!</p>
        </Modal>
      )}
    </>
  );
}
