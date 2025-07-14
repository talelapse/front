# TaleLapse

당신의 이야기가 시간을 따라 흘러가며 아름다운 발자취가 되는 특별한 경험을 제공하는 한국어 대화형 운세 및 상담 플랫폼입니다.

## 🌟 개요

TaleLapse는 단순한 운세 서비스를 넘어, 사용자의 모든 대화를 동화책처럼 아름답게 보관하는 혁신적인 플랫폼입니다. 시간이 지나면서 축적되는 당신의 이야기들이 하나의 소중한 발자취가 되어, 성장의 여정을 돌아볼 수 있게 합니다.

### 🎯 핵심 특징

- **이야기 발자취**: 대화 기록을 동화책처럼 압축하여 아름다운 요약으로 보관
- **다양한 대화 형태**: 일상 이야기부터 사주, 타로, 점성술까지
- **AI 기반 상담**: OpenAI GPT-4o를 활용한 자연스럽고 따뜻한 대화
- **시간 흐름 기록**: 24시간이 지난 대화는 자동으로 스토리북 형태로 변환
- **개인화된 경험**: 사용자 프로필 기반 맞춤형 상담

## 🚀 주요 기능

### 1. 이야기 (일상 대화)
- 어떤 주제든 편안하게 이야기할 수 있는 따뜻한 공간
- 고민 상담과 선택의 조언
- 마음의 위로와 격려
- 그냥 누군가와 대화하고 싶을 때

### 2. 운세 상담
- **사주팔자**: 오행과 음양의 조화로 개인 운세 분석
- **타로**: 신비로운 타로 카드 해석
- **점성술**: 별자리와 행성 위치 기반 운세

### 3. TaleLapse 시스템
- **이야기 압축**: 긴 대화를 핵심만 담은 동화책 같은 요약으로 변환
- **시간 흐름**: 24시간 후 자동으로 아름다운 이야기로 정리
- **발자취 보관**: 과거의 소중한 순간들을 영구 보관

## 🛠 기술 스택

### Frontend
- **React 18** - 모던 사용자 인터페이스
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 유틸리티 퍼스트 스타일링
- **shadcn/ui** - 고품질 UI 컴포넌트
- **Wouter** - 경량 라우팅
- **TanStack Query** - 서버 상태 관리
- **Vite** - 빠른 개발 환경

### Backend
- **Express.js** - 웹 서버 프레임워크
- **TypeScript** - 서버사이드 타입 안전성
- **Drizzle ORM** - 타입 안전 데이터베이스 ORM
- **PostgreSQL** - 관계형 데이터베이스 (Neon Serverless)
- **OpenAI GPT-4o** - AI 대화 생성
- **Passport.js** - 인증 시스템

### 인증 & 배포
- **OpenID Connect** - Replit 통합 인증
- **Session-based Auth** - 세션 기반 인증
- **Replit Deployments** - 배포 플랫폼

## 📦 설치 및 실행

### 사전 요구사항
- Node.js 18 이상
- PostgreSQL 데이터베이스
- OpenAI API 키

### 설치
```bash
# 저장소 클론
git clone <repository-url>
cd talelapse

# 의존성 설치
npm install
```

### 환경 변수 설정
```bash
# .env 파일 생성
DATABASE_URL=your_postgresql_connection_string
OPENAI_API_KEY=your_openai_api_key
SESSION_SECRET=your_session_secret
REPL_ID=your_repl_id
```

### 데이터베이스 설정
```bash
# 데이터베이스 스키마 푸시
npm run db:push
```

### 개발 서버 실행
```bash
# 개발 모드 실행
npm run dev
```

애플리케이션이 http://localhost:5000 에서 실행됩니다.

## 📱 사용법

### 1. 회원가입 및 로그인
- Replit 계정으로 간편 로그인
- 프로필 설정 (생년월일, 출생시간 등)

### 2. 대화 시작
- 홈페이지에서 원하는 대화 유형 선택
- AI와 자연스러운 대화 진행
- 실시간 응답 및 추가 질문 가능

### 3. 이야기 발자취 확인
- 히스토리 페이지에서 과거 대화 확인
- 24시간 후 동화책 형태의 요약 확인
- 성장 과정과 변화 추적

## 🎨 디자인 특징

### 한국 전통 미학
- **이롭게 바탕체** - 한국 전통 웹폰트 적용
- **신비로운 색상 팔레트** - 깊은 네이비, 퍼플, 골드 조합
- **부드러운 그라데이션** - 몽환적이고 따뜻한 분위기

### 사용자 경험
- **반응형 디자인** - 모바일 퍼스트 접근
- **부드러운 애니메이션** - 자연스러운 상호작용
- **직관적 네비게이션** - 쉬운 사용법

## 📊 데이터베이스 구조

### 주요 테이블
- `users` - 사용자 정보
- `user_profiles` - 사용자 프로필 (생년월일, 출생지 등)
- `fortune_sessions` - 대화 세션
- `fortune_messages` - 대화 메시지
- `fortune_results` - 상세 운세 결과
- `sessions` - 세션 저장소

## 🔐 보안

- **세션 기반 인증** - HTTP-only 쿠키 사용
- **CSRF 보호** - 크로스 사이트 요청 위조 방지
- **데이터 암호화** - 민감한 사용자 정보 보호
- **API 키 보안** - 환경 변수를 통한 안전한 키 관리

## 🚀 배포

### Replit에서 배포
1. Replit에서 프로젝트 생성
2. 환경 변수 설정
3. Deploy 버튼 클릭

### 다른 플랫폼 배포
```bash
# 프로덕션 빌드
npm run build

# 서버 시작
npm start
```

## 🤝 기여하기

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 LICENSE 파일을 참조하세요.

## 📞 지원

문제가 발생하거나 제안사항이 있다면:
- GitHub Issues 생성
- 개발팀 연락

---

**TaleLapse** - 당신의 이야기가 시간을 따라 흘러가며 아름다운 발자취가 되는 곳 ✨