import { createElement } from './vdom/createElement.js';
import { render } from './vdom/render.js';
import { diff } from './vdom/diff.js';
import { applyPatch } from './vdom/patch.js';

// Firebase 설정
const firebaseConfig = {
    apiKey: 'YOUR_KEY',
    authDomain: 'YOUR_DOMAIN',
    databaseURL: 'https://ossmidterm-default-rtdb.firebaseio.com',
    projectId: 'ossmidterm',
    storageBucket: 'YOUR_BUCKET',
    messagingSenderId: 'YOUR_MSG_ID',
    appId: 'YOUR_APP_ID',
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const likeRef = db.ref('like');

let likeCount = 0;

//  모든 컴포넌트 저장 (동일한 상태 공유)
const components = [];

//  버튼 클릭 핸들러 (Firebase에 +1)
function handleLikeClick() {
    console.log('[🔘 Like 버튼] 클릭됨 → Firebase +1');
    likeRef.transaction((current) => (current || 0) + 1);
}

//  좋아요 컴포넌트 VNode 생성
function createVNode(count) {
    return createElement(
        'div',
        { class: 'like-card' },
        // span과 h2를 형제 요소로 만든다
        createElement('span', { class: 'like-count' }, String(count)),
        createElement('h2', null, 'people liked me 😁'),
        createElement('button', { onClick: handleLikeClick }, '❤️ Like')
    );
}

//  Firebase에서 값이 바뀔 때 전체 컴포넌트 리렌더링
likeRef.on('value', (snapshot) => {
    const newCount = snapshot.val();
    if (newCount == null) {
        likeRef.set(0);
        return;
    }

    if (newCount === likeCount) return;
    likeCount = newCount;

    const newVNode = createVNode(likeCount);
    console.log(`\n[Firebase] 전체 컴포넌트 업데이트 (${likeCount})`);

    components.forEach((comp) => {
        if (!comp.$app) {
            comp.oldVNode = newVNode;
            comp.$app = render(newVNode);
            document.getElementById(comp.mountId).appendChild(comp.$app);
        } else {
            const patchFn = diff(comp.oldVNode, newVNode);
            comp.$app = applyPatch(comp.$app, patchFn);
            comp.oldVNode = newVNode;
        }
    });
});

//  좋아요 컴포넌트 여러 개 생성 (모두 같은 상태 사용)
const NUM_COMPONENTS = 100;
for (let i = 0; i < NUM_COMPONENTS; i++) {
    const id = `component-${i}`;
    const container = document.createElement('div');
    container.id = id;
    document.getElementById('root').appendChild(container);

    components.push({
        mountId: id,
        $app: null,
        oldVNode: null,
    });
}
