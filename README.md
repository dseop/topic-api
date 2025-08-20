# Topic API

간단한 Express 기반 API로, 카테고리·검색·날짜에 따른 작문 주제를 제공합니다.

## 빠른 시작
```bash
npm install
npm start                 # http://localhost:3000
PORT=4000 npm start       # 포트 변경
```

## 주요 엔드포인트(요약)
- GET `/topic/random?category=tech&excludeIds=t1,t2`
- GET `/topic/today?date=YYYY-MM-DD`
- GET `/topic/list?page=1&limit=50&category=essay&q=환경`
- GET `/topic/categories`
- GET `/topic/by-category?name=essay`

예시
```bash
curl "http://localhost:3000/topic/random?category=tech"
```

오류 응답 예시
```json
{ "error": { "code": "INVALID_CATEGORY", "message": "..." } }
```

## 프로젝트 구조
```
app.js            # Express 앱 + 오류 처리
bin/www           # 서버 부트스트랩
routes/           # 라우터 모듈
services/         # 비즈니스 로직
data/topics.js    # 인메모리 시드 데이터
views/, public/   # Pug 템플릿 및 정적 파일
```

간단한 사용/설치 정보만 포함되어 있습니다. 내부 용도 또는 채용 관련 문구는 별도 문서로 관리하세요.
- 개발자 위생: Prettier 설정, `documents/api-design.md`에 문서화
