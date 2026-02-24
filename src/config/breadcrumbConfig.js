export const breadcrumbConfig = {
  '/projectList': [
    { label: '프로젝트', isActive: true }
  ],
  
  '/projectList/:id': [
    { label: '프로젝트', path: '/projectList' },
    { label: ':projectName', isActive: true }
  ],
  
  '/projectList/:id/planning': [
    { label: '프로젝트', path: '/projectList' },
    { label: ':projectName', path: '/projectList/:id' },
    { label: 'Planning', isActive: true }
  ],
  
  '/projectList/:id/tech': [
    { label: '프로젝트', path: '/projectList' },
    { label: ':projectName', path: '/projectList/:id' },
    { label: 'Tech', isActive: true }
  ],
  
  '/projectList/:id/dev': [
    { label: '프로젝트', path: '/projectList' },
    { label: ':projectName', path: '/projectList/:id' },
    { label: 'Dev', isActive: true }
  ],
};