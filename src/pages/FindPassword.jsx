import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function FindPassword() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [authCode, setAuthCode] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isEmailValid = emailRegex.test(email)

  const isPasswordMatch =
    passwordConfirm.length > 0 && password !== passwordConfirm

  return (
    <div className="min-h-screen mb-10 bg-gradient-soft">
      <div className="bg-gradient-content">
        <div className="flex flex-col items-center w-full">
          <div className="fontSB mt-[3.5%] text-[30px]">Find Password</div>
          <div className="flex justify-center items-center w-full mt-[0.7%]">
            <div className="fontLight text-[16px]">
              이미 가입한 계정이 있으신가요?
            </div>
            <Link
              to="/login"
              className="fontLight text-[16px] text-[#1e1e1e] underline ml-[1%]"
            >
              Log in
            </Link>
          </div>
        </div>

        <div className="flex flex-col w-full items-center justify-center mt-[3%]">
          {/* 이름 */}
          <div className="flex flex-col mb-[2%] w-[50%]">
            <div className="fontRegular text-[#666] text-[14px]">이름</div>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-transparent px-[2%] py-[1.6%] mt-[1.3%] rounded-[15px] border border-[#666]"
            />
          </div>

          {/* 이메일 */}
          <div className="flex flex-col w-[50%]">
            <div className="flex items-center justify-between w-full">
              <div className="fontRegular text-[#666] text-[14px]">이메일</div>
              {email.length > 0 && !isEmailValid && (
                <div className="text-[12px] text-[#E86666] fontRegular">
                  올바른 이메일 형식을 입력해주세요.
                </div>
              )}
            </div>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-transparent px-[2%] py-[1.6%] mt-[1.3%] rounded-[15px] border border-[#666]"
            />
          </div>

          {/* 인증번호 */}
          <div className="flex flex-col w-[50%] mt-[2%]">
            <input
              type="text"
              placeholder="인증번호를 입력하세요"
              value={authCode}
              onChange={e => setAuthCode(e.target.value)}
              className="bg-transparent px-[2%] py-[1.6%] rounded-[15px] border border-[#666]"
            />
          </div>

          {/* 인증 버튼 */}
          <div className="flex justify-center w-full mt-[2%]">
            <button
              type="button"
              className="w-[50%] py-[1%] text-[#fff] fontSB rounded-[15px] bg-[#1E1E1E]"
            >
              인증번호 확인
            </button>
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col w-[50%] mt-[3%]">
            <div className="fontRegular text-[#666] text-[14px]">비밀번호</div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="bg-transparent px-[2%] py-[1.6%] mt-[1.3%] rounded-[15px] border border-[#666]"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="flex flex-col w-[50%] mt-[2%]">
            <div className="flex items-center justify-between w-full">
              <div className="fontRegular text-[#666] text-[14px]">
                비밀번호 확인
              </div>
              {isPasswordMatch && (
                <div className="text-[12px] text-[#E86666] fontRegular">
                  비밀번호가 일치하지 않습니다.
                </div>
              )}
            </div>
            <input
              type="password"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              className="bg-transparent px-[2%] py-[1.6%] mt-[1.3%] rounded-[15px] border border-[#666]"
            />
          </div>

          {/* 변경 버튼 */}
          <div className="flex justify-center w-full mt-[3%]">
            <button
              type="button"
              className="w-[50%] py-[1%] text-[#fff] fontSB rounded-[15px] bg-[#1E1E1E]"
            >
              비밀번호 변경
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
