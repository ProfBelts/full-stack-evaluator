import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Task from "./pages/Task"
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <div className="app">
      <Navbar />
      <ToastContainer /> 

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Task />} />
      </Routes>

     
    </div>
  );
}

export default App;
