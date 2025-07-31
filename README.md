# ✔️ Vanilla JS를 이용한 Virtual DOM 구현 및 작동 원리 탐구

> Vanilla JavaScript로 Virtual DOM을 직접 구현하고, Firebase와 연동하여 실시간으로 좋아요의 갯수의 렌더링 변화를 관찰합니다. 구현한 JS Virtual DOM, React의 Virtual DOM 및 JS Real DOM과 비교하여 성능과 렌더링 효율성을 실험하고 DOM의 작동 원리를 탐구합니다.

---

## ✨ 프로젝트 목적

-   DOM과 VirtualDOM의 원리를 학습합니다.
-   Virtual DOM이 실제로 어떤 방식으로 작동하는지 직접 구현을 통해 이해합니다.
-   React와 Vanilla JS 간의 웹 성능 차이를 비교해 결과를 분석합니다.
-   브라우저의 렌더링 기술이 어떻게 발전해왔는지를 학습합니다.

---

## 🔧 디렉토리 설명

| 구현 방식                              | 설명                                                                |
| -------------------------------------- | ------------------------------------------------------------------- |
| 1. like-component-vanillajs-virtualdom | 가상 DOM을 직접 구현하고 `diff → patch`를 통해 좋아요 컴포넌트 조작 |
| 2. like-component-vanillajs            | VanillaJS 및 HTML로 Real DOM을 통한 좋아요 컴포넌트 구현            |
| 3. like-component-react                | React로 좋아요 컴포넌트 구현                                        |

---

## 🛠️ 코드 실행 방법 안내

### 0. 프로젝트 Clone

```
git clone https://github.com/woorifisa-service-dev-5th/tech-seminar-vanillajs-vdom.git
```

### 1. like-component-vanillajs-virtualdom

가상 DOM을 직접 구현하여 diff → patch 방식으로 좋아요 숫자가 존재하는 `<span>` 요소만 변경하는 최적화 실습

```
cd like-component-vanillajs-virtualdom
npx live-server
```

### 2. like-component-vanillajs

일반적인 HTML + JavaScript (Vanilla JS) 방식으로 구성된 좋아요 컴포넌트

```
cd like-component-vanillajs
npx live-server
```

### 3. like-component-react

React를 활용하여 좋아요 컴포넌트를 작성

```
cd like-component-react
npm install
cp .env.example .env
npm run dev
```

---

## [Woori FIS Academy 5th Frontend Seminar]
