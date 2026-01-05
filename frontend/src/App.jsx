import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <ToastContainer /> 
    </div>
  );
}

export default App;
