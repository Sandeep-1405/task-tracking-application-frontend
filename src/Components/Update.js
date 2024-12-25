import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import HOC from './Hoc';

const Update = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('Pending');
    const [priority, setPriority] = useState('Medium');

    const { id } = useParams();
    const navigate = useNavigate();
    const jwt = localStorage.getItem('jwt');
    const url = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchTaskDetailsById = async () => {
            try {
                const res = await axios.get(
                    `${url}/tasks/${id}`,
                    { headers: { Authorization: `Bearer ${jwt}` } }
                );
                console.log(res);
                
                setName(res.data.task.name);
                setDescription(res.data.task.description);
                const fetchedDueDate = res.data.task.dueDate;
                const formattedDueDate = new Date(fetchedDueDate).toISOString().split('T')[0];
                setDueDate(formattedDueDate);
    
                setStatus(res.data.task.status);
                setPriority(res.data.task.priority);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTaskDetailsById();
    }, [id, jwt]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `${url}/tasks/${id}`,
                { name, description, dueDate, status, priority },{headers:{'Authorization': `Bearer ${jwt}`}}
            );
            alert('Task updated successfully!');
            navigate('/'); 
        } catch (error) {
            console.error(error);
            //alert('Failed to update task. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
                <h3 className="text-center mb-4">Update Task</h3>

                {/* Task Name */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Task Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter task name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        placeholder="Enter task description"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                {/* Due Date */}
                <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div> 

                {/* Status */}
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                        className="form-select"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                {/* Priority */}
                <div className="mb-4">
                    <label htmlFor="priority" className="form-label">Priority</label>
                    <select
                        className="form-select"
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                {/* Action Buttons */}
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary w-25 me-3">
                        Update Task
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary w-25"
                        onClick={() => navigate('/')}
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HOC(Update);
