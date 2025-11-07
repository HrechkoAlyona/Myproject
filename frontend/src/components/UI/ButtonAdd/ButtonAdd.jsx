import React from "react";
import s from "./ButtonAdd.module.css";

export default function ButtonAdd({
  onClick,
  added = false,
  locked = false,
  extra = "",
  children = "Add to cart",
}) {
  const handle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!locked && !added && onClick) onClick(e);
  };

  const cls = [s.root];

  if (added) cls.push(s.stateAdded);
  else if (locked) cls.push(s.stateDisabled);

  if (extra) cls.push(extra);

  return (
    <button
      type="button"
      className={cls.join(" ")}
      onClick={handle}
      disabled={locked || added}
    >
      {added ? "Added" : children}
    </button>
  );
}
