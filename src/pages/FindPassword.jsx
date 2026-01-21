import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { requestPasswordResetCode, verifyPasswordResetCode, resetPassword } from '../api/resetPassword.api' // API 함수들 import

export default function FindPassword() {
  const navigate = useNavigate()
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [resetToken, setResetToken] = useState(null)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [authCode, setAuthCode] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isEmailValid = emailRegex.test(email)
  
  const isEmailEnabled = email.trim() !== "" && isEmailValid
  const isAuthCodeEnabled = authCode.trim() !== ""

  const isPasswordMatch = passwordConfirm.length > 0 && password !== passwordConfirm
  const isPasswordChangeEnabled = 
    password.trim() !== "" &&
    passwordConfirm.trim() !== "" &&
    password === passwordConfirm &&
    isVerified

  async function handleButtonClick() {
    if (!isCodeSent) {
      if (!isEmailEnabled) return

      try {
        await requestPasswordResetCode({email, name})
        alert("인증번호가 이메일로 전송되었습니다.")
        setIsCodeSent(true)
        setError('')
      } catch (e) {
        alert(e.message)
        setError(e.message)
      }
      return
    }

    if (isAuthCodeEnabled) {
      try {
        const res = await verifyPasswordResetCode({ email, code: authCode })
        setResetToken(res.resetToken)
        alert("이메일 인증이 완료되었습니다.")
        setIsVerified(true)
        setError('')
      } catch (e) {
        alert(e.message)
        setError(e.message)
      }
    }
  }

  async function handlePasswordChange() {
    console.log({
  email,
  resetToken,
  password,
});

    try {
      await resetPassword({
      email,
      resetToken: resetToken,
      newPassword: password,
    })

      alert("비밀번호가 성공적으로 변경되었습니다.")
      navigate("/login")
    } catch (e) {
      alert(e.message)
      setError(e.message)
    }
  }

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

          {/* 인증번호 입력 (이메일 인증번호가 전송된 후에만 표시) */}
          {isCodeSent && (
            <div className="flex flex-col w-[50%] mt-[2%]">
              <input
                type="text"
                placeholder="인증번호를 입력하세요"
                value={authCode}
                onChange={e => setAuthCode(e.target.value)}
                className="bg-transparent px-[2%] py-[1.6%] rounded-[15px] border border-[#666]"
              />
            </div>
          )}

          {/* 인증번호 받기/확인 버튼 */}
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

          {/* 비밀번호 입력 (인증 완료 후에만 표시) */}
          {isVerified && (
            <>
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
                  onClick={handlePasswordChange}
                  disabled={!isPasswordChangeEnabled}
                  className={`
                    w-[50%] py-[1%] text-[#fff] fontSB rounded-[15px] border-none
                    ${isPasswordChangeEnabled
                      ? "bg-[#1E1E1E] cursor-pointer"
                      : "bg-[#C3C3C3] cursor-not-allowed"}
                  `}
                >
                  비밀번호 변경
                </button>
              </div>
            </>
          )}

          {/* 에러 메시지 */}
          {error && (
            <div className="flex justify-center w-full mt-[1%]">
              <div className="text-[13px] text-[#E86666] fontRegular">
                {error}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}