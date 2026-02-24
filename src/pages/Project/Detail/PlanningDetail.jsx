import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import MainNav from '../../../components/MainNav'
import ProgressCategoryDropdown from '../../../components/Button/ProgressCategoryDropdown'
import { savePlanning, getPlanning } from '../../../api/project.step/project.planning.api'
import { IoMdArrowDropdown } from 'react-icons/io'
import BreadcrumbNav from '../../../components/BreadcrumbNav';

export default function PlanningDetail() {
  const { id: projectId } = useParams()
  const location = useLocation()
    
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('사용자 ID:', payload.userId);
      console.log('전체 payload:', payload);
    }
  }, []);
  
  const projectInfo = location.state?.projectInfo || {
    name: 'Unknown Project',
    description: 'No description available'
  }

  const getInitialSectionState = () => {
    const { openAll, focusSection } = location.state || {}
    
    if (openAll) {
      return {
        overview: true,
        purpose: true,
        target: true,
        problem: true,
        mvp: true
      }
    } else if (focusSection) {
      return {
        overview: focusSection === 'overview',
        purpose: focusSection === 'purpose',
        target: focusSection === 'target',
        problem: focusSection === 'problem',
        mvp: focusSection === 'mvp'
      }
    } else {
      return {
        overview: true,
        purpose: true,
        target: true,
        problem: true,
        mvp: true
      }
    }
  }

  const [openSections, setOpenSections] = useState(getInitialSectionState())
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    serviceBackground: '',
    servicePurpose: '',
    targetAudience: '',
    userScenario: '',
    coreProblem: '',
    mvpFeature: ''
  })

  useEffect(() => {
    if (projectId) {
      loadPlanningData()
    }
  }, [projectId])

  const loadPlanningData = async () => {
    try {
      setLoading(true)

      // 기존 Planning 데이터 불러오기
      const data = await getPlanning({ projectId })

      if (!Array.isArray(data) || data.length === 0) {
        return
      }

      const newFormData = {
        serviceBackground: '',
        servicePurpose: '',
        targetAudience: '',
        userScenario: '',
        coreProblem: '',
        mvpFeature: ''
      }
        
      data.forEach(section => {
        if (!section.section_key || !section.content) return
  
        switch (section.section_key) {
          case 'background_purpose':
            newFormData.serviceBackground = section.content.background || ''
            newFormData.servicePurpose = section.content.purpose || ''
            break
  
          case 'target_scenario':
            newFormData.targetAudience = section.content.target || ''
            newFormData.userScenario = section.content.scenario || ''
            break
  
          case 'core_problem':
            newFormData.coreProblem = section.content.problem || ''
            break
  
          case 'mvp_features':
            newFormData.mvpFeature = section.content.mvp || ''
            break
          }
        })
        
    setFormData(newFormData)

  } catch (error) {
    console.error('Failed to load planning data:', error)
    console.log('새로운 planning을 생성합니다.')
  } finally {
    setLoading(false)
  }
}

  const handleSave = async () => {
    console.log('handleSave - projectId:', projectId)
    
    if (!projectId) {
      alert('프로젝트 ID가 없습니다.')
      return
    }

    try {
      setSaving(true)
      
      // 프론트엔드 formData를 백엔드가 요구하는 형태로 변환
      const payload = {
        service_overview: {
          name: projectInfo.name || '',  
          description: projectInfo.description || '',  
        },
        background_purpose: {
          background: formData.serviceBackground || '',
          purpose: formData.servicePurpose || '',
        },
        target_scenario: {
          target: formData.targetAudience || '',
          scenario: formData.userScenario || '',
        },
        core_problem: {
          problem: formData.coreProblem || '',
        },
        mvp_features: {
          mvp: formData.mvpFeature || '',
      },
    };

      await savePlanning({ projectId, payload })
      alert('Planning이 성공적으로 저장되었습니다.')
      
    } catch (error) {
      console.error('Save failed:', error)
      alert('저장에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setSaving(false)
    }
  }

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const sections = [
    {
      id: 'overview',
      title: '서비스 개요',
      bgColor: 'bg-[#FFE0CD]',
      content: (
        <div className="flex flex-col gap-2">
          <div className="text-[16px] fontRegular">프로젝트 이름</div>
          <div className="text-[14px] fontMedium w-full">
            {projectInfo.name}
          </div>
          <div className="text-[16px] fontRegular">프로젝트 설명</div>
          <div className="text-[14px] fontMedium w-full">
            {projectInfo.description}
          </div>
        </div>
      )
    },
    {
      id: 'purpose',
      title: '서비스 배경 및 목적',
      bgColor: 'bg-[#F5FAFF]',
      content: (
        <div className="flex flex-col gap-2">
          <div className="text-[16px] fontRegular">서비스 배경</div>
          <InputField
            value={formData.serviceBackground}
            onChange={(value) => handleInputChange('serviceBackground', value)}
            placeholder="서비스 배경에 대해 적어주세요"
            disabled={loading}
          />
          <div className="text-[16px] fontRegular">서비스 목적</div>
          <InputField
            value={formData.servicePurpose}
            onChange={(value) => handleInputChange('servicePurpose', value)}
            placeholder="서비스 목적에 대해 적어주세요"
            disabled={loading}
          />
        </div>
      )
    },
    {
      id: 'target',
      title: '타겟층 및 사용자 시나리오',
      bgColor: 'bg-[#F5FAFF]',
      content: (
        <div className="flex flex-col gap-2">
          <div className="text-[16px] fontRegular">타겟층</div>
          <InputField
            value={formData.targetAudience}
            onChange={(value) => handleInputChange('targetAudience', value)}
            placeholder="타겟층은 무엇인가요?"
            disabled={loading}
          />
          <div className="text-[16px] fontRegular">사용자 시나리오</div>
          <InputField
            value={formData.userScenario}
            onChange={(value) => handleInputChange('userScenario', value)}
            placeholder="사용자 시나리오가 있다면 적어주세요"
            disabled={loading}
          />
        </div>
      )
    },
    {
      id: 'problem',
      title: '핵심 문제 정의',
      bgColor: 'bg-[#F5FAFF]',
      content: (
        <div className="flex flex-col gap-2">
          <div className="text-[16px] fontRegular">핵심 문제 정의</div>
          <InputField
            value={formData.coreProblem}
            onChange={(value) => handleInputChange('coreProblem', value)}
            placeholder="핵심 문제에 대해 자유롭게 적어보세요"
            disabled={loading}
          />
        </div>
      )
    },
    {
      id: 'mvp',
      title: 'MVP 핵심 기능 정의',
      bgColor: 'bg-[#F5FAFF]',
      content: (
        <div className="flex flex-col gap-2">
          <div className="text-[16px] fontRegular">MVP 핵심기능</div>
          <InputField
            value={formData.mvpFeature}
            onChange={(value) => handleInputChange('mvpFeature', value)}
            placeholder="서비스에 꼭 있어야 할 핵심 기능을 정의 하세요."
            disabled={loading}
          />
        </div>
      )
    }
  ]

  if (loading) {
    return (
      <div className="flex flex-col mb-10">
        <MainNav />
        <div className="flex items-center justify-center mt-20">
          <div className="text-[18px] fontMedium">데이터를 불러오는 중...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center mb-10">
      <MainNav />

      <BreadcrumbNav projectName={projectInfo.name} className='flex pl-20 mt-5' />

      
      <ProjectHeader 
        projectName={projectInfo.name} 
        projectId={projectId}
      />

      <div className="flex flex-col w-9/12 p-10 mt-10 bg-white shadow-xl rounded-3xl">
        {sections.map((section, index) => (
          <CollapsibleSection
            key={section.id}
            section={section}
            isOpen={openSections[section.id]}
            onToggle={() => toggleSection(section.id)}
            className={index > 0 ? 'mt-10' : ''}
          />
        ))}
      </div>

      <div className='flex justify-end w-11/12 mt-8'>
        <button 
          className={`fontMedium px-4 py-1 rounded-3xl ${
            saving 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-[#DFE7F4] hover:bg-[#c5d4e8]'
          }`}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? '저장 중...' : '저장하기'}
        </button>
      </div>
    </div>
  )
}

// 🔥 여기가 중요한 수정 부분!
const ProjectHeader = ({ projectName, projectId }) => (
  <div className="flex items-center justify-between w-full px-24 mt-5">
    <div className="flex items-center">
      <div className="flex bg-[#FDD7D8] w-10 h-10 rounded-md" />
      <div className="flex flex-col ml-4">
        <div className="fontBold text-[28px]">Planning</div> {/* Tech → Planning으로 수정 */}
        <div className="fontRegular text-[14px]">
          {projectName}
        </div>
      </div>
    </div>
    <ProgressCategoryDropdown 
      projectId={projectId}
      stepKey="planning" // tech → planning으로 수정
    />
  </div>
)

const CollapsibleSection = ({ section, isOpen, onToggle, className = '' }) => (
  <div className={`flex flex-col ${className}`}>
    <div
      className="flex items-center cursor-pointer"
      onClick={onToggle}
    >
      <div className="mr-2 text-[#000] text-[20px] fontMedium">
        {section.title}
      </div>
      <IoMdArrowDropdown
        className={`text-[18px] text-[#cacaca] transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`}
      />
    </div>

    {isOpen && (
      <div className={`flex flex-col ${section.bgColor} rounded-3xl mt-4 p-6 mx-3 w-full`}>
        {section.content}
      </div>
    )}
  </div>
)

const InputField = ({ value, onChange, placeholder, disabled }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    disabled={disabled}
    className={`text-[14px] fontMedium w-full underline bg-transparent outline-none placeholder:text-[#ACACAC] ${
      disabled 
        ? 'text-gray-400 cursor-not-allowed' 
        : 'text-[#ACACAC]'
    }`}
  />
)