import React from 'react'
import { FaLink } from "react-icons/fa6"

// Frontend TodoList 데이터
export const frontendCategories = [
  {
    title: "컴포넌트 개발",
    items: [
      { id: "frontend_component", label: "재사용 컴포넌트" },
      { id: "frontend_routing", label: "라우팅 설정" },
      { id: "frontend_state", label: "상태 관리" },
      { id: "frontend_state2", label: "상태 관리" },
      { id: "frontend_state3", label: "상태 관리" },
      { id: "frontend_state4", label: "상태 관리" },
      { id: "frontend_state5", label: "상태 관리" },
      { id: "frontend_state6", label: "상태 관리" },
      { id: "frontend_state7", label: "상태 관리" },
      { id: "frontend_state8", label: "상태 관리" },
      { id: "frontend_state9", label: "상태 관리" },
      { id: "frontend_state10", label: "상태 관리" },
      { id: "frontend_state11", label: "상태 관리" },
      { id: "frontend_state12", label: "상태 관리" },
      { id: "frontend_state13", label: "상태 관리" },
      { id: "frontend_state14", label: "상태 관리" },
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

// Backend TodoList 데이터
export const backendCategories = [
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

// 설계 컨텐츠 데이터
export const contentData = {
  screen: {
    title: '나의 화면 설계서',
    placeholder: 'https://nodejs.org/ko',
    memoPlaceholder: '서비스에 꼭 있어야 할 핵심 기능을 정의 하세요.',
    exampleTitle: '화면 설계서 예시',
    links: [
      {
        url: 'http://figma.com/',
        text: 'Figma.com',
        description: 'DevGuidely가 추천하는 화면 설계 사이트입니다!'
      }
    ]
  },
  api: {
    title: '나의 API 명세서',
    placeholder: 'https://nodejs.org/ko',
    memoPlaceholder: 'API 설계에 대한 메모를 작성하세요.',
    exampleTitle: 'API 명세서 예시',
    links: [
      {
        url: 'https://web.postman.co/home',
        text: 'web.postman.co/home',
        description: 'DevGuidely가 추천하는 API 테스트 사이트입니다!'
      },
      {
        url: 'https://chromewebstore.google.com/detail/talend-api-tester-free-ed/aejoelaoggembcahagimdiliamlcdmfm',
        text: 'chromewebstore.google.com',
        description: 'DevGuidely가 추천하는 API 테스트 사이트입니다!'
      }
    ]
  },
  erd: {
    title: '나의 ERD',
    placeholder: 'https://nodejs.org/ko',
    memoPlaceholder: 'ERD 설계에 대한 메모를 작성하세요.',
    exampleTitle: 'ERD 예시',
    links: [
      {
        url: 'https://dbdiagram.io/',
        text: 'dbdiagram.io/',
        description: 'DevGuidely가 추천하는 ERD 설계 사이트입니다!'
      }
    ]
  }
}

// 초기 체크박스 상태
export const initialCheckedItems = {
  // Frontend items
  frontend_component: false,
  frontend_routing: false,
  frontend_state: false,
  frontend_state2: false,
  frontend_state3: false,
  frontend_state4: false,
  frontend_state5: false,
  frontend_state6: false,
  frontend_state7: false,
  frontend_state8: false,
  frontend_state9: false,
  frontend_state10: false,
  frontend_state11: false,
  frontend_state12: false,
  frontend_state13: false,
  frontend_state14: false,
  frontend_api: false,
  frontend_auth: false,
  frontend_ui: false,
  frontend_validation: false,
  frontend_responsive: false,
  frontend_animation: false,
  frontend_performance: false,
  frontend_seo: false,
  frontend_build: false,
  // Backend items
  backend_api: false,
  backend_database: false,
  backend_auth: false,
  backend_middleware: false,
  backend_validation: false,
  backend_error: false,
  backend_test: false,
  backend_deploy: false,
}