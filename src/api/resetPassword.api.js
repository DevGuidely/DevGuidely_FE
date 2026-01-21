/*
역할:
  1. 비밀번호 재설정(찾기) 관련 백엔드 API 호출을 담당
상관관계:
  1. 비밀번호 찾기 페이지 컴포넌트에서 호출
  2. 백엔드 passwordReset.controller.js와 연결
*/

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * 1️⃣ 비밀번호 재설정 인증번호 요청
 * POST /auth/password/request
 */
export async function requestPasswordResetCode({ email, name }) {
    const res = await fetch(`${BASE_URL}/auth/password/send`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "인증번호 요청 실패");
    return data;
}

/**
 * 2️⃣ 인증번호 검증
 * POST /auth/password/verify
 */
export async function verifyPasswordResetCode({ email, code }) {
    const res = await fetch(`${BASE_URL}/auth/password/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "인증번호 확인 실패");
    return data; // { resetToken }
}

/**
 * 3️⃣ 비밀번호 재설정
 * POST /auth/password/reset
 */
export async function resetPassword({ email, resetToken, newPassword }) {
    const res = await fetch(`${BASE_URL}/auth/password/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, resetToken, newPassword }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "비밀번호 변경 실패");
    return data;
}