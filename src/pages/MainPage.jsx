import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav.jsx';

export default function MainPage() {
    const navigate = useNavigate();

    const accessToken = localStorage.getItem("accessToken");
    const isLoggedIn = !!accessToken;

    function handleLogout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate("/");
    }

    return (
        <div className="bg">
            {/* 로그인 상태에 따라 상단 UI 분기 */}
            {isLoggedIn ? (
                <div className="welcome-bar">
                    <span className="welcome-text">환영합니다!</span>
                    <button
                      className="logout-btn"
                      type="button"
                      onClick={handleLogout}
                      >
                        로그아웃
                    </button>
                </div>
                ) : (
                <TopNav />
                )}

            <main className="hero">
                <h1 className="hero-title">DevGuidely</h1>
                <p className="hero-sub">설명~~</p>

                <button 
                  className="btn-start" 
                  type="button" 
                  onClick={() => {
                    if (isLoggedIn) {
                        navigate("/projects");
                    } else {
                        navigate("/login");
                        }
                    }}
                >
                    시작하기
                </button>
            </main>
        </div>
    )
}