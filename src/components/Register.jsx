import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ register, studentClass, setStudentClass }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const classes = [
    "1А",
    "1Б",
    "1В",
    "1Г",
    "2А",
    "2Б",
    "2В",
    "2Г",
    "3А",
    "3Б",
    "3В",
    "3Г",
    "4А",
    "4Б",
    "4В",
    "4Г",
    "5А",
    "5Б",
    "5В",
    "5Г",
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
      student_class: studentClass,
    };

    const res = await register(user);
    console.log(res);

    if (res?.access_token) {
      navigate("/");
    }

    setUsername("");
    setEmail("");
    setPassword("");
    setStudentClass("");
  }

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="register__input"
          type="text"
          name="username"
          placeholder="Username"
          required
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register__input"
          type="email"
          name="email"
          placeholder="E-mail"
          required
        />

        {/* SELECT КЛАССА */}
        <select
          className="register__input"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          required
        >
          <option value="">Выберите класс</option>
          {classes.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          className="register__input"
          type="password"
          placeholder="Password"
          required
        />

        <button>Регистрация</button>
        <Link to={"/login"}>Есть аккаунт?</Link>
      </form>
    </div>
  );
};

export default Register;
