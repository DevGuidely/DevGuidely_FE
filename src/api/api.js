/* 벡엔드 통신 코드 
역할:
  1. 이메일 인증 관련 백엔드 API 호출을 담당
상관관계:
  1. SignUp.jsx에서 호출
  2. 백엔드 auth.controller → auth.service와 연결
*/
const BASE_URL = "http://localhost:4000";

export async function registerApi({ email, password, name, verifiedToken }) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ email, password, name, verifiedToken }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Register failed");
    return data;
}

export async function sendEmailCodeApi(email) {
    const res = await fetch(`${BASE_URL}/auth/email/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ email }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "인증번호 발송 실패");
    return data;
}
export async function verifyEmailCodeApi({ email, code }) {
  const res = await fetch(`${BASE_URL}/auth/email/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "인증번호 확인 실패");
  return data;
}

export async function loginApi({ email, password, rememberMe }) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
    });
    
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Login failed");
    return data;
}