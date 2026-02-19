import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";

export default function TodoListCreateModal({
  isOpen,
  onClose,
  onCreate,
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    category: '',
    tasks: [''], // 최소 1개의 빈 기능 입력란
  })

  if (!isOpen) return null

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleTaskChange = (index, value) => {
    const newTasks = [...formData.tasks]
    newTasks[index] = value
    setFormData(prev => ({
      ...prev,
      tasks: newTasks,
    }))
  }

  const addTaskField = () => {
    setFormData(prev => ({
      ...prev,
      tasks: [...prev.tasks, ''],
    }))
  }

  const removeTaskField = (index) => {
    if (formData.tasks.length > 1) {
      const newTasks = formData.tasks.filter((_, i) => i !== index)
      setFormData(prev => ({
        ...prev,
        tasks: newTasks,
      }))
    }
  }

  const isFormValid =
    formData.category.trim() !== '' &&
    formData.tasks.some(task => task.trim() !== '')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isLoading) return

    try {
      setIsLoading(true)

      // 빈 문자열 제거한 tasks만 전송
      const validTasks = formData.tasks.filter(task => task.trim() !== '')
      
      const todoListData = {
        category: formData.category,
        tasks: validTasks,
      }

      // API 호출 또는 부모 컴포넌트로 데이터 전달
      onCreate(todoListData)
      
      // 폼 초기화
      setFormData({
        category: '',
        tasks: [''],
      })
      
      onClose()
    } catch (err) {
      console.error('❌ TodoList 생성 실패:', err)
      alert('TodoList 생성에 실패했습니다.')
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
          <div className="fontMedium text-[#000000] text-[22px]">
            TodoList 생성
          </div>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* 카테고리 */}
          <div>
            <div className="fontRegular text-[#666] text-[14px] mb-2">
              카테고리
            </div>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                handleInputChange('category', e.target.value)
              }
              placeholder="메인 페이지"
              disabled={isLoading}
              className="w-full px-4 py-3 border rounded-xl text-[14px] outline-none border-[#DFE7F4]"
              required
            />
          </div>

          {/* 기능 목록 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="fontRegular text-[#666] text-[14px]">
                기능
              </div>
              <FaPlus
                onClick={addTaskField}
                disabled={isLoading}
                className="text-[16px] text-[#666666]"
              >
                +
              </FaPlus>
            </div>
            
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {formData.tasks.map((task, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={task}
                    onChange={(e) =>
                      handleTaskChange(index, e.target.value)
                    }
                    placeholder={index === 0 ? "헤더" : index === 1 ? "로그인" : "기능 입력"}
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 border rounded-xl text-[14px] outline-none focus:border-[#DFE7F4]"
                  />
                  {formData.tasks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTaskField(index)}
                      disabled={isLoading}
                      className="text-[#999] hover:text-[#666] text-[20px] px-2"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`px-5 py-1.5 rounded-2xl text-[14px] fontMedium
                ${
                  isFormValid && !isLoading
                    ? 'bg-[#DFE7F4] text-[#5C667B] hover:opacity-80'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              {isLoading ? '생성 중...' : '생성하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}