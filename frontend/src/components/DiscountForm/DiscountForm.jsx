// src/components/DiscountForm/DiscountForm.jsx

import { useState } from "react";
import styles from "./DiscountForm.module.css";
import SuccessModal from "../SuccessModal/SuccessModal";

const nameRe = /^[A-Za-z\s]{2,}$/;
const phoneRe = /^\+?\d{10,14}$/;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function DiscountForm() {
  const [v, setV] = useState({ name: "", phone: "", email: "" });
  const [t, setT] = useState({ name: false, phone: false, email: false });
  const [show, setShow] = useState(false);

  function validate() {
    return {
      name: nameRe.test(v.name) ? "" : "Enter valid name",
      phone: phoneRe.test(v.phone) ? "" : "Enter valid phone",
      email: emailRe.test(v.email) ? "" : "Enter valid email",
    };
  }

  const e = validate();
  const isValid = !e.name && !e.phone && !e.email;

  function submit(evn) {
    evn.preventDefault();
    setT({ name: true, phone: true, email: true });
    if (isValid) setShow(true);
  }

  function handleChange(evn) {
    setV({ ...v, [evn.target.name]: evn.target.value });
  }

  return (
    <>
      <form className={styles.form} onSubmit={submit}>
        <input name="name" placeholder="Name" value={v.name} onChange={handleChange} />
        {t.name && e.name && <span className={styles.err}>{e.name}</span>}

        <input name="phone" placeholder="Phone number" value={v.phone} onChange={handleChange} />
        {t.phone && e.phone && <span className={styles.err}>{e.phone}</span>}

        <input name="email" placeholder="Email" value={v.email} onChange={handleChange} />
        {t.email && e.email && <span className={styles.err}>{e.email}</span>}

        <button disabled={!isValid}>Get a discount</button>
      </form>

      {show && <SuccessModal onClose={() => setShow(false)} />}
    </>
  );
}
