import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    //1 шаг: Получить нужные данные для проверки
    const { username, email, password } = req.body;
    //2 шаг: Проверить чтобы поля были не пустые
    if (!email || !password) {
      return res.status(400).json({ message: "Fill in all fields" });
    }
    //3 шаг: Проверить длину пароля
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password mus contain at least 6 symbols!" });
    }
    //4 шаг: Проверить email, условно чтобы начиналлось с собачки, по размеру и прочему
    if (!email.includes("@") || email.length < 5) {
      return res.status(400).json({
        message:
          "Incorrect email! Email must contain @ and be at least 5 characters",
      });
    }
    //5 шаг: Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    //6 шаг: Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //7 шаг: Создали пользователя
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log("USER CREATED:", user);

    //7.5 ГЕНЕРИРУЕМ JWT ТОКЕН ДЛЯ АВТОЛОГИНА!!! (как в loginUser)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    //8 шаг: Отдали ответ + ТОКЕН ДЛЯ АВТОЛОГИНА (до этого не нужно было)
    res.status(201).json({
      message: "Пользователь создан",
      userId: user._id,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    //1 шаг: Получить уже email and password
    const { email, password } = req.body;
    //2 шаг: Найти пользователя
    const user = await User.findOne({ email });
    //3 шаг: Проверить есть ли этот юзер
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //4 шаг: bcrypt.compare() сравнить пароль и почту
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    //5 шаг: Сгенерировали JWT и вернули ответ
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // 6 шаг: Вернуть ответ (токен уйдёт на фронт)
    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
