import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import SchedulePage from "./pages/SchedulePage";
import GradesPage from "./pages/GradesPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./Layout/MainLayout";
import API from "./api/axios";
import AttendancePage from "./pages/AttendancePage";
const App = () => {
  const [data, setData] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [studentClass, setStudentClass] = useState("");
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const access = localStorage.getItem("access_token");
    if (access) {
      loadUser(access);
    }
  }, []);

  async function loadUser(access) {
    try {
      const res = await API.get("user-info/", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      console.log(res.data);

      setData(res.data);
      loadSchedule(access, res.data.student_class);
      loadGrades(access, res.data.username);
      loadAttendance(access, res.data.username);
      loadPayment(access, res.data.username);
    } catch (error) {
      console.error(`Ошибка при получении данных о usere: ${error}`);
    }
  }
  async function loadGrades(access, username) {
    try {
      const res = await API.get(`grades/?username=${username}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      setGrades(res.data);
    } catch (error) {
      console.error(`Ошибка при получении данных об оценках: ${error}`);
    }
  }
  async function loadAttendance(access, username) {
    try {
      const res = await API.get(`attendance/?username=${username}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      setAttendance(res.data);
    } catch (error) {
      console.error(`Ошибка при получении данных об оценках: ${error}`);
    }
  }

  async function loadSchedule(access, student_class = "1Б") {
    try {
      const res = await API.get(`schedule/?student_class=${student_class}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      setSchedule(res.data);
    } catch (error) {
      console.error(`Ошибка при получении расписания ученика: ${error}`);
    }
  }

  async function loadPayment(access, username) {
    try {
      const res = await API.get(`payment/?username=${username}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      setPayments(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(`Ошибка при получении данных об оплате: ${error}`);
    }
  }

  return (
    <Routes>
      {/* 🔓 Публичные */}
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/register"
        element={
          <RegisterPage
            studentClass={studentClass}
            setStudentClass={setStudentClass}
          />
        }
      />

      {/* 🔐 Приватные */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout data={data} />}>
          <Route
            path="/"
            element={
              <HomePage
                data={data}
                schedule={schedule}
                grades={grades}
                attendance={attendance}
              />
            }
          />
          <Route
            path="/profile"
            element={<ProfilePage data={data} payment={payments} />}
          />
          <Route
            path="/schedule"
            element={<SchedulePage schedule={schedule} />}
          />
          <Route path="/grades" element={<GradesPage grades={grades} />} />
          <Route
            path="/attendance"
            element={<AttendancePage attendance={attendance} />}
          />
        </Route>
      </Route>

      {/* ❌ 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
