import React, { useState } from "react";
import "./css/AuthPage.css";
import { useHttp } from "../hooks/http.hook";
import { useNavigate, NavLink } from "react-router-dom";

export const RegistrationPage = () => {
  const { loading, request } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async (e) => {
    try {
      e.preventDefault();
      await request("/user/registration", "POST", {
        ...form,
      });
      navigate("/auth");
    } catch (e) {}
  };

  return (
    <div className="authBlock">
      <h1>Регистрация</h1>
      <form>
        <input
          className="form-control mt-4"
          placeholder="Email"
          id="email"
          type="text"
          name="email"
          onChange={changeHandler}
        ></input>
        <input
          className="form-control mt-3"
          placeholder="Password"
          id="password"
          type="password"
          name="password"
          onChange={changeHandler}
        ></input>
        <button className="btn btn-success mt-3" onClick={registerHandler} disabled={loading}>
          Зарегистрироваться
        </button>
        <span>
          Есть акунт? <NavLink to="/auth">Вход</NavLink>
        </span>
      </form>
    </div>
  );
};
