# 🎭 공연 예매 시스템 - API 명세서

## 📌 개요
이 시스템은 **마이크로서비스 아키텍처(MSA)** 기반으로 설계된 공연 예매 플랫폼입니다. 각 서비스는 독립적으로 관리되며 REST API와 메시지 큐(RabbitMQ)를 통해 상호작용합니다. 주요 서비스는 다음과 같습니다:

- **user-service (8080)**: 사용자 관리 및 인증
- **performance-service (8765)**: 공연 정보 등록, 수정, 조회
- **ticket-service (8787)**: 예매 처리, 좌석 예약, 티켓 발급

## 🧩 마이크로서비스 구성

| 서비스 이름           | 포트  | 설명                            | Swagger 문서 경로       |
|------------------------|-------|-----------------------------------|---------------------------|
| user-service           | 8080  | 회원가입, 로그인, 사용자 정보 관리 | `/swagger-ui/index.html` |
| performance-service    | 8765  | 공연 등록, 조회, 수정             | `/swagger-ui/index.html` |
| ticket-service         | 8787  | 예매 요청, 좌석 선택, 티켓 생성   | `/swagger-ui/index.html` |


## 🔁 메시지 미들웨어 (RabbitMQ)

- **Exchange**: `reservation.direct`
- **Queue**: `reservation.user.queue`
- **Routing Key**: `reservation.user`

### 메시지 흐름 예시
```
ticket-service → ReservationMessage 발행 → user-service로 소비
```

### 메시지 포맷
```json
{
  "uId": 1,
  "rId": 100,
  "pId": 5,
  "rSpot": "A5",
  "pTitle": "백조의 호수",
  "rEmail": "example@email.com",
  "rPhone": "010-1234-5678",
  "rTime": "2025-04-12T18:00:00"
}
```

## 🔐 인증 방식

- **JWT 기반 인증**
- 로그인 성공 시, HTTP-Only 쿠키 또는 LocalStorage에 토큰 저장
- 모든 API 요청은 `Authorization: Bearer <token>` 형식으로 인증

## ✅ Swagger 확인 방법

각 서비스에서 다음 경로 접속
```
http://localhost:<포트>/swagger-ui/index.html
```

예:
- 사용자: http://localhost:8080/swagger-ui/index.html
- 공연: http://localhost:8765/swagger-ui/index.html
- 예매: http://localhost:8787/swagger-ui/index.html


## 📁 API 기능 요약

### 🎟️ ticket-service
- POST `/api/reservation/select`: 좌석 임시 저장 및 key 발급
- GET `/api/reservation/select?key=`: 임시 저장된 정보 조회
- POST `/api/reservation/confirm`: 좌석 선택 확정
- POST `/api/reservation/complete`: 유저 정보 추가
- POST `/api/reservation/ticket`: 예매 확정 및 티켓 발급

### 👤 user-service
- POST `/api/users/register`: 회원가입
- POST `/api/users/login`: 로그인 (JWT 발급)
- GET `/api/users/info`: 사용자 정보 조회
- PUT `/api/users/update`: 사용자 정보 수정
- DELETE `/api/users/delete`: 회원 탈퇴
- (MQ) `@RabbitListener`로 예약 정보 수신

### 🎭 performance-service
- GET `/api/performances`: 공연 목록
- GET `/api/performances/{id}`: 공연 상세 조회
- POST `/api/performances`: 공연 등록
- PUT `/api/performances/{id}`: 공연 수정
- DELETE `/api/performances/{id}`: 공연 삭제


### ⚙️ 역할 분담 

| 이름  | 담당 서비스              | 주요 역할                          |
|-----|---------------------|--------------------------------|
| 박순일 | 공연서비스               |  프로젝트 리더 , 백엔드리드               |
| 김민섭 | 예메 서비스              | 메세지 미들웨어 설계 , MQ 발행 로직 구현      |
| 박세호 | 유저 서비스              | 프런트엔드 리드,웹 디자인 설계              |
| 박기영 | 웹 디자인               | 웹 디자인 총괄 및 설계 , 문서화 작업 총괄      |
| 최민석 | 예메서비스               | 예메 서비스 총괄 설계 , 데이터베이스 관리       |
| 최현도 | 예메서비스               | 레디스 시스템 구축,토큰 발행 로직구현          |
| 이용수 | 유저서비스               | 마이크로서비스-아키텍쳐 인프라구축<br>유저서비스 설계 |
| 최소현 | 예메서비스               | 예매 flow 전체, 예매 서비스 CRUD구현.     |


## 📌 비고
- 데이터베이스는 PostgreSQL 사용
- `ticket-service`는 Redis 기반의 임시 저장소를 활용함 (TimedStorage)
- 모든 서비스는 Spring Boot 기반이며, RabbitMQ 연결을 위한 의존성 포함

## 💡 향후 확장 고려
- Kafka로 메시징 시스템 확장
- 알림 서비스 분리 및 WebSocket 적용
- 결제 시스템 추가 및 외부 PG사 연동

---
마지막 업데이트: 2025-04-11

