import { render } from './render.js';

// 속성 변경 감지 및 패치 함수 생성
function diffProps(oldProps = {}, newProps = {}) {
    const patches = [];

    // 새 속성 중 변경된 것 추가
    Object.keys(newProps).forEach((key) => {
        if (newProps[key] !== oldProps[key]) {
            patches.push(($el) => {
                if (key.startsWith('on')) {
                    const eventType = key.slice(2).toLowerCase();
                    $el.addEventListener(eventType, newProps[key]);
                } else {
                    $el.setAttribute(key, newProps[key]);
                }
            });
        }
    });

    // 제거된 속성 처리
    Object.keys(oldProps).forEach((key) => {
        if (!(key in newProps)) {
            patches.push(($el) => {
                if (key.startsWith('on')) {
                    const eventType = key.slice(2).toLowerCase();
                    $el.removeEventListener(eventType, oldProps[key]);
                } else {
                    $el.removeAttribute(key);
                }
            });
        }
    });

    return ($el) => patches.forEach((patch) => patch($el));
}

// 자식 요소 비교
function diffChildren(oldNode, newNode) {
    const patches = [];
    const maxLen = Math.max(oldNode.children.length, newNode.children.length);

    for (let i = 0; i < maxLen; i++) {
        patches.push(diff(oldNode.children[i], newNode.children[i]));
    }

    return ($parent) => {
        [...$parent.childNodes].forEach(($child, i) => {
            patches[i]($child); // 각 자식에 patch 적용
        });

        // 새 자식이 더 많은 경우 append
        for (
            let i = $parent.childNodes.length;
            i < newNode.children.length;
            i++
        ) {
            const $new = render(newNode.children[i]);
            $parent.appendChild($new);
        }
    };
}

// 전체 노드 비교 함수
export function diff(oldNode, newNode) {
    console.log('[diff] 비교 시작:', oldNode, newNode);

    // 새 노드가 없으면 제거
    if (newNode == null) {
        return ($dom) => {
            $dom.remove();
            return undefined;
        };
    }

    // 타입이 다르면 통째로 교체
    if (oldNode?.type !== newNode.type) {
        return ($dom) => {
            const newDom = render(newNode);
            $dom.replaceWith(newDom);
            return newDom;
        };
    }

    // 텍스트 노드 비교
    if (newNode.type === 'TEXT_ELEMENT') {
        if (oldNode.props.nodeValue !== newNode.props.nodeValue) {
            return ($dom) => {
                $dom.nodeValue = newNode.props.nodeValue;
                return $dom;
            };
        }
        return ($dom) => $dom; // 변화 없으면 그대로
    }

    // 일반 노드인 경우: 속성과 자식 비교
    const patchProps = diffProps(oldNode.props, newNode.props);
    const patchChildren = diffChildren(oldNode, newNode);

    return ($dom) => {
        console.log('[patch] props 적용 시작');
        patchProps($dom);

        console.log('[patch] 자식 비교 적용 시작');
        patchChildren($dom);

        console.log('[patch] 전체 패치 완료');
        return $dom;
    };
}
