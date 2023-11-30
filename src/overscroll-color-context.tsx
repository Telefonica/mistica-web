'use client';
import * as React from 'react';
import {useThemeVariant} from './theme-variant-context';
import {useTheme, useScreenSize} from './hooks';
import {createNestableContext} from './nestable-context';
import {isInsideNovumNativeApp, getPlatform} from './utils/platform';
import {vars} from './skins/skin-contract.css';

import type {Variant} from './theme-variant-context';
import type {Theme} from './theme';

const {Provider, Getter, useSetValue} = createNestableContext('');

const shouldRender = (platformOverrides: Theme['platformOverrides']) =>
    getPlatform(platformOverrides) === 'ios';

type ProviderProps = {children: React.ReactNode};

export const OverscrollColorProvider = ({children}: ProviderProps): JSX.Element => {
    const {platformOverrides} = useTheme();
    const {isTabletOrSmaller} = useScreenSize();
    const theme = useTheme();

    if (!shouldRender(platformOverrides)) {
        return <>{children}</>;
    }

    return (
        <Provider>
            <Getter>
                {(color) => (
                    <>
                        {isTabletOrSmaller ? (
                            <div
                                style={{
                                    position: 'absolute',
                                    zIndex: 1,
                                    background: color || vars.colors.background,
                                    width: '100%',
                                    height:
                                        500 +
                                        (isInsideNovumNativeApp(platformOverrides)
                                            ? 0
                                            : theme.dimensions.headerMobileHeight || 0),
                                    left: 0,
                                    marginTop: -500,
                                    transform: 'translate3d(0,0,0)',
                                }}
                            />
                        ) : null}
                        {children}
                    </>
                )}
            </Getter>
        </Provider>
    );
};

const getColorFromVariant = (themeVariant: Variant): string => {
    switch (themeVariant) {
        case 'default':
            return vars.colors.background;
        case 'alternative':
            return vars.colors.backgroundAlternative;
        case 'inverse':
            return vars.colors.backgroundBrand;
        default:
            const exhaustiveCheck: never = themeVariant;
            throw new Error(`Invalid variant: ${exhaustiveCheck}`);
    }
};

const OverscrollColorComponent = () => {
    const variant = useThemeVariant();
    useSetValue(getColorFromVariant(variant));

    return null;
};

const OverscrollColor = (): JSX.Element =>
    shouldRender(useTheme().platformOverrides) ? <OverscrollColorComponent /> : <></>;

export default OverscrollColor;
