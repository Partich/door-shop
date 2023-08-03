import React, { useState } from "react";
import { DoorList } from "../components/DoorList";
import { TypeButtonList } from "../components/TypeButtonList";
import { Container, Row, Col } from "react-bootstrap";

export function Catalog() {
  const [typeId, setTypeId] = useState(null);

  function handleTypeButtonClick(id) {
    setTypeId(id);
  }

  return (
    <Container>
      <Row className="mt-2">
        <Col md={2}>
          <TypeButtonList onClick={handleTypeButtonClick} />
        </Col>
        <Col md={9}>
          <DoorList typeId={typeId} />
        </Col>
      </Row>
    </Container>
  );
}
