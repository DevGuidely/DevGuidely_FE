import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MainNav from '../../components/MainNav'
import ProjectHeader from '../../components/ProjectDetail/ProjectHeader'
import StageCard from '../../components/ProjectDetail/StageCard'
import { PROJECT_STAGES } from '../../constants/projectStages'
import { getProjectsApi } from '../../api/project.api'

export default function ProjectListDetail() {
  const { projectId } = useParams()
  const navigate = useNavigate() // 추가
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeStage, setActiveStage] = useState('')

  useEffect(() => {
    async function fetchProjectDetail() {
      try {
        setLoading(true)
        
        const data = await getProjectsApi()
        const items = Array.isArray(data) ? data : (Array.isArray(data?.items) ? data.items : [])
        
        const foundProject = items.find(p => p.id === parseInt(projectId))
        
        if (foundProject) {
          setProject(foundProject)
        } else {
          setProject(null)
        }
      } catch (error) {
        console.error('❌ 프로젝트 정보 가져오기 실패:', error)
        setProject(null)
      } finally {
        setLoading(false)
      }
    }

    if (projectId) {
      fetchProjectDetail()
    }
  }, [projectId])

  const handleStageCardClick = (stageId) => {
    console.log('🎯 단계 카드 직접 클릭:', { stageId, projectId })
    
    if (stageId === 'planning') {
      navigate(`/projectList/${projectId}/planning`)
    } else {
      alert(`${PROJECT_STAGES.find(s => s.id === stageId)?.title} 단계는 준비 중입니다.`)
    }
  }

  const handleStageItemClick = (stageId, item) => {
    console.log('🎯 단계별 아이템 클릭:', { stageId, item, projectId })
    
    if (stageId === 'planning') {
      navigate(`/projectList/${projectId}/planning`)
    } else {
      alert(`${PROJECT_STAGES.find(s => s.id === stageId)?.title} 단계는 준비 중입니다.`)
    }
  }

  const stageItems = {
    planning: [
      '서비스 개요',
      '서비스 배경 및 목적',
      '타겟층 및 사용자 시나리오',
      '핵심 문제 정의',
      'MVP 핵심 기능 정의'
    ],
    tech: [
      '기술 스택 선정',
      '아키텍처 설계',
      '개발 환경 설정',
      'DB 설계',
      'API 설계'
    ],
    dev: [
      '프론트엔드 개발',
      '백엔드 개발',
      'DB 구축',
      'API 구현',
      '테스트 코드 작성'
    ],
    deploy: [
      '서버 환경 구축',
      'CI/CD 파이프라인 설정',
      '도메인 및 SSL 설정',
      '모니터링 설정',
      '서비스 런칭'
    ]
  }

  const headerProps = {
    title: project?.title || "PROJECT_name",
    description: project?.purpose || "프로젝트 간단 설명", 
    date: project?.createdAt 
      ? new Date(project.createdAt).toLocaleDateString('ko-KR')
      : "2026.01.05"
  }
  
  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
        <MainNav />
        <div className='flex items-center justify-center p-8'>
          <div className='text-lg text-gray-600'>로딩 중...</div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      {/* <div className='fixed inset-0 opacity-30'>
        <div className='absolute bg-blue-300 rounded-full top-20 left-20 w-72 h-72 mix-blend-multiply filter blur-xl animate-blob'></div>
        <div className='absolute bg-purple-300 rounded-full top-40 right-20 w-72 h-72 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000'></div>
        <div className='absolute bg-pink-300 rounded-full -bottom-8 left-40 w-72 h-72 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000'></div>
      </div> */}

      <MainNav />
      
      <div className='relative z-10 backdrop-blur-sm'>
        <ProjectHeader {...headerProps} />
      </div>

      <div className='relative z-10 flex w-full gap-8 px-16 pb-20 mt-14'>
        {/* 왼쪽: 단계 선택 */}
        <div className='space-y-4 w-80'>
          {PROJECT_STAGES.map((stage) => (
            <div
              key={stage.id}
              className={`
                p-4 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105
                backdrop-blur-lg bg-white/20 border border-white/30 shadow-lg
                ${activeStage === stage.id
                  ? 'bg-white/40 border-white/50 shadow-xl scale-105'
                  : 'hover:bg-white/30 hover:border-white/40 hover:shadow-xl'
                }
              `}
              onClick={() => setActiveStage(stage.id)}
            >
              <div className='flex items-center space-x-4'>
                <div className={`
                  w-12 h-12 rounded-xl ${stage.bgColor} flex-shrink-0 shadow-lg
                  backdrop-blur-sm bg-opacity-80
                `}></div>
                <div className='flex-1'>
                  <div className='text-lg text-gray-800 fontSB'>{stage.title}</div>
                  <div className='mt-1 text-sm text-gray-600'>{stage.description}</div>
                </div>
                {activeStage === stage.id && (
                  <div className='text-sm text-blue-600 animate-pulse'>●</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 오른쪽: 선택된 단계의 상세 내용 */}
        <div className='flex-1'>
          {activeStage ? (
            <div className='overflow-hidden border shadow-xl backdrop-blur-lg bg-white/20 border-white/30 rounded-3xl'>
              <div className='p-8 border-b bg-gradient-to-r from-white/10 to-white/5 border-white/20'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h2 className='mb-3 text-3xl text-gray-800 fontSB'>
                      {PROJECT_STAGES.find(s => s.id === activeStage)?.title} 단계
                    </h2>
                    <p className='text-lg text-gray-600'>
                      {PROJECT_STAGES.find(s => s.id === activeStage)?.description}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleStageCardClick(activeStage)}
                    className='px-6 py-3 text-white transition-all duration-300 transform border shadow-lg rounded-xl backdrop-blur-md bg-blue-500/80 border-blue-400/50 fontSB hover:bg-blue-600/80 hover:scale-105'
                  >
                    바로 시작하기 →
                  </button>
                </div>
              </div>
              
              <div className='p-8'>
                <div className='space-y-4'>
                  {stageItems[activeStage]?.map((item, index) => (
                    <div 
                      key={index}
                      className='p-5 transition-all duration-300 border cursor-pointer group rounded-xl backdrop-blur-md bg-white/15 border-white/20 hover:bg-white/25 hover:border-white/40 hover:shadow-lg hover:transform hover:translate-x-2'
                      onClick={() => handleStageItemClick(activeStage, item)}
                    >
                      <div className='flex items-center justify-between'>
                        <span className='text-lg text-gray-700 fontMedium group-hover:text-gray-800'>
                          {item}
                        </span>
                        <span className='text-gray-400 transition-all duration-300 opacity-0 group-hover:text-blue-600 group-hover:opacity-100 group-hover:transform group-hover:translate-x-1'>
                          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                          </svg>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-center border-2 border-dashed h-96 rounded-3xl backdrop-blur-lg bg-white/10 border-white/30'>
              <div className='text-center'>
                <div className='mb-4 text-2xl text-gray-500 fontMedium'>✨ 단계를 선택해주세요</div>
                <div className='text-lg text-gray-400'>
                  왼쪽에서 프로젝트 단계를 클릭하여<br/>
                  상세 내용을 확인하세요
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}