import { createElement } from './vdom/createElement.js';
import { render } from './vdom/render.js';
import { diff } from './vdom/diff.js';
import { applyPatch } from './vdom/patch.js';

// ✅ Firebase 설정
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

// ✅ 공유 상태
let likeCount = 0;

// ✅ 컴포넌트 목록 저장
const components = []; // [{ mountId, $app, oldVNode }, ...]

function handleLikeClick() {
    // console.log('[🔘 Like 버튼] 클릭됨 → Firebase +1');
    likeRef.transaction((current) => (current || 0) + 1);
}

// ✅ VNode 생성 함수
function createVNode(count) {
    return createElement(
        'div',
        { class: 'like-card' },
        createElement('h2', null, `${count} people liked me 😁`),
        createElement('button', { onClick: handleLikeClick }, '❤️ Like')
    );
}

// ✅ Firebase 실시간 감지 → 모든 컴포넌트 업데이트
likeRef.on('value', (snapshot) => {
    const newCount = snapshot.val();
    if (newCount == null) {
        likeRef.set(0);
        return;
    }

    // 값이 안 바뀌었으면 skip
    if (newCount === likeCount) return;
    likeCount = newCount;

    const newVNode = createVNode(likeCount);
    // console.log(`\n[🔥 Firebase] 전체 컴포넌트 업데이트 (${likeCount})`);

    // 모든 컴포넌트 diff & patch
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

// ✅ 여러 개의 컴포넌트 생성 (모두 같은 상태 공유)
const NUM_COMPONENTS = 999;
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
