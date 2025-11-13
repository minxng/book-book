# 📘 BookLog (북로그)

**BookLog**는 알라딘 Open API를 활용해 사용자가 원하는 도서를 검색하고, 찜 및 리뷰를 관리할 수 있는 웹 서비스입니다.

<br />

## 🚀 URL

🔗 https://book-109.netlify.app/

<br />

## 🛠️ Tech Stack

| 구분                          | 기술                                                |
| ----------------------------- | --------------------------------------------------- |
| **Frontend**                  | Next.js, Tailwind CSS, Context API                  |
| **Authentication / Database** | Firebase Authentication, Firebase Realtime Database |
| **Deploy**                    | Netlify                                             |
| **External API**              | 알라딘 Open API                                     |

<br />

## 🔑 주요 기능

### 🔐 인증 (Authentication)

- **Firebase Authentication**으로 회원가입, 로그인, 로그아웃 기능 구현
- 로그인 상태는 **JWT 토큰을 쿠키로 관리**하여 새로고침 시에도 유지
- **Next.js Middleware**를 사용해 로그인 여부에 따른 페이지 접근 제한
- **Context API**를 이용한 전역 로그인 상태 관리

### 📚 도서 검색 및 리스트

- **알라딘 Open API**를 이용한 도서 검색 기능
- **카테고리별 베스트셀러** 제공
- **Pagination**: 10권 단위로 데이터를 추가 로드

### 📝 도서 상세 페이지

- 선택한 도서의 상세 정보 및 관련 카테고리 베스트셀러 표시
- **찜하기** 및 **리뷰 작성** 기능

### ❤️ 마이페이지

- **찜한 도서**와 **리뷰 작성한 도서** 조회 및 관리
- 찜한 도서 삭제 및 리뷰 추가·수정·삭제 기능 지원
- **Firebase Realtime Database**와 연동되어 데이터 변경이 실시간으로 UI에 반영

<br />

## 📸 Preview
- 메인페이지
<img width="70%" height="957" alt="Image" src="https://github.com/user-attachments/assets/8d037582-4016-4583-be00-22671836cad2" />
<br />

<br />

- 리스트 페이지
<br />
<img width="70%" height="957" alt="Image" src="https://github.com/user-attachments/assets/3e7005c1-466a-41f6-8bb4-4f3207964f13" />
<br />

<br />

- 상세 페이지
<br />
<img width="70%" height="957" alt="Image" src="https://github.com/user-attachments/assets/37519d6f-2636-45db-8ac6-4d009b633be3" />
<br />

<br />

- 마이페이지 - 리뷰
<br />
<img width="70%" height="957" alt="Image" src="https://github.com/user-attachments/assets/cd91c090-bcb9-4ed3-9458-c5c15e3fefeb" />
