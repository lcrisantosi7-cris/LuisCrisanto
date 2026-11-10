const mq = (q) => typeof window !== 'undefined' && window.matchMedia(q).matches

export const CAN_CURSOR = mq('(hover: hover)') && !mq('(pointer: coarse)')

export const IS_LITE =
    mq('(pointer: coarse)') ||
    mq('(prefers-reduced-motion: reduce)') ||
    mq('(max-width: 767px)') ||
    (typeof navigator !== 'undefined' &&
        (navigator.connection?.saveData || (navigator.deviceMemory && navigator.deviceMemory <= 2)))