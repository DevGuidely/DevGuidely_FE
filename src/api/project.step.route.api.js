// api/planning.ts
import api from './axios';

export async function savePlanning({ projectId, payload }) {
  try {
    const res = await api.post(
      `/projects/${projectId}/planning`,
      payload
    );
    return res.data; // { message: "Planning saved" }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Planning save failed'
    );
  }
}

export async function getPlanning({ projectId }) {
  try {
    const res = await api.get(
      `/projects/${projectId}/planning`
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Planning fetch failed'
    );
  }
}

export async function updateStepStatus({
  projectId,
  stepKey, // "planning" | "tech" | "dev" | "deploy"
  status,  // "before" | "ing" | "done"
}) {
  try {
    const res = await api.patch(
      `/projects/${projectId}/steps/${stepKey}`,
      { status }
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Step status update failed'
    );
  }
}
