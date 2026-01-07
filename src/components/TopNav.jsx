import { Link, useLocation } from 'react-router-dom'

export default function TopNav() {
    const { pathname } = useLocation();

    const isLogin = pathname === '/login';
    const isSignup = pathname === '/signup';
    
    return (
        <div className="top-nav">
            <Link className={`top-link ${isLogin ? 'active' : ''}`} to="/login">
            Login
            </Link>
            <span className="top-line">|</span>
            <Link className={`top-link ${isSignup ? 'active' : ''}`} to="/signup">
            Sign up
            </Link>
        </div>
    )
}