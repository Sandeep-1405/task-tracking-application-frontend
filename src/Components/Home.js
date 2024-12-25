import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import HOC from "./Hoc";

const Home = () => {
  const [taskList, setTaskList] = useState([]);
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchTasks();
  }, [jwt]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${url}/tasks`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setTaskList(response.data.taskList);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickAdd = () => {
    navigate("/task/add");
  };

  const onClickLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const onClickDelete = async (id) => {
    try {
      await axios.delete(`${url}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeSelect = async (value) => {
    try {
      if (value === "Select") {
        fetchTasks();
        return;
      }
      const res = await axios.get(
        `${url}/category/${value}`,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      setTaskList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeSearch = async (value) => {
    try {
      if (value === "") {
        fetchTasks();
        return;
      }
      const res = await axios.get(
        `${url}/search/${value}`,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      setTaskList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold text-dark">Task Manager</h1>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>

      {/* Search, Filter, Add Task Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4 p-3 bg-light rounded shadow">
        {/* Dropdown */}
        <div className="flex-grow-1">
          <select
            className="form-select"
            onChange={(e) => onChangeSelect(e.target.value)}
          >
            <option value="Select">Select</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="flex-grow-2" style={{ flexBasis: "50%" }}>
          <input
            type="search"
            className="form-control"
            placeholder="Search Task by name or description"
            onChange={(e) => onChangeSearch(e.target.value)}
          />
        </div>

        {/* Add Task Button */}
        <div className="flex-grow-1 text-center">
          <button className="btn btn-primary w-100" onClick={onClickAdd}>
            Add Task
          </button>
        </div>
      </div>


      {/* Task List or Empty State */}
      {taskList.length === 0 ? (
        <div className="text-center text-muted py-5">
          <h4>No tasks available</h4>
          <p>Click the "Add Task" button to create your first task.</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {taskList.map((task) => (
            <div key={task._id} className="col">
              <div className="card border-0 shadow-sm h-100">
                {/* Card Header */}
                <div
                  className="card-header text-white fw-bold"
                  style={{
                    backgroundColor: "green",
                    borderRadius: "8px 8px 0 0",
                  }}
                >
                  <h5 className="mb-0">{task.name}</h5>
                </div>

                {/* Card Body */}
                <div className="card-body d-flex flex-column">
                  <p className="text-muted mb-3" style={{ fontStyle: "italic" }}>
                    {task.description || "No description provided"}
                  </p>

                  <div className="bg-light p-3 rounded">
                    <ul className="list-unstyled mb-0">
                      <li>
                        <strong>Due Date:</strong>{" "}
                        {new Date(task.dueDate).toLocaleDateString()}
                      </li>
                    </ul>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div>
                        <strong>Status:</strong>{" "}
                        <span
                          className={`badge rounded-pill ${
                            task.status === "Completed"
                              ? "bg-success"
                              : task.status === "In Progress"
                              ? "bg-warning text-dark"
                              : "bg-secondary"
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                      <div>
                        <strong>Priority:</strong>{" "}
                        <span
                          className={`badge rounded-pill ${
                            task.priority === "High"
                              ? "bg-danger"
                              : task.priority === "Medium"
                              ? "bg-warning text-dark"
                              : "bg-primary"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="card-footer bg-white border-top-0 d-flex justify-content-between">
                  <Link
                    to={`/task/edit/${task._id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onClickDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HOC(Home);
