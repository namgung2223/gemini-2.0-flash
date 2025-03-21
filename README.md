# AI 이미지 생성 프로젝트

![image](https://github.com/user-attachments/assets/c0f53fc0-29b8-4b19-9ead-35a7f54b928c)
![image](https://github.com/user-attachments/assets/7d05db1f-0d60-4625-9485-8ecb6ce05535)


## 📌 주요 기능
- 사용자가 이미지를 업로드하면 AI가 추가적인 효과를 적용하여 새 이미지를 생성
- 이전에 생성된 AI 이미지를 기반으로 추가적인 변형 가능
- Google Gemini API를 활용하여 AI 이미지 생성

## 🛠️ 기술 스택
- **Backend**: Node.js, Express.js
- **AI 모델**: Google Generative AI (Gemini API)
- **파일 업로드**: Multer
- **Frontend**: HTML, CSS, JavaScript

## 📂 프로젝트 구조
```
📁 프로젝트 루트
├── 📁 public             # 정적 파일 (HTML, CSS, JS)
├── 📁 uploads            # 사용자 업로드 이미지 저장 경로
├── 📄 app.js             # Express 서버 및 API 라우팅
├── 📄 generateImage.js   # AI 이미지 생성 로직
├── 📄 .env               # 환경 변수 (API 키 포함)
└── 📄 README.md          # 프로젝트 문서
```

## 🚀 설치 및 실행 방법
### 1️⃣ 프로젝트 클론
```sh
git clone <repository-url>
cd <project-folder>
```

### 2️⃣ 패키지 설치
```sh
npm install
```

### 3️⃣ 환경 변수 설정 (`.env` 파일 생성)
```
PORT=8000
GEMINI_API_KEY=your_google_generative_ai_key
```

### 4️⃣ 서버 실행
```sh
node app.js
```

## 📌 주요 파일 설명
### `app.js`
- Express.js 서버를 실행하고 API를 제공합니다.
- 사용자가 이미지를 업로드하면 AI 이미지 생성 요청을 처리합니다.

### `generateImage.js`
- Google Generative AI API를 사용하여 이미지 생성 요청을 처리합니다.
- 업로드된 이미지를 Base64로 변환하여 AI 모델에 전달합니다.

## 📸 API 사용 방법
### 🔹 이미지 업로드 및 AI 생성 (`POST /upload`)
#### 요청 (multipart/form-data 또는 JSON)
- 파일 업로드: `image` (이미지 파일)
- AI 프롬프트: `prompt` (AI에게 요청할 내용, 선택사항)
- 기존 이미지 기반 추가 생성: `baseImage` (Base64 인코딩된 기존 이미지, 선택사항)

#### 응답 (JSON)
```json
{
  "imageUrl": "data:image/png;base64,..."
}
```

## ✨ 추가 기능
- [ ] 이미지 갤러리 추가 (생성된 이미지 목록 확인)
- [ ] AI 생성 이미지







