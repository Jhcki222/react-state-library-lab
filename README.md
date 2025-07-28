# 🧪 [Woori FIS Academy 5th Frontend Seminar] Virtual DOM vs Real DOM

> Vanilla JavaScript로 Virtual DOM을 직접 구현하고, Firebase와 연동하여 실시간 좋아요의 상태 관리를 수행합니다. 구현한 Virtual DOM, React의 Virtual DOM 및 HTML 기반 Real DOM과 비교하여 성능과 렌더링 효율성을 실험하고 DOM의 작동 원리를 탐구합니다.

---

## ✨ 프로젝트 목적

-   Virtual DOM이 실제로 어떤 방식으로 작동하는지 직접 구현을 통해 이해합니다.
-   React와 Vanilla JS 간의 렌더링 차이를 비교해 성능적 이점을 분석합니다.
-   Firebase Realtime Database를 통해 다수의 컴포넌트가 공유 상태를 가지는 구조를 실험합니다.
-   브라우저의 렌더링 기술이 어떻게 발전해왔는지를 학습합니다.

---

## 🔧 디렉토리 설명

| 구현 방식                              | 설명                                                                |
| -------------------------------------- | ------------------------------------------------------------------- |
| ✅ like-component-vanillajs-virtualdom | 가상 DOM을 직접 구현하고 `diff → patch`를 통해 좋아요 컴포넌트 조작 |
| ✅ like-component-vanillajs            | VanillaJS 및 HTML로 Real DOM을 통한 좋아요 컴포넌트 구현            |
| ✅ like-component-react                | React로 좋아요 컴포넌트 구현                                        |

---

## 👥 협업 가이드: Fork & PR로 참여하기

[Fork & PR 가이드](https://seungwubaek.github.io/tools/git/contributing_using_pull_request/)

이 프로젝트는 원본 레포지토리인 [`Jhcki222/react-state-library-lab`](https://github.com/Jhcki222/react-state-library-lab)에서 관리됩니다.  
팀원은 Fork → 작업 → PR 방식으로 협업합니다.

---

### ✅ 1. 레포지토리 Fork

1. 아래 원본 레포지토리 접속  
   👉 https://github.com/Jhcki222/react-state-library-lab
2. 우측 상단의 ⭐ `Fork` 버튼 클릭
3. 본인 GitHub 계정으로 Fork된 복제본 생성

---

### ✅ 2. 로컬에 클론

터미널에서 아래 명령어 입력:

# 본인 GitHub 계정에서 Fork된 레포지토리 주소 사용

git clone https://github.com/your-username/react-state-library-lab.git

<br/>
cd react-state-library-lab

---

### ✅ 3. 브랜치 생성 후 작업

작업 전, 브랜치를 만들어주세요.

# 브랜치 이름 예시: feature/recoil-username

git checkout -b feature/context-yourname
코드 수정, 예제 추가 등 작업을 자유롭게 진행하세요.

---

### ✅ 4. 커밋 & 푸시

git add .
git commit -m "✨ Context API 실습 추가 by yourname"
git push origin feature/context-yourname

---

### ✅ 5. Pull Request 생성

GitHub 본인 레포로 접속

"Compare & pull request" 버튼 클릭

다음 기준으로 PR 작성:

base repository: Jhcki222/react-state-library-lab

base: main

head repository: your-username/react-state-library-lab

compare: feature/브랜치명

PR 제목 및 설명 작성 후 제출

---

### ✅ 6. PR 리뷰 및 병합

PR이 승인되면 원본 레포지토리에 병합됩니다.
