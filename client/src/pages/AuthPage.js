import React, { useContext, useState } from "react";
import "./css/AuthPage.css";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const { loading, request } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      await request("/user/login", "POST", { ...form }).then((data) => {
        auth.login(data.token);
      });
      navigate("/catalog");
    } catch (e) {}
  };

  return (
    <div className="authBlock">
      <h1>Авторизация</h1>
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
        <button className="btn btn-success mt-3" onClick={loginHandler} disabled={loading}>
          Войти
        </button>
        <span>
          Нет акунта? <NavLink to="/registration">Регистрация</NavLink>
        </span>
      </form>
    </div>
  );
};
