import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHttp } from "../hooks/http.hook";

export function CreateType() {
  const { request } = useHttp();
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    await request("/type", "POST", { name: type });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Type:</Form.Label>
          <Form.Control type="text" value={type} onChange={(e) => setType(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
