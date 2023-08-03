import React from "react";

export function TypeButton({ id, name, onClick }) {
  return (
    <button className="mb-2" onClick={() => onClick(id)}>
      {name}
    </button>
  );
}
