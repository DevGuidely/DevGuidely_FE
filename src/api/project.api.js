import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

// 프로젝트 단계 상태 조회
export const getProjectStepStatusApi = async (projectId, stepKey) => {
  try {
    const response = await api.get(`/projects/${projectId}/steps/${stepKey}`)
    return response.data
  } catch (error) {
    console.error('단계 상태 조회 실패:', error)
    throw error
  }
}

// 프로젝트 단계 상태 업데이트
export const updateProjectStepStatusApi = async (projectId, stepKey, status) => {
  try {
    const response = await api.patch(`/projects/${projectId}/steps/${stepKey}`, {
      status
    })
    return response.data
  } catch (error) {
    console.error('단계 상태 업데이트 실패:', error)
    throw error
  }
}