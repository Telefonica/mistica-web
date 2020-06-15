// @flow
import * as React from 'react';
import {useIsInverseVariant} from './theme-variant-context';
import {useTheme, useScreenSize} from './hooks';
import createContext from './nestable-context';
import {isInsideNovumNativeApp, getPlatform} from './utils/platform';

const {Provider, Getter, useSetValue} = createContext<string>('');

const shouldRender = getPlatform() === 'ios';

type ProviderProps = {children: React.Node};

const OverscrollColorProviderNoOp = ({children}: ProviderProps) => children || null;

const OverscrollColorProviderComponent = ({children}: ProviderProps) => {
    const {platformOverrides} = useTheme();
    const {isMobile} = useScreenSize();
    const theme = useTheme();
    return isMobile ? (
        <Provider>
            <Getter>
                {(color) => (
                    <>
                        <div
                            style={{
                                position: 'absolute',
                                zIndex: 1,
                                background: color || theme.colors.background,
                                width: '100%',
                                height:
                                    500 +
                                    (isInsideNovumNativeApp(platformOverrides)
                                        ? 0
                                        : theme.dimensions.headerMobileHeight),
                                left: 0,
                                marginTop: -500,
                                transform: 'translate3d(0,0,0)',
                            }}
                        />
                        {children}
                    </>
                )}
            </Getter>
        </Provider>
    ) : (
        children
    );
};

export const OverscrollColorProvider: (ProviderProps) => React.Node = shouldRender
    ? OverscrollColorProviderComponent
    : OverscrollColorProviderNoOp;

const OverscrollColorComponent = () => {
    const isInverseVariant = useIsInverseVariant();
    const theme = useTheme();
    useSetValue(isInverseVariant ? theme.colors.overscrollColorTop : theme.colors.background);

    return null;
};

const OverscrollColorNoOp = () => null;

const OverscrollColor: () => null = shouldRender ? OverscrollColorComponent : OverscrollColorNoOp;

export default OverscrollColor;
