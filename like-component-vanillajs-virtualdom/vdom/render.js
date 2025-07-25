export function render(vNode) {
    if (vNode.type === 'TEXT_ELEMENT') {
        return document.createTextNode(vNode.props.nodeValue);
    }

    const $el = document.createElement(vNode.type);

    for (const [key, value] of Object.entries(vNode.props || {})) {
        if (key.startsWith('on')) {
            const eventType = key.slice(2).toLowerCase();
            $el.addEventListener(eventType, value);
        } else {
            $el.setAttribute(key, value);
        }
    }

    vNode.children.forEach((child) => {
        $el.appendChild(render(child));
    });

    return $el;
}
