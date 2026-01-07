/* 벡엔드 통신 코드 */
const BASE_URL = "http://localhost:4000";

export async function registerApi({ email, password, name }) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Register failed");
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