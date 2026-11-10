import * as React from 'react';
import {IconButton, ToggleIconButton} from '../icon-button';
import IconLightningRegular from '../generated/mistica-icons/icon-lightning-regular';
import IconPauseFilled from '../generated/mistica-icons/icon-pause-filled';
import IconPlayFilled from '../generated/mistica-icons/icon-play-filled';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from '../test-utils/theme';

import type {TouchableElement} from '../touchable';
import type {TrackingEvent} from '../utils/types';

export const Accessible = (): JSX.Element => (
    <IconButton Icon={IconLightningRegular} aria-label="icon-button" onPress={() => {}} />
);
const Link = () => <>(Link Component)</>;
export const CustomLink = (): JSX.Element => (
    <ThemeContextProvider theme={makeTheme({Link})}>
        <IconButton Icon={IconLightningRegular} aria-label="icon-button" to="/test" />
    </ThemeContextProvider>
);
export const Anchor = (): JSX.Element => (
    <IconButton Icon={IconLightningRegular} aria-label="icon-button" to="/test" />
);
export const Tracking = (): JSX.Element => {
    const [events, setEvents] = React.useState<Array<TrackingEvent>>([]);
    return (
        <ThemeContextProvider
            theme={makeTheme({
                analytics: {logEvent: async (event) => setEvents((events) => [...events, event])},
            })}
        >
            <IconButton
                Icon={IconLightningRegular}
                trackingEvent={{category: 'someCategory', action: 'someAction', label: 'someLabel'}}
                onPress={() => {}}
                aria-label="icon-button"
            />
            <input type="hidden" data-testid="events" value={JSON.stringify(events)} />
        </ThemeContextProvider>
    );
};
export const Refs = (): JSX.Element => {
    const onPress = React.useRef<TouchableElement>(null);
    const href = React.useRef<TouchableElement>(null);
    const to = React.useRef<TouchableElement>(null);
    const [tags, setTags] = React.useState<unknown>();
    React.useEffect(() => {
        setTags([onPress, href, to].map((ref) => ref.current?.tagName));
    }, []);
    return (
        <>
            <IconButton
                Icon={IconLightningRegular}
                aria-label="icon-button"
                ref={onPress}
                onPress={() => {}}
            />
            <IconButton Icon={IconLightningRegular} aria-label="icon-button" ref={href} href="/" />
            <IconButton Icon={IconLightningRegular} aria-label="icon-button" ref={to} to="/" />
            <input type="hidden" data-testid="refs" value={JSON.stringify(tags) ?? ''} />
        </>
    );
};
export const Toggle = ({
    controlled = false,
    delay = 0,
}: {
    controlled?: boolean;
    delay?: number;
}): JSX.Element => {
    const [checked, setChecked] = React.useState(false);
    const [calls, setCalls] = React.useState(0);
    return (
        <>
            <ToggleIconButton
                checkedProps={{Icon: IconPauseFilled, 'aria-label': 'checked-icon-button'}}
                uncheckedProps={{Icon: IconPlayFilled, 'aria-label': 'unchecked-icon-button'}}
                checked={controlled ? checked : undefined}
                onChange={async (value) => {
                    setCalls((count) => count + 1);
                    if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
                    setChecked(value);
                }}
            />
            <input type="hidden" data-testid="calls" value={calls} />
        </>
    );
};
