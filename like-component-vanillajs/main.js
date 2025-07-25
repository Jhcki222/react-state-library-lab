// ✅ Firebase 설정
const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    databaseURL: 'https://ossmidterm-default-rtdb.firebaseio.com',
    projectId: 'ossmidterm',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const likeRef = db.ref('like');

let likeCount = 0;

/**
 * 좋아요 카드 하나 만들기
 */
function createLikeCard(id) {
    const card = document.createElement('div');
    card.className = 'like-card';
    card.id = `card-${id}`;

    const countText = document.createElement('h2');
    countText.innerHTML = `<span>${likeCount}</span> peoples liked me 😁`;

    const button = document.createElement('button');
    button.textContent = '❤️ Like';
    button.addEventListener('click', () => {
        likeRef.transaction((current) => (current || 0) + 1);
    });

    card.appendChild(countText);
    card.appendChild(button);

    return { card, countText };
}

// ✅ 여러 컴포넌트 렌더링
const root = document.getElementById('root');
const likeComponents = [];
const NUM_COMPONENTS = 6;

for (let i = 0; i < NUM_COMPONENTS; i++) {
    const { card, countText } = createLikeCard(i);
    root.appendChild(card);
    likeComponents.push(countText);
}

// ✅ 실시간 업데이트
likeRef.on('value', (snapshot) => {
    const newCount = snapshot.val() || 0;
    likeCount = newCount;
    console.log(`👍 좋아요 수 갱신됨: ${likeCount}`);

    likeComponents.forEach((el) => {
        el.querySelector('span').textContent = likeCount;
    });
});
