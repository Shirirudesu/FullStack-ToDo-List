import User from "../models/User.js";
import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  try {
    //Шаг 1: Есть ли Authorization header и проверить не пустой ли
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid auth header" });
    }
    //Шаг 2: Достать токен и проверить не пустой ли
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token" });
    }
    //Шаг 3: jwt.verify(). Проверить токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //---- Шаг 4(?): Получить userId из токена. Найти пользователя по id из токена. ----
    // Дополнение!! При любом действии сервер делает лишний запрос в базу данных (грузит её) к коллекции users
    //Нужно только в будущем в случае Админки, Бордов, или для возможности Блокировки Акка.
    // const user = await User.findById(decoded.userId);
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    //---- Шаг 5(?): Прикрепляем к юзеру ----
    // req.user = user;

    //Шаг 4+5: Больше не ищем в базе, просто берем ID из токена
    req.user = { _id: decoded.userId };

    //Шаг 6:  Передать управление дальше. Без next() запрос просто зависнет.
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
