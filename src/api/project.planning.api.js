import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const planningApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JWT 자동 첨부
planningApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Planning 저장
 */
export async function savePlanning({ projectId, payload }) {
  try {
    const res = await planningApi.post(
      `/projects/${projectId}/planning`,
      payload
    );
    return res.data;
  } catch (error) {
    console.error('savePlanning error:', error);

    if (error.response) {
      console.error('status:', error.response.status);
      console.error('data:', error.response.data);
    }

    throw new Error(
      error.response?.data?.message || 'Planning save failed'
    );
  }
}

/**
 * Planning 조회
 */
export async function getPlanning({ projectId }) {
  try {
    const res = await planningApi.get(
      `/projects/${projectId}/planning`
    );
    return res.data;
  } catch (error) {
    console.error('getPlanning error:', error);
    throw new Error(
      error.response?.data?.message || 'Planning fetch failed'
    );
  }
}

/**
 * 단계 상태 변경
 */
export async function updateStepStatus({ projectId, stepKey, status }) {
  try {
    const res = await planningApi.patch(
      `/projects/${projectId}/steps/${stepKey}`,
      { status }
    );
    return res.data;
  } catch (error) {
    console.error('updateStepStatus error:', error);
    throw new Error(
      error.response?.data?.message || 'Step status update failed'
    );
  }
}
