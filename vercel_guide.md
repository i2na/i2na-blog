# Vercel Serverless API 환경 설정 가이드

API를 실행하기 위해 Vercel의 서버리스 환경을 설정하는 방법입니다.

## 1. Vercel 로그인

### 기존 로그인 정보 확인/로그아웃

```bash
# 현재 로그인된 계정 확인
npx vercel whoami

# 로그아웃 (다른 계정으로 전환하려는 경우)
npx vercel logout
```

### 로그인

```bash
# 로그인 (브라우저가 열리거나 이메일 인증)
npx vercel login

# 또는 특정 이메일로 로그인
npx vercel login your-email@example.com
```

## 2. 새 프로젝트 생성 및 배포

프로젝트 루트 디렉토리에서:

```bash
npx vercel
```

프롬프트에서:

-   Set up and deploy? → **yes**
-   Which scope? → 계정 선택
-   Link to existing project? → **no** (새 프로젝트)
-   What's your project's name? → **heymark-dev** (또는 원하는 이름)
-   In which directory is your code located? → **./**
-   Want to modify these settings? → **no**

프로젝트가 연결되고 자동으로 배포됩니다. `.vercel` 폴더가 생성되어 프로젝트 연결 정보가 저장됩니다.

## 3. 프로젝트가 이미 존재할 경우

Vercel 대시보드에서 이미 프로젝트를 생성한 경우, 로컬 프로젝트를 연결:

```bash
cd heymark
npx vercel link --project heymark-dev
```
