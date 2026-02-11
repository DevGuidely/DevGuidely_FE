import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { loginApi } from "../api/authapi.js";

export default function Login() {
  const navigate = useNavigate();
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);

  const isLoginEnabled =
    email.trim() !== "" &&
    password.trim() !== "" &&
    isEmailValid;

  async function handleLogin(e) {
    e.preventDefault();

    if (!isLoginEnabled) return;

    try {
      setLoginError("");

      const result = await loginApi({ email, password, rememberMe });

      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("rememberMe", rememberMe ? "true" : "false");
      localStorage.setItem("user", JSON.stringify(result.user));

      navigate("/");
    } catch (e) {
      setLoginError(e.message || "로그인에 실패했습니다.");
    }
  }

  return (
    <div className="bg-gradient-soft">
      <div className="bg-gradient-content">

        {/* Header */}
        <div className="flex flex-col items-center w-full">
          <div className="fontSB mt-[5%] text-[30px]">Login</div>
          <div className="flex justify-center items-center w-full mt-[0.7%]">
            <div className="fontLight text-[16px]">가입한 계정이 없으신가요?</div>
            <Link
              to="/signup"
              className="fontLight text-[16px] text-[#1e1e1e] hover:no-underline underline ml-[1%]"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="flex flex-col w-full items-center justify-center mt-[8%]"
        >
          {/* Email */}
          <div className="flex flex-col w-[50%]">
            <div className="flex items-center justify-between w-full">
              <div className="fontRegular text-[#666] text-[14px]">이메일</div>
              {email.length > 0 && !isEmailValid && (
                <div className="mt-[0.6%] text-[12px] text-[#E86666] fontRegular">
                  올바른 이메일 형식을 입력해주세요.
                </div>
              )}
            </div>
            <input
              type="text"
              placeholder="Email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent px-[2%] py-[1.6%] mt-[1.3%] rounded-[15px] border-[1px] border-[#666]"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col mt-[2%] w-[50%]">
            <div className="fontRegular text-[#666] text-[14px]">비밀번호</div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent px-[2%] py-[1.6%] mt-[1.3%] rounded-[15px] border-[1px] border-[#666]"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between w-[50%] mt-[0.8%]">
            <div className="flex items-center w-full">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <div className="fontRegular w-full text-[14px] ml-[1.2%]">
                Remember me
              </div>
            </div>

            <Link
              to="/findPassword"
              className="flex fontRegular underline text-[14px] whitespace-nowrap"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center w-full mt-[2%]">
            <button
              type="submit"
              disabled={!isLoginEnabled}
              className={`border-none w-[50%] py-[0.9%] text-[#fff] fontSB py-2 px-4 rounded-[15px]
                ${
                  isLoginEnabled
                    ? "bg-[#1e1e1e] cursor-pointer"
                    : "bg-[#C3C3C3] cursor-not-allowed"
                }
              `}
            >
              로그인
            </button>
          </div>

          {loginError && (
            <div className="flex justify-center w-full mt-[1%]">
              <div className="text-[13px] text-[#E86666] fontRegular">
                {loginError}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
