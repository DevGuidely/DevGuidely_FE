import React, { useState, useEffect } from 'react'
import MainNav from '../../components/MainNav'
import ProgressCategoryDropdown from '../../components/Button/ProgressCategoryDropdown'
import { useLocation } from 'react-router-dom'
import { techGuides } from '../../data/techGuides'
import { IoMdArrowDropdown } from "react-icons/io";
import { FaLink } from "react-icons/fa6";
import { TbCopy } from "react-icons/tb";
import { getTech, saveTech } from '../../api/project.step/project.tech.api';

export default function TechDetail() {
  const location = useLocation()
  const initialCategory = location.state?.selectedCategory

  const projectInfo = location.state?.projectInfo || {
    id: null,
    name: 'Unknown Project',
    description: 'No description available',
  };

  const projectId = projectInfo.id;

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTechStack, setSelectedTechStack] = useState('')

  const [techStack, setTechStack] = useState({
    frontend: {},
    backend: {},
  })

  useEffect(() => {
    if (!projectId) return

    const fetchTech = async () => {
      const data = await getTech({ projectId })
      if (!data) return

      setTechStack({
        frontend: data.frontend ?? {},
        backend: data.backend ?? {},
      })

      // 🔥 ProjectListDetail에서 넘어온 카테고리 우선
      if (initialCategory === 'frontend' && data.frontend?.framework) {
        setSelectedCategory('frontend')
        setSelectedTechStack(data.frontend.framework)
      }

      if (initialCategory === 'backend' && data.backend?.framework) {
        setSelectedCategory('backend')
        setSelectedTechStack(data.backend.framework)
      }
    }

    fetchTech()
  }, [projectId, initialCategory])

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)

    if (category === 'frontend') {
      setSelectedTechStack(techStack.frontend?.framework || '')
      return
    }

    if (category === 'backend') {
      setSelectedTechStack(techStack.backend?.framework || '')
      return
    }
    
    setSelectedTechStack('')
  }

  const handleTechStackSelect = async (tech) => {
    setSelectedTechStack(tech)
    
    const nextStack =
      selectedCategory === 'frontend'
        ? {
            ...techStack,
            frontend: { framework: tech },
          }
        : {
            ...techStack,
            backend: {
              ...techStack.backend,
              framework: tech,
            },
          };

    setTechStack(nextStack);

    await saveTech({
      projectId,
      payload: nextStack,
    });
  };

  const handleDBSelect = async (db) => {
    const nextStack = {
      ...techStack,
      backend: {
        ...techStack.backend,
        database: db,
      },
    };

    setTechStack(nextStack);

    await saveTech({
      projectId,
      payload: nextStack,
    });
  };

  const current = techStack[selectedCategory]?.framework

  /* ===============================
   * UI 데이터
   * =============================== */
  const categories = [
    { id: 'backend', name: '백엔드', bgColor: '#13D199' },
    { id: 'frontend', name: '프론트엔드', bgColor: '#F68F4E' },
    { id: 'design', name: '디자인', bgColor: '#FF7E80' },
  ];

  const techStacks = {
    backend: ['Node.js', 'Spring Boot'],
    frontend: ['React', 'Vue'],
    design: [],
  };

  const dbStacks = ['MySQL', 'MariaDB', 'Mongo'];

  /* ===============================
   * 유틸
   * =============================== */
  const handleCopy = (text) => {
    const markdownCode = `\`\`\`\n${text}\n\`\`\``;
    navigator.clipboard.writeText(markdownCode);
  };

  const renderGuide = () => {
    const guide =
      techGuides[selectedCategory]?.[selectedTechStack]

    if (!guide) {
      return (
        <div className="flex items-center justify-center min-h-[300px] text-[#666666]">
          가이드를 준비중입니다
        </div>
      )
    }

    return (
      <div className="w-full">
        {guide.sections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-5">
            <div className="flex items-center text-[18px] fontMedium mb-4 mt-8">
              {section.title}
              <IoMdArrowDropdown className='text-[#CACACA]' />
            </div>

            {/* Step 단위 */}
            {section.steps?.map((step, stepIdx) => (
              <div key={stepIdx}>
                {step.title && (
                  <div className="flex items-center whitespace-nowrap mb-7 fontMedium">
                    {stepIdx + 1}. {step.title}
                    {step.titleNote && (
                      <p className="flex justify-end w-full text-xs text-[#E86666]">
                        {step.titleNote}
                      </p>
                    )}
                  </div>
                )}

                {/* 추천 라이브러리 */}
                {step.RecommendTitle && step.RecommendCode && (
                  <div className="mb-5">
                    <div className="flex items-center mb-2 whitespace-nowrap fontMedium">
                      {step.RecommendTitle}
                    </div>
                    <pre className="flex w-full justify-between p-6 mt-2 overflow-x-auto text-sm text-[#676767] bg-[#FFF3F4] rounded-2xl">
                      {step.RecommendCode.join('\n')}
                      <TbCopy
                        className="text-[18px] text-[#CACACA] cursor-pointer hover:text-[#999]"
                        onClick={() => handleCopy(step.RecommendCode.join('\n'))}
                      />
                    </pre>
                  </div>
                )}

                {/* 단일 code (node -v 같은 경우) */}
                {step.code && (
                  <pre className="flex w-full justify-between p-6 mb-3 mt-2 overflow-x-auto text-sm text-[#676767] bg-[#F8F9FA] rounded-2xl">
                    {step.code}
                    <TbCopy
                        className="text-[18px] text-[#CACACA] cursor-pointer hover:text-[#999]"
                        onClick={() => handleCopy(step.code)}
                      />
                  </pre>
                )}

                {/* 여러 code block */}
                {step.blocks?.map((block, idx) => (
                  <div key={idx} className="mb-5">
                    <pre className="flex w-full justify-between p-6 mt-2 overflow-x-auto text-sm text-[#676767] bg-[#F8F9FA] rounded-2xl">
                      {block.code.join('\n')}
                      <TbCopy
                        className="text-[18px] text-[#CACACA] cursor-pointer hover:text-[#999]"
                        onClick={() => handleCopy(block.code.join('\n'))}
                      />
                    </pre>

                    {block.note && (
                      <p className="flex justify-end mt-2 text-xs text-[#E86666]">
                        {block.note}
                      </p>
                    )}
                  </div>
                ))}

                {step.description && (
                  <ul className="list-disc ml-5 mt-2 text-sm text-[#666666]">
                    {step.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                )}

                <div className='flex w-full mb-5'>
                  {step.link && (
                    <a
                      href={step.link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex justify-start w-full items-center gap-2 text-md text-[#676767] underline"
                    >
                      <FaLink />
                      {step.link.label}
                    </a>
                  )}

                  {step.note && (
                    <p className="flex justify-end w-full text-xs text-[#E86666]">
                      {step.note}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* 폴더 구조 같은 단일 코드 블록 */}
            {section.code && (
              <pre className="flex w-full justify-between bg-[#F8F9FA] p-5 rounded-2xl text-sm text-[#676767] overflow-x-auto">
                {section.code}
                <TbCopy
                  className="text-[18px] text-[#CACACA] cursor-pointer hover:text-[#999]"
                  onClick={() => handleCopy(section.code)}
                />
              </pre>
            )}
          </div>
        ))}
      </div>
    )
  }

  const renderContent = () => {
    if (!selectedCategory) {
      return (
        <div className="flex fontMedium text-[#666666] min-h-[450px] items-center">
          파트를 선택해주세요
        </div>
      )
    }

    if (selectedCategory === 'design') {
      return (
        <div className="flex fontMedium text-[#666666] min-h-[450px] items-center">
          아직 준비중입니다
        </div>
      )
    }

    return (
      <div className="w-full min-h-[450px]">
        <div className="flex gap-4">
          <div className="flex gap-5 mb-6">
            {/* 기술 선택 */}
            <div className="flex items-center gap-4">
              <h3 className="text-[18px] fontMedium text-[#333333]">
                기술 선택
              </h3>

              <div className="flex gap-3">
                {techStacks[selectedCategory]?.map(tech => (
                  <button
                    key={tech}
                    onClick={() => handleTechStackSelect(tech)}
                    className={`
                      px-4 py-0.5 rounded-full fontMedium transition-all
                      ${
                        current === tech
                          ? 'bg-[#EFF5FF] text-[#333333]'
                          : 'border border-[#D7DCE5] text-[#5C667B]'
                      }
                    `}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            {/* DB 선택 */}
            {selectedCategory === 'backend' && (
              <div className="flex items-center gap-4">
                <h3 className="text-[18px] fontMedium text-[#333333]">
                  DB
                </h3>

                <div className="flex gap-3">
                  {dbStacks.map(db => (
                    <button
                      key={db}
                      onClick={() => handleDBSelect(db)}
                      className={`
                        px-4 py-0.5 rounded-full fontMedium transition-all
                        ${
                          techStack.backend?.database === db
                            ? 'bg-[#EFF5FF] text-[#333333]'
                            : 'border border-[#D7DCE5] text-[#5C667B]'
                        }
                      `}
                    >
                      {db}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {selectedTechStack ? (
          <div className="mx-10 mt-6">{renderGuide()}</div>
        ) : (
          <div className="flex items-center justify-center min-h-[300px] text-[#666666]">
            기술 스택을 선택해주세요
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center mb-10">
      <MainNav />

      <ProjectHeader projectName={projectInfo.name} />

      <div className="flex justify-center mt-5">
        <div className="flex gap-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className="px-5 py-1 transition-all rounded-full fontMedium"
              style={{
                backgroundColor:
                  selectedCategory === category.id
                    ? category.bgColor
                    : '#F5F5F5',
                color:
                  selectedCategory === category.id
                    ? '#FFFFFF'
                    : '#666666',
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className='flex text-[11px] my-3 text-[#E86666]'>기본적인 세팅만 간단하게 정리되어있습니다.</div>

      <div className="flex justify-center w-9/12 p-8 mx-20 bg-white shadow-2xl rounded-3xl">
        {renderContent()}
      </div>
    </div>
  )
}

const ProjectHeader = ({ projectName }) => (
  <div className="flex items-center justify-between w-full px-24 mt-5">
    <div className="flex items-center">
      <div className="flex bg-[#FDD7D8] w-10 h-10 rounded-md" />
      <div className="flex flex-col ml-4">
        <div className="fontBold text-[28px]">Tech</div>
        <div className="fontRegular text-[14px]">
          {projectName}
        </div>
      </div>
    </div>
    <ProgressCategoryDropdown />
  </div>
)
