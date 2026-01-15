/* 백엔드 통신 코드
역할:
  1. Planning 관련 백엔드 API 호출 담당
상관관계:
  1. PlanningDetail.jsx
  2. project.controller → planning.service
*/
import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

const planningApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

planningApi.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

planningApi.interceptors.response.use(
  response => response,
  error => {
    const message =
      error.response?.data?.message || error.message;

    console.error(' Planning API 에러:', {
      status: error.response?.status,
      message,
      data: error.response?.data,
    });

    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
    }

    throw new Error(message);
  }
);

export async function savePlanningApi({ projectId, payload }) {
  try {
    const response = await planningApi.post(
      `/projects/${projectId}/planning`,
      payload
    );

    return response.data; // { message: "Planning saved" }
  } catch (error) {
    console.error(' Planning 저장 실패:', error.message);
    throw new Error(error.message || 'Planning 저장 실패');
  }
}

export async function getPlanningApi({ projectId }) {
  try {
    const response = await planningApi.get(
      `/projects/${projectId}/planning`
    );

    return response.data;
  } catch (error) {
    console.error(' Planning 조회 실패:', error.message);
    throw new Error(error.message || 'Planning 조회 실패');
  }
}

export async function updateStepStatusApi({
  projectId,
  stepKey, // "planning" | "tech" | "dev" | "deploy"
  status,  // "before" | "ing" | "done"
}) {
  try {
    const response = await planningApi.patch(
      `/projects/${projectId}/steps/${stepKey}`,
      { status }
    );

    return response.data;
  } catch (error) {
    console.error(' Step 상태 변경 실패:', error.message);
    throw new Error(error.message || 'Step 상태 변경 실패');
  }
  return data;
}
