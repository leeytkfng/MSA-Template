#  MSA-Template Project

##  프로젝트 개요
Spring 기반의 MSA(Microservice Architecture) 환경을 구축하고,
React 클라이언트, Gateway, Eureka, 유저 서비스(User-Service)를 포함한
**마이크로서비스 템플릿 프로젝트**입니다.

> Gateway를 통해 모든 요청을 받아 마이크로서비스로 분산시키고,
> React 기반 SPA 및 Thymeleaf 기반 SSR 페이지까지 구성했습니다.

---

##  프로젝트 구조

```
msa-template/
├── gateway/          # Spring Cloud Gateway - API 경로 진입점
├── client/           # 유저 서비스 (회원가입 등 기능)
│   ├── domain/       # 도메인 모델 및 인터페이스
│   ├── application/  # 비즈니스 로직
│   ├── infrastructure/ # JPA 등 구현체
│   └── api/          # REST/SSR 컨트롤러
├── frontend/         # React 클라이언트 (메인 페이지)
└── eureka-server/    # Eureka 서비스 디스커버리 (선택적으로 분리 가능)
```

---

## ⚙ 사용 기술 스택

| 계층 | 기술 |
|------|------|
| Gateway | Spring Cloud Gateway |
| Service Discovery | Eureka Netflix |
| Backend (User Service) | Spring Boot, Spring Data JPA, DDD 구조 |
| Frontend | React + Vite + TypeScript |
| SSR | Thymeleaf |
| DB | PostgreSQL |
| 향후 인증 공유 | Redis or JWT 예정 |

---

##  구현 기능 요약

- [x] Gateway + Eureka + React 연동 완료
- [x] 클라이언트 서비스 Eureka 등록 및 라우팅 성공
- [x] SSR 페이지 (Thymeleaf) → Gateway 경유로 접근
- [x] React → Gateway → 유저 서비스 호출 흐름 구현
- [x] 회원가입 폼 제출 및 DB 저장 처리
- [x] 도메인 주도 설계 구조 기반 설계

---

##  아키텍처 흐름도

>  `docs/architecture.png` (또는 draw.io 도식화 이미지 삽입)

```text
[React] → [Gateway (9090)] → [Eureka] → [User-Service (8081)]
                               → [Other-Service (...)]
```

---

## ▶️ 실행 방법

### 📌 1. Eureka 서버 실행
```bash
cd eureka-server
./gradlew bootRun
```

###  2. Gateway 실행
```bash
cd gateway
./gradlew bootRun
```

###  3. 유저 서비스 실행
```bash
cd client
./gradlew bootRun
```

###  4. React 앱 실행
```bash
cd frontend
yarn dev
```

### ✅ 접속 주소
- React SPA: http://localhost:5173
- SSR 회원가입 폼: http://localhost:9090/register-form
- Eureka 대시보드: http://localhost:8761

---

##  향후 확장 예정 사항

- [ ] 로그인 처리 + JWT 발급
- [ ] Redis 세션 공유 적용
- [ ] Kafka or MQ 기반 이벤트 처리
- [ ] 인증 서비스 (auth-service) 분리
- [ ] CI/CD 파이프라인 적용

---

##  느낀 점 / 회고

- 단순한 CRUD를 넘어서, 실제 서비스 인프라를 구성하는 설계 경험을 함
- Gateway/Eureka 기반 MSA 구조를 직접 구현해봄으로써 확장성의 중요성 체감
- DDD 설계를 통해 유연한 구조 설계 및 테스트 용이성을 확보함

> "작은 규모의 템플릿이지만, 실제로 팀 단위 프로젝트나 실무 구조 설계에 기반이 되는 뼈대를 직접 구현한 소중한 경험"

---

##  개발자

- GitHub: [leeytkfng](https://github.com/leeytkfng)
- Blog: (선택사항)

---

>  본 템플릿은 추후 다양한 프로젝트의 기반 구조로 활용될 수 있도록 유지 보수 예정입니다.

