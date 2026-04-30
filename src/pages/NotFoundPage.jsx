import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-box">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Страница не найдена</h2>
        <p className="notfound-text">
          Похоже, вы попали не туда. Такой страницы не существует.
        </p>

        <Link to="/" className="notfound-btn">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
