// JSX처럼 사용할 수 있도록 VNode 구조를 만들어주는 함수
export function createElement(type, props = {}, ...children) {
    return {
        type, // 태그 이름 (예: 'div', 'button' 등)
        props: props || {},

        // children 배열을 순회하면서 문자열은 TEXT_ELEMENT로 감싸고 나머지는 그대로 둠
        children: children.map((child) =>
            typeof child === 'object' ? child : createTextElement(child)
        ),
    };
}

// 텍스트 노드를 위한 가상 노드 생성
function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: { nodeValue: text },
        children: [], // 텍스트 노드는 자식이 없음
    };
}
