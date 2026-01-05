import { useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const navigate = useNavigate(); 
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")); // { id, email }

  useEffect(() => {
    if (!user) {
      // Not logged in → redirect
      toast.info("Please login first");
      navigate("/login");
      return;
    }
    fetchTasks();
  }, []);

  // Fetch tasks on page load
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create or Update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return; 

    setLoading(true);

    try {
      if (editingTask) {
        // Update
        await api.put(`/tasks/${editingTask.id}`, { title, isDone });
        toast.success("Task updated!");
      } else {
        // Create
        await api.post("/tasks", { title, isDone, userId: user.id }); // replace 1 with logged-in user id if needed
        toast.success("Task created!");
      }
      setTitle("");
      setIsDone(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  // Edit task
  const handleEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setIsDone(task.isDone);
  };

  // Delete task
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    setLoading(true);
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted!");
      fetchTasks();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">📝 Tasks</h2>

          <div className="card p-4 shadow-sm mb-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isDone"
                  checked={isDone}
                  onChange={(e) => setIsDone(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="isDone">
                  Completed
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2"></span>
                ) : null}
                {editingTask ? "Update Task" : "Add Task"}
              </button>
              {editingTask && (
                <button
                  type="button"
                  className="btn btn-secondary w-100 mt-2"
                  onClick={() => {
                    setEditingTask(null);
                    setTitle("");
                    setIsDone(false);
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          <div className="list-group">
            {loading && tasks.length === 0 ? (
              <div className="text-center py-3">Loading tasks...</div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-3">No tasks yet.</div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    task.isDone ? "list-group-item-success" : ""
                  }`}
                >
                  <div>
                    <strong>{task.title}</strong>{" "}
                    {task.isDone && <span className="badge bg-success">Done</span>}
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => handleEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
