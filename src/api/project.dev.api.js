import api from "./api.js";

/* =====================================================
   Dev - Design (설계) : type별 조회 + 저장/수정
   - delete는 백엔드에서 제거했다고 했으니 프론트도 제외
===================================================== */

// 설계(화면) 조회
// GET /projects/:id/steps/dev/design/screen
export async function getDevDesignScreen({ projectId }) {
  try {
    const res = await api.get(`/projects/${projectId}/steps/dev/design/screen`);
    return res.data;
  } catch (err) {
    console.error("getDevDesignScreen error:", err);
    throw new Error(err.response?.data?.message || "Dev design(screen) fetch failed");
  }
}

// 설계(API) 조회
// GET /projects/:id/steps/dev/design/api
export async function getDevDesignApi({ projectId }) {
  try {
    const res = await api.get(`/projects/${projectId}/steps/dev/design/api`);
    return res.data;
  } catch (err) {
    console.error("getDevDesignApi error:", err);
    throw new Error(err.response?.data?.message || "Dev design(api) fetch failed");
  }
}

// 설계(ERD) 조회
// GET /projects/:id/steps/dev/design/erd
export async function getDevDesignErd({ projectId }) {
  try {
    const res = await api.get(`/projects/${projectId}/steps/dev/design/erd`);
    return res.data;
  } catch (err) {
    console.error("getDevDesignErd error:", err);
    throw new Error(err.response?.data?.message || "Dev design(erd) fetch failed");
  }
}

// 설계 링크 추가
// POST /projects/:id/steps/dev/design/links
// payload: { linkType: 'screen_spec'|'api_spec'|'erd', url: string, memo?: string, orderIndex?: number }
export async function createDevDesignLink({ projectId, payload }) {
  try {
    const res = await api.post(`/projects/${projectId}/steps/dev/design/links`, payload);
    return res.data;
  } catch (err) {
    console.error("createDevDesignLink error:", err);

    if (err.response) {
      console.error("status:", err.response.status);
      console.error("data:", err.response.data);
    }

    throw new Error(err.response?.data?.message || "Dev design link create failed");
  }
}

// 설계 링크 수정
// PATCH /projects/:id/steps/dev/design/links/:linkId
// payload: { linkType?, url?, memo?, orderIndex? }
export async function updateDevDesignLink({ projectId, linkId, payload }) {
  try {
    const res = await api.patch(
      `/projects/${projectId}/steps/dev/design/links/${linkId}`,
      payload
    );
    return res.data;
  } catch (err) {
    console.error("updateDevDesignLink error:", err);

    if (err.response) {
      console.error("status:", err.response.status);
      console.error("data:", err.response.data);
    }

    throw new Error(err.response?.data?.message || "Dev design link update failed");
  }
}

/* =====================================================
   Dev - Implementation (구현) : tree 조회 + 배치 생성 + 토글 + 삭제
===================================================== */

// 구현 트리 조회 (카테고리 배열 + 기능 배열)
// GET /projects/:id/steps/dev/implementation/tree
export async function getDevImplementationTree({ projectId }) {
  try {
    const res = await api.get(
      `/projects/${projectId}/steps/dev/implementation/tree`
    );
    return res.data;
  } catch (err) {
    console.error("getDevImplementationTree error:", err);
    throw new Error(
      err.response?.data?.message || "Dev implementation tree fetch failed"
    );
  }
}

// 카테고리 + 기능 n개 배치 생성(모달 완료 버튼용)
// POST /projects/:id/steps/dev/implementation/categories/batch
// payload: { categoryTitle: string, features: string[], categoryOrderIndex?: number }
export async function createDevCategoryBatch({ projectId, payload }) {
  try {
    const res = await api.post(
      `/projects/${projectId}/steps/dev/implementation/categories/batch`,
      payload
    );
    return res.data;
  } catch (err) {
    console.error("createDevCategoryBatch error:", err);

    if (err.response) {
      console.error("status:", err.response.status);
      console.error("data:", err.response.data);
    }

    throw new Error(
      err.response?.data?.message || "Dev category batch create failed"
    );
  }
}

// 기능 체크 토글
// PATCH /projects/:id/steps/dev/implementation/features/:featureId/toggle
// payload: { isCompleted: boolean }
export async function toggleDevFeature({ projectId, featureId, payload }) {
  try {
    const res = await api.patch(
      `/projects/${projectId}/steps/dev/implementation/features/${featureId}/toggle`,
      payload
    );
    return res.data;
  } catch (err) {
    console.error("toggleDevFeature error:", err);

    if (err.response) {
      console.error("status:", err.response.status);
      console.error("data:", err.response.data);
    }

    throw new Error(
      err.response?.data?.message || "Dev feature toggle failed"
    );
  }
}

// 카테고리 삭제 (하위 기능 cascade 삭제)
// DELETE /projects/:id/steps/dev/implementation/categories/:categoryId
export async function deleteDevCategory({ projectId, categoryId }) {
  try {
    const res = await api.delete(
      `/projects/${projectId}/steps/dev/implementation/categories/${categoryId}`
    );
    return res.data;
  } catch (err) {
    console.error("deleteDevCategory error:", err);

    if (err.response) {
      console.error("status:", err.response.status);
      console.error("data:", err.response.data);
    }

    throw new Error(
      err.response?.data?.message || "Dev category delete failed"
    );
  }
}

// 기능 삭제
// DELETE /projects/:id/steps/dev/implementation/features/:featureId
export async function deleteDevFeature({ projectId, featureId }) {
  try {
    const res = await api.delete(
      `/projects/${projectId}/steps/dev/implementation/features/${featureId}`
    );
    return res.data;
  } catch (err) {
    console.error("deleteDevFeature error:", err);

    if (err.response) {
      console.error("status:", err.response.status);
      console.error("data:", err.response.data);
    }

    throw new Error(
      err.response?.data?.message || "Dev feature delete failed"
    );
  }
}
