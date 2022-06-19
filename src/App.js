import './App.css';

//Pages
import Register from './components/pages/auth/Register';
import Login from './components/pages/auth/Login';
import Home from './components/pages/Home';

//Layouts
import Navbar from './components/layouts/Navbar';

import { Routes , Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <h1>Hello react</h1>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
