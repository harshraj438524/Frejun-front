import './App.css';
import Login from '../src/components/login/Login'
import Signup from '../src/components/signup/Signup'
import Home  from '../src/components/home/Home'
import { Routes, Route } from "react-router-dom"
function App() {
  return (
    <div >
  <Routes>
        <Route path="/home" element={ <Home/> } />
        <Route path="/" element={ <Signup/> } />
        <Route path="/login" element={ <Login/> } />
  </Routes>
    </div>
  );
}

export default App;
