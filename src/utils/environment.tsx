export const isServerSide = (): boolean => typeof window === 'undefined';

export const isClientSide = (): boolean => !isServerSide();

export const isTouchableDevice = (): boolean =>
    isClientSide() ? window.matchMedia('(pointer: coarse)').matches : false;
