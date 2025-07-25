import { render } from './render.js';

function diffProps(oldProps = {}, newProps = {}) {
    const patches = [];

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

function diffChildren(oldNode, newNode) {
    const patches = [];

    const maxLen = Math.max(oldNode.children.length, newNode.children.length);
    for (let i = 0; i < maxLen; i++) {
        patches.push(diff(oldNode.children[i], newNode.children[i]));
    }

    return ($parent) => {
        [...$parent.childNodes].forEach(($child, i) => {
            patches[i]($child);
        });

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

export function diff(oldNode, newNode) {
    // console.log('[diff] 비교 시작:', oldNode, newNode);
    if (newNode == null) {
        return ($dom) => {
            $dom.remove();
            return undefined;
        };
    }

    if (oldNode.type !== newNode.type) {
        return ($dom) => {
            const newDom = render(newNode);
            $dom.replaceWith(newDom);
            return newDom;
        };
    }

    if (newNode.type === 'TEXT_ELEMENT') {
        if (oldNode.props.nodeValue !== newNode.props.nodeValue) {
            return ($dom) => {
                $dom.nodeValue = newNode.props.nodeValue;
                return $dom;
            };
        }

        return ($dom) => $dom; // 변경 없으면 그대로 반환
    }

    const patchProps = diffProps(oldNode.props, newNode.props);
    const patchChildren = diffChildren(oldNode, newNode);

    return ($dom) => {
        // console.log('[patch] props 적용 시작');
        patchProps($dom);
        // console.log('[patch] 자식 비교 적용 시작');
        patchChildren($dom);
        // console.log('[patch] 전체 패치 완료');
        return $dom;
    };
}
