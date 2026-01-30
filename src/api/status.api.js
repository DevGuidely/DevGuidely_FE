import api from "./api.js";

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