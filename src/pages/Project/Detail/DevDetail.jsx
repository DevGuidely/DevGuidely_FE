import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import MainNav from '../../../components/MainNav'
import ProgressCategoryDropdown from '../../../components/Button/ProgressCategoryDropdown'
import TodoListCreateModal from '../../../components/Modal/TodoListCreateModal'
import { FaLink } from "react-icons/fa6"
import { MdDeleteOutline } from "react-icons/md"
import { IoMdClose } from "react-icons/io"
import { contentData } from '../../../data/devDetailData'
import BreadcrumbNav from '../../../components/BreadcrumbNav';
import {
  // Design APIs
  getDevDesignScreen,
  getDevDesignApi,
  getDevDesignErd,
  createDevDesignLink,
  updateDevDesignLink,
  
  // Implementation APIs
  getDevImplementationTree,
  createDevCategoryBatch,
  toggleDevFeature,
  deleteDevCategory,
  deleteDevFeature,
} from '../../../api/project.dev.api'

export default function DevDetail() {
  const location = useLocation()
  const [isExampleExpanded, setIsExampleExpanded] = useState(false)
  const [mainCategory, setMainCategory] = useState('design')
  const [subCategory, setSubCategory] = useState('screen')
  const [implementationSubCategory, setImplementationSubCategory] = useState('Frontend') // Frontend로 기본값 설정
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  
  // Design 상태
  const [designLinks, setDesignLinks] = useState({
    screen: { url: '', memo: '', linkId: null },
    api: { url: '', memo: '', linkId: null },
    erd: { url: '', memo: '', linkId: null },
  })
  
  const [tempDesignLinks, setTempDesignLinks] = useState({
    screen: { url: '', memo: '', linkId: null },
    api: { url: '', memo: '', linkId: null },
    erd: { url: '', memo: '', linkId: null },
  })

  // Implementation 상태 - Frontend와 Backend를 분리
  const [frontendData, setFrontendData] = useState({
    categories: [],
    features: []
  })
  
  const [backendData, setBackendData] = useState({
    categories: [],
    features: []
  })
  
  const [isLoading, setIsLoading] = useState(false)
  
  const projectInfo = location.state?.projectInfo || {
    id: null,
    name: 'Unknown Project',
    description: 'No description available',
  }

  const projectId = projectInfo.id

  // 📌 페이지 로드 시 데이터 조회
  useEffect(() => {
    if (!projectId) return

    if (mainCategory === 'design') {
      loadDesignLinks()
    } else if (mainCategory === 'implementation') {
      loadImplementationTree()
    }
  }, [projectId, mainCategory])

  // 📌 서브카테고리 변경 시 해당 링크 조회
  useEffect(() => {
    if (mainCategory === 'design' && projectId) {
      loadDesignLinks()
    }
  }, [subCategory])

  // 📌 Implementation 서브카테고리 변경 시 데이터 다시 로드
  useEffect(() => {
    if (mainCategory === 'implementation' && projectId) {
      loadImplementationTree()
    }
  }, [implementationSubCategory])

  // 🎨 Design Input 변경
  const handleDesignInputChange = (field, value) => {
    setDesignLinks(prev => ({
      ...prev,
      [subCategory]: {
        ...prev[subCategory],
        [field]: value
      }
    }))
    setHasUnsavedChanges(true)
  }

  const handleTempSave = () => {
    setTempDesignLinks(prev => ({
      ...prev,
      [subCategory]: { 
        ...designLinks[subCategory]
      }
    }))
  }

  // Main Category 변경 핸들러
  const handleMainCategoryChange = (category) => {
    setMainCategory(category)
    if (category === 'design') {
      setSubCategory('screen')
    } else if (category === 'implementation') {
      setImplementationSubCategory('Frontend') // 구현 탭 클릭 시 항상 Frontend가 기본 선택
    }
  }

  // Implementation 서브카테고리 변경 핸들러
  const handleImplementationSubCategoryChange = (category) => {
    setImplementationSubCategory(category)
  }

  // 🆕 서브카테고리 변경 시 확인
  const handleSubCategoryChangeWithConfirm = async (newSubCategory) => {
    if (newSubCategory === subCategory) return

    // 변경사항이 있고, 저장되지 않은 경우
    if (hasUnsavedChanges) {
      const currentLink = designLinks[subCategory]
      const hasContent = currentLink.url.trim() !== '' || currentLink.memo.trim() !== ''

      if (hasContent) {
        const confirmed = window.confirm(
          '저장하지 않은 내용이 있습니다.\n임시 저장하시겠습니까?\n\n' +
          '※ 임시 저장을 해도 "저장하기" 버튼을 눌러야 최종 저장됩니다.'
        )

        if (confirmed) {
          handleTempSave()
          alert('임시 저장되었습니다.\n나중에 다시 돌아와서 "저장하기" 버튼을 눌러주세요.')
        } else {
          const originalLink = tempDesignLinks[subCategory]
          if (originalLink && (originalLink.url || originalLink.memo)) {
            setTempDesignLinks(prev => ({
              ...prev,
              [subCategory]: { url: '', memo: '', linkId: currentLink.linkId }
            }))
          }
        }
      }
      
      setHasUnsavedChanges(false)
    }

    setSubCategory(newSubCategory)
  }

  // 🎨 Design 링크 조회
  const loadDesignLinks = async () => {
    try {
      setIsLoading(true)

      const tempData = tempDesignLinks[subCategory]
      const hasTempData = tempData && (tempData.url || tempData.memo)

      if (hasTempData) {
        const restoreConfirm = window.confirm(
          '임시 저장된 내용이 있습니다.\n복원하시겠습니까?'
        )

        if (restoreConfirm) {
          setDesignLinks(prev => ({
            ...prev,
            [subCategory]: { ...tempData }
          }))
          setHasUnsavedChanges(true)
          setIsLoading(false)
          return
        } else {
          setTempDesignLinks(prev => ({
            ...prev,
            [subCategory]: { url: '', memo: '', linkId: null }
          }))
        }
      }

      let response

      if (subCategory === 'screen') {
        response = await getDevDesignScreen({ projectId })
      } else if (subCategory === 'api') {
        response = await getDevDesignApi({ projectId })
      } else if (subCategory === 'erd') {
        response = await getDevDesignErd({ projectId })
      }

      const link = response?.links?.[0]
      
      if (link) {
        setDesignLinks(prev => ({
          ...prev,
          [subCategory]: {
            url: link.url || '',
            memo: link.memo || '',
            linkId: link.id,
          }
        }))
      } else {
        setDesignLinks(prev => ({
          ...prev,
          [subCategory]: { url: '', memo: '', linkId: null }
        }))
      }

      setHasUnsavedChanges(false)
    } catch (err) {
      console.error('Design links load error:', err)
      setDesignLinks(prev => ({
        ...prev,
        [subCategory]: { url: '', memo: '', linkId: null }
      }))
    } finally {
      setIsLoading(false)
    }
  }

  // 🎨 Design 링크 저장/수정
  const handleSaveDesignLink = async () => {
    try {
      setIsLoading(true)
      const currentLink = designLinks[subCategory]
      
      const linkTypeMap = {
        screen: 'screen_spec',
        api: 'api_spec',
        erd: 'erd'
      }

      if (currentLink.linkId) {
        await updateDevDesignLink({
          projectId,
          linkId: currentLink.linkId,
          payload: {
            url: currentLink.url,
            memo: currentLink.memo,
          }
        })
        alert('링크가 수정되었습니다.')
      } else {
        const response = await createDevDesignLink({
          projectId,
          payload: {
            linkType: linkTypeMap[subCategory],
            url: currentLink.url,
            memo: currentLink.memo,
            orderIndex: 0,
          }
        })
        
        setDesignLinks(prev => ({
          ...prev,
          [subCategory]: {
            ...prev[subCategory],
            linkId: response.id
          }
        }))
        alert('링크가 저장되었습니다.')
      }
      
      setHasUnsavedChanges(false)
      setTempDesignLinks(prev => ({
        ...prev,
        [subCategory]: { url: '', memo: '', linkId: null }
      }))
      
      await loadDesignLinks()
    } catch (err) {
      console.error('Design link save error:', err)
      alert('저장에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }
  
  // 🔧 Implementation 트리 조회
  const loadImplementationTree = async () => {
    try {
      setIsLoading(true)
      
      // 백엔드에서 모든 데이터를 받아옴
      const response = await getDevImplementationTree({ 
        projectId,
        phase: implementationSubCategory
      })
      
      // 🆕 프론트엔드에서 phase별로 필터링
      const filteredCategories = response.categories?.filter(category => 
        category.phase === implementationSubCategory || 
        (!category.phase && implementationSubCategory === 'Frontend') // phase가 없는 기존 데이터는 Frontend로 간주
      ) || []
      
      const categoryIds = filteredCategories.map(cat => cat.id)
      const filteredFeatures = response.features?.filter(feature => 
        categoryIds.includes(feature.categoryId)
      ) || []
      
      // 현재 선택된 phase에 따라 데이터 설정
      if (implementationSubCategory === 'Frontend') {
        setFrontendData({
          categories: filteredCategories,
          features: filteredFeatures
        })
      } else if (implementationSubCategory === 'Backend') {
        setBackendData({
          categories: filteredCategories,
          features: filteredFeatures
        })
      }
      
    } catch (err) {
      console.error('Implementation tree load error:', err)
      
      if (implementationSubCategory === 'Frontend') {
        setFrontendData({ categories: [], features: [] })
      } else if (implementationSubCategory === 'Backend') {
        setBackendData({ categories: [], features: [] })
      }
    } finally {
      setIsLoading(false)
    }
  }

  // 🔧 TodoList 생성 (모달) - phase 추가
  const handleCreateTodoList = async (todoListData) => {
    try {
      setIsLoading(true)
      
      const currentCategories = implementationSubCategory === 'Frontend' 
        ? frontendData.categories 
        : backendData.categories
      
      await createDevCategoryBatch({
        projectId,
        payload: {
          categoryTitle: todoListData.category,
          features: todoListData.tasks,
          categoryOrderIndex: currentCategories.length,
          phase: implementationSubCategory // 'Frontend' 또는 'Backend'
        }
      })

      alert('TodoList가 생성되었습니다.')
      await loadImplementationTree() // 생성 후 현재 phase 데이터 다시 로드
    } catch (err) {
      console.error('TodoList create error:', err)
      alert('TodoList 생성에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  // 🔧 체크박스 토글 (실시간 저장) - phase 추가
  const handleCheckboxChange = async (featureId, currentStatus) => {
    try {
      // UI에서 즉시 업데이트
      if (implementationSubCategory === 'Frontend') {
        setFrontendData(prev => ({
          ...prev,
          features: prev.features.map(f => 
            f.id === featureId ? { ...f, isCompleted: !currentStatus } : f
          )
        }))
      } else {
        setBackendData(prev => ({
          ...prev,
          features: prev.features.map(f => 
            f.id === featureId ? { ...f, isCompleted: !currentStatus } : f
          )
        }))
      }

      await toggleDevFeature({
        projectId,
        featureId,
        payload: { 
          isCompleted: !currentStatus,
          phase: implementationSubCategory // phase 추가
        }
      })
    } catch (err) {
      console.error('Toggle feature error:', err)
      
      // 실패 시 원래 상태로 복원
      if (implementationSubCategory === 'Frontend') {
        setFrontendData(prev => ({
          ...prev,
          features: prev.features.map(f => 
            f.id === featureId ? { ...f, isCompleted: currentStatus } : f
          )
        }))
      } else {
        setBackendData(prev => ({
          ...prev,
          features: prev.features.map(f => 
            f.id === featureId ? { ...f, isCompleted: currentStatus } : f
          )
        }))
      }
      
      alert('체크 상태 변경에 실패했습니다.')
    }
  }

  // 🔧 카테고리 삭제 - phase 추가
  const handleDeleteCategory = async (categoryId) => {
    const currentData = implementationSubCategory === 'Frontend' ? frontendData : backendData
    const category = currentData.categories.find(c => c.id === categoryId)
    
    if (!window.confirm(`"${category?.title}" 카테고리를 삭제하시겠습니까?`)) {
      return
    }

    try {
      setIsLoading(true)
      
      console.log('🗑️ Deleting category:', {
        projectId,
        categoryId,
        phase: implementationSubCategory
      })

      await deleteDevCategory({ 
        projectId, 
        categoryId, 
        phase: implementationSubCategory // phase 추가
      })
      
      alert('카테고리가 삭제되었습니다.')
      await loadImplementationTree() // 삭제 후 현재 phase 데이터 다시 로드
    } catch (err) {
      console.error('Delete category error:', err)
      alert('카테고리 삭제에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  // 🔧 기능 삭제 - phase 추가
  const handleDeleteTask = async (featureId) => {
    try {
      setIsLoading(true)
      
      console.log('🗑️ Deleting feature:', {
        projectId,
        featureId,
        phase: implementationSubCategory
      })

      await deleteDevFeature({ 
        projectId, 
        featureId,
        phase: implementationSubCategory // phase 추가
      })
      
      // UI에서 즉시 제거
      if (implementationSubCategory === 'Frontend') {
        setFrontendData(prev => ({
          ...prev,
          features: prev.features.filter(f => f.id !== featureId)
        }))
      } else {
        setBackendData(prev => ({
          ...prev,
          features: prev.features.filter(f => f.id !== featureId)
        }))
      }
    } catch (err) {
      console.error('Delete feature error:', err)
      alert('기능 삭제에 실패했습니다.')
      await loadImplementationTree() // 실패 시 데이터 다시 로드
    } finally {
      setIsLoading(false)
    }
  }

  const handleExampleToggle = () => {
    setIsExampleExpanded(!isExampleExpanded)
  }

  // 현재 선택된 phase의 데이터 가져오기
  const getCurrentData = () => {
    return implementationSubCategory === 'Frontend' ? frontendData : backendData
  }

  const getCategoriesWithFeatures = () => {
    const currentData = getCurrentData()
    return currentData.categories.map(category => ({
      ...category,
      items: currentData.features.filter(f => f.categoryId === category.id)
    }))
  }

  const getCurrentTodoCategories = () => {
    return getCategoriesWithFeatures()
  }

  const currentContent = contentData[subCategory]
  const currentDesignLink = designLinks[subCategory]
  const currentData = getCurrentData()
  
  return (
    <div className="flex flex-col items-center mb-10">
      <MainNav />

      {/* BreadcrumbNav를 왼쪽으로 정렬 */}
      <div className="w-full px-24 mt-5">
        <BreadcrumbNav projectName={projectInfo.name} />
      </div>

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
          {isLoading && (
            <div className="py-4 text-center text-gray-500">로딩 중...</div>
          )}

          {mainCategory === 'design' ? (
            <DesignSection
              subCategory={subCategory}
              currentContent={currentContent}
              currentDesignLink={currentDesignLink}
              isExampleExpanded={isExampleExpanded}
              onSubCategoryChange={handleSubCategoryChangeWithConfirm}
              onExampleToggle={handleExampleToggle}
              onInputChange={handleDesignInputChange}
              hasUnsavedChanges={hasUnsavedChanges}
            />
          ) : (
            <ImplementationSection
              implementationSubCategory={implementationSubCategory}
              todoCategories={getCurrentTodoCategories()}
              features={currentData.features}
              onSubCategoryChange={handleImplementationSubCategoryChange}
              onCheckboxChange={handleCheckboxChange}
              onOpenModal={() => setIsTodoModalOpen(true)}
              onDeleteCategory={handleDeleteCategory}
              onDeleteTask={handleDeleteTask}
            />
          )}

          {mainCategory === 'design' && (
            <div className="flex justify-end gap-3 mt-6">
              {/* 🆕 변경사항 표시 */}
              {hasUnsavedChanges && (
                <span className="text-[12px] text-orange-500 self-center">
                  ⚠ 저장되지 않은 변경사항이 있습니다
                </span>
              )}
              
              <button 
                onClick={handleSaveDesignLink}
                disabled={isLoading || !currentDesignLink.url}
                className={`px-5 py-1.5 rounded-2xl text-[14px] fontRegular ${
                  isLoading || !currentDesignLink.url
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-[#DFE7F4] text-[#000] hover:opacity-80'
                }`}
              >
                {isLoading ? '저장 중...' : '저장하기'}
              </button>
            </div>
          )}
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

const InputField = ({ placeholder, value, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className='flex w-full justify-between p-6 mb-3 mt-2 overflow-x-auto outline-none text-sm text-[#676767] bg-[#F8F9FA] rounded-2xl'
  />
)

const DesignSection = ({ 
  subCategory, 
  currentContent, 
  currentDesignLink,
  isExampleExpanded, 
  onSubCategoryChange, 
  onExampleToggle,
  onInputChange 
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
      <InputField 
        placeholder={currentContent.placeholder} 
        value={currentDesignLink?.url || ''}
        onChange={(value) => onInputChange('url', value)}
      />
    </div>

    <div className='flex flex-col mt-[3%]'>
      <div className='flex ml-5 fontMedium'>메모</div>
      <InputField 
        placeholder={currentContent.memoPlaceholder} 
        value={currentDesignLink?.memo || ''}
        onChange={(value) => onInputChange('memo', value)}
      />
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
  todoCategories,
  features,
  onSubCategoryChange, 
  onCheckboxChange, 
  onOpenModal,
  onDeleteCategory,
  onDeleteTask
}) => (
  <div className='flex flex-col justify-start h-fit max-h-[55vh]'>
    <div className='flex items-center justify-between w-full text-[#999] fontMedium'>
      <div className='flex items-center gap-5'>
        <CategoryButton
          label="프론트 구현"
          isActive={implementationSubCategory === 'Frontend'}
          onClick={() => onSubCategoryChange('Frontend')}
        />
        <CategoryButton
          label="백 구현"
          isActive={implementationSubCategory === 'Backend'}
          onClick={() => onSubCategoryChange('Backend')}
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
      {todoCategories.length === 0 ? (
        <div className='w-full py-10 text-center text-gray-500'>
          TodoList를 생성해주세요.
        </div>
      ) : (
        todoCategories.map((category) => (
          <div key={category.id} className='flex-shrink-0 bg-[#F7F7F7] p-5 rounded-xl w-64'>
            <div className='flex items-center justify-between mb-4'>
              <div className='fontMedium text-[16px] text-[#333]'>
                {category.title}
              </div>
              <button
                onClick={() => onDeleteCategory(category.id)}
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
                      id={`feature-${item.id}`}
                      checked={item.isCompleted || false}
                      onChange={() => onCheckboxChange(item.id, item.isCompleted)}
                      className='w-4 h-4 text-[#B0ADFF] border-2 border-[#D7DCE5] rounded focus:ring-[#B0ADFF]'
                    />
                    <label 
                      htmlFor={`feature-${item.id}`}
                      className={`text-[14px] cursor-pointer ${
                        item.isCompleted ? 'line-through text-[#999]' : 'text-[#666]'
                      }`}
                    >
                      {item.title}
                    </label>
                  </div>
                  <button
                    onClick={() => onDeleteTask(item.id)}
                    className='opacity-0 group-hover:opacity-100 text-[#999] hover:text-[#ff4444] transition-all flex-shrink-0'
                  >
                    <IoMdClose size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>

    <div className='text-xs text-[#999] mt-2 text-center'>
      ← → 좌우로 스크롤하여 더 많은 항목을 볼 수 있습니다
    </div>
  </div>
)