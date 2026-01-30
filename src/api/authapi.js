/* 백엔드 통신 코드 
역할:
  1. 이메일 인증 관련 백엔드 API 호출을 담당
상관관계:
  1. SignUp.jsx에서 호출
  2. 백엔드 auth.controller → auth.service와 연결
*/
import api from './api.js';

/**
 * 회원가입
 * POST /auth/register
 */
export async function registerApi({ email, password, name, verifiedToken }) {
  try {
    const response = await api.post('/auth/register', {
      email,
      password,
      name,
      verifiedToken
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Register failed");
  }
}

/**
 * 이메일 인증번호 요청
 * POST /auth/email/request
 */
export async function sendEmailCodeApi(email) {
  try {
    const response = await api.post('/auth/email/request', {
      email
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "인증번호 발송 실패");
  }
}

/**
 * 이메일 인증번호 검증
 * POST /auth/email/verify
 */
export async function verifyEmailCodeApi({ email, code }) {
  try {
    const response = await api.post('/auth/email/verify', {
      email,
      code
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "인증번호 확인 실패");
  }
}

/**
 * 로그인
 * POST /auth/login
 */
export async function loginApi({ email, password, rememberMe }) {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
      rememberMe
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
}