# ✔️ Vanilla JS를 이용한 Virtual DOM 구현 및 작동 원리 탐구

> Vanilla JavaScript로 Virtual DOM을 직접 구현하고, Firebase와 연동하여 실시간으로 좋아요의 갯수의 렌더링 변화를 관찰합니다. 구현한 JS Virtual DOM, React의 Virtual DOM 및 JS Real DOM과 비교하여 성능과 렌더링 성능을 실험하고 DOM의 작동 원리를 탐구합니다.


<br/>

## 🎯 프로젝트 목적
-   DOM과 VirtualDOM의 원리를 학습합니다.
-   Virtual DOM이 실제로 어떤 방식으로 작동하는지 직접 구현을 통해 이해합니다.
-   React와 Vanilla JS 간의 웹 성능 차이를 비교해 결과를 분석합니다.
-   브라우저 엔진이 어떻게 발전해왔는지를 학습합니다.

<br/>

## 🔧 디렉토리 설명

| 구현 방식                              | 설명                                                                |
| -------------------------------------- | ------------------------------------------------------------------- |
| 1. like-component-vanillajs-virtualdom | Vanilla JS로 Virtual DOM을 구현한 Like Conunt Module   |
| 2. like-component-vanillajs            | VanillaJS 및 HTML/CSS로 Real DOM의 성능 측정을 위한 Like Conunt Module            |
| 3. like-component-react                | React로 구현한 Like Conunt Component                                    |

<br/>

## 🛠️ 코드 실행 방법 안내

### 1️⃣ 프로젝트 Clone

```
git clone https://github.com/woorifisa-service-dev-5th/tech-seminar-vanillajs-vdom.git
```

### 2️⃣ like-component-vanillajs-virtualdom

가상 DOM을 적용한 좋아요 모듈을 직접 구현하여 diff → patch 방식으로 좋아요 숫자가 존재하는 node의 요소만 변경하는 실습

```
cd like-component-vanillajs-virtualdom
npx live-server
```

### 3️⃣ like-component-vanillajs

비교 테스트를 위한 일반적인 Vanilla JS 방식으로 구성된 좋아요 모듈

```
cd like-component-vanillajs
npx live-server
```

### 4️⃣ like-component-react

비교 테스트를 위한 React.js를 활용하여 구성된 좋아요 컴포넌트

```
cd like-component-react
npm install
cp .env.example .env
npm run dev
```


---

## 🖥️ 구현 화면 : Like Count 모듈

복잡한 모듈은 오히려 테스팅 환경 통제에 영향을 준다고 생각하여 간단한 좋아요 카운팅 모듈을 구현

<br/>

<img width="800" height="500" alt="스크린샷 2025-07-28 190029" src="https://github.com/user-attachments/assets/62a2a8cb-77b7-485e-8d3e-dcfba5971088" />

---


## 📟 콘솔 로그 

|   |  |
|-------|-------|
| <img src="https://github.com/user-attachments/assets/ebe1f26a-0a09-435a-bc26-aaa30591d096" alt="스크린샷 2025-07-28 100216" width="500" /> | <img src="https://github.com/user-attachments/assets/7f0f81ed-6e82-484f-af15-3ea592ba8dea" alt="스크린샷 2025-07-28 101221" width="550" height = "700" /> |

       


- 좋아요 버튼 클릭 시, 콘솔에서 가상 DOM이 이전 노드와 새로운 노드를 비교하는 과정을 로그로 출력하였습니다. 
- 각 노드는 `{type : <tag type> , props : {children:nodeValue }}`의 형식으로 존재하며 이는 각각 JS의 객체라 할 수 있습니다.

---

## ⚙️ Virtual DOM 동작 과정

구현한 Virtual DOM은 일반적으로 다음과 같은 흐름으로 작동

<br/>

### 1️⃣ 이벤트 발생 (버튼 클릭)
- 사용자가 버튼을 클릭하면 **이벤트 핸들러**가 실행됩니다.


### 2️⃣ 상태(State) 변경
- 버튼 클릭으로 인해 데이터(상태)가 변경됩니다.
- `likeCount` 값이 **+1** 증가(이는 메모리 상의 변화)


### 3️⃣ 새로운 Virtual DOM 트리 생성
- 변경된 상태를 기반으로 **새로운 Virtual DOM(메모리상 가상 노드 트리)**이 생성됩니다.


### 4️⃣ Diff 알고리즘 실행
- 이전 Virtual DOM과 새로운 Virtual DOM을 비교(`diff`)하여 **변경된 부분만** 찾아냅니다.


### 5️⃣ Patch 단계 (실제 DOM 업데이트)
- 달라진 노드만 실제 DOM에 반영하여 **불필요한 전체 리렌더링을 방지**합니다.


---

## 📂 코드 구조

### Virtual DOM 핵심 파일

| 파일명            | 설명                                      |
|-------------------|-------------------------------------------|
| `createElement.js`| Virtual DOM Node 생성 로직                |
| `render.js`       | Virtual DOM → 실제 DOM 변환               |
| `diff.js`         | 이전 VDOM과 새로운 VDOM 비교 알고리즘(diffing) |
| `patch.js`        | diff 결과를 실제 DOM에 반영하는 패치 함수  |
| `main.js`         | Firebase 연동 및 전체 Like 모듈 렌더링 로직 |


---

## 🔎 성능 측정 결과

**LightHouse와 Developer Tools Performance로 웹 성능과 렌더링 성능 측정**  
동일한 모듈 수, 환경과 브라우저, DB를 연결하여 최대한 변인을 통제



![demo움짤](https://github.com/user-attachments/assets/ed8c35e2-a7b0-477b-8f7c-bc683a541c99)







---

### 1️⃣ **React**

| 1 | 2 | 3 |
|---|---|---|
| <img src="https://github.com/user-attachments/assets/df88b146-d33a-477b-b6c8-731d5d6cce1f" width="300"/> | <img src="https://github.com/user-attachments/assets/4f8e4636-3f65-4e5e-bb2e-a914235aa8ec" width="300"/> | <img src="https://github.com/user-attachments/assets/19d5c097-d4b6-4ffb-87aa-fc298b170391" width="300"/> |

---

### 2️⃣ **Vanilla JS + Virtual DOM**

| 1 | 2 | 3 |
|---|---|---|
| <img src="https://github.com/user-attachments/assets/70e29607-53c1-4499-ac16-a697800c3fda" width="300"/> | <img src="https://github.com/user-attachments/assets/40f4452c-e3fb-4bcf-b695-4a0e89e33256" width="300"/> | <img src="https://github.com/user-attachments/assets/cb758d7c-9838-4c20-a85c-02c935be5a36" width="300"/> |

---

### 3️⃣ **Vanilla JS (Real DOM)**

| 1 | 2 | 3 |
|---|---|---|
| <img src="https://github.com/user-attachments/assets/875dcb46-c4f1-446c-9b5f-8e969dd0bb27" width="300"/> | <img src="https://github.com/user-attachments/assets/a3fd8794-17ca-454a-b082-7d71741c89c8" width="300"/> | <img src="https://github.com/user-attachments/assets/4bbb5907-471a-4f65-a9d2-e410dd44af69" width="300"/> |

---



## 📊 결과 분석

### 💡Lighthouse 성능 비교 결과
 
*(테스트 환경: Chrome 138, 환경 동일 조건)*


### 1️⃣ **종합 점수(평균값)**

| 지표 (점수)              | React | VanillaJS (Virtual DOM) | VanillaJS (Real DOM) |
|--------------------------|-------|-------------------------|----------------------|
| **Performance**          | 88    | 98                      | 99                   |
| **Accessibility**        | 90    | 88                      | 88                   |
| **Best Practices**       | 100   | 93                      | 93                  |
| **SEO**                  | 82    | 90                      | 100                   |


### 2️⃣ **세부 성능 지표(평균값)**

| 지표 (측정값)                      | React   | VanillaJS (Virtual DOM) | VanillaJS (Real DOM) |
|-----------------------------------|---------|-------------------------|----------------------|
| **First Contentful Paint (FCP)**  | 1.1s    | 0.7s                    | 0.6s                 |
| **Largest Contentful Paint (LCP)**| 1.8s    | 0.8s                    | 0.7s                 |
| **Total Blocking Time (TBT)**     | 140ms   | 60ms                    | 55ms                 |
| **Cumulative Layout Shift (CLS)** | 0.001   | 0.001                   | 0.001                |
| **Speed Index (SI)**              | 1.1s    | 0.7s                    | 0.7s                 |

---

### ✅ 결과 분석

- **Vanilla JS 기반 모듈**이 React보다 **빠른 초기 로딩 속도**와 **낮은 TBT**을 보임.
- React는 **JS 파싱 및 번들 로딩 시간** 때문에 TTI와 TBT가 상대적으로 느림.
- Virtual DOM 사용 시 Real DOM 대비 **큰 차이는 없지만**, DOM 업데이트를 최소화하여 CPU 연산 부담을 줄이는 효과가 있음.

---

### 🪫Chrome DevTools Performance 성능 비교 결과

### 1️⃣ 총 소요시간(평균값)

| 모듈                     | 실행 시간  | 설명                                                                 |
|--------------------------|-----------|----------------------------------------------------------------------|
| **React**                | 약 **1.5s** | Vanilla JS보다 약 2배 소요 |
| **VanillaJS**            | 약 **780ms**  | 순수 DOM 조작만 있으므로 최소한의 JS만 실행.                         |
| **VanillaJS Virtual DOM**| 약 **710ms**  | Real DOM Vanilla JS와 근소한 차이 |

<br/>

### 2️⃣ Scripting(평균값)

| 모듈                     | 실행 시간  | 설명                                                                 |
|--------------------------|-----------|----------------------------------------------------------------------|
| **React**                | 약 **380ms** | JS번들링, Props 처리, 이벤트 바인딩, 재조정 등 다양한 내부 작업 포함. |
| **VanillaJS**            | 약 **50ms**  | 직접적인 DOM 조작만 있으므로 최소한의 JS만 실행, 코드의 양이 절대적으로 적음                         |
| **VanillaJS Virtual DOM**| 약 **70ms**  | diff, patch 로직 포함 → Vanilla보다 약간 높지만 여전히 빠른 실행시간. |

<br/>

### 3️⃣ Rendering/Paint (평균값)

- **React**: 약 **70ms**
- **VanillaJS**: 약 **80ms**
- **JS Virtual DOM**: 약 **50ms**

> ⚡ **diff 알고리즘으로 바뀐 node만 계산 → 미비하지만 실제로 렌더링 시간 감소에 도움이 된다는 결론**

### 📈Graph
<img width="800" height="700" alt="Performance결과그래프" src="https://github.com/user-attachments/assets/4fcdd72c-61a2-4e93-959b-bcf367c92892" />

---

## ✅ 결론

- 브라우저 자체의 렌더링 엔진이 최적화가 잘 되어 있어, 작은 규모 앱에서는 Virtual DOM 이점이 크지 않았다.<br/>
- 결국 **DOM 엔진의 고도화, 고성능 DOM API의 등장 그리고 하드웨어 성능의 비약적인 향상**이 React보다 Vanilla JS의 성능이 높은데 기여했다고 생각.<br/>
- React는 부가적인 라이브러리 코드와 상태 관리 로직/훅으로 JS 실행 시간 당연히 늘어날 수 있음.<br/>
- 다만, Virtual DOM이 어떻게 구성되고 작동하는지 코드와 결과값으로 직접 체감할 수 있었으며, **프로젝트의 규모에 따라 적절히 JS와 Framework/Library를 선택하는 능력이 중요하다고 생각.**

---
## 🏆[Woori FIS Academy 5th Cloud Service : Frontend Seminar] 2등
