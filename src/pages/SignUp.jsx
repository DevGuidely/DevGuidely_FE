import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import TopNav from '../components/TopNav.jsx';
import { registerApi } from "../api/api";

export default function SignPage() {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

  async function handleRegister() {
    try {
      const result = await registerApi({ email, password, name});
      alert("회원가입 성공");
      console.log(result);
      navigate("/login");
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="bg">
        <TopNav />

        <main className="auth auth-left">
            <h1 className="auth-title">Sign up</h1>

            <div className="auth-form">
                <input
                  className="auth-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  className="auth-input"
                  placeholder="PW"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <input
                  className="auth-input"
                  placeholder="name"
                  maxLength={10}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

             {/* 회원가입 버튼 */}
             <button className="auth-link" onClick={handleRegister}>
                Sign Up
             </button>
            </div>
        </main>
    </div>
  );
}