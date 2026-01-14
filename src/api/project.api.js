/* 백엔드 통신 코드
역할:
  1. 프로젝트 관련 백엔드 API 호출 담당
상관관계:
  1. ProjectCreateModal.jsx
  2. project.controller → project.service
*/
import axios from 'axios';

const BASE_URL = "http://localhost:4000";

const projectApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000,
});

projectApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

projectApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error('❌ Project API 에러:', {
      status: error.response?.status,
      message: message,
      data: error.response?.data
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
    }
    
    throw new Error(message);
  }
);

export async function createProjectApi({ title, purpose }) {
  try {
    const response = await projectApi.post('/projects/create', {
      title,
      purpose
    });
    
    return response.data;
    
  } catch (error) {
    console.error('❌ 프로젝트 생성 실패:', error.message);
    throw new Error(error.message || "프로젝트 생성 실패");
  }
}

export async function getProjectsApi() {
  try {
    const response = await projectApi.get('/projects/list');
    
    return response.data;
    
  } catch (error) {
    console.error('❌ 프로젝트 목록 조회 실패:', error.message);
    throw new Error(error.message || "프로젝트 목록 조회 실패");
  }
}

export async function deleteProjectApi(projectId) {
  try {
    const response = await projectApi.delete(`/projects/${projectId}`);
    return response.data;
    
  } catch (error) {
    console.error('❌ 프로젝트 삭제 실패:', error.message);
    throw new Error(error.message || "프로젝트 삭제 실패");
  }
}

export async function updateProjectApi({ projectId, title, purpose }) {
  try {
    const response = await projectApi.patch(`/projects/${projectId}`, {
      title,
      purpose
    });

    return response.data;
    
  } catch (error) {
    console.error('❌ 프로젝트 수정 실패:', error.message);
    throw new Error(error.message || "프로젝트 수정 실패");
  }
}