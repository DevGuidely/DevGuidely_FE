import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import MainNav from '../../../components/MainNav'
import ProgressCategoryDropdown from '../../../components/Button/ProgressCategoryDropdown'
import TodoListCreateModal from '../../../components/Modal/TodoListCreateModal'
import { FaLink } from "react-icons/fa6"
import { MdDeleteOutline } from "react-icons/md"  // 👈 추가
import { IoMdClose } from "react-icons/io"  // 👈 추가 (x 버튼용)
import { 
  frontendCategories, 
  backendCategories, 
  contentData,
  initialCheckedItems 
} from '../../../data/devDetailData'

export default function DevDetail() {
  const location = useLocation()
  const [isExampleExpanded, setIsExampleExpanded] = useState(false)
  const [mainCategory, setMainCategory] = useState('design')
  const [subCategory, setSubCategory] = useState('screen')
  const [implementationSubCategory, setImplementationSubCategory] = useState('frontend')
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false)
  const [checkedItems, setCheckedItems] = useState(initialCheckedItems)
  
  // TodoList 카테고리 상태 관리 (추가)
  const [frontendTodos, setFrontendTodos] = useState(frontendCategories)
  const [backendTodos, setBackendTodos] = useState(backendCategories)
  
  const projectInfo = location.state?.projectInfo || {
    id: null,
    name: 'Unknown Project',
    description: 'No description available',
  }

  const projectId = projectInfo.id

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

  const handleCreateTodoList = (todoListData) => {
    console.log('새로운 TodoList:', todoListData)
    // 여기서 API 호출하거나 상태 업데이트
  }

  // 카테고리 삭제 핸들러 (추가)
  const handleDeleteCategory = (categoryTitle) => {
    if (window.confirm(`"${categoryTitle}" 카테고리를 삭제하시겠습니까?`)) {
      if (implementationSubCategory === 'frontend') {
        setFrontendTodos(prev => prev.filter(cat => cat.title !== categoryTitle))
      } else {
        setBackendTodos(prev => prev.filter(cat => cat.title !== categoryTitle))
      }
    }
  }

  // 기능 삭제 핸들러 (추가)
  const handleDeleteTask = (categoryTitle, taskId) => {
    if (implementationSubCategory === 'frontend') {
      setFrontendTodos(prev => prev.map(cat => {
        if (cat.title === categoryTitle) {
          return {
            ...cat,
            items: cat.items.filter(item => item.id !== taskId)
          }
        }
        return cat
      }))
    } else {
      setBackendTodos(prev => prev.map(cat => {
        if (cat.title === categoryTitle) {
          return {
            ...cat,
            items: cat.items.filter(item => item.id !== taskId)
          }
        }
        return cat
      }))
    }
  }

  const getCurrentTodoCategories = () => {
    return implementationSubCategory === 'frontend' ? frontendTodos : backendTodos
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
            <CategoryButton
              label="설계"
              isActive={mainCategory === 'design'}
              onClick={() => handleMainCategoryChange('design')}
            />
            <CategoryButton
              label="구현"
              isActive={mainCategory === 'implementation'}
              onClick={() => handleMainCategoryChange('implementation')}
            />
          </div>
        </div>

        <div id="container" className='flex flex-col justify-start w-9/12 h-fit p-8 mx-20 mt-[4%] bg-white shadow-2xl rounded-3xl overflow-y-auto'>
          {mainCategory === 'design' ? (
            <DesignSection
              subCategory={subCategory}
              currentContent={currentContent}
              isExampleExpanded={isExampleExpanded}
              onSubCategoryChange={handleSubCategoryChange}
              onExampleToggle={handleExampleToggle}
            />
          ) : (
            <ImplementationSection
              implementationSubCategory={implementationSubCategory}
              checkedItems={checkedItems}
              todoCategories={getCurrentTodoCategories()}
              onSubCategoryChange={handleImplementationSubCategoryChange}
              onCheckboxChange={handleCheckboxChange}
              onOpenModal={() => setIsTodoModalOpen(true)}
              onDeleteCategory={handleDeleteCategory}  // 👈 추가
              onDeleteTask={handleDeleteTask}  // 👈 추가
            />
          )}

          <div className="flex justify-end mt-6">
            <button className="px-5 py-1.5 rounded-2xl text-[14px] fontRegular bg-[#DFE7F4] text-[#000] hover:opacity-80">
              저장하기
            </button>
          </div>
        </div>
      </div>

      <TodoListCreateModal
        isOpen={isTodoModalOpen}
        onClose={() => setIsTodoModalOpen(false)}
        onCreate={handleCreateTodoList}
      />
    </div>
  )
}

// 재사용 가능한 컴포넌트들
const ProjectHeader = ({ projectName, projectId }) => (
  <div className="flex items-center justify-between w-full px-24 mt-5">
    <div className="flex items-center">
      <div className="flex bg-[#B0ADFF] w-10 h-10 rounded-md" />
      <div className="flex flex-col ml-4">
        <div className="fontBold text-[28px]">Dev</div>
        <div className="fontRegular text-[14px]">{projectName}</div>
      </div>
    </div>
    <ProgressCategoryDropdown projectId={projectId} stepKey="dev" />
  </div>
)

const CategoryButton = ({ label, isActive, onClick }) => (
  <div 
    className={`px-4 py-0.5 rounded-full fontMedium cursor-pointer ${
      isActive 
        ? 'bg-[#EFF5FF] text-[#5C667B]' 
        : 'border-[#D7DCE5] border-[1px] text-[#5C667B]'
    }`}
    onClick={onClick}
  >
    {label}
  </div>
)

const InputField = ({ placeholder }) => (
  <input
    type="text"
    placeholder={placeholder}
    className='flex w-full justify-between p-6 mb-3 mt-2 overflow-x-auto outline-none text-sm text-[#676767] bg-[#F8F9FA] rounded-2xl'
  />
)

const DesignSection = ({ 
  subCategory, 
  currentContent, 
  isExampleExpanded, 
  onSubCategoryChange, 
  onExampleToggle 
}) => (
  <>
    <div className='flex items-center gap-5'>
      <CategoryButton
        label="화면 설계"
        isActive={subCategory === 'screen'}
        onClick={() => onSubCategoryChange('screen')}
      />
      <CategoryButton
        label="API 명세서"
        isActive={subCategory === 'api'}
        onClick={() => onSubCategoryChange('api')}
      />
      <CategoryButton
        label="ERD"
        isActive={subCategory === 'erd'}
        onClick={() => onSubCategoryChange('erd')}
      />
    </div>

    <div className='flex flex-col mt-[3%]'>
      <div className='flex ml-5 fontMedium'>{currentContent.title}</div>
      <InputField placeholder={currentContent.placeholder} />
    </div>

    <div className='flex flex-col mt-[3%]'>
      <div className='flex ml-5 fontMedium'>메모</div>
      <InputField placeholder={currentContent.memoPlaceholder} />
    </div>

    <div className='flex flex-col mt-[3%] p-6 mb-3 overflow-x-auto bg-[#F8F9FA] rounded-2xl'>
      <div className='flex items-center justify-between fontMedium'>
        <span>{currentContent.exampleTitle}</span>
        
        <div className='relative flex items-center cursor-pointer' onClick={onExampleToggle}>
          <div className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
            isExampleExpanded ? 'bg-[#B0ADFF]' : 'bg-gray-300'
          }`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
              isExampleExpanded ? 'translate-x-6' : 'translate-x-0.5'
            } mt-0.5`} />
          </div>
        </div>
      </div>
      
      {isExampleExpanded && (
        <div className='mt-4 pt-4 border-t border-[#E0E0E0] transition-all duration-300'>
          <div className='flex flex-col gap-4'>
            {currentContent.links.map((link, index) => (
              <div key={index} className='flex justify-between'>
                <div className='flex text-lg text-[#676767] items-center gap-2'>
                  <FaLink />
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-start w-full gap-2 underline"
                  >
                    {link.text}
                  </a>
                </div>
                <div className='text-xs text-[#99BDE5]'>{link.description}</div>
              </div>
            ))}
          </div>
          
          <div className='flex justify-between mt-5'>
            <div className='w-[48%] h-[25vh] bg-[#fff] rounded-xl'></div>
            <div className='w-[48%] h-[25vh] bg-[#fff] rounded-xl'></div>
          </div>
        </div>
      )}
    </div>
  </>
)

const ImplementationSection = ({ 
  implementationSubCategory, 
  checkedItems, 
  todoCategories, 
  onSubCategoryChange, 
  onCheckboxChange, 
  onOpenModal,
  onDeleteCategory,  // 👈 추가
  onDeleteTask  // 👈 추가
}) => (
  <div className='flex flex-col justify-start h-fit max-h-[55vh]'>
    <div className='flex items-center justify-between w-full text-[#999] fontMedium'>
      <div className='flex items-center gap-5'>
        <CategoryButton
          label="프론트 구현"
          isActive={implementationSubCategory === 'frontend'}
          onClick={() => onSubCategoryChange('frontend')}
        />
        <CategoryButton
          label="백 구현"
          isActive={implementationSubCategory === 'backend'}
          onClick={() => onSubCategoryChange('backend')}
        />
      </div>

      <button
        className="text-[12px] text-[#000] bg-project-create fontRegular px-4 py-1 rounded-2xl cursor-pointer hover:opacity-50"
        onClick={onOpenModal}
      >
        + TodoList 생성
      </button>
    </div>
    
    <div className='flex gap-5 pb-4 pr-2 mt-10 overflow-x-auto custom-scrollbar'  
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#C0C0C0 #f0f0f0',
      }}>
      {todoCategories.map((category) => (
        <div key={category.title} className='flex-shrink-0 bg-[#F7F7F7] p-5 rounded-xl w-64'>
          {/* 카테고리 헤더 with 삭제 버튼 */}
          <div className='flex items-center justify-between mb-4'>
            <div className='fontMedium text-[16px] text-[#333]'>{category.title}</div>
            <button
              onClick={() => onDeleteCategory(category.title)}
              className='text-[#999] hover:text-[#ff4444] transition-colors'
            >
              <MdDeleteOutline size={20} />
            </button>
          </div>

          <div 
            className='space-y-3 max-h-[30vh] overflow-y-auto pr-2'
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#C0C0C0 transparent',
            }}
          >
            {category.items.map((item) => (
              <div key={item.id} className='flex items-center justify-between gap-2 group'>
                <div className='flex items-center flex-1 gap-3'>
                  <input
                    type="checkbox"
                    id={item.id}
                    checked={checkedItems[item.id] || false}
                    onChange={() => onCheckboxChange(item.id)}
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
                {/* 기능 삭제 버튼 (호버 시 표시) */}
                <button
                  onClick={() => onDeleteTask(category.title, item.id)}
                  className='opacity-0 group-hover:opacity-100 text-[#999] hover:text-[#ff4444] transition-all flex-shrink-0'
                >
                  <IoMdClose size={16} />
                </button>
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
)