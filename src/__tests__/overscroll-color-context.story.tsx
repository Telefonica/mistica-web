import * as React from 'react';
import {OverscrollColorProvider} from '../overscroll-color-context';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from '../test-utils/theme';

const DummyComponent = ({onMount}: {onMount: () => void}) => {
    React.useEffect(onMount, [onMount]);
    return <span>dummy component</span>;
};
export const ChildrenMounts = (): JSX.Element => {
    const [mounts, setMounts] = React.useState(0);
    const onMount = React.useCallback(() => setMounts((count) => count + 1), []);
    return (
        <ThemeContextProvider
            theme={makeTheme({platformOverrides: {platform: 'ios', insideNovumNativeApp: true}})}
        >
            <OverscrollColorProvider>
                <DummyComponent onMount={onMount} />
            </OverscrollColorProvider>
            <input type="hidden" data-testid="mounts" value={mounts} />
        </ThemeContextProvider>
    );
};
