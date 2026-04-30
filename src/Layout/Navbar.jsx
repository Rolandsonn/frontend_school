import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const [access, setAccess] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const access = localStorage.getItem("access_token");
    setData(user);
    setAccess(access);
  }, [data]);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <h3>Электронный дневник</h3>
      <button onClick={logout}>Выйти</button>
    </header>
  );
};

export default Navbar;
