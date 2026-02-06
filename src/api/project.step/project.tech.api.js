import api from '../api.js'

// Tech 저장
// PATCH /projects/:id/tech
export async function saveTech({ projectId, payload }) {
    try {
        const res = await api.patch(
            `/projects/${projectId}/steps/tech`,
            payload
        );
        return res.data;
    } catch (err) {
        console.error('saveTech error:', err);
        
        if (err.response) {
            console.error('status:', err.response.status)
            console.error('data:', err.response.data);
        }

        throw new Error(
            err.response?.data?.message || 'Tech save failed'
        );
    }
}

// Tech 조회
// GET /projects/:id/steps/tech
export async function getTech({ projectId }) {
    try {
        const res = await api.get(
            `/projects/${projectId}/steps/tech`
        );
        return res.data;
    } catch (err) {
        console.error('getTech error:', err);
        throw new Error(
            err.response?.data?.message || 'Tech fetch failed'
        );
    }
}