# Hey, Mark!

> Hey, Mark it down!

마크다운으로 지식을 빠르게 기록하고, 문서별 이메일 권한으로 공유 범위를 쉽게 제어하는 아카이브 오픈소스

## Setup

### 1. Installation

#### 공통

```bash
# 1. GitHub에서 heymark 저장소 Fork
# https://github.com/i2na/heymark 페이지에서 "Fork" 버튼 클릭

# 2. Fork한 저장소 클론
git clone https://github.com/your/heymark.git
cd heymark

# 3. 의존성 설치
yarn install
```

### 2. Private Repository Setup

먼저 마크다운 게시물 파일들을 저장할 private repository를 생성합니다:

```bash
# 1. GitHub에서 Private Repo 생성
예: posts-archive

# 2. Personal Access Token 생성
# GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
# Scopes: repo
# 토큰을 복사해서 안전하게 보관

# 3. 로컬에 Clone
```

### 3. CLI Setup

```bash
# 프로젝트 루트에서 실행

# 초기 설정
node setup.js

# CLI 전역 등록
yarn link

# 설치 확인
heymark call
```

설정 파일이 `~/.heymark-config.json`에 생성됩니다:

```json
{
    "postsGitRemote": "https://github.com/your/posts-archive.git",
    "postsRepoPath": "/Users/your/posts-archive"
}
```

-   `postsGitRemote`: 마크다운 게시물을 저장할 private repository의 Git URL
-   `postsRepoPath`: 해당 repository를 로컬에 clone한 절대 경로

#### Troubleshooting

**Mac: 권한 오류**

```bash
chmod +x cli/index.js
```

**Windows: heymark 명령어 인식 안 됨**

PowerShell에서 실행 후 재시작:

```powershell
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";$(yarn global bin)", "User")
```

#### Usage

**CLI Commands**

```bash
# 문서 작성용 프롬프트를 클립보드에 복사
heymark call

# 문서를 heymark에 추가 (filepath는 문서의 절대 경로)
heymark add <filepath>              # 원본 파일 유지
heymark add <filepath> --delete     # 원본 파일 삭제
heymark add <filepath> -d           # 원본 파일 삭제 (단축)

# posts-archive를 Cursor로 열기
heymark open
```

**Default Values**

`heymark add` CLI로 추가할 때 기본값:

-   `visibility: private`
-   `createdAt: 현재시간`

### 4. Web Development Setup

```bash
# 프로젝트 루트에서 실행

# 1. Vercel 로그인
npx vercel login

# 2. 새 프로젝트 생성 및 연결
npx vercel
# 프롬프트에서:
# - Set up and deploy? → yes
# - Which scope? → 계정 선택
# - Link to existing project? → no (새 프로젝트)
# - What's your project's name? → heymark-dev (또는 원하는 이름)
# - In which directory is your code located? → ./
# - Want to modify these settings? → no

# 또는 이미 Vercel 대시보드에서 프로젝트를 생성한 경우
npx vercel link --project <project_name>

# 3. 개발 서버 실행 (Frontend + Backend 동시 실행)
yarn start
# → Frontend: http://localhost:5174
# → Backend: http://localhost:3000 (Vercel Dev)
```

**About Vercel Dev**

이 프로젝트는 Vercel 플랫폼에 배포되며, `/api` 폴더의 파일들이 자동으로 서버리스 함수로 변환됩니다. 로컬 개발 환경에서도 프로덕션과 동일한 서버리스 아키텍처를 재현하기 위해 Vercel Dev CLI를 사용합니다.

### 5. Google OAuth Setup

[Google Cloud Console](https://console.cloud.google.com/)에서 OAuth 클라이언트 ID를 생성합니다:

1. **Google Auth Platform > Get started** 클릭
2. **App Information** 작성
3. **Audience**: External 선택
4. **Application type**: Web application 선택
5. **승인된 JavaScript 원본**에 추가:
    - `http://localhost:5174` (로컬 개발용)
    - `https://your-heymark-url.com` (배포용)
6. **승인된 리디렉션 URI**에 추가:

    - `http://localhost:5174/api/auth/google` (로컬 개발용)
    - `https://your-heymark-url.com/api/auth/google` (배포용)

### 6. Environment Variables

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경 변수들을 설정합니다:

```bash
POSTS_REPO_OWNER=your-github-username
POSTS_REPO_NAME=your-posts-archive-repo-name

# GitHub Personal Access Token (Private Repository 접근용)
POSTS_GITHUB_TOKEN=ghp_xxxxxxxxxxxxx

# Google OAuth 설정
GOOGLE_CLIENT_ID=your-google-client-id
VITE_GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# 배포 URL (로컬 개발: http://localhost:5174, 배포: https://your-heymark-url.com)
BASE_URL=http://localhost:5174
VITE_BASE_URL=http://localhost:5174
```
