/*
역할:
  1. 비밀번호 재설정(찾기) 관련 백엔드 API 호출을 담당
상관관계:
  1. 비밀번호 찾기 페이지 컴포넌트에서 호출
  2. 백엔드 passwordReset.controller.js와 연결
*/
import api from './api.js';

/**
 * 1️⃣ 비밀번호 재설정 인증번호 요청
 * POST /auth/password/send
 */
export async function requestPasswordResetCode({ email, name }) {
  try {
    const response = await api.post('/auth/password/send', {
      email,
      name
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "인증번호 요청 실패");
  }
}

/**
 * 2️⃣ 인증번호 검증
 * POST /auth/password/verify
 */
export async function verifyPasswordResetCode({ email, code }) {
  try {
    const response = await api.post('/auth/password/verify', {
      email,
      code
    });
    
    return response.data; // { resetToken }
  } catch (error) {
    throw new Error(error.response?.data?.message || "인증번호 확인 실패");
  }
}

/**
 * 3️⃣ 비밀번호 재설정
 * POST /auth/password/reset
 */
export async function resetPassword({ email, resetToken, newPassword }) {
  try {
    const response = await api.post('/auth/password/reset', {
      email,
      resetToken,
      newPassword
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "비밀번호 변경 실패");
  }
}