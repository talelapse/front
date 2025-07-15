# 서버 코드 분석 및 FastAPI 포팅 가능성

이 문서는 `server/` 디렉터리에 위치한 Express 기반 백엔드의 주요 구성 요소를 간략히 정리하고, 해당 기능을 Python FastAPI로 옮겼을 때의 가능성을 검토합니다.

## 현재 서버 구조 요약

- **Express 앱 초기화**(`server/index.ts`)
  - 개발 모드에서는 Vite 개발 서버와 연동하여 프록시 역할을 하며, 프로덕션 모드에서는 빌드된 정적 파일을 제공합니다.
  - 서버는 기본적으로 포트 5000에서 실행됩니다.
- **라우팅**(`server/routes.ts`)
  - 인증, 프로필 관리, 운세 세션 CRUD, 메시지 전송 등 REST API 엔드포인트가 정의되어 있습니다.
  - `isAuthenticated` 미들웨어로 보호되는 라우트를 통해 세션 기반 인증을 유지합니다.
- **데이터베이스 액세스**(`server/storage.ts`)
  - Drizzle ORM을 사용하여 PostgreSQL과 통신합니다.
  - 사용자, 프로필, 세션, 메시지, 결과 등 테이블에 대한 CRUD 함수가 구현되어 있습니다.
- **OpenAI 연동**(`server/services/openai.ts`)
  - GPT-4o 모델을 호출해 운세 답변, 상세 분석, 스토리북 요약을 생성합니다.
- **인증 로직**(`server/replitAuth.ts`)
  - Replit OIDC 기반 인증을 설정하며, PostgreSQL 세션 스토어를 활용합니다.
- **데이터베이스 설정**(`server/db.ts`)
  - Neon serverless PostgreSQL과의 연결을 생성하여 Drizzle ORM에 전달합니다.

## FastAPI로의 포팅 가능성

- **웹 프레임워크 대체**: Express 라우트 구조와 미들웨어 패턴은 FastAPI의 라우터 및 의존성 시스템으로 무리 없이 옮길 수 있습니다.
- **인증**: Passport 기반 OIDC 인증 로직은 Python에서 `Authlib` 또는 `FastAPI Users` 등을 사용하여 구현할 수 있습니다. 세션 관리 역시 `Starlette`의 세션 미들웨어로 대응 가능합니다.
- **데이터베이스**: Drizzle ORM은 Python에서 SQLAlchemy나 Tortoise ORM 등으로 대체하면 유사한 기능을 구현할 수 있습니다.
- **OpenAI API 호출**: Node용 `openai` 라이브러리 사용 부분은 Python의 `openai` 패키지에서 거의 동일한 방식으로 동작합니다.
- **정적 파일 제공 및 개발 서버**: FastAPI는 `StaticFiles`를 통해 정적 자산을 제공할 수 있으며, uvicorn이나 hypercorn을 이용해 개발/프로덕션 환경을 구성할 수 있습니다.

현재 Express 서버가 수행하는 기능(인증, REST API, DB 연동, OpenAI 호출)은 모두 FastAPI에서도 구현 가능한 범위이므로 포팅 작업은 기술적으로 문제가 없습니다. 다만

- 세션 관리와 OIDC 인증 세부 로직은 라이브러리 차이로 인해 새로 작성해야 하며,
- Drizzle ORM을 직접 대체할 수 있는 Python ORM을 선정하고 스키마를 다시 정의해야 합니다.

전반적으로 큰 제약은 없으며, 설계만 잘 진행하면 FastAPI 기반으로 동일한 서비스를 구현할 수 있습니다.

