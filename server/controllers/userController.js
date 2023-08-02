import apiError from "../error/ApiError.js";
const { badRequest, internal } = apiError;
import { hash, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
const { sign } = jwt;
import models from "../models/models.js";
const { User, Basket } = models;

const generateJwt = (id, email, role) => {
  return sign({ id, email, role }, 'secret key', { expiresIn: "1h" });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(badRequest("Некорректный email или password"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(badRequest("Пользователь с таким email уже существует"));
    }
    const hashPassword = await hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(internal("Пользователь не найден"));
    }
    let comparePassword = compareSync(password, user.password);
    if (!comparePassword) {
      return next(internal("Указан неверный пароль"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

export default new UserController();
