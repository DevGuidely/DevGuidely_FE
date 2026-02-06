import { useCallback, useEffect, useState } from 'react'
import { getProjectStepStatusApi, updateProjectStepStatusApi } from '../api/status.api';

export default function useProjectStepStatus({ projectId, stepKey }) {
  const [status, setStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // 초기 상태 조회
  // useEffect(() => {
  //   if (!projectId || !stepKey) return

  //   const fetchStatus = async () => {
  //     try {
  //       const data = await getProjectStepStatusApi({
  //         projectId,
  //         stepKey,
  //       })
  //       setStatus(data.status)
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }

  //   fetchStatus()
  // }, [projectId, stepKey])

  useEffect(() => {
  if (!projectId || !stepKey) return;

  const fetchStatus = async () => {
    try {
      const res = await getProjectStepStatusApi({
        projectId,
        stepKey,
      });

      setStatus(res.step?.status ?? 'before');
    } catch (e) {
      console.error('status fetch failed', e);
    }
  };

  fetchStatus();
}, [projectId, stepKey]);


  // 상태 업데이트
  const updateStatus = useCallback(
    async nextStatus => {
      try {
        setIsLoading(true)

        await updateProjectStepStatusApi({
          projectId,
          stepKey,
          status: nextStatus,
        })

        setStatus(nextStatus)
      } catch (err) {
        console.error(err)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [projectId, stepKey],
  )

  return {
    status,
    updateStatus,
    isLoading,
  }
}
