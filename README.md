


## 1. 프로젝트 소개

![holo_main_logo](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/b0944666-b5c7-40e9-a26f-1b09e0c384e1)

<h2>'홀로냠냠'은 혼밥을 즐기는 사람들을 위한 커뮤니티 플랫폼입니다.</h2>

이전에는 가족 단위의 식사가 주를 이루었지만, 최근 1인 가구의 증가, 바쁜 생활 패턴, 개인의 취향을 중요시하는 트렌드 등 여러 요인에 의해 요즘은 혼자서 식사를 하는 '혼밥' 문화가 확산되고 있습니다. 그러나 혼밥이 편리하긴 하지만, 때로는 외로움을 느낄 수 있으며, 맛있는 식당을 찾는 것이 어려울 수도 있습니다.

이러한 문제를 해결하기 위해 저희는 '홀로냠냠' 프로젝트를 기획하게 되었습니다. '홀로냠냠'은 혼밥을 즐기는 사람들을 위한 커뮤니티로, 사용자들은 자신만의 혼밥 식당을 추천하고, 다른 사용자의 게시글을 통해 새로운 식당을 발견할 수 있습니다.

이 프로젝트의 목표는 혼밥 문화를 즐기는 사람들이 외로움을 덜고, 서로 정보와 경험을 나눌 수 있도록 하는데 중점을 두고 있습니다. 이를 통해 혼밥 문화를 즐기는 사람들이 더 다양하고 풍부한 식사 경험을 할 수 있도록 돕고자 합니다.

그럼, '홀로냠냠'과 함께 즐거운 혼밥하세요!

```
배포 사이트:
- 테스트 계정:  holo_nyam@gmail.com
- 비밀번호:  holo_nyam
```

## 2. 목차

1.  [프로젝트 소개](#1-프로젝트-소개)
2.  [목차](#2-목차)
3.  [팀 소개](#3-팀-소개)
4.  [역할 분담](#4-역할-분담)
5.  [개발 환경](#5-개발-환경)
6.  [개발 스택](#6-개발-스택)
7.  [구현 기능](#7-구현-기능)
8.  [기능 UI](#8-기능-UI)
9.  [폴더 구조](#9-폴더-구조)
10.  [작업 문화](#10-작업-문화)
11. [후기](#11-후기)

## 3. 팀 소개
**안녕하세요. 끈질기게 도전하는 4명의 프론트엔드 개발자로 이루어진 “산전수전공중전”팀입니다.**
<div align="center">

|정승규 |오수민|김모건|정현지
| :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: |
| ![정승규2](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/138554423/6904e1a1-52f7-45dc-8b99-f31446f92e63) | ![IMG_0171](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/138554423/02ab20ed-ea95-4c51-9a56-7fafcd1f738b) | ![김모건](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/138554423/839c52db-0bb1-409b-99bc-319eb47d6624) | ![Untitled](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/138554423/bf371e49-32db-4af4-9053-d4e2c0614882)
 |
|                          [정승규](https://github.com/Seunggyu008)                         |                          [오수민](https://github.com/suminara)                           |                           [김모건](https://github.com/redcontroller)                      |              [정현지](https://github.com/gee0916)                                      |
|                                               팀장                                       |                                               팀원                                       |                                               팀원                                         |                                               팀원                                     |


</div>

## 4. 역할 분담

## 5. 개발 환경
### 채택한 기술

**Node.js**

- JavaScript 실행 환경으로 채택한 Node.js는 프론트엔드와 백엔드에서 동일한 언어(JavaScript)를 사용할 수 있며, 개발 생산성을 향상시키는 다양한 도구와 라이브러리가 존재합니다.

**React.js**

- JavaScript 라이브러리의 하나인 React는 컴포넌트 단위로 파일을 분리하여 구성할 수 있기 때문에 효율적인 소스 코드 개발이 가능하여 협업 프로젝트에 적합합니다.
- 그리고 동적 웹 어플리케이션 개발에 있어서, Virtual DOM을 사용하여 필요한 부분만 다시 렌더링하는 방식의 DOM 업데이트 최적화를 통해 성능적인 이점을 가집니다.

**npm**

- 대표적인 Node.js 환경의 패키지 관리자에는 npm과 yarn이 있습니다.
- 두 가지 프로그램 모두 npm registry에 게시된 패캐지를 사용할 수 있으며 종속성을 관리합니다.
- yarn은 패키지 설치와 보안 측면에서 npm 보다 우수한 성능을 가지지만, 우리의 프로젝트에서는 보안상 문제없는 최소한의 패키지 모듈을 사용하므로 추가 설치가 필요 없는 npm을 사용했습니다.

**Styled-component**

- Pure CSS는 전역 관리로 인해 팀원의 코드에 영향을 미칠 수 있으며, 유지보수 측면에서 모듈화가 어려워 프로젝트가 크고 고도화 될수록 시간과 비용이 비례하여 증가한다는 단점이 있습니다.
- Styled-compoment는 CSS-in-JS로 JavaScript의 변수와 함수 그리고 React의 Props를 활용한 조건부 스타일링이 가능하다. CSS를 컴포넌트 단위로 모듈화 가능하며, 짧은 길이의 유니크한 클래스를 자동으로 생성하기 때문에 코드 경량화 및 유지보수에 용이합니다.

**Axios** 

- Node.js와 브라우저에서 Promise 기반으로 비동기 작업을 처리하는 데 있어서 XMLHttpRequest와 fetch 보다 직관적이고 간결한 코드 작성이 가능합니다.

**Recoil**

- React를 위한 상태 관리 라이브러리로 Recoil을 사용한 이유는 전역에서 필요한 상태를 관리하기 위해서 입니다. 기존 Redux나 redux-toolkit 보다 초기 세팅 및 사용법이 간단하여 코드가 간결해집니다.

**감귤마켓 API**

- 온전히 프론엔드 구현에 집중할 수 있도록 프론트엔드 스쿨에서 제공하는 서버 API 입니다.
- 로그인, 회원가입, 프로필, 게시글, 댓글 등의 커뮤니티와 관련 기능을 제공합니다.

**Kakao API**

- Kakao 지도 API와 카카오톡 공유하기 API를 활용하였습니다.
- Kakao API는 다양한 JavaScript SDK 예시와 국문의 공식 문서로 개발 접근성이 좋습니다. 또한 일 30만 건의 API 호출 내에서 모든 기능을 무료로 이용할 수 있어, 비용 측면에서도 이점을 가지고 있습니다.

**Netlify** 

- 웹 호스팅 서비스를 제공하는 플랫폼은 많지만, Netlify는 GitHub 연동, 간단한 사용법, 500개의 사이트를 일정 성능까지 무료 사용이 가능하여 채택했습니다.

### 협업

**Notion** - 회의록, 동시 문서 작업 및 문서 관리에 활용했습니다.
**Discord** - 음성 채팅방을 활용해 스크럼, 정기 회의 등의 의사소통 도구로 사용했습니다.
**Figma** - 프로젝트 기획과 UI 디자인, 와이어프레임 개발을 수행했습니다.
**Git, GitHub**

- 소스 코드 버전 관리에 Git을 활용 했고, Git 호스팅 사이트로는 GitHub를 사용하여 프로젝트 저장, 내장된 칸반 보드 및  간트 차트를 이용해 프로젝트 이슈 및 일정 관리를 하였습니다.

**Visual studio Code**

- 확장 프로그램인 Live Share를 통해 Pair programing를 수행했습니다.
- Git과 연동하여 소스 코드 버전 관리에 Git graph 활용했습니다.


## 6. 개발 스택

|            사용기술 |             <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/KakaoAPI-FFCD00?style=for-the-badge&logo=kakao&logoColor=white"> <img src="https://img.shields.io/badge/reacthookform-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white"> <img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=react&logoColor=white">                   |
| :------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------- | 
|  패키지  |  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">   |
|  포멧터  | <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">   <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> |
|  협업  | <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"> |
|  디자인  |  <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">   |
|  IDE  |  <img src="https://img.shields.io/badge/vscode-007ACC?style=for-the-badge&logo=vscode&logoColor=white">   |
|  배포  |  <img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">   |



## 7. 구현 기능

## 8. 기능 UI
|                                                스플래쉬                                                 |                                                로그인                                                 |                                                회원가입                                                |
| :-----------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: |
|  ![welcome_splash](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/6883a96d-76df-4503-80d8-ca5dd7a74f39)| ![login](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/b71c41ed-6819-4a4d-b185-2d3297e4de9a) |  ![signup](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/a1be3347-3a6f-4cca-bd7c-1fe9542e77fe) |

|                                                     회원가입 프로필 설정                                                      |                                                       계정 검색                                                       |                                                      팔로워&팔로잉                                                      |
| :---------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: |
| ![profilesetting](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/7b6768d3-b51b-432f-96b6-b04868edc073) |  ![search](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/75af2333-7171-40de-a2b7-fcdc8dd6e8f0) |  ![following follower](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/b205778f-977a-40bb-b17e-54e2b35eeae6)|



|                                                 메인                                                 |                                                               좋아요                                                               |                                                             댓글등록                                                              |
| :--------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
| ![main](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/77795068-a8a8-4598-aa3e-a15ded3965dc)| ![like](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/e8f9f79a-9374-49be-a665-3dd7872039b4) | ![comment](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/8c87ede5-f34d-4bd7-a076-615cb7ca3617) |




|                                                           게시물 상세                                                             |                                                                채팅                                                        |                                                        냠냠피드 작성 (게시물 작성) & 캐로셀                                   |
| :------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
|![main_post_detail](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/5fbdca88-c02f-4a64-afbe-14b9344431bb) | ![chatting](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/2568d01f-e52c-44c5-904a-dc521f270a46) | ![makepost carousell](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/79847b27-6295-4984-acea-d7c433a86972)|


|                                                     냠냠피드 수정                                                   |                                       냠냠피드 삭제                                               |                                     나의 프로필                          |
| :------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
|   ![editfeedpost](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/7c4608ae-f242-4962-a8f7-aa4472ef722e)|     ![deletefeedpost](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/456f9780-f9e9-487e-969a-1d0d1706305d)|   ![myprofile](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/bb97a6d9-a273-4355-a191-91b385736264)|

|                                                             상대의 프로필                                            |                                                    프로필 수정                                 |                                  맛집 등록                            |
| :------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
| ![friendprofile](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/e8e4c02a-d8b2-4891-bd35-e3a474de2c05)| ![editprofileinfo](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/62cec546-276f-4f60-a834-dcdef7e57643)| ![postplace](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/9063dbba-51d8-4efb-b3a8-97f9e60484fe)|

|                                              맛집 수정                                                    |                     맛집 리스트 & 별점순/최신순 필터                                                           |                              맛집 리스트 상세보기                            |
| :------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
| ![editplacepost](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/2f8ed233-a9ce-4ada-bd04-00907174d3cd) | ![placelist filter](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/86d95b2a-0520-4db9-8669-17ef42e2c982)|  ![placedetail](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/53f450d2-2e7e-4055-84d4-848b682daf3d)|

|                                        맛집 지도에서 보기                                                          |                          프로필 & 맛집 공유                                                    |               드래그&드                                    |
| :------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
| ![place_kakaomap](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/82174a23-477a-4e7b-8ddf-87d1dabbe3a7)|    ![place_share_kakao](https://github.com/FRONTENDSCHOOL7/final-12-HoloNyamNyam/assets/56462409/cf2df615-ab65-4668-bf6e-0c2601ba9862) |  |




## 9. 폴더 구조


## 10. 작업 문화
### 스크럼
---
☀️ Daily - 평일 오전 9시(약 15분 내외)

- 어제의 활동 내용 요약
- 오늘의 일정 계획
- 어려움 또는 문제 발생 시 논의

✨ Weekly - 토요일 오전 11시

- 일주일 동안의 진행 상황 공유
- 지연된 사항 파악 및 계획 조정
- 필요없다고 판단되는 프로세스 협의 및 개선 방안 검토

👍 Code review - 평일 오후 4시

- 코드 공유 후 서로 피드백
- 수정이 필요한 부분 도출 및 개선 계획 협의
### 라이브 쉐어
---
🧑‍💻 Microsoft Visual Studio Code의 Live Share 기능을 활용하여 오류 수정 시에도 페어 프로그래밍을 통해 팀원들 간의 효율적이고 원활한 의사소통을 유지합니다.

### Git & 브랜치 전략
---
🐈‍⬛ Git Issue 작성 후 pr시 관련 Issue를 태그하여 커밋을 관리합니다.

🐈‍⬛ GitHub Flow

main : 배포가 될 브랜치입니다.

develop : 디폴트 브랜치입니다. 각자 브랜치 분기후 작업하여 충돌을 줄이고 안전하게 머지합니다.

---
### 깃 커밋 컨벤션/Git Commit Convention

본문이 있다면 제목과 빈줄을 두어 구분합니다.

예시)

```
(이모지)tag: subject
예시) git commit -m '✨feat: 새로운 기능 추가 #'
```

| 태그 (Tag)  | 제목 (Subject)                                                                             |
| ----------- | ------------------------------------------------------------------------------------------ |
| ✨`:sparkles:`feat:     | 기능 추가, 삭제, 변경                                                                      |
| 🐛`:bug:`fix:      | 버그, 오류 수정                                                                            |
| 📝`:memo:`docs:     | readme.md, json 파일 등 수정, 라이브러리 설치 (문서 관련, 코드 수정 없음)                  |
| 💄`:lipstick:`style:    | CSS 등 사용자 UI 디자인 변경, 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
| ✅`:white_check_mark:`test:     | 테스트 코드, 리팩토링 테스트 코드 추가                                                     |
| 📦️`:package:`chore:   | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore                                         |
| 🚚`:truck:`rename:   | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우                                        |
| 💡`:bulb:`comment:  | 필요한 주석 추가 및 변경                                                                   |
| 🔥`:fire:`remove:   | 파일을 삭제하는 작업만 수행한 경우                                                         |
| 👽️`:alien:`change: | API 변경의 경우                                                                            |
| 🚑`:ambulance:`hotfix:   | 급하게 치명적인 버그를 고쳐야 하는 경우                                                    |
| ♻️`:recycle:`refactor: | 코드 리팩토링                                                                              |
| 🌱`:seedling:`add:      | 파일 추가                                                                                  |

## 11. 후기
