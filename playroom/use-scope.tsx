import * as React from 'react';
import {useScreenSize, useTheme} from '../src';
import curry from 'lodash/curry';

import type {Colors} from '../src/skins/types';
import type {Theme} from '../src/theme';

/**
 * borrowed from:
 * https://github.com/seek-oss/braid-design-system/blob/master/lib/playroom/usePlayroomState.ts
 */
const usePlayroomState = () => {
    const [store, setStore] = React.useState(new Map<string, any>());

    const getState = (key: string, defaultValue?: any) => store.get(key) ?? defaultValue;

    const setState = curry((key: string, value: any) => {
        let actualValue = value;

        if (typeof value === 'object' && value !== null && 'currentTarget' in value) {
            const {currentTarget} = value;
            actualValue = currentTarget.type === 'checkbox' ? currentTarget.checked : currentTarget.value;
        }

        setStore(new Map(store.set(key, actualValue)));
    });

    const resetState = (...keys: string[]) => {
        if (keys.length) {
            keys.forEach((key) => {
                store.delete(key);
            });
            setStore(new Map(store));
        } else {
            setStore(new Map());
        }
    };

    return {
        getState,
        setState,
        resetState,
    };
};

const useScope = (): {theme: Theme; colors: Colors} => {
    const theme = useTheme();
    const screenSize = useScreenSize();
    const playroomState = usePlayroomState();

    return {
        theme,
        colors: theme.colors,
        ...playroomState,
        ...screenSize,
    };
};

export default useScope;
