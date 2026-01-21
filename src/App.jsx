import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import FindPassword from './pages/FindPassword.jsx';
import ProjectList from './pages/Project/ProjectList.jsx';
import ProjectListDetail from './pages/Project/ProjectListDetail.jsx';
import PlanningDetail from './pages/Project/PlanningDetail.jsx';
import TechDetail from './pages/Project/TechDetail.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/findPassword" element={<FindPassword />} />
      <Route path="/projectList" element={<ProjectList />} />
      <Route path="/projectList/:projectId" element={<ProjectListDetail />} />
      <Route path="/projectList/:id/planning" element={<PlanningDetail />} />
      <Route path="/projectList/:id/tech" element={<TechDetail />} />
    </Routes>
  )
}