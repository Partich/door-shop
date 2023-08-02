import React, { useEffect, useState } from "react";
import { TypeButton } from "./TypeButton";

export function TypeButtonList({ onClick }) {
    const [types, setTypes] = useState([]);
  
    useEffect(() => {
      async function fetchTypes() {
        const response = await fetch('/type');
        const data = await response.json();
        setTypes(data);
      }
      
      fetchTypes();
    }, []);
  
    return (
      <div className="d-flex flex-column">
        <button className="mb-2" onClick={() => onClick(null)}>Все</button>
        {types.map(type => <TypeButton key={type.id} {...type} onClick={onClick} />)}
      </div>
    );
  }