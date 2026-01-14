import React, { useMemo, useState, useEffect } from 'react'
import MainNav from '../../components/MainNav'
import ProgressCategoryButtons from '../../components/Button/ProgressCategoryButtons'
import ProjectCreateModal from '../../components/Modal/ProjectCreateModal'

import { getProjectsApi } from '../../api/project.api'
import { MdDeleteOutline } from 'react-icons/md'

const progressLabelMap = {
  before: '진행 전',
  ing: '진행 중',
  done: '진행 완료',
  unused: '미사용',
}

const progressColorMap = {
  before: 'bg-progress-before',
  ing: 'bg-progress-ing',
  done: 'bg-progress-done',
  unused: 'bg-progress-unused',
}

// 배열을 size 단위로 나누는 함수
const chunkArray = (array, size) => {
  const result = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

export default function ProjectList() {
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentCompletedSlide, setCurrentCompletedSlide] = useState(0)

  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjectsApi();
        // data가 배열일 수도 있고, { items, total } 형태일 수도 있으므로 안전하게 추출

        const items = Array.isArray(data) ? data : (Array.isArray(data?.items) ? data.items : []);
+       setProjects(items);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProjects();
  }, []);

  // 필터링: selectedStatus에 따라 프로젝트 분류 (진행완료 제외)
  const filteredItems = useMemo(() => {
    const safeProjects = Array.isArray(projects) ? projects : [];

    if (selectedStatus === 'all') {
      // 'all'일 때도 진행완료는 제외
      return safeProjects.filter(item => item.progress !== 'done')
    }
    return safeProjects.filter(item => item.progress === selectedStatus)
  }, [selectedStatus, projects])

  // 진행완료 프로젝트만 필터링
  const completedProjects = useMemo(() => {
    const safeProjects = Array.isArray(projects) ? projects : [];

    return safeProjects.filter(item => item.progress === 'done')
  }, [projects])

  // 슬라이드용 배열 생성 (3개씩 나누기, 빈 공간은 null로 채우지 않음)
  const slides = useMemo(() => {
    return chunkArray(filteredItems, 3)
  }, [filteredItems])

  // 진행완료 프로젝트 - 9개 이하면 슬라이드 없이, 이상이면 슬라이드
  const shouldShowCompletedSlides = completedProjects.length > 9

  // 진행완료 프로젝트 슬라이드용 배열 생성 (9개 이상일 때만)
  const completedSlides = useMemo(() => {
    if (shouldShowCompletedSlides) {
      return chunkArray(completedProjects, 9) // 9개씩 그룹핑
    }
    return []
  }, [completedProjects, shouldShowCompletedSlides])

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  //생성된 프로젝트를 state에 반영
  const handleCreateProject = (newProject) => {
    setProjects(prev => [...prev, newProject])
  };

  return (
    <div>
      <MainNav />

      <div className='flex flex-col items-center'>
        <div className="flex justify-center fontSB text-[40px] mt-7">
          PROJECT
        </div>

        <div className="flex flex-col items-center mt-8 bg-[#fdfdfd] w-[80%] min-h-[300px] mx-auto rounded-3xl shadow-xl">
          {/* 상단 필터 */}
          <div className="flex justify-between w-[90%] mt-5 mb-3">
            <ProgressCategoryButtons
              value={selectedStatus}
              onChange={value => {
                setSelectedStatus(value)
                setCurrentSlide(0) // 필터 변경 시 첫 슬라이드로
              }}
            />

            <div 
              onClick={handleModalOpen}
              className="text-[12px] bg-project-create fontRegular px-4 py-1 rounded-2xl cursor-pointer hover:opacity-50 transition"
            >
              + 프로젝트 생성
            </div>
          </div>

          {/* 슬라이드 영역 - 진행완료 프로젝트 제외 */}
          <div className="relative w-[90%] overflow-hidden mt-4">
            {filteredItems.length === 0 ? (
              /* 프로젝트가 없을 때 */
              <div className='flex flex-col items-center justify-center py-16'>
                <div className='text-gray-500 text-[16px] fontRegular'>
                  프로젝트를 생성해 주세요
                </div>
              </div>
            ) : (
              /* 프로젝트가 있을 때 */
              <div
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((group, index) => (
                  <div key={index} className="w-full flex-shrink-0 grid grid-cols-3 gap-4">
                    {group.map((project) => (
                      <div
                        key={project.id}
                        className="bg-project-bg px-6 py-6 rounded-2xl cursor-pointer hover:shadow-md transition"
                      >
                        <div className="flex flex-col">
                          <div className="flex justify-between items-center">
                            <div className="fontSB text-[16px]">{project.title}</div>
                            <MdDeleteOutline className="text-[#838383] text-[20px]" />
                          </div>
                          <div className="fontRegular text-[13px] text-project-desc mt-1">
                            {project.purpose}
                          </div>
                          <div className="flex justify-between items-center mt-16">
                            <div className="text-[12px] text-project-date">
                              {new Date(project.createdAt).toLocaleDateString()}
                            </div>
                            <div
                              className={`
                                w-fit h-fit text-[12px] fontRegular px-4 py-1 rounded-2xl
                                ${progressColorMap[project.progress]}
                              `}
                            >
                              {progressLabelMap[project.progress]}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* 빈 공간을 채우기 위한 투명한 div들 */}
                    {Array(3 - group.length).fill(null).map((_, idx) => (
                      <div key={`empty-${idx}`} className="invisible" />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 슬라이드 점 */}
          {slides.length > 1 && (
            <div className="flex space-x-2 mt-5 mb-4">
              {slides.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`
                    w-[8px] h-[8px] rounded-full cursor-pointer
                    ${currentSlide === index ? 'bg-project-dot-active' : 'bg-project-dot-inactive'}
                  `}
                />
              ))}
            </div>
          )}
        </div>

        {/* 그라데이션 보더와 진행완료 섹션 */}
        <div className='flex flex-col my-10 w-[80%]'>
          {/* 그라데이션 보더 */}
          <div 
            className='h-[1.5px] w-full'
            style={{
              background: 'linear-gradient(to right, rgba(197, 208, 226, 0.1) 0%, rgba(197, 208, 226, 1) 50%, rgba(197, 208, 226, 0.1) 100%)'
            }}
          />
          
          {/* 진행완료 섹션 */}
          <div className='flex flex-col items-center'>
            {/* 진행완료 카테고리 버튼 */}
            <div className='w-[90%] mx-auto'>
              <div className='w-fit my-5 px-4 py-1 rounded-2xl text-[12px] fontRegular bg-[#B1ED93] shadow-md'>
                진행 완료
              </div>
            </div>

            {/* 진행완료 프로젝트 영역 */}
            <div className="relative w-[90%]">
              {completedProjects.length === 0 ? (
                /* 진행완료 프로젝트가 없을 때 */
                <div className='flex flex-col items-center justify-center py-8'>
                  <div className='text-gray-500 text-[14px] fontRegular'>
                    진행완료된 프로젝트가 없습니다.
                  </div>
                </div>
              ) : !shouldShowCompletedSlides ? (
                /* 9개 이하일 때 - 슬라이드 없이 그리드로 표시 */
                <div className="grid grid-cols-3 gap-4">
                  {completedProjects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-project-bg px-6 py-6 rounded-2xl cursor-pointer hover:shadow-md transition"
                    >
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <div className="fontSB text-[16px]">{project.title}</div>
                          <MdDeleteOutline className="text-[#838383] text-[20px]" />
                        </div>
                        <div className="fontRegular text-[13px] text-project-desc mt-1">
                          {project.purpose}
                        </div>
                        <div className="flex justify-between items-center mt-16">
                          <div className="text-[12px] text-project-date">
                            {new Date(project.createdAt).toLocaleDateString()}
                          </div>
                          <div className="w-fit h-fit text-[12px] fontRegular px-4 py-1 rounded-2xl bg-progress-done">
                            {progressLabelMap[project.progress]}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* 9개 초과일 때 - 슬라이드로 표시 */
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-300"
                    style={{ transform: `translateX(-${currentCompletedSlide * 100}%)` }}
                  >
                    {completedSlides.map((group, index) => (
                      <div key={index} className="w-full flex-shrink-0">
                        <div className="grid grid-cols-3 gap-4">
                          {group.map((project) => (
                            <div
                              key={project.id}
                              className="bg-project-bg px-6 py-6 rounded-2xl cursor-pointer hover:shadow-md transition"
                            >
                              <div className="flex flex-col">
                                <div className="flex justify-between items-center">
                                  <div className="fontSB text-[16px]">{project.title}</div>
                                  <MdDeleteOutline className="text-[#838383] text-[20px]" />
                                </div>
                                <div className="fontRegular text-[13px] text-project-desc mt-1">
                                  {project.purpose}
                                </div>
                                <div className="flex justify-between items-center mt-16">
                                  <div className="text-[12px] text-project-date">
                                    {new Date(project.createdAt).toLocaleDateString()}
                                  </div>
                                  <div className="w-fit h-fit text-[12px] fontRegular px-4 py-1 rounded-2xl bg-progress-done">
                                    {progressLabelMap[project.progress]}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          {/* 빈 공간을 채우기 위한 투명한 div들 - 9개가 안될 때 */}
                          {Array(9 - group.length).fill(null).map((_, idx) => (
                            <div key={`empty-${idx}`} className="invisible" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 진행완료 프로젝트 슬라이드 점 (9개 초과일 때만) */}
            {shouldShowCompletedSlides && completedSlides.length > 1 && (
              <div className="flex space-x-2 mt-5">
                {completedSlides.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentCompletedSlide(index)}
                    className={`
                      w-[8px] h-[8px] rounded-full cursor-pointer
                      ${currentCompletedSlide === index ? 'bg-project-dot-active' : 'bg-project-dot-inactive'}
                    `}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 프로젝트 생성 모달 */}
      <ProjectCreateModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose}
        onCreate={handleCreateProject}
      />
    </div>
  )
}