import axios from "axios";

const BASE_URL = 'http://localhost:4000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청마다 토큰 자동 포함
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* =========================
   프로젝트 CRUD
========================= */

/**
 * 프로젝트 목록 조회
 * GET /projects
 */
export async function getProjectsApi() {
  const res = await api.get("/projects/list");
  return res.data; // { items, total }
}

/**
 * 프로젝트 생성
 * POST /projects
 */
export async function createProjectApi(payload) {
  const res = await api.post("/projects/create", payload);
  return res.data; // { project }
}

/**
 * 프로젝트 수정
 * PATCH /projects/:id
 */
export async function updateProjectApi({ projectId, payload }) {
  const res = await api.patch(`/projects/${projectId}`, payload);
  return res.data; // { project }
}

/**
 * 프로젝트 삭제
 * DELETE /projects/:id
 */
export async function deleteProjectApi(projectId) {
  const res = await api.delete(`/projects/${projectId}`);
  return res.data; // { message }
}
