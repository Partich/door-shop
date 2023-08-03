import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { CreateType } from "./CreateType";
import { CreateDoor } from "./CreateDoor";

export function CreatePage() {
  const [showCreateDoorModal, setShowCreateDoorModal] = useState(false);
  const [showCreateTypeModal, setShowCreateTypeModal] = useState(false);

  const handleOpenCreateDoorModal = () => {
    setShowCreateDoorModal(true);
  };

  const handleCloseCreateDoorModal = () => {
    setShowCreateDoorModal(false);
  };

  const handleOpenCreateTypeModal = () => {
    setShowCreateTypeModal(true);
  };

  const handleCloseCreateTypeModal = () => {
    setShowCreateTypeModal(false);
  };

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <Button variant="primary" onClick={handleOpenCreateDoorModal} className="mb-3">
        Добавить дверь
      </Button>

      <Button variant="success" onClick={handleOpenCreateTypeModal} className="mb-3">
        Добавить тип
      </Button>

      <Modal show={showCreateDoorModal} onHide={handleCloseCreateDoorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Door</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateDoor />
        </Modal.Body>
      </Modal>

      <Modal show={showCreateTypeModal} onHide={handleCloseCreateTypeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateType />
        </Modal.Body>
      </Modal>
    </div>
  );
}