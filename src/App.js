import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import AddTask from './AddTask';
import Update from './Components/Update';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/task/add' element={<AddTask/>} />
        <Route path='/task/edit/:id' element={<Update/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
