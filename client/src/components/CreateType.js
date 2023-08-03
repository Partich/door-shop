import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useHttp } from "../hooks/http.hook";

export function CreateType() {
  const { request } = useHttp();
  const [type, setType] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await request("/type", "POST", { name: type });
      setShowSuccessMessage(true);
      setShowErrorMessage(false);
      setType("");
    } catch (error) {
      console.error(error);
      setShowSuccessMessage(false);
      setShowErrorMessage(true);
    }
  };

  return (
    <div>
      {showSuccessMessage && (
        <Alert variant="success" onClose={() => setShowSuccessMessage(false)} dismissible>
          Тип успешно добавлен!
        </Alert>
      )}

      {showErrorMessage && (
        <Alert variant="danger" onClose={() => setShowErrorMessage(false)} dismissible>
          Произошла ошибка при добавлении типа.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Type:</Form.Label>
          <Form.Control
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Submit
        </Button>
      </Form>
    </div>
  );
}