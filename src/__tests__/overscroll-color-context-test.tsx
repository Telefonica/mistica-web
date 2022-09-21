import * as React from 'react';
import {OverscrollColorProvider} from '../overscroll-color-context';
import {render} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import * as platform from '../utils/platform';

const resizeWindow = (x: number, y: number) => {
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event('resize'));
};

const DummyComponent = ({callback}: {callback: jest.Mock}) => {
    React.useEffect(() => {
        callback();
    }, [callback]);

    return <span>dummy component</span>;
};

test('overscroll does not cause a remount of its children', async () => {
    resizeWindow(640, 480);

    jest.spyOn(platform, 'getPlatform').mockReturnValue('ios');
    const theme = makeTheme();

    const callbackSpy = jest.fn();

    render(
        <ThemeContextProvider
            theme={{
                ...theme,
                platformOverrides: {
                    ...theme.platformOverrides,
                    platform: 'ios',
                    insideNovumNativeApp: true,
                },
            }}
        >
            <OverscrollColorProvider>
                <DummyComponent callback={callbackSpy} />
            </OverscrollColorProvider>
        </ThemeContextProvider>
    );

    expect(callbackSpy).toHaveBeenCalledTimes(1);
});
