import React, { useEffect, useRef, useState } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'

const PROGRESS_OPTIONS = [
  { key: 'before', label: '진행 전', bg: 'bg-[#FFE7AF]' },
  { key: 'ing', label: '진행 중', bg: 'bg-[#F3AD9B]' },
  { key: 'done', label: '진행 완료', bg: 'bg-[#B7E4C7]' },
]

export default function ProgressCategoryDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedKey, setSelectedKey] = useState(value ?? 'before')
  const ref = useRef(null)

  useEffect(() => {
    if (value) {
      setSelectedKey(value)
    }
  }, [value])

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

  const handleSelect = key => {
    setSelectedKey(key)
    onChange?.(key)
    setIsOpen(false)
  }

  return (
    <div ref={ref} className="flex items-center gap-1">
      <div className="relative">
        <div
          onClick={() => setIsOpen(prev => !prev)}
          className={`
            px-4 py-1 rounded-2xl cursor-pointer
            text-[12px] fontRegular whitespace-nowrap
            ${selected.bg} shadow-md
          `}
        >
          {selected.label}
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
