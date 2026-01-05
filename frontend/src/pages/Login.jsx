import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/auth/login", { email, password });
    // res.data contains { id, email }
    localStorage.setItem("user", JSON.stringify(res.data)); // store user in localStorage
    toast.success("Login successful!");
    navigate("/tasks"); // redirect to tasks page
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="text-center mb-4">
            <h1>📝 Task Evaluator</h1>
            <p>Login to your account</p>
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

              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2"></span>
                ) : null}
                Login
              </button>
            </form>

            <p className="mt-3 text-center">
              Don't have an account? <a href="/register">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
