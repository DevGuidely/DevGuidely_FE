import React from 'react'
import StageCard from './StageCard'
import { PROJECT_STAGES } from '../../constants/projectStages'

export default function StageList({ onStageClick }) {
  return (
    <div className='flex w-full gap-8 px-16 mt-10'>
      {PROJECT_STAGES.map((stage) => (
        <StageCard 
          key={stage.id}
          stage={stage}
          onClick={onStageClick}
        />
      ))}
    </div>
  )
}