import api from '../api.js';

/**
 * Planning 저장
 * POST /projects/:id/planning
 */
export async function savePlanning({ projectId, payload }) {
  try {
    const res = await api.post(
      `/projects/${projectId}/steps/planning`,
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
 * GET /projects/:id/planning
 */
export async function getPlanning({ projectId }) {
  try {
    const res = await api.get(
      `/projects/${projectId}/steps/planning`
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
 * PATCH /projects/:id/steps/:stepKey

export async function updateStepStatus({ projectId, stepKey, status }) {
  try {
    const res = await api.patch(
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
   */