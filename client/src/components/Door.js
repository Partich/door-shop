import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Door({ id, name, price, rating, img }) {
  return (
    <Link to={`/door/${id}`} className="text-center m-1" style={{ height: 400, width: 300 }}>
      <div>
        <Image height={300} src={`http://localhost:5000/static/${img}`} />
        <h2>{name}</h2>
      </div>
    </Link>
  );
}
