import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Home = () => {
    const [taskList, setTaskList] = useState([]);
    const jwt = localStorage.getItem('jwt');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:3001/tasks', {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                setTaskList(response.data.taskList);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [jwt]);

    const onClickAdd = () => {
        navigate('/task/add');
    };

    const onClickLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="container py-5">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-primary fw-bold">My Tasks</h1>
                <button className="btn btn-danger" onClick={onClickLogout}>
                    Logout
                </button>
            </div>

            {/* Add Task Button */}
            <div className="text-end mb-4">
                <button className="btn btn-success" onClick={onClickAdd}>
                    + Add New Task
                </button>
            </div>

            {/* Task List or Empty State */}
            {taskList.length === 0 ? (
                <div className="text-center text-muted">
                    <h4>No tasks available</h4>
                </div>
            ) : (
                <div className="row g-4">
                    {taskList.map((task) => (
                        <div key={task._id} className="col-12 col-md-6 col-lg-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-header bg-primary text-white">
                                    <h5 className="mb-0">{task.name}</h5>
                                </div>
                                <div className="card-body">
                                    {/* Description */}
                                    <p className="text-muted mb-3">
                                        {task.description || 'No description provided'}
                                    </p>

                                    {/* Task Details */}
                                    <ul className="list-unstyled mb-3">
                                        <li>
                                            <strong>Due Date:</strong>{' '}
                                            {new Date(task.dueDate).toLocaleDateString()}
                                        </li>
                                        <li>
                                            <strong>Status:</strong>{' '}
                                            <span
                                                className={`badge ${
                                                    task.status === 'Completed'
                                                        ? 'bg-success'
                                                        : task.status === 'In Progress'
                                                        ? 'bg-warning text-dark'
                                                        : 'bg-secondary'
                                                }`}
                                            >
                                                {task.status}
                                            </span>
                                        </li>
                                        <li>
                                            <strong>Priority:</strong>{' '}
                                            <span
                                                className={`badge ${
                                                    task.priority === 'High'
                                                        ? 'bg-danger'
                                                        : task.priority === 'Medium'
                                                        ? 'bg-warning text-dark'
                                                        : 'bg-success'
                                                }`}
                                            >
                                                {task.priority}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-footer bg-light d-flex justify-content-between">
                                    <Link
                                        to={`/task/edit/${task._id}`}
                                        className="btn btn-sm btn-outline-primary"
                                    >
                                        Edit
                                    </Link>
                                    <button className="btn btn-sm btn-outline-danger">
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

export default Home;
