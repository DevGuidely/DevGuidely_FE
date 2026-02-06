export const techGuides = {
  frontend: {
    React: {
      title: 'React 개발 환경 설정',
      sections: [
        {
          title: '폴더 구조 기본 세팅',
          steps: [
            {
              title: 'Node.js 버전 확인 및 설치 (절대 필수)',
              code: 'node -v',
              link: {
                label: 'Node.js — Run JavaScript Everywhere',
                url: 'https://nodejs.org/'
              },
              note: '설치가 되어있지 않다면 위 링크에서 설치해주세요.'
            },
            {
              title: '프로젝트 생성',
              blocks: [
                {
                  code: ['npm create vite@latest project_name'],
                  note: 'project_name에는 본인이 만들 프로젝트 이름을 적어주세요.',
                },
                {
                  code: [
                    'Select a framework: React',
                    'Select a variant: JavaScript (또는 TypeScript)',
                  ],
                },
                {
                  code: [
                    'cd project_name',
                    'npm install',
                    'npm run dev',
                  ],
                },
              ],
            },
            {
              title: '프로젝트 폴더 구조',
              code: `my-app/
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ assets/
│  └─ index.css
├─ public/
│  └─ index.html
└─ vite.config.js`,
              titleNote: '권장하는 폴더 구조 입니다. 폴더 구조는 개인에 맞게 구성하셔도 됩니다.'
            },
            {
              RecommendTitle: '💡 추천 라이브러리',
              RecommendCode: [
              '1. 서버 API 통신을 단순화 하기 위한 라이브러리 npm install axios',
              '2. 라우팅 (페이지가 여러 개일 때) npm install react-router-dom'
              ]
            },
          ]
        },
      ]
    }
  }
};
