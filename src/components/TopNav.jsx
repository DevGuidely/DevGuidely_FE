import { Link, useLocation } from 'react-router-dom'

export default function TopNav() {
  const { pathname } = useLocation()

  const isLogin = pathname === '/login'
  const isSignup = pathname === '/signup'

  const baseClass = 'text-[#1e1e1e] fontRegular text-[14px] px-[0.5%] py-[0.3%] tracking-wide no-underline hover:no-underline'
  const activeClass = 'font-bold text-black'

  return (
    <div className="flex justify-end items-center">
      <Link
        to="/login"
        className={`${baseClass} ${isLogin ? activeClass : ''}`}
      >
        Login
      </Link>

      <span className="mx-[5px] text-[#1e1e1e]">|</span>

      <Link
        to="/signup"
        className={`${baseClass} ${isSignup ? activeClass : ''}`}
      >
        Sign up
      </Link>
    </div>
  )
}