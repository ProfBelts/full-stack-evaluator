import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // <-- import toast
import "react-toastify/dist/ReactToastify.css"; // <-- import CSS
import api from "../api/axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users", { email, password });
      console.log(res.data);
      
      // Show success toast
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 2000, // 2 seconds
        onClose: () => navigate("/login"), // redirect after toast closes
      });

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="text-center mb-4">
            <h1>📝 Task Evaluator</h1>
            <p>Create your account</p>
          </div>

          <div className="card p-4 shadow-sm">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </form>
            <p className="mt-3 text-center">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
