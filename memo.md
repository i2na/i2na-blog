## 1. 기존 로그인 정보 확인/로그아웃

```bash
# 현재 로그인된 계정 확인
npx vercel whoami

# 로그아웃
npx vercel logout
```

## 2. 다른 계정으로 로그인

```bash
# 로그인 (브라우저가 열리거나 이메일 인증)
npx vercel login

# 또는 특정 이메일로 로그인
npx vercel login your-email@example.com
```

## 3. 프로젝트 연결

로그인 후:

```bash
cd heymark
npx vercel link --project heymark-api-dev
```
