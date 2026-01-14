import React from 'react'

export default function DeleteConfirmModal({ 
  isOpen, 
  projectTitle, 
  onConfirm, 
  onCancel, 
  isLoading = false 
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center p-12 mx-4 bg-white rounded-2xl">
        <p className="mb-2 text-[14px] fontSB text-[#414141]">
          <span>"{projectTitle}"</span> 프로젝트를 삭제하시겠습니까?
        </p>
        
        <div className="flex justify-between mt-3 w-fit">
          <button
            onClick={onConfirm}
            className="flex bg-[#F3AD9B] text-[14px] px-3 py-1 rounded-2xl items-center text-black"
            disabled={isLoading}
          >
            {isLoading ? '삭제 중...' : '삭제'}
          </button>
          <button
            onClick={onCancel}
            className="flex ml-5 bg-[#BEBEBE] text-[14px] px-3 py-1 rounded-2xl items-center text-black"
            disabled={isLoading}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  )
}