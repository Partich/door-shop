import React from "react";
import { Routes, Route, useParams} from "react-router-dom";
import { Catalog } from "./pages/Catalog";
import { AuthPage } from "./pages/AuthPage";
import { TestPage } from "./pages/TestPage";
import { Error } from "./pages/Error";
import { RegistrationPage } from "./pages/RegistarationPage";
import { CartPage } from "./pages/CartPage";
import { DoorPage } from "./components/DoorPage";
import { CreateDoor } from "./components/CreateDoor";
import { CreateType } from "./components/CreateType";
import { CreatePage } from "./components/CreatePage";

export const useRouts = (isAuth) => {

  function DoorWithId() {
    const { id } = useParams();
    return <DoorPage id={id} />;
  }

  if (isAuth) {
    return (
      <Routes>
        <Route path="catalog" element={<Catalog />} />
        <Route path="door/:id" element={<DoorWithId />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="createDoor" element={<CreateDoor />} />
        <Route path="createType" element={<CreateType />} />
        <Route path="createPage" element={<CreatePage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="catalog" element={<Catalog />} />
      <Route path="door/:id" element={<DoorWithId />} />
      <Route path="test" element={<TestPage />} />
      <Route path="auth" element={<AuthPage />} />
      <Route path="registration" element={<RegistrationPage />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};
