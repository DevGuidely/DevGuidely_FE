// src/constants/projectStages.js
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
    bgColor: 'bg-[#FDD7D8]',
    items: [
      '기술 스택 선정',
      '아키텍처 설계',
      '개발 환경 설정',
      'DB 설계',
      'API 설계'
    ]
  },
  {
    id: 'dev',
    title: 'Dev',
    description: '프로젝트를 구현하는 단계입니다.',
    bgColor: 'bg-[#B0ADFF]',
    items: [
      '프론트엔드 개발',
      '백엔드 개발',
      'DB 구축',
      'API 구현',
      '테스트 코드 작성'
    ]
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