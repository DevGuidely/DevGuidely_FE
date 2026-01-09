import React from 'react'

const TRACKS = [
  { key: 'backend', label: '백엔드', color: '#13D199' },
  { key: 'frontend', label: '프론트엔드', color: '#F68F4E' },
  { key: 'design', label: '디자인', color: '#FF7E80' },
]

export default function TrackCategoryButtons({
  value,
  onChange,
}) {
  return (
    <div className='flex space-x-4'>
      {TRACKS.map(track => {
        const isSelected = value === track.key

        return (
          <div
            key={track.key}
            onClick={() => onChange(track.key)}
            className={`
              px-4 py-1 text-[13px] fontRegular cursor-pointer
              border-b-2 transition
              ${
                isSelected
                  ? ''
                  : 'border-transparent text-[#5C667B]'
              }
            `}
            style={{
              borderBottomColor: isSelected
                ? track.color
                : '#F5F5F5',
            }}
          >
            {track.label}
          </div>
        )
      })}
    </div>
  )
}
