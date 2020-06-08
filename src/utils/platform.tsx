import {isWebViewBridgeAvailable} from '@tef-novum/webview-bridge';

const getUserAgent = (): string => self.navigator.userAgent || '';

type PlatformOverrides = {
    platform?: 'ios' | 'android';
    insideNovumNativeApp?: boolean;
};

export const isInsideNovumNativeApp = (platformOverrides?: PlatformOverrides): boolean => {
    if (typeof platformOverrides?.insideNovumNativeApp !== 'undefined') {
        return platformOverrides.insideNovumNativeApp;
    }
    return isWebViewBridgeAvailable();
};

export const isRunningAcceptanceTest = (): boolean => getUserAgent().includes('acceptance-test');

const isEdgeOrIE = Boolean(typeof self !== 'undefined' && self.MSStream);

export const isAndroid = (): boolean => getUserAgent().toLowerCase().includes('android') && !isEdgeOrIE;

export const isIos = (): boolean => {
    // IE and Edge mobile browsers includes Android and iPhone in the user agent
    if (/iPad|iPhone|iPod/.test(getUserAgent()) && !isEdgeOrIE) {
        return true;
    }

    // In iOS13, iPad uses the Mac OS user-agent, but we know it's an iOS device when it runs inside our
    // native app and is not Android
    if (isInsideNovumNativeApp() && !isAndroid()) {
        return true;
    }

    return false;
};

export const isChrome = (): boolean => !!getUserAgent().match(/Chrom(e|ium)\/([0-9]+)\./);

const MODERN_CHROME_VERSION = 44;

export const isOldChrome = (): boolean => {
    const matches = getUserAgent().match(/Chrome\/(\d+)/);

    if (!matches || !matches[1]) {
        // not Chrome
        return false;
    }

    const version = Number(matches[1]);

    return version < MODERN_CHROME_VERSION;
};

const SEMVER_ZERO = '0.0.0';
export const getIosVersion = (): string => {
    if (!isIos()) {
        return SEMVER_ZERO;
    }
    const raw = getUserAgent().match(/OS ((\d+_?){1,3})[\s_]/);
    if (!raw || !raw[1]) {
        return SEMVER_ZERO;
    }
    const [major, minor = '0', patch = '0'] = raw[1].split('_');
    return [major, minor, patch].join('.');
};

export const getPlatform = (platformOverrides?: PlatformOverrides): 'ios' | 'android' => {
    const overridenPlatform = platformOverrides?.platform;
    if (overridenPlatform) {
        return overridenPlatform;
    }
    return isIos() ? 'ios' : 'android';
};
