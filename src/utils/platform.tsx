import {isWebViewBridgeAvailable} from '@tef-novum/webview-bridge';

import type {Theme} from '../theme';

const getUserAgent = (platformOverrides: Theme['platformOverrides'] = {}): string => {
    if (typeof self === 'undefined') {
        return platformOverrides.userAgent ?? '';
    }
    return self.navigator?.userAgent ?? '';
};

export const isInsideNovumNativeApp = (platformOverrides: Theme['platformOverrides'] = {}): boolean => {
    if (typeof platformOverrides.insideNovumNativeApp !== 'undefined') {
        return platformOverrides.insideNovumNativeApp;
    }
    return isWebViewBridgeAvailable();
};

export const isRunningAcceptanceTest = (platformOverrides: Theme['platformOverrides'] = {}): boolean =>
    getUserAgent(platformOverrides).includes('acceptance-test') && !process.env.SSR_TEST;

const isEdgeOrIE = Boolean(typeof self !== 'undefined' && (self as any).MSStream);

export const isAndroid = (platformOverrides: Theme['platformOverrides']): boolean =>
    getUserAgent(platformOverrides).toLowerCase().includes('android') && !isEdgeOrIE;

export const isIos = (platformOverrides: Theme['platformOverrides']): boolean => {
    // IE and Edge mobile browsers includes Android and iPhone in the user agent
    if (/iPad|iPhone|iPod/.test(getUserAgent(platformOverrides)) && !isEdgeOrIE) {
        return true;
    }

    // In iOS13, iPad uses the Mac OS user-agent, but we know it's an iOS device when it runs inside our
    // native app and is not Android
    if (isInsideNovumNativeApp(platformOverrides) && !isAndroid(platformOverrides)) {
        return true;
    }

    return false;
};

/**
 * Returns true if the browser is a safari browser:
 * webview, mobile, desktop or a browser like Chrome for iOS which is just a safari with a skin
 *
 * Note that this function checks the navigator vendor. It doesn't use platformOverrides or userAgent.
 */
export const isSafari = (): boolean => {
    return navigator.vendor.includes('Apple');
};

export const isFirefox = (platformOverrides?: Theme['platformOverrides']): boolean =>
    !!getUserAgent(platformOverrides).match(/Firefox\/([0-9]+)\./);

export const isChrome = (platformOverrides: Theme['platformOverrides']): boolean =>
    !!getUserAgent(platformOverrides).match(/Chrom(e|ium)\/([0-9]+)\./);

const SEMVER_ZERO = '0.0.0';
export const getIosVersion = (platformOverrides: Theme['platformOverrides']): string => {
    if (!isIos(platformOverrides)) {
        return SEMVER_ZERO;
    }
    const raw = getUserAgent(platformOverrides).match(/OS ((\d+_?){1,3})[\s_]/);
    if (!raw || !raw[1]) {
        return SEMVER_ZERO;
    }
    const [major, minor = '0', patch = '0'] = raw[1].split('_');
    return [major, minor, patch].join('.');
};

export const getPlatform = (
    platformOverrides: Theme['platformOverrides'] = {}
): 'ios' | 'android' | 'desktop' => {
    const overridenPlatform = platformOverrides.platform;
    if (overridenPlatform) {
        return overridenPlatform;
    }
    if (isIos(platformOverrides)) {
        return 'ios';
    }
    if (isAndroid(platformOverrides)) {
        return 'android';
    }
    return 'desktop';
};
