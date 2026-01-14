import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import ProjectList from './pages/Project/ProjectList.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/projectList" element={<ProjectList />} />
    </Routes>
  )
}