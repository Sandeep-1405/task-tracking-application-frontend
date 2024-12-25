import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HOC from './Components/Hoc';

const AddTask = () => {
    const [task, setTask] = useState({
        name: '',
        description: '',
        dueDate: '',
        status: 'Pending',
        priority: 'Low',
    });

    const url = process.env.REACT_APP_BACKEND_URL;
    const jwt = localStorage.getItem('jwt');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        //console.log(task);
        try{
            const response = await axios.post(`${url}/tasks`,task,{
                headers:{
                    'Authorization': `Bearer ${jwt}`
                }
            })
            navigate('/')
            setTask({ name: '', description: '', dueDate: '', status: 'Pending', priority: 'Low' });
        }catch(error){
            console.log(error);
        }
        
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Add New Task</h2>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12">
                    <label htmlFor="name" className="form-label">
                        Task Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={task.name}
                        onChange={handleChange}
                        placeholder="Enter task name"
                        required
                    />
                </div>

                <div className="col-12">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        placeholder="Enter task description"
                        rows="3"
                        required
                    ></textarea>
                </div>

                <div className="col-12">
                    <label htmlFor="dueDate" className="form-label">
                        Due Date
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="dueDate"
                        name="dueDate"
                        value={task.dueDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-12">
                    <label htmlFor="status" className="form-label">
                        Status
                    </label>
                    <select
                        className="form-select"
                        id="status"
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="col-12">
                    <label htmlFor="priority" className="form-label">
                        Priority
                    </label>
                    <select
                        className="form-select"
                        id="priority"
                        name="priority"
                        value={task.priority}
                        onChange={handleChange}
                        required
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary m-3">
                        Add Task
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary m-3"
                        onClick={() => navigate('/')}
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HOC(AddTask);
