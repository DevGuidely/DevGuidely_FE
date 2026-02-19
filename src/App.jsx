import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import FindPassword from './pages/FindPassword.jsx';
import ProjectList from './pages/Project/ProjectList.jsx';
import ProjectListDetail from './pages/Project/ProjectListDetail.jsx';
import PlanningDetail from './pages/Project/Detail/PlanningDetail.jsx';
import TechDetail from './pages/Project/Detail/TechDetail.jsx';
import DevDetail from './pages/Project/Detail/DevDetail.jsx';

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
      <Route path="/projectList/:id/dev" element={<DevDetail />} />
    </Routes>
  )
}