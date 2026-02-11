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
  },
  backend: {
    Node: {
      title: 'Node.js 개발 환경 설정',
      variants: {
        JavaScript: {
          title: 'Node.js + JavaScript',
          sections: [
            {
              title: 'JavaScript 환경 설정',
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
                      code: [
                        'mkdir server',
                        'cd server',
                        'npm init -y'
                      ],
                    },
                  ],
                },
                {
                  title: '필수 패키지 설치',
                  blocks: [
                    {
                      code: [
                        'npm i express cors dotenv',
                        'npm i -D nodemon'
                      ],
                    },
                    {
                      code: [
                        'express: 서버 프레임워크예요',
                        'cors: 프론트(웹)에서 백엔드 호출할 때 막히지 않게 설정해요',
                        'dotenv: .env 환경변수를 코드에서 읽게 해요',
                        'nodemon: 개발 중 코드 바뀌면 서버를 자동 재시작해요',
                      ],
                    },
                  ],
                },
                {
                  title: '프로젝트 폴더 구조',
                  code: `server/
├─ src/
│  ├─ index.js            # 서버 실행 진입점 (listen)
│  ├─ app.js              # express 앱 설정
│  ├─ config/             # 환경변수, 설정 값
│  ├─ routes/             # API 라우팅 정의
│  ├─ controllers/        # 요청/응답 처리
│  ├─ services/           # 비즈니스 로직
│  ├─ repositories/       # DB 접근 로직
│  ├─ middlewares/        # 인증, 에러 처리
│  ├─ validations/        # 요청 데이터 검증
│  ├─ utils/              # 공용 유틸 함수
│  └─ db/                 # DB 관련 (연결, 모델 등)
├─ tests/                 # 테스트 코드
├─ .env                   # 실제 환경변수
├─ .env.example           # 환경변수 템플릿
└─ package.json`,
                  titleNote: '권장하는 폴더 구조 입니다. 폴더 구조는 개인에 맞게 구성하셔도 됩니다.'
                },
                {
                  title: '기본 서버 코드 작성',
                  subtitle: 'app.js',
                  code: `const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.status(200).json({ status: "ok" });
});

module.exports = app;`,
                },
                {
                  subtitle: 'index.js',
                  code: `require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
                },
                {
                  title: '환경변수 템플릿 작성',
                  subtitle: '.env.example',
                  code: `PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173`,
                },
                {
                  subtitle: '.env',
                  code: `PORT=4000
NODE_ENV=development`,
                },
                {
                  title: 'package.json 스크립트 설정',
                  code: `"scripts": {
  "dev": "nodemon src/index.js",
  "start": "node src/index.js"
}`,
                },
                {
                  title: '실행 확인',
                  blocks: [
                    {
                      code: ['npm run dev'],
                      note: '브라우저에서 http://localhost:4000/test 확인',
                    },
                    {
                      code: ['{ "status": "ok" }'],
                      note: '위 결과가 나오면 성공!',
                    },
                  ],
                },
              ]
            },
          ]
        },
        TypeScript: {
          title: 'Node.js + TypeScript',
          sections: [
            {
              title: 'TypeScript 환경 설정',
              steps: [
                {
                  title: 'Node.js 버전 확인 및 설치 (절대 필수)',
                  code: `node -v
npm -v`,
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
                      code: [
                        'mkdir server',
                        'cd server',
                        'npm init -y'
                      ],
                    },
                  ],
                },
                {
                  title: '필수 패키지 설치',
                  subtitle: '런타임 패키지',
                  code: 'npm i express cors dotenv',
                },
                {
                  subtitle: '개발용 패키지(핵심)',
                  code: `npm i -D typescript ts-node-dev @types/node
npm i -D @types/express @types/cors`,
                },
                {
                  subtitle: '(선택) 빌드/실행 편의',
                  code: 'npm i -D rimraf',
                  note: `패키지 설명:
- typescript: TS 컴파일러(tsc)
- ts-node-dev: TS 파일을 바로 실행 + 변경 시 자동 재시작(개발용)
- @types/*: TypeScript가 타입을 알 수 있게 해주는 선언 파일들
- rimraf: dist 폴더 삭제를 OS 상관없이 깔끔하게 하려고 쓰는 선택 옵션`
                },
                {
                  title: '프로젝트 폴더 구조',
                  code: `server/
├─ src/
│  ├─ index.ts            # 서버 실행 진입점 (listen)
│  ├─ app.ts              # express 앱 설정
│  ├─ config/             # 환경변수, 설정 값
│  ├─ routes/             # API 라우팅 정의
│  ├─ controllers/        # 요청/응답 처리
│  ├─ services/           # 비즈니스 로직
│  ├─ repositories/       # DB 접근 로직
│  ├─ middlewares/        # 인증, 에러 처리
│  ├─ validations/        # 요청 데이터 검증
│  ├─ utils/              # 공용 유틸 함수
│  └─ db/                 # DB 관련 (연결, 모델 등)
├─ tests/                 # 테스트 코드
├─ dist/                  # (빌드 결과물) tsc가 생성
├─ .env                   # 실제 환경변수
├─ .env.example           # 환경변수 템플릿
├─ tsconfig.json
└─ package.json`,
                  titleNote: 'JS에서 쓰던 구조 그대로 가져가되, TS는 보통 dist/ 출력 폴더가 추가됩니다.'
                },
                {
                  title: 'TypeScript 설정 파일 생성(tsconfig.json)',
                  code: 'npx tsc --init',
                  note: '생성된 tsconfig.json을 아래처럼 "서버용으로 흔히 쓰는 값"으로 맞추면 편해요:'
                },
                {
                  code: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}`,
                  note: '지금 예시는 CommonJS(require 방식) 기준입니다. 기존 Node+js 예시와 가장 비슷하게 가져가려면 이 구성이 편해요.'
                },
                {
                  title: '기본 서버 코드 작성',
                  subtitle: 'src/app.ts',
                  code: `import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

export default app;`,
                },
                {
                  subtitle: 'src/index.ts',
                  code: `import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
                },
                {
                  title: '환경변수 템플릿 작성',
                  subtitle: '.env.example',
                  code: `PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173`,
                },
                {
                  subtitle: '.env',
                  code: `PORT=4000
NODE_ENV=development`,
                  note: 'CORS_ORIGIN을 실제로 적용하려면 cors()에 옵션을 넣는 방식으로 확장하면 됩니다. (지금은 JS 예시처럼 "일단 다 허용" 형태로 맞춰두었습니다.)'
                },
                {
                  title: 'package.json 스크립트 설정',
                  code: `{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "clean": "rimraf dist"
  }
}`,
                  note: `- dev: 개발 중 TS를 바로 실행하고 자동 재시작
- build: TS → JS로 컴파일해서 dist/ 생성
- start: 빌드된 JS를 Node로 실행(운영 방식)
- clean: dist 삭제(선택)`
                },
                {
                  title: '실행 확인',
                  subtitle: '개발 모드',
                  code: 'npm run dev',
                  note: '브라우저에서 http://localhost:4000/test 확인'
                },
                {
                  subtitle: '결과',
                  code: '{"status":"ok"}',
                },
                {
                  subtitle: '운영 모드(빌드 후 실행)',
                  code: `npm run build
npm run start`,
                },
              ]
            },
          ]
        }
      }
    }
  }
};