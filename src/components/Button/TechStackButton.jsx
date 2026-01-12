import React from 'react'

export default function TechStackButton({
  label,
  selected,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`
        px-4 py-2 rounded-xl text-[13px] fontRegular cursor-pointer transition
        text-[#5C667B]
        ${
          selected
            ? 'bg-[#EFF5FF]'
            : 'border border-[#D7DCE5]'
        }
      `}
    >
      {label}
    </div>
  )
}
