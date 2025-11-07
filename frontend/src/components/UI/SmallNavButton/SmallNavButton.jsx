// frontend\src\components\UI\SmallNavButton\SmallNavButton.jsx

import { NavLink } from "react-router-dom";
import s from "./SmallNavButton.module.css";

export default function SmallNavButton({ to, children }) {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => isActive ? `${s.button} ${s.active}` : s.button}
    >
      {children}
    </NavLink>
  );
}
