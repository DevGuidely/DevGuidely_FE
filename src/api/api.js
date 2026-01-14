/* 벡엔드 통신 코드 
역할:
  1. 이메일 인증 관련 백엔드 API 호출을 담당
상관관계:
  1. SignUp.jsx에서 호출
  2. 백엔드 auth.controller → auth.service와 연결
*/
import axios from 'axios';

const BASE_URL = "http://localhost:4000";

// axios 인스턴스 생성 (공통 설정)
const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000, // 10초 타임아웃
});

// 응답 인터셉터 (에러 처리)
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error('Auth API 에러:', message);
    throw new Error(message);
  }
);

export async function registerApi({ email, password, name, verifiedToken }) {
  try {
    const response = await authApi.post('/auth/register', {
      email,
      password,
      name,
      verifiedToken
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Register failed");
  }
}

export async function sendEmailCodeApi(email) {
  try {
    const response = await authApi.post('/auth/email/request', {
      email
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.message || "인증번호 발송 실패");
  }
}

export async function verifyEmailCodeApi({ email, code }) {
  try {
    const response = await authApi.post('/auth/email/verify', {
      email,
      code
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.message || "인증번호 확인 실패");
  }
}

export async function loginApi({ email, password, rememberMe }) {
  try {
    const response = await authApi.post('/auth/login', {
      email,
      password,
      rememberMe
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
}