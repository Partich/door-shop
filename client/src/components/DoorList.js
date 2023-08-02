import React, { useEffect, useState } from "react";
import { Door } from "./Door";
import { Pages } from "./Pages";

export function DoorList({ typeId }) {
  const [doors, setDoors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const limit = 6;

  useEffect(() => {
    async function fetchTotalRecords() {
      const response = await fetch(`/door${typeId ? `?typeId=${typeId}` : ''}`);
      const data = await response.json();
      setTotalRecords(data.count);
    }

    async function fetchDoors() {
      const response = await fetch(`/door?limit=${limit}&page=${currentPage}${typeId ? `&typeId=${typeId}` : ""}`);
      const data = await response.json();
      setDoors(data.rows);
    }

    fetchTotalRecords();
    fetchDoors();
  }, [typeId, currentPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / limit));
  }, [totalRecords]);

  useEffect(() => {
    setCurrentPage(1);
  }, [typeId]);

  function handlePageButtonClick(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <div>
      <div className="d-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {doors.map((door) => (
          <Door key={door.id} {...door}/>
        ))}
      </div>
      <Pages totalPages={totalPages} currentPage={currentPage} onPageButtonClick={handlePageButtonClick} />
    </div>
  );
}
