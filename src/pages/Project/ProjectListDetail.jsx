import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MainNav from '../../components/MainNav'
import ProjectHeader from '../../components/ProjectDetail/ProjectHeader'
import { PROJECT_STAGES } from '../../constants/projectStages'
import { getProjectsApi } from '../../api/project.api'
import { getProjectStepStatusApi } from '../../api/status.api'
import { saveTech, getTech } from '../../api/project.step/project.tech.api'

const STATUS_COLORS = {
  before: '#FFE7AF',
  doing: '#F3AD9B',
  done: '#B7E4C7'
}

export default function ProjectListDetail() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeStage, setActiveStage] = useState('')
  const [selectedTechCategory, setSelectedTechCategory] = useState('')
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  const [currentStageStatus, setCurrentStageStatus] = useState('')
  const [techStack, setTechStack] = useState({
    frontend: {},
    backend: {},
  })

  const techStacks = {
    '프론트': ['React', 'Vue'],
    '백': {
      '프레임워크': ['Node.js', 'Spring Boot'],
      'DB': ['MySQL', 'Maria', 'Mongo']
    }
  }

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


  useEffect(() => {
    async function fetchTechStack() {
      try {
        const data = await getTech({ projectId })
        if (!data) return

        setTechStack({
          frontend: data.frontend ?? {},
          backend: data.backend ?? {},
        })
      } catch (err) {
        console.error('Tech Stack 불러오기 실패:', err)
      }
    }

    if (projectId) {
      fetchTechStack()
    }
  }, [projectId])


  const handleStageClick = async (stageId) => {
    setActiveStage(stageId)
    
    try {
      const response = await getProjectStepStatusApi({
        projectId, 
        stepKey: stageId,
      })
      const status = response.step?.status?? 'before'
      
      setCurrentStageStatus(status)
    } catch (error) {
      console.error(`❌ ${stageId} 단계 상태 조회 실패:`, error)
      setCurrentStageStatus('before')
    }
  }

  const getCurrentStageColor = () => {
    return STATUS_COLORS[currentStageStatus] || STATUS_COLORS.before
  }

  const handleStageCardClick = (stageId) => {
    if (stageId === 'planning') {
      navigate(`/projectList/${projectId}/planning`, {
        state: {
          projectInfo: {
            id: projectId,
            name: project?.title || "PROJECT_name",
            description: project?.purpose || "프로젝트 간단 설명"
          },
          stepKey: 'planning',
          openAll: true
        }
      })
    } else if (stageId === 'tech') {
      navigate(`/projectList/${projectId}/tech`, {
        state: {
          projectInfo: {
            id: projectId,
            name: project?.title || "PROJECT_name",
            description: project?.purpose || "프로젝트 간단 설명"
          },
          stepKey: 'tech',
          openAll: true
        }
      })
    } else if (stageId === 'dev') {
      navigate(`/projectList/${projectId}/dev`, {
        state: {
          projectInfo: {
            name: project?.title || "PROJECT_name",
            description: project?.purpose || "프로젝트 간단 설명"
          },
          stepKey: 'dev',
          openAll: true
        }
      })
    } else if (stageId === 'deploy') {
      navigate(`/projectList/${projectId}/deploy`, {
        state: {
          projectInfo: {
            name: project?.title || "PROJECT_name",
            description: project?.purpose || "프로젝트 간단 설명"
          },
          stepKey: 'deploy',
          openAll: true
        }
      })
    } else {
      alert(`${PROJECT_STAGES.find(s => s.id === stageId)?.title} 단계는 준비 중입니다.`)
    }
  }

  const handleStageItemClick = (stageId, item) => {    
    if (stageId === 'planning') {
      const sectionMapping = {
        '서비스 개요': 'overview',
        '서비스 배경 및 목적': 'purpose',
        '타겟층 및 사용자 시나리오': 'target',
        '핵심 문제 정의': 'problem',
        'MVP 핵심 기능 정의': 'mvp'
      }
      
      navigate(`/projectList/${projectId}/planning`, {
        state: {
          projectInfo: {
            name: project?.title || "PROJECT_name",
            description: project?.purpose || "프로젝트 간단 설명"
          },
          stepKey: 'planning',
          focusSection: sectionMapping[item]
        }
      })
    } else if (stageId === 'tech') {
      if (item === '프론트') {
        if (selectedTechCategory === '프론트') {
          navigate(`/projectList/${projectId}/tech`, {
            state: {
              projectInfo: {
                id: projectId,
                name: project?.title,
                description: project?.purpose,
              },
              selectedCategory: 'frontend',
            },
          })
          return
        }

        setSelectedTechCategory('프론트')
        setSelectedSubCategory('')
      }

      if (item === '백') {
        if (selectedTechCategory === '백') {
          navigate(`/projectList/${projectId}/tech`, {
            state: {
              projectInfo: {
                id: projectId,
                name: project?.title,
                description: project?.purpose,
              },
              selectedCategory: 'backend',
            },
          })
          return
        }

        setSelectedTechCategory('백')
        setSelectedSubCategory('')
      }} else {
      alert(`${PROJECT_STAGES.find(s => s.id === stageId)?.title} 단계는 준비 중입니다.`)
    }
  }

  const handleTechStackSelect = (techStack) => {
    const categoryMapping = {
      '프론트': 'frontend',
      '백': 'backend'
    }
    
    navigate(`/projectList/${projectId}/tech`, {
      state: {
        projectInfo: {
          name: project?.title || "PROJECT_name",
          description: project?.purpose || "프로젝트 간단 설명"
        },
        stepKey: 'tech',
        selectedCategory: categoryMapping[selectedTechCategory],
        selectedTechStack: techStack
      }
    })
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
      '프론트',
      '백',
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

  /* Tech 버튼 클릭 시 저장 + 페이지이동 */
 const handleTechButtonClick = async (tech) => {
   // 1) 어떤 영역 선택인지에 따라 저장 로직 분기
   if (selectedTechCategory === '프론트') {
     await handleFrontendSelect(tech)
   } else if (selectedTechCategory === '백' && selectedSubCategory === '프레임워크') {
     await handleBackendFrameworkSelect(tech)
   } else if (selectedTechCategory === '백' && selectedSubCategory === 'DB') {
     await handleBackendDBSelect(tech)
   }
 
   // 2) 기존 기능(tech 페이지 이동) 유지하려면 아래 실행
   handleTechStackSelect(tech)
 }


  const renderTechStackButtons = () => {
    // 프론트
    if (selectedTechCategory === '프론트') {
      return techStacks['프론트'].map((tech) => {
        const isSelected = techStack.frontend?.framework === tech
  
        return (
          <button
            key={tech}
            onClick={() => handleTechButtonClick(tech)}
            className={`
              px-4 py-1 rounded-full fontMedium transition-all duration-200 border
              ${isSelected
                ? 'bg-[#deeaff] text-[#333333] border-[#AFC6FF]'
                : 'border-[#D7DCE5] text-[#5C667B] hover:border-gray-400 hover:bg-[#EFF5FF]'
              }
            `}
          >
            {tech}
          </button>
        )
      })
    }

     // 백(프레임워크/DB)
    if (selectedTechCategory === '백' && selectedSubCategory) {
      return techStacks['백'][selectedSubCategory]?.map((tech) => {
        const isSelected =
          selectedSubCategory === '프레임워크'
            ? techStack.backend?.framework === tech
            : techStack.backend?.database === tech
  
        return (
          <button
            key={tech}
            onClick={() => handleTechButtonClick(tech)}
            className={`
              px-4 py-1 rounded-full fontMedium transition-all duration-200 border
              ${isSelected
                ? 'bg-[#C3C3C3] text-[#fff] border-[#C3C3C3]'
                : 'border-[#D7DCE5] text-[#5C667B] hover:border-gray-400 hover:bg-[#EFF5FF]'
              }
            `}
          >
            {tech}
          </button>
        )
      })
    }
  
    return null
  }

  /* Tech DB 저장 관련 */
  //Frontend Save
  const handleFrontendSelect = async (framework) => {
    const nextStack = {
      ...techStack,
      frontend: { framework },
    }

    setTechStack(nextStack)

    try {
      await saveTech({
        projectId,
        payload: nextStack,
      })
    } catch (err) {
      console.error('프론트 기술 저장 실패:', err)
    }
  }
  //Backend : framework Save
  const handleBackendFrameworkSelect = async (framework) => {
    const nextStack = {
      ...techStack,
      backend: {
        ...techStack.backend,
        framework,
      },
    }

    setTechStack(nextStack)

    try {
      await saveTech({
        projectId,
        payload: nextStack,
      })
    } catch (err) {
      console.error('벡엔드 프레임워크 저장 실패:', err)
    }
  }
  //Backend : database Save
  const handleBackendDBSelect = async (database) => {
    const nextStack = {
      ...techStack,
      backend: {
        ...techStack.backend,
        database,
      },
    }

    setTechStack(nextStack)

    try {
      await saveTech({
        projectId,
        payload: nextStack,
      })
    } catch (err) {
      console.error('DB 프레임워크 저장 실패:', err)
    }
  }


  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
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
                  : 'hover:bg-white/30 hover:border-white/40 hover:hover:shadow-xl'
                }
              `}
              onClick={() => handleStageClick(stage.id)}
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
                
                {/* ✅ 선택된 단계만 백엔드에서 받아온 색상 표시 */}
                {activeStage === stage.id && (
                  <div 
                    className='text-sm animate-pulse'
                    style={{ color: getCurrentStageColor() }}
                  >
                    ●
                  </div>
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
                    <div key={index}>
                      <div 
                        className={`
                          p-5 transition-all duration-300 border cursor-pointer group rounded-xl backdrop-blur-md bg-white/15 border-white/20 hover:bg-white/25 hover:border-white/40 hover:shadow-lg hover:transform hover:translate-x-2
                          ${selectedTechCategory === item ? 'bg-white/25 border-white/40' : ''}
                        `}
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
                      
                      {/* 프론트엔드 기술 스택 (저장된 것만 표시) */}
                      {activeStage === 'tech' && selectedTechCategory === '프론트' && item === '프론트' && (
                        <div className="flex items-center gap-5 mt-3 ml-5">
                          {techStack.frontend?.framework ? (
                            <div>
                              <div className="mb-2 text-sm text-gray-500 fontMedium">
                                프레임워크
                              </div>
                              <button
                                className="
                                  px-4 py-0.5 rounded-full fontMedium
                                  bg-[#deeaff] text-[#333333] border border-[#AFC6FF]
                                  cursor-default
                                "
                              >
                                {techStack.frontend.framework}
                              </button>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-400">
                              아직 선택된 프론트엔드 기술이 없습니다.
                            </div>
                          )}
                        </div>
                      )}

                      {/* 백엔드 서브 카테고리 */}
                      {activeStage === 'tech' && selectedTechCategory === '백' && item === '백' && (
                        <div className="flex items-center gap-5 mt-3 ml-5">
                          {/* Backend Framework */}
                          {techStack.backend?.framework && (
                            <div>
                              <div className="mb-2 text-sm text-gray-500 fontMedium">
                                프레임워크
                              </div>
                              <button
                                className="
                                  px-4 py-0.5 rounded-full fontMedium
                                  bg-[#deeaff] text-[#333333] border border-[#AFC6FF]
                                  cursor-default
                                "
                              >
                                {techStack.backend.framework}
                              </button>
                            </div>
                          )}

                          {/* Backend DB */}
                          {techStack.backend?.database && (
                            <div>
                              <div className="mb-2 text-sm text-gray-500 fontMedium">
                                DB
                              </div>
                              <button
                                className="
                                  px-4 py-0.5 rounded-full fontMedium
                                  bg-[#deeaff] text-[#333333] border border-[#AFC6FF]
                                  cursor-default
                                "
                              >
                                {techStack.backend.database}
                              </button>
                            </div>
                          )}

                          {/* 아무 것도 없을 때 */}
                          {!techStack.backend?.framework && !techStack.backend?.database && (
                            <div className="text-sm text-gray-400">
                              아직 선택된 백엔드 기술이 없습니다.
                            </div>
                          )}
                        </div>
                      )}
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