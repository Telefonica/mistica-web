import {isWebViewBridgeAvailable} from '@tef-novum/webview-bridge';

import type {Theme} from '../theme';

const getUserAgent = (platformOverrides: Theme['platformOverrides'] = {}): string => {
    if (typeof self === 'undefined') {
        return platformOverrides.userAgent ?? '';
    }
    return self.navigator?.userAgent ?? '';
};

export const isInsideNovumNativeApp = (platformOverrides: Theme['platformOverrides']): boolean => {
    if (typeof platformOverrides.insideNovumNativeApp !== 'undefined') {
        return platformOverrides.insideNovumNativeApp;
    }
    return isWebViewBridgeAvailable();
};

export const isRunningAcceptanceTest = (platformOverrides: Theme['platformOverrides']): boolean =>
    getUserAgent(platformOverrides).includes('acceptance-test');

const isEdgeOrIE = Boolean(typeof self !== 'undefined' && self.MSStream);

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

export const isFirefox = (platformOverrides?: Theme['platformOverrides']): boolean =>
    !!getUserAgent(platformOverrides).match(/Firefox\/([0-9]+)\./);

export const isChrome = (platformOverrides: Theme['platformOverrides']): boolean =>
    !!getUserAgent(platformOverrides).match(/Chrom(e|ium)\/([0-9]+)\./);

const MODERN_CHROME_VERSION = 44;

export const isOldChrome = (platformOverrides: Theme['platformOverrides']): boolean => {
    const matches = getUserAgent(platformOverrides).match(/Chrome\/(\d+)/);

    if (!matches || !matches[1]) {
        // not Chrome
        return false;
    }

    const version = Number(matches[1]);

    return version < MODERN_CHROME_VERSION;
};

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

export const getPlatform = (platformOverrides: Theme['platformOverrides']): 'ios' | 'android' => {
    const overridenPlatform = platformOverrides.platform;
    if (overridenPlatform) {
        return overridenPlatform;
    }
    return isIos(platformOverrides) ? 'ios' : 'android';
};
