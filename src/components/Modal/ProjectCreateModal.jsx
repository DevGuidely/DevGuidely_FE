import React, { useEffect, useState } from 'react'
import {
  createProjectApi,
  updateProjectApi,
} from '../../api/project.api.js'

export default function ProjectCreateModal({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  initialData,
  mode = 'create', // 'create' | 'edit'
}) {
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    purpose: '',
  })

  /**
   * 🔹 create / edit 모드에 따른 초기값 세팅
   */
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        title: initialData.title ?? '',
        purpose: initialData.purpose ?? '',
      })
    } else {
      setFormData({
        title: '',
        purpose: '',
      })
    }
  }, [mode, initialData])

  if (!isOpen) return null

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const isFormValid =
    formData.title.trim() !== '' &&
    formData.purpose.trim() !== ''

  /**
   * 🔹 생성 / 수정 submit 분기
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isLoading) return

    try {
      setIsLoading(true)

      if (mode === 'edit') {
        /** ✅ 프로젝트 수정 */
        const response = await updateProjectApi({
          projectId: initialData.id,
          payload: formData
        })

        const updatedProject =
          response?.data?.project ??
          response?.data ??
          {
            ...initialData,
            ...formData,
          }

        onUpdate(updatedProject)
      } else {
        /** ✅ 프로젝트 생성 */
        const response = await createProjectApi(formData)

        const createdProject =
          response?.data?.project ??
          response?.data ??
          null

        if (createdProject) {
          onCreate(createdProject)
        } else {
          onCreate(null) // 부모에서 재조회
        }
      }

      onClose()
    } catch (err) {
      console.error(
        `❌ 프로젝트 ${mode === 'edit' ? '수정' : '생성'} 실패:`,
        err
      )
      alert(
        `프로젝트 ${mode === 'edit' ? '수정' : '생성'}에 실패했습니다.`
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-[#1E1E1E] bg-opacity-[85%]"
        onClick={onClose}
      />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-2xl shadow-xl w-[700px] max-w-[90vw] p-10">
        {/* 헤더 */}
        <div className="flex justify-center pt-6">
          <div className="fontMedium text-[22px]">
            {mode === 'edit' ? '프로젝트 수정' : '프로젝트 생성'}
          </div>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <div className="fontRegular text-[#666] text-[14px] mb-2">
              프로젝트 제목
            </div>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                handleInputChange('title', e.target.value)
              }
              placeholder="Project Name"
              disabled={isLoading}
              className="w-full px-4 py-3 border rounded-xl text-[14px]"
              required
            />
          </div>

          <div>
            <div className="fontRegular text-[#666] text-[14px] mb-2">
              프로젝트 간단 설명
            </div>
            <textarea
              value={formData.purpose}
              onChange={(e) =>
                handleInputChange('purpose', e.target.value)
              }
              placeholder="Project Description"
              rows={4}
              disabled={isLoading}
              className="w-full px-4 py-3 border rounded-xl text-[14px] resize-none"
              required
            />
          </div>

          <div className="flex mt-6 space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3 border rounded-xl text-[14px]"
            >
              취소
            </button>

            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`flex-1 py-3 rounded-xl text-[14px]
                ${
                  isFormValid && !isLoading
                    ? 'bg-project-create hover:opacity-90'
                    : 'bg-gray-200 cursor-not-allowed'
                }`}
            >
              {isLoading
                ? mode === 'edit'
                  ? '수정 중...'
                  : '생성 중...'
                : mode === 'edit'
                ? '프로젝트 수정'
                : '프로젝트 생성'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
