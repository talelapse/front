# 프로젝트 구조 개요

이 문서는 프로젝트의 주요 디렉터리와 핵심 구성을 간략히 정리합니다.

## 루트 구성
- **client/**: React 기반 프론트엔드 소스. `src` 하위에 컴포넌트, 페이지, 훅 등이 위치합니다.
- **server/**: Express 기반 백엔드 서버 코드. 인증 로직과 REST API 라우트가 정의되어 있습니다.
- **shared/**: 클라이언트와 서버에서 공용으로 사용하는 타입 및 Drizzle 스키마 정의가 포함됩니다.
- **docs/**: 프로젝트 문서 파일을 모아 두는 디렉터리입니다.
- **구성 파일**: `vite.config.ts`, `tailwind.config.ts`, `drizzle.config.ts`, `tsconfig.json` 등 빌드와 개발 도구 설정을 담고 있습니다.

## client 디렉터리
- `index.html`: 앱의 기본 HTML 템플릿.
- `src/`
  - `App.tsx`: 라우팅 및 전역 Provider 설정을 담당합니다.
  - `pages/`: 각 경로별 페이지 컴포넌트가 위치합니다. (예: `landing.tsx`, `home.tsx`)
  - `components/`: UI 컴포넌트 모음으로, `ui/` 하위에는 shadcn 기반 컴포넌트가 있습니다.
  - `hooks/`: 커스텀 React 훅을 정의합니다.
  - `lib/`: QueryClient 등 공용 유틸리티가 포함됩니다.

## server 디렉터리
- `index.ts`: Express 앱을 초기화하고 Vite 개발 서버/정적 파일 제공을 설정합니다.
- `routes.ts`: 인증, 프로필, 운세 세션 등에 대한 REST API 엔드포인트가 정의되어 있습니다.
- `services/`: OpenAI 연동(`openai.ts`)과 운세 로직(`fortuneService.ts`)을 제공합니다.
- `storage.ts`: Drizzle ORM을 사용한 데이터베이스 액세스 로직입니다.
- `replitAuth.ts`: Replit OIDC 기반 인증 설정을 담당합니다.

## shared 디렉터리
- `schema.ts`: 사용자, 프로필, 운세 세션 등 데이터베이스 테이블과 관련 타입을 선언합니다.

## 빌드 및 실행
- `npm run dev`: 개발 모드에서 Express 서버와 Vite를 실행합니다.
- `npm run build`: Vite로 클라이언트를 빌드하고 esbuild로 서버를 번들링합니다.
- `npm start`: 프로덕션 빌드 실행.

환경 변수와 보다 상세한 아키텍처 설명은 `replit.md` 파일에서 확인할 수 있습니다.
