// 실제 DOM 요소에 patch 함수 적용
export function applyPatch($parent, patchFn) {
    return patchFn($parent);
}
