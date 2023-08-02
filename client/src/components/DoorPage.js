import React, { useEffect, useState } from 'react';
import './css/DoorPage.css';
export function DoorPage({ id }) {
  const [door, setDoor] = useState({});

  useEffect(() => {
    async function fetchDoor() {
      const response = await fetch(`/door/${id}`);
      const data = await response.json();
      setDoor(data);
    }
    fetchDoor();
  }, [id]);

  return (
    <div className="door-container">
      <div className="door-image-container">
        <img className="door-image" src={`http://localhost:5000/static/${door.img}`} alt={door.name} />
      </div>
      <div className="door-details-container">
        <h1 className="door-name">{door.name}</h1>
        <div className="door-info">
          <div className="door-price">{door.price} руб.</div>
          <div className="door-rating">Рейтинг: {door.rating} / 5</div>
          <div className="door-type">Тип: {door.typeId}</div>
        </div>
        <hr />
        <div className="door-info-container">
          {door.info &&
            door.info.map((item) => (
              <div key={item.id} className="door-info-item">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}