import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import TopNav from '../components/TopNav.jsx';
import '../styles/auth.css';
import { loginApi } from "../api/api";

export default function LoginPage() {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // 로그인 유지 토글(체크박스)
    const [rememberMe, setRememberMe] = useState(false);


  async function handleLogin() {
    try {
      // rememberMe 값을 loginApi에 전달
      const result = await loginApi({ email, password, rememberMe });
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("rememberMe", rememberMe ? "true" : "false");

      alert("로그인 성공");
      //로그인 성공 시 MainPage로 이동
      console.log(result);
      navigate("/");
    } catch (e) {
      alert(e.message);
    }
  }
  
  return (
        <div className="bg">
            <TopNav />

            <main className="auth auth-left">
                <h1 className="auth-title">Login</h1>
                
                <div className="auth-form">
                    <input 
                      className="auth-input" 
                      placeholder="ID"
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
                    {/* 로그인 유지 토글 */}
                    <label className="remember-row">
                      <input
                        type="checkbox"
                        className="remember-checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span className="remeber-label">로그인 유지</span>
                    </label>

                    {/* 로그인 버튼 */}
                    <button className="auth_button" onClick={handleLogin}>
                    Login
                    </button>
                </div>
            </main>
        </div>
    );
}