import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // get logged-in user

  const handleLogout = () => {
    localStorage.removeItem("user"); // remove logged-in user
    navigate("/login"); // redirect to login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 py-2 shadow-sm">
      <Link className="navbar-brand" to="/">
        📝 Task Evaluator
      </Link>

      <div className="collapse navbar-collapse justify-content-end">
        {user ? (
          <div className="d-flex align-items-center">
            <span className="me-3">Hello, {user.email}</span>
            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="text-muted">
            <span>Welcome! Please login or register to manage your tasks.</span>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
