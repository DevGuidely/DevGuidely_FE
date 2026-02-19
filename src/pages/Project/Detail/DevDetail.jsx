import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import MainNav from '../../../components/MainNav'
import ProgressCategoryDropdown from '../../../components/Button/ProgressCategoryDropdown'
import TodoListCreateModal from '../../../components/Modal/TodoListCreateModal'
import { TbCopy } from "react-icons/tb";
import { FaLink } from "react-icons/fa6";

export default function DevDetail() {
  const location = useLocation()
  const [isExampleExpanded, setIsExampleExpanded] = useState(false)
  const [mainCategory, setMainCategory] = useState('design')
  const [subCategory, setSubCategory] = useState('screen')
  const [implementationSubCategory, setImplementationSubCategory] = useState('frontend')
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false)
  
  const projectInfo = location.state?.projectInfo || {
    id: null,
    name: 'Unknown Project',
    description: 'No description available',
  };

  const projectId = projectInfo.id;

  // 스크롤바 스타일
  const scrollbarStyle = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #C0C0C0;
      border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #A0A0A0;
    }
  `

  // 체크박스 상태 관리
  const [checkedItems, setCheckedItems] = useState({
    // Frontend items
    frontend_component: false,
    frontend_routing: false,
    frontend_state: false,
    frontend_api: false,
    frontend_auth: false,
    frontend_ui: false,
    frontend_validation: false,
    frontend_responsive: false,
    // Backend items
    backend_api: false,
    backend_database: false,
    backend_auth: false,
    backend_middleware: false,
    backend_validation: false,
    backend_error: false,
    backend_test: false,
    backend_deploy: false,
  })

  const handleCheckboxChange = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const handleExampleToggle = () => {
    setIsExampleExpanded(!isExampleExpanded)
  }

  const handleMainCategoryChange = (category) => {
    setMainCategory(category)
    if (category === 'design') {
      setSubCategory('screen')
    } else if (category === 'implementation') {
      setImplementationSubCategory('frontend')
    }
  }

  const handleSubCategoryChange = (category) => {
    setSubCategory(category)
  }

  const handleImplementationSubCategoryChange = (category) => {
    setImplementationSubCategory(category)
  }

  // Frontend TodoList 데이터 (4개)
  const frontendCategories = [
    {
      title: "컴포넌트 개발",
      items: [
        { id: "frontend_component", label: "재사용 컴포넌트" },
        { id: "frontend_routing", label: "라우팅 설정" },
        { id: "frontend_state", label: "상태 관리" },
        { id: "frontend_state", label: "상태 관리" },
        { id: "frontend_state", label: "상태 관리" },
        { id: "frontend_state", label: "상태 관리" },
        { id: "frontend_state", label: "상태 관리" },
        { id: "frontend_state", label: "상태 관리" },
        { id: "frontend_state", label: "상태 관리" },
        { id: "frontend_state", label: "상태 관리" },
        { id: "frontend_state", label: "상태 관리" },
        { id: "frontend_state", label: "상태 관리" },
        { id: "frontend_state", label: "상태 관리" },
        { id: "frontend_state", label: "상태 관리" },
        { id: "frontend_state", label: "상태 관리" },
        { id: "frontend_state", label: "상태 관리" },
      ]
    },
    {
      title: "API 연동",
      items: [
        { id: "frontend_api", label: "API 호출" },
        { id: "frontend_auth", label: "인증 처리" },
        { id: "frontend_validation", label: "데이터 검증" }
      ]
    },
    {
      title: "UI/UX 구현",
      items: [
        { id: "frontend_ui", label: "디자인 시스템" },
        { id: "frontend_responsive", label: "반응형 웹" },
        { id: "frontend_animation", label: "애니메이션" }
      ]
    },
    {
      title: "최적화",
      items: [
        { id: "frontend_performance", label: "성능 최적화" },
        { id: "frontend_seo", label: "SEO 설정" },
        { id: "frontend_build", label: "빌드 최적화" }
      ]
    }
  ]

  // Backend TodoList 데이터 (2개)
  const backendCategories = [
    {
      title: "서버 개발",
      items: [
        { id: "backend_api", label: "REST API 개발" },
        { id: "backend_database", label: "데이터베이스 연동" },
        { id: "backend_auth", label: "인증/인가" },
        { id: "backend_middleware", label: "미들웨어 구현" }
      ]
    },
    {
      title: "배포 및 운영",
      items: [
        { id: "backend_validation", label: "데이터 검증" },
        { id: "backend_error", label: "에러 핸들링" },
        { id: "backend_test", label: "테스트 코드" },
        { id: "backend_deploy", label: "서버 배포" }
      ]
    }
  ]

  const handleCreateTodoList = (todoListData) => {
    console.log('새로운 TodoList:', todoListData)
    // 여기서 API 호출하거나 상태 업데이트
    // todoListData = { category: '메인 페이지', tasks: ['헤더', '로그인'] }
  }

  // 현재 선택된 카테고리에 따른 데이터 선택
  const getCurrentTodoCategories = () => {
    return implementationSubCategory === 'frontend' ? frontendCategories : backendCategories
  }

  const contentData = {
    screen: {
      title: '나의 화면 설계서',
      placeholder: '서비스에 꼭 있어야 할 핵심 기능을 정의 하세요.',
      exampleTitle: '화면 설계서 예시',
      exampleContent: (
        <div className='flex justify-between'>
          <div className='flex text-lg text-[#676767] items-center gap-2 mb-4'>
            <FaLink />
            <a 
              href="http://figma.com/" 
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-start w-full gap-2 underline"
            >
              Figma.com
            </a>
          </div>

          <div className='text-xs text-[#99BDE5]'>DevGuidely가 추천하는 화면 설계 사이트입니다!</div>
        </div>
      )
    },
    api: {
      title: '나의 API 명세서',
      placeholder: 'API 설계에 대한 메모를 작성하세요.',
      exampleTitle: 'API 명세서 예시',
      exampleContent: (
        <div className='flex flex-col'>
          <div className='flex justify-between'>
            <div className='flex text-lg text-[#676767] items-center gap-2 mb-4'>
            <FaLink />
            <a 
              href="https://web.postman.co/home" 
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-start w-full gap-2 underline"
            >
              web.postman.co/home
            </a>
          </div>

          <div className='text-xs text-[#99BDE5]'>DevGuidely가 추천하는 API 테스트 사이트입니다!</div>
          </div>

          <div className='flex justify-between'>
            <div className='flex text-lg text-[#676767] items-center gap-2 mb-4'>
              <FaLink />
              <a 
                href="https://chromewebstore.google.com/detail/talend-api-tester-free-ed/aejoelaoggembcahagimdiliamlcdmfm" 
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-start w-full gap-2 underline"
              >
                chromewebstore.google.com
              </a>
            </div>

            <div className='text-xs text-[#99BDE5]'>DevGuidely가 추천하는 API 테스트 사이트입니다!</div>
          </div>
        </div>
      )
    },
    erd: {
      title: '나의 ERD',
      placeholder: 'ERD 설계에 대한 메모를 작성하세요.',
      exampleTitle: 'ERD 예시',
      exampleContent: (
        <div className='flex justify-between'>
          <div className='flex text-lg text-[#676767] items-center gap-2 mb-4'>
            <FaLink />
            <a 
              href="https://dbdiagram.io/" 
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-start w-full gap-2 underline"
            >
              dbdiagram.io/
            </a>
          </div>

          <div className='text-xs text-[#99BDE5]'>DevGuidely가 추천하는 ERD 설계 사이트입니다!</div>
        </div>
      )
    }
  }

  const currentContent = contentData[subCategory]
  
  return (
    <div className="flex flex-col items-center mb-10">
      <MainNav />

      <ProjectHeader 
        projectName={projectInfo.name} 
        projectId={projectId}
      />

      <div className='flex flex-col items-center w-full'>
        <div id="headCate">
          <div className='flex items-center gap-5'>
            <div 
              className={`px-4 py-0.5 rounded-full fontMedium cursor-pointer ${
                mainCategory === 'design' 
                  ? 'bg-[#EFF5FF] text-[#5C667B]' 
                  : 'border-[#D7DCE5] border-[1px] text-[#5C667B]'
              }`}
              onClick={() => handleMainCategoryChange('design')}
            >
              설계
            </div>
            <div 
              className={`px-4 py-0.5 rounded-full fontMedium cursor-pointer ${
                mainCategory === 'implementation' 
                  ? 'bg-[#EFF5FF] text-[#5C667B]' 
                  : 'border-[#D7DCE5] border-[1px] text-[#5C667B]'
              }`}
              onClick={() => handleMainCategoryChange('implementation')}
            >
              구현
            </div>
          </div>
        </div>

        <div id="container" className='flex flex-col justify-start w-9/12 h-fit p-8 mx-20 mt-[4%] bg-white shadow-2xl rounded-3xl overflow-y-auto'>
          {mainCategory === 'design' ? (
            <>
              <div className='flex items-center gap-5'>
                <div 
                  className={`px-4 py-0.5 rounded-full fontMedium cursor-pointer ${
                    subCategory === 'screen' 
                      ? 'bg-[#EFF5FF] text-[#5C667B]' 
                      : 'border-[#D7DCE5] border-[1px] text-[#5C667B]'
                  }`}
                  onClick={() => handleSubCategoryChange('screen')}
                >
                  화면 설계
                </div>
                <div 
                  className={`px-4 py-0.5 rounded-full fontMedium cursor-pointer ${
                    subCategory === 'api' 
                      ? 'bg-[#EFF5FF] text-[#5C667B]' 
                      : 'border-[#D7DCE5] border-[1px] text-[#5C667B]'
                  }`}
                  onClick={() => handleSubCategoryChange('api')}
                >
                  API 명세서
                </div>
                <div 
                  className={`px-4 py-0.5 rounded-full fontMedium cursor-pointer ${
                    subCategory === 'erd' 
                      ? 'bg-[#EFF5FF] text-[#5C667B]' 
                      : 'border-[#D7DCE5] border-[1px] text-[#5C667B]'
                  }`}
                  onClick={() => handleSubCategoryChange('erd')}
                >
                  ERD
                </div>
              </div>

              <div className='flex flex-col mt-[3%]'>
                <div className='flex ml-5 fontMedium'>{currentContent.title}</div>
                <pre className="flex w-full justify-between p-6 mb-3 mt-2 overflow-x-auto text-sm text-[#676767] bg-[#F8F9FA] rounded-2xl">
                  https://nodejs.org/ko
                  <TbCopy className="text-[18px] text-[#CACACA] cursor-pointer hover:text-[#999]"/>
                </pre>
              </div>

              <div className='flex flex-col mt-[3%]'>
                <div className='flex ml-5 fontMedium'>메모</div>
                <InputField
                  placeholder={currentContent.placeholder}
                />
              </div>

              <div className='flex flex-col mt-[3%] p-6 mb-3 overflow-x-auto bg-[#F8F9FA] rounded-2xl'>
                <div className='flex items-center justify-between fontMedium'>
                  <span>{currentContent.exampleTitle}</span>
                  
                  <div
                    className='relative flex items-center cursor-pointer'
                    onClick={handleExampleToggle}
                  >
                    <div className={`
                      w-12 h-6 rounded-full transition-colors duration-200 ease-in-out
                      ${isExampleExpanded ? 'bg-[#B0ADFF]' : 'bg-gray-300'}
                    `}>
                      <div className={`
                        w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out
                        ${isExampleExpanded ? 'translate-x-6' : 'translate-x-0.5'}
                        mt-0.5
                      `}>
                      </div>
                    </div>
                  </div>
                </div>
                
                {isExampleExpanded && (
                  <div className='mt-4 pt-4 border-t border-[#E0E0E0] transition-all duration-300'>
                    {currentContent.exampleContent}
                    
                    <div className='flex justify-between mt-5'>
                      <div className='w-[48%] h-[25vh] bg-[#fff] rounded-xl'></div>
                      <div className='w-[48%] h-[25vh] bg-[#fff] rounded-xl'></div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className='flex flex-col justify-start h-fit max-h-[55vh]'>
              {/* 프론트/백 구현 버튼과 TodoList 생성 버튼을 같은 줄에 배치 */}
              <div className='flex items-center justify-between w-full text-[#999] fontMedium'>
                <div className='flex items-center gap-5'>
                  <div 
                    className={`px-4 py-0.5 rounded-full fontMedium cursor-pointer ${
                      implementationSubCategory === 'frontend' 
                        ? 'bg-[#EFF5FF] text-[#5C667B]' 
                        : 'border-[#D7DCE5] border-[1px] text-[#5C667B]'
                    }`}
                    onClick={() => handleImplementationSubCategoryChange('frontend')}
                  >
                    프론트 구현
                  </div>
                  <div 
                    className={`px-4 py-0.5 rounded-full fontMedium cursor-pointer ${
                      implementationSubCategory === 'backend' 
                        ? 'bg-[#EFF5FF] text-[#5C667B]' 
                        : 'border-[#D7DCE5] border-[1px] text-[#5C667B]'
                    }`}
                    onClick={() => handleImplementationSubCategoryChange('backend')}
                  >
                    백 구현
                  </div>
                </div>

                <div
                  className="text-[12px] text-[#000] bg-project-create fontRegular px-4 py-1 rounded-2xl cursor-pointer hover:opacity-50"
                  onClick={() => setIsTodoModalOpen(true)}
                >
                  + TodoList 생성
                </div>

                {/* TodoList 생성 모달 */}
                <TodoListCreateModal
                  isOpen={isTodoModalOpen}
                  onClose={() => setIsTodoModalOpen(false)}
                  onCreate={handleCreateTodoList}
                />
              </div>
              
             {/* TodoList 내용 */}
              <div className='flex gap-5 pb-4 pr-2 mt-10 overflow-x-auto custom-scrollbar'  
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#C0C0C0 #f0f0f0',
                }}>
                {getCurrentTodoCategories().map((category, index) => (
                  <div key={category.title} className='flex-shrink-0 bg-[#F7F7F7] p-5 rounded-xl w-64'>
                    <div className='fontMedium text-[16px] mb-4 text-[#333]'>{category.title}</div>
                    <div 
                      className='space-y-3 max-h-[30vh] overflow-y-auto pr-2'
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#C0C0C0 transparent',
                      }}
                    >
                      {category.items.map((item) => (
                        <div key={item.id} className='flex items-center gap-3'>
                          <input
                            type="checkbox"
                            id={item.id}
                            checked={checkedItems[item.id] || false}
                            onChange={() => handleCheckboxChange(item.id)}
                            className='w-4 h-4 text-[#B0ADFF] border-2 border-[#D7DCE5] rounded focus:ring-[#B0ADFF]'
                          />
                          <label 
                            htmlFor={item.id} 
                            className={`text-[14px] cursor-pointer ${
                              checkedItems[item.id] ? 'line-through text-[#999]' : 'text-[#666]'
                            }`}
                          >
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className='text-xs text-[#999] mt-2 text-center'>
                ← → 좌우로 스크롤하여 더 많은 항목을 볼 수 있습니다
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ProjectHeader = ({ projectName, projectId }) => (
  <div className="flex items-center justify-between w-full px-24 mt-5">
    <div className="flex items-center">
      <div className="flex bg-[#B0ADFF] w-10 h-10 rounded-md" />
      <div className="flex flex-col ml-4">
        <div className="fontBold text-[28px]">Dev</div>
        <div className="fontRegular text-[14px]">
          {projectName}
        </div>
      </div>
    </div>
    <ProgressCategoryDropdown 
      projectId={projectId}
      stepKey="dev"
    />
  </div>
)

const InputField = ({ value, onChange, placeholder, disabled }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    disabled={disabled}
    className='flex w-full justify-between p-6 mb-3 mt-2 overflow-x-auto outline-none text-sm text-[#676767] bg-[#F8F9FA] rounded-2xl'
  />
)