import api from "./api.js";

// 프로젝트 단계 상태 조회
export const getProjectStepStatusApi = async ({
  projectId, 
  stepKey
}) => {
    const response = await api.get(
      `/projects/${projectId}/steps/${stepKey}/status`,
    )
  return response.data;
}

// 프로젝트 단계 상태 업데이트
export const updateProjectStepStatusApi = async ({
  projectId,
  stepKey,
  status,
}) => {
  const response = await api.patch(
    `/projects/${projectId}/steps/${stepKey}/status`,
    { status }
  )
  return response.data
}
