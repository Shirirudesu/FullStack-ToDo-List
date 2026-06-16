import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Шаг 1: Добавляем Request Interceptor (Перехватчик ЗАПРОСА)
api.interceptors.request.use(function (config) {
  // Do something before the request is sent
  const token = localStorage.getItem("token");
  //Шаг 2: Если токен там есть (пользователь уже залогинился)
  if (token) {
    //Шаг 3: Кладем его в заголовок Authorization. config.headers — это объект со всеми заголовками текущего запроса
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  //Шаг 4: Возвращаем config, иначе запрос зависнет
  return config;
});

// Добавляем Response Interceptor (Перехватчик ОТВЕТА) — пока оставим пустым
api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default api;
