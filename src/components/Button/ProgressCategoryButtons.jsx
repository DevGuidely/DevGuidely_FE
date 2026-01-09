import React from 'react'

const PROGRESS_OPTIONS = [
  {
    key: 'all',
    type: 'dots',
    bg: 'bg-[#DFE7F4]',
    dots: ['#FFE7AF', '#F3AD9B', '#BEBEBE'],
  },
  { key: 'before', label: '진행 전', bg: 'bg-[#FFE7AF]' },
  { key: 'ing', label: '진행 중', bg: 'bg-[#F3AD9B]' },
  { key: 'unused', label: '미사용', bg: 'bg-[#BEBEBE]' },
]

export default function ProgressCategoryButtons({ value, onChange }) {
  return (
    <div className="flex items-center">
      {PROGRESS_OPTIONS.map(option => {
        const isSelected = value === option.key

        if (option.type === 'dots') {
          return (
            <div
              key={option.key}
              onClick={() => onChange(option.key)}
              className={`
                flex space-x-1.5 px-3 py-2 rounded-xl cursor-pointer transition
                ${isSelected ? `shadow-md ${option.bg}` : ''}
              `}
            >
              {option.dots.map((color, i) => (
                <div
                  key={i}
                  className="w-[8px] h-[8px] rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )
        }

        return (
          <div
            key={option.key}
            onClick={() => onChange(option.key)}
            className={`
              ml-5 px-4 py-1 rounded-2xl text-[12px] fontRegular cursor-pointer transition
              ${option.bg} ${isSelected ? 'shadow-md' : ''}
            `}
          >
            {option.label}
          </div>
        )
      })}
    </div>
  )
}
