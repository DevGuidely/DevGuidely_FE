import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { registerApi } from "../api/api";

export default function SignUp() {
  const navigate = useNavigate();
    
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  
  const isEmailEnabled = email.trim() !== "" && isEmailValid;
  const isAuthCodeEnabled = authCode.trim() !== "";

  function handleButtonClick() {
    // 아직 인증번호를 안 보낸 상태
    if (!isCodeSent) {
      if (!isEmailEnabled) return;
      setIsCodeSent(true);
      return;
    }

    // 인증번호 입력 후 → 인증 완료
    if (isAuthCodeEnabled) {
      setIsVerified(true);
    }
  }

  const isSignupEnabled =
    password.trim() !== "" &&
    passwordConfirm.trim() !== "" &&
    password === passwordConfirm;

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
    <div className='bg-gradient-soft'>
      <div className='bg-gradient-content'>
        <div className='flex w-full flex-col items-center w-[50%]'>
          <div className='fontSB mt-[5%] text-[30px]'>Create an account</div>
          <div className='flex justify-center items-center w-full mt-[0.7%]'>
            <div className='fontLight text-[16px]'>이미 가입한 계정이 있으신가요?</div>
            <Link to="/login" className='fontLight text-[16px] text-[#1e1e1e] hover:no-underline underline ml-[1%]'>Log in</Link>
          </div>
        </div>

        <div className='flex flex-col w-full items-center justify-center mt-[3%]'>
          <div className='flex flex-col mb-[2%] w-[50%]'>
            <div className='fontRegular text-[#666] text-[14px]'>이름</div>
            <input 
              type="text" 
              placeholder='Name' 
              value={name}
              onChange={(e) => setName(e.target.value)} 
              className='bg-transparent px-[2%] py-[1.6%] mt-[1.3%] rounded-[15px] border-[1px] border-[#666]' 
            />
          </div>

          <div className='flex flex-col w-[50%]'>
            <div className='flex w-full justify-between items-center'>
              <div className='fontRegular text-[#666] text-[14px]'>이메일</div>
              {email.length > 0 && !isEmailValid && (
                <div className="mt-[0.6%] text-[12px] text-[#E86666] fontRegular">
                  올바른 이메일 형식을 입력해주세요.
                </div>
              )}
            </div>
            <input 
              type="text" 
              placeholder='Email@gmail.com' 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              className='bg-transparent px-[2%] py-[1.6%] mt-[1.3%] rounded-[15px] border-[1px] border-[#666]' 
            />
          </div>

          {isCodeSent && (
            <div className="flex flex-col w-[50%]">
              <input
                type="text"
                placeholder="인증번호를 입력하세요"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                className="bg-transparent px-[2%] py-[1.6%] mt-[1.3%] rounded-[15px] border-[1px] border-[#666]"
              />
            </div>
          )}


          <div className="flex justify-center w-full mt-[2%]">
            <button
              onClick={handleButtonClick}
              disabled={
                isVerified ||
                (!isCodeSent
                  ? !isEmailEnabled
                  : !isAuthCodeEnabled)
              }
              className={`
                w-[50%] py-[1%] text-[#fff] fontSB rounded-[15px] border-none
                ${
                  isVerified
                    ? "bg-[#C3C3C3] cursor-not-allowed"
                    : !isCodeSent
                      ? isEmailEnabled
                        ? "bg-[#1E1E1E] cursor-pointer"
                        : "bg-[#C3C3C3] cursor-not-allowed"
                      : isAuthCodeEnabled
                        ? "bg-[#1E1E1E] cursor-pointer"
                        : "bg-[#C3C3C3] cursor-not-allowed"
                }
              `}
            >
              {isVerified
                ? "인증이 완료되었습니다."
                : isCodeSent
                  ? "인증번호 확인"
                  : "인증번호 받기"}
            </button>
          </div>

          {isVerified && (
            <>
              <div className="flex flex-col w-[50%] mt-[3%]">
                <div className="fontRegular text-[#666] text-[14px]">비밀번호</div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent px-[2%] py-[1.6%] mt-[1.3%] rounded-[15px] border-[1px] border-[#666]"
                />
              </div>

              <div className="flex flex-col w-[50%] mt-[2%]">
                <div className='flex w-full justify-between items-center'>
                  <div className="fontRegular text-[#666] text-[14px]">비밀번호 확인</div>
                  {passwordConfirm.length > 0 && password !== passwordConfirm && (
                    <div className="text-[12px] text-[#E86666] mt-[0.6%]">
                      비밀번호가 일치하지 않습니다.
                    </div>
                  )}
                </div>
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="bg-transparent px-[2%] py-[1.6%] mt-[1.3%] rounded-[15px] border-[1px] border-[#666]"
                />
              </div>
            </>
          )}

          {isVerified && (
            <div className="flex justify-center w-full mt-[3%]">
              <button
                onClick={handleRegister}
                disabled={!isSignupEnabled}
                className={`
                  w-[50%] py-[1%] text-[#fff] fontSB rounded-[15px] border-none
                  ${isSignupEnabled
                    ? "bg-[#1E1E1E] cursor-pointer"
                    : "bg-[#C3C3C3] cursor-not-allowed"}
                `}
              >
                회원가입
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
