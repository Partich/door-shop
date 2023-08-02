import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

export function CreateDoor() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState(null);
  const [info, setInfo] = useState([{ title: '', description: '' }]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    fetch('/type')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch types');
        }
      })
      .then((data) => {
        setTypes(data);
        setSelectedType(data[0].id); // выбираем первый тип по умолчанию
      })
      .catch((error) => {
        // обработка ошибки
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('typeId', selectedType);
    if (img) {
      formData.append('img', img);
    }
    formData.append('info', JSON.stringify(info));

    fetch('/door', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // успешный ответ от сервера
        } else {
          // обработка ошибки
        }
      })
      .catch((error) => {
        // обработка ошибки
      });
  };

  const handleAddInfo = () => {
    setInfo([...info, { title: '', description: '' }]);
  };

  const handleInfoChange = (event, index, field) => {
    const newInfo = [...info];
    newInfo[index][field] = event.target.value;
    setInfo(newInfo);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </Form.Group>
      <Row>
        <Col>
          <Form.Group controlId="formPrice">
            <Form.Label>Price:</Form.Label>
            <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formType">
            <Form.Label>Type:</Form.Label>
            <Form.Control as="select" value={selectedType} onChange={handleTypeChange} required>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="formInfo">
        <Form.Label>Info:</Form.Label>
        {info.map((item, index) => (
          <div key={index} className="mb-3">
            <Form.Control type="text" value={item.title} onChange={(e) => handleInfoChange(e, index, 'title')} required placeholder="Title" />
            <Form.Control type="text" value={item.description} onChange={(e) => handleInfoChange(e, index, 'description')} required placeholder="Description" />
          </div>
        ))}
        <Button variant="secondary" onClick={handleAddInfo}>
          Add Info
        </Button>
      </Form.Group>
      <Form.Group controlId="formImage">
        <Form.Label>Image:</Form.Label>
        <Form.Control type="file" onChange={(e) => setImg(e.target.files[0])} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}