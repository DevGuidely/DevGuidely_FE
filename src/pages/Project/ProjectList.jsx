import React, { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MainNav from '../../components/MainNav'
import ProgressCategoryButtons from '../../components/Button/ProgressCategoryButtons'
import ProjectCreateModal from '../../components/Modal/ProjectCreateModal'
import ProjectSection from '../../components/ProjectSection'
import DeleteConfirmModal from '../../components/Modal/DeleteConfirmModal'
import ProjectSlideView from './ProjectSlideView'
import { getProjectsApi, deleteProjectApi } from '../../api/project.api'

export default function ProjectList() {
  const navigate = useNavigate()

  const [selectedStatus, setSelectedStatus] = useState('all')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentCompletedSlide, setCurrentCompletedSlide] = useState(0)
  const [projects, setProjects] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const fetchProjects = async () => {
    try {
      const data = await getProjectsApi()
      const items = Array.isArray(data)
        ? data
        : Array.isArray(data?.items)
          ? data.items
          : []

      setProjects(items)
    } catch (err) {
      console.error('❌ 프로젝트 가져오기 실패:', err)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const filteredItems = useMemo(() => {
    const safeProjects = Array.isArray(projects) ? projects : []

    if (selectedStatus === 'all') {
      return safeProjects.filter(item => item.progress !== 'done')
    }

    return safeProjects.filter(item => item.progress === selectedStatus)
  }, [selectedStatus, projects])

  const completedProjects = useMemo(() => {
    const safeProjects = Array.isArray(projects) ? projects : []
    return safeProjects.filter(item => item.progress === 'done')
  }, [projects])

  const handleModalOpen = () => setIsModalOpen(true)
  const handleModalClose = () => setIsModalOpen(false)

  const handleCreateProject = (newProject) => {
    if (newProject && newProject.id) {
      const projectWithDefaults = {
        ...newProject,
        progress: newProject.progress || 'before',
        createdAt: newProject.createdAt || new Date().toISOString(),
      }

      setProjects(prev => [...prev, projectWithDefaults])
    } else {
      fetchProjects()
    }

    setIsModalOpen(false)
  }

  const handleDeleteClick = (projectId, projectTitle) => {
    setDeleteConfirm({ projectId, projectTitle })
  }

  const handleDeleteCancel = () => {
    setDeleteConfirm(null)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return

    const { projectId, projectTitle } = deleteConfirm

    try {
      setIsDeleting(projectId)
      await deleteProjectApi(projectId)

      setProjects(prev =>
        prev.filter(project => project.id !== projectId)
      )

      console.log('✅ 프로젝트 삭제 완료:', projectTitle)
    } catch (error) {
      console.error('❌ 프로젝트 삭제 실패:', error)
      alert('프로젝트 삭제에 실패했습니다.')
    } finally {
      setIsDeleting(null)
      setDeleteConfirm(null)
    }
  }

  const handleStatusChange = (value) => {
    setSelectedStatus(value)
    setCurrentSlide(0)
  }

  const handleProjectClick = (projectId) => {
    navigate(`/projectList/${projectId}`)
  }

  return (
    <div>
      <MainNav />

      <div className="flex flex-col items-center">
        <div className="fontSB text-[40px] mt-7">PROJECT</div>

        <div className="flex flex-col items-center mt-8 bg-[#fdfdfd] w-[80%] min-h-[300px] rounded-3xl shadow-xl">
          <div className="flex justify-between w-[90%] mt-5 mb-3">
            <ProgressCategoryButtons
              value={selectedStatus}
              onChange={handleStatusChange}
            />

            <div
              onClick={handleModalOpen}
              className="text-[12px] bg-project-create fontRegular px-4 py-1 rounded-2xl cursor-pointer hover:opacity-50"
            >
              + 프로젝트 생성
            </div>
          </div>

          <div className="relative w-[90%] overflow-hidden mt-4">
            <ProjectSlideView
              projects={filteredItems}
              currentSlide={currentSlide}
              onSlideChange={setCurrentSlide}
              onProjectClick={handleProjectClick}
              onDelete={handleDeleteClick}
              isDeleting={isDeleting}
              itemsPerSlide={3}
              emptyMessage={
                projects.length === 0
                  ? '프로젝트를 생성해 주세요'
                  : '해당 상태의 프로젝트가 없습니다'
              }
            />
          </div>
        </div>

        <div className="flex flex-col my-10 w-[80%]">
          <div
            className="h-[1.5px] w-full"
            style={{
              background:
                'linear-gradient(to right, rgba(197,208,226,0.1), rgba(197,208,226,1), rgba(197,208,226,0.1))',
            }}
          />

          <ProjectSection
            title="진행 완료"
            projects={completedProjects}
            currentSlide={currentCompletedSlide}
            onSlideChange={setCurrentCompletedSlide}
            onProjectClick={handleProjectClick}
            onDelete={handleDeleteClick}
            isDeleting={isDeleting}
            itemsPerSlide={9}
            emptyMessage="진행완료된 프로젝트가 없습니다."
          />
        </div>
      </div>

      <ProjectCreateModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCreate={handleCreateProject}
      />

      <DeleteConfirmModal
        isOpen={!!deleteConfirm}
        projectTitle={deleteConfirm?.projectTitle || ''}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isLoading={!!isDeleting}
      />
    </div>
  )
}
