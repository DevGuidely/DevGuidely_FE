export const PROJECT_STAGES = [
  {
    id: 'planning',
    title: 'Planning',
    description: '프로젝트를 기획하는 단계입니다.',
    bgColor: 'bg-[#FFB080]',
    items: [
      '서비스 개요',
      '서비스 배경 및 목적',
      '타겟층 및 사용자 시나리오',
      '핵심 문제 정의',
      'MVP 핵심 기능 정의'
    ]
  },
  {
    id: 'tech',
    title: 'Tech',
    description: '프로젝트를 세팅하는 단계입니다.',
    subDescription: '한 번 클릭하면 세부 항목이 펼쳐지고, 다시 한 번 클릭하면 해당 단계의 상세 페이지로 이동합니다.',
    bgColor: 'bg-[#FDD7D8]',
  },
  {
    id: 'dev',
    title: 'Dev',
    description: '프로젝트를 구현하는 단계입니다.',
    bgColor: 'bg-[#B0ADFF]',
  },
  {
    id: 'deploy',
    title: 'Deploy',
    description: '프로젝트를 배포하는 단계입니다.',
    bgColor: 'bg-[#B5DAC1]',
    items: [
      '서버 환경 구축',
      'CI/CD 파이프라인 설정',
      '도메인 및 SSL 설정',
      '모니터링 설정',
      '서비스 런칭'
    ]
  },
];