export function render(vNode) {
    // 텍스트 노드 처리
    if (vNode.type === 'TEXT_ELEMENT') {
        return document.createTextNode(vNode.props.nodeValue);
    }

    // 일반 요소 생성
    const $el = document.createElement(vNode.type);

    // props 설정 (이벤트 핸들러 포함)
    for (const [key, value] of Object.entries(vNode.props || {})) {
        if (key.startsWith('on')) {
            const eventType = key.slice(2).toLowerCase(); // onClick → click
            $el.addEventListener(eventType, value);
        } else {
            $el.setAttribute(key, value);
        }
    }

    // 재귀적으로 자식 요소 렌더링
    vNode.children.forEach((child) => {
        $el.appendChild(render(child));
    });

    return $el;
}
