/* 백엔드 통신 코드
역할:
  1. 프로젝트 관련 백엔드 API 호출 담당
상관관계:
  1. ProjectCreateModal.jsx
  2. project.controller → project.service
*/

const BASE_URL = "http://localhost:4000";

export async function createProjectApi({ title, purpose }) {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${BASE_URL}/projects/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, purpose }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "프로젝트 생성 실패");

  return data;
}

export async function getProjectsApi() {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${BASE_URL}/projects/list`, {
    headers: {
    Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error("[getProjectsApi] error response:", data);
    throw new Error(data.message || "프로젝트 목록 조회 실패");
  }
  return data;
}
