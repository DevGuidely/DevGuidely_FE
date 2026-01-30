import api from "./api.js";

/* =========================
   프로젝트 CRUD
========================= */

/**
 * 프로젝트 목록 조회
 * GET /projects/list
 */
export async function getProjectsApi() {
  try {
    const res = await api.get("/projects/list");
    return res.data; // { items, total }
  } catch (error) {
    console.error('getProjects error:', error);
    throw new Error(
      error.response?.data?.message || 'Projects fetch failed'
    );
  }
}

/**
 * 프로젝트 생성
 * POST /projects/create
 */
export async function createProjectApi(payload) {
  try {
    const res = await api.post("/projects/create", payload);
    return res.data; // { project }
  } catch (error) {
    console.error('createProject error:', error);
    throw new Error(
      error.response?.data?.message || 'Project creation failed'
    );
  }
}

/**
 * 프로젝트 수정
 * PATCH /projects/:id
 */
export async function updateProjectApi({ projectId, payload }) {
  try {
    const res = await api.patch(`/projects/${projectId}`, payload);
    return res.data; // { project }
  } catch (error) {
    console.error('updateProject error:', error);
    throw new Error(
      error.response?.data?.message || 'Project update failed'
    );
  }
}

/**
 * 프로젝트 삭제
 * DELETE /projects/:id
 */
export async function deleteProjectApi(projectId) {
  try {
    const res = await api.delete(`/projects/${projectId}`);
    return res.data; // { message }
  } catch (error) {
    console.error('deleteProject error:', error);
    throw new Error(
      error.response?.data?.message || 'Project deletion failed'
    );
  }
}