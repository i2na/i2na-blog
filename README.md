# Heymark

> Hey, Mark it down!

마크다운 문서를 CLI로 빠르게 저장하고 웹에서 보는 개인 블로그 시스템

## Architecture

**프로젝트 코드는 Public, 컨텐츠는 Private** 방식으로 운영됩니다:

-   **Public Repo (i2na/heymark)**: Heymark 애플리케이션 코드
-   **Private Repo (i2na/i2na-blog-md)**: 마크다운 포스트 파일
-   **API**: GitHub API를 통해 private repo의 포스트를 동적으로 fetch
-   **Access Control**: Frontmatter 기반 권한 관리 (public/private + shared users)

## Setup

### 1. Private Repository Setup

먼저 포스트를 저장할 private repository를 생성합니다:

```bash
# 1. GitHub에서 Private Repo 생성
# Repository: i2na/i2na-blog-md
# Visibility: Private

# 2. Personal Access Token 생성
# GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
# Note: "Heymark Posts API Access"
# Scopes: repo (Full control of private repositories)
# 토큰을 복사해서 안전하게 보관

# 3. 로컬에 클론
git clone https://github.com/i2na/i2na-blog-md.git
```

### 2. Installation

#### 공통

```bash
# 프로젝트 클론
git clone https://github.com/i2na/heymark.git
cd heymark

# 의존성 설치
yarn install
```

#### CLI Setup

```bash
# 프로젝트 루트에서 실행

# 초기 설정 (Heymark 경로, Posts Repo 경로, Git 저장소, 배포 URL)
node setup.js

# CLI 전역 등록
yarn link

# 설치 확인
heymark call
```

설정 파일이 `~/.heymark-config.json`에 생성됩니다:

```json
{
    "heymarkPath": "/Users/leeyena/dev/heymark",
    "postsRepoPath": "/Users/leeyena/dev/i2na-blog-md",
    "heymarkGitRemote": "https://github.com/i2na/heymark.git",
    "postsGitRemote": "https://github.com/i2na/i2na-blog-md.git",
    "baseUrl": "https://blog.yena.io.kr"
}
```

#### Web Development Setup

```bash
# 프로젝트 루트에서 실행

# Vercel 로그인 (최초 1회)
yarn vercel login

# 프로젝트 연결 (최초 1회)
yarn vercel link --yes --project <project_name>

# 개발 서버 실행 (Frontend + Backend 동시 실행)
yarn start
# → Frontend: http://localhost:5173 (Vite)
# → Backend API: http://localhost:3000 (Vercel Dev)

# 빌드
yarn build

# 프리뷰
yarn preview
```

**About Vercel Dev**

이 프로젝트는 Vercel 플랫폼에 배포되며, `/api` 폴더의 파일들이 자동으로 서버리스 함수로 변환됩니다. 로컬 개발 환경에서도 프로덕션과 동일한 서버리스 아키텍처를 재현하기 위해 Vercel Dev CLI를 사용합니다. `yarn start` 명령어는 `vercel dev`(Backend API)와 `vite`(Frontend)를 동시에 실행하여 통합 개발 환경을 제공합니다.

### 3. Environment Variables

프로젝트 루트에 `.env` 파일 생성 (`.env.example` 참고)

### 4. Google OAuth Setup

Google Cloud Console (https://console.cloud.google.com/)에서 설정:

1. OAuth 클라이언트 ID 생성
2. **승인된 JavaScript 원본**:
    - `http://localhost:5173`
    - `https://blog.yena.io.kr`
3. **승인된 리디렉션 URI**:
    - `http://localhost:5173/api/auth/google`
    - `https://blog.yena.io.kr/api/auth/google`

## How It Works

### Data Flow

```
┌─────────────────┐
│  Public Repo    │  코드 (오픈소스)
│  i2na/heymark   │
└─────────────────┘
        │
        │ Deploy
        ▼
┌─────────────────┐
│     Vercel      │  호스팅 + Serverless API
└─────────────────┘
        │
        │ GitHub API
        ▼
┌─────────────────┐
│  Private Repo   │  컨텐츠 (비공개)
│  i2na-blog-md   │  *.md files
└─────────────────┘
```

## Usage

### CLI Commands

```bash
# 문서 작성용 프롬프트를 클립보드에 복사
heymark call

# 문서를 heymark에 추가 (절대 경로 필요)
heymark add <filepath>              # 원본 파일 유지
heymark add <filepath> --delete     # 원본 파일 삭제
heymark add <filepath> -d           # 원본 파일 삭제 (단축)

# heymark 프로젝트를 Cursor로 열기
heymark open
```

**예시:**

```bash
# 1. Cursor에서 문서 작성 프롬프트 복사
$ heymark call
✓ Prompt copied to clipboard
→ Paste it in Cursor

# 2. Cursor에 붙여넣기 → doc.md 파일 생성됨

# 3. heymark에 추가
$ heymark add /Users/leeyena/dev/project/doc.md
→ Syncing with remote...
✓ Up to date
✓ Saved → doc.md
✓ Committed & pushed to private repo
→ https://blog.yena.io.kr/doc.md

# 원본 파일도 삭제하려면
$ heymark add /Users/leeyena/dev/project/doc.md -d
→ Syncing with remote...
✓ Up to date
✓ Saved → doc.md
✓ Committed & pushed to private repo
✓ Removed original file
→ https://blog.yena.io.kr/doc.md

# 4. heymark 프로젝트를 Cursor로 열기
$ heymark open
✓ Opening heymark project in Cursor...
```

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

**Default Values**

`heymark add` CLI로 추가할 때 기본값:

-   `visibility: private`
-   `sharedWith: [admin 이메일들]` (email.yaml의 admin 목록)
-   `createdAt: 현재시간`

### Access Control

#### Main Page

-   **비로그인**: Public 문서만 표시
-   **로그인**: Public + 자신에게 공유된 Private 문서 + Admin 권한이 있는 경우 모든 문서 표시

#### Direct Post URL Access

**Public 게시물**

```
/document.md → 바로 접근 가능
```

**Private 게시물**

```
/document.md
  ├─ 비로그인 → Google 로그인 요청
  │
  └─ 로그인
      ├─ Admin 이메일 → 모든 문서 접근 가능
      ├─ sharedWith에 포함 → 콘텐츠 표시
      └─ sharedWith에 없음 → Toast 알림 + 메인으로 리다이렉트
```

#### Admin 권한

Admin 이메일은 Private Repository의 `email.yaml` 파일에서 관리됩니다:

```yaml
admin:
    - admin1@gmail.com
    - admin2@gmail.com

archive:
    - archive1@gmail.com
    - archive2@gmail.com
```

Admin 이메일에 포함된 사용자는:

-   모든 Private 문서에 접근 가능
-   포스트 삭제 가능
-   포스트 공유 설정 변경 가능
