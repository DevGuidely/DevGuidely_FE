import React, { useEffect, useRef, useState } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { getProjectStepStatusApi, updateProjectStepStatusApi } from '../../api/status.api'

const PROGRESS_OPTIONS = [
  { key: 'before', label: '진행 전', bg: 'bg-[#FFE7AF]' },
  { key: 'doing', label: '진행 중', bg: 'bg-[#F3AD9B]' },
  { key: 'done', label: '진행 완료', bg: 'bg-[#B7E4C7]' },
]

export default function ProgressCategoryDropdown({ 
  projectId, 
  stepKey,
  initialValue 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedKey, setSelectedKey] = useState(initialValue ?? 'before')
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    
    if (!projectId || !stepKey) {
      console.log('❌ Missing projectId or stepKey')
      return
    }

    const fetchStatus = async () => {
      try {
        
        const statusData = await getProjectStepStatusApi({ 
          projectId, 
          stepKey 
        })
        
        const status = statusData?.step?.status || statusData?.status;
        
        if (status) {
          setSelectedKey(status)
        } else {
          setSelectedKey('before')
        }
      } catch (error) {
        console.error('❌ Error details:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        })
      }
    }

    fetchStatus()
  }, [projectId, stepKey])

  const selected =
    PROGRESS_OPTIONS.find(option => option.key === selectedKey) ??
    PROGRESS_OPTIONS[0]

  useEffect(() => {
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = async (key) => {
    if (isLoading || !projectId || !stepKey) {
      console.log('⚠️ handleSelect blocked:', { isLoading, projectId, stepKey })
      return
    }

    try {
      setIsLoading(true)
      console.log(`🔄 Updating ${stepKey} status to:`, key)
      
      const result = await updateProjectStepStatusApi({
        projectId,
        stepKey,
        status: key
      })
      
      console.log('✅ Update result:', result)
      
      setSelectedKey(key)
      setIsOpen(false)
      console.log(`✅ ${stepKey} status updated successfully to:`, key)
    } catch (error) {
      console.error(`❌ Failed to update ${stepKey} status:`, error)
      console.error('❌ Update error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      })
    } finally {
      setIsLoading(false)
    }
  }

  console.log('🔍 Current render state:', { 
    projectId, 
    stepKey, 
    selectedKey, 
    selectedLabel: selected.label,
    isLoading 
  })

  return (
    <div ref={ref} className="flex items-center gap-1">
      <div className="relative">
        <div
          onClick={() => setIsOpen(prev => !prev)}
          className={`
            px-4 py-1 rounded-2xl cursor-pointer
            text-[12px] fontRegular whitespace-nowrap
            ${selected.bg} shadow-md
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isLoading ? '저장중...' : selected.label}
        </div>

        {/* 드롭다운 (라벨 기준 중앙) */}
        {isOpen && (
          <div className="absolute z-20 flex flex-col items-center mt-3 -translate-x-1/2 left-1/2">
            {PROGRESS_OPTIONS.map(option => {
              const isSelected = option.key === selectedKey

              return (
                <div
                  key={option.key}
                  onClick={() => handleSelect(option.key)}
                  className={`
                    px-4 py-1 rounded-2xl
                    text-[12px] fontRegular cursor-pointer
                    transition whitespace-nowrap mb-1
                    ${option.bg}
                    ${isSelected ? 'shadow-md' : ''}
                    ${isLoading ? 'cursor-not-allowed opacity-50' : ''}
                  `}
                >
                  {option.label}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center cursor-pointer"
      >
        <RiArrowDropDownLine
          size={28}
          color="#CACACA"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
    </div>
  )
}