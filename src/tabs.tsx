import * as React from 'react';
import classnames from 'classnames';
import {createUseStyles} from './jss';
import Touchable from './touchable';
import ResponsiveLayout from './responsive-layout';
import {useAriaId, useElementDimensions} from './hooks';
import {Text3} from './text';
import {pxToRem} from './utils/css';

import type {TrackingEvent} from './utils/types';
import {isRunningAcceptanceTest} from './utils/platform';

const TAB_MAX_WIDTH = 284;
const TAB_HEIGHT = 56;
const LINE_ANIMATION_DURATION_MS = isRunningAcceptanceTest() ? 0 : 300;

const useStyles = createUseStyles(({colors, mq}) => ({
    outerBorder: {
        borderBottom: `1px solid ${colors.divider}`,
    },
    outer: {
        height: TAB_HEIGHT,
        position: 'relative',
        overflow: 'hidden',
        [mq.tabletOrSmaller]: {
            display: 'flex',
        },
    },
    inner: {
        position: 'absolute',
        left: 0,
        right: 0,
        // if tabs don't fit horizontally they can be scrolled
        overflowX: 'scroll',
        // this height is to hide the scrollbar
        height: 80,
        overflowY: 'hidden',
    },
    tabsContainer: {
        height: TAB_HEIGHT,
        display: 'flex',
    },
    tab: {
        flex: '1 0 80px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        verticalAlign: 'baseline',
        height: TAB_HEIGHT,
        textAlign: 'center',
        color: colors.textSecondary,
        borderBottom: '2px solid transparent',
        maxWidth: ({numTabs}) => {
            if (numTabs === 2) {
                return `max(50%, ${TAB_MAX_WIDTH}px)`;
            } else if (numTabs === 3) {
                return `max(33.33%, ${TAB_MAX_WIDTH}px)`;
            }
            return TAB_MAX_WIDTH;
        },
        [mq.supportsHover]: {
            '&:hover': {
                color: colors.textPrimary,
            },
        },
        fallbacks: {
            maxWidth: TAB_MAX_WIDTH, // max() is not supported by all browsers
        },
        [mq.desktopOrBigger]: {
            flex: '0 1 208px',
            padding: `16px 32px`,
            maxWidth: TAB_MAX_WIDTH,
        },
    },
    tabWithIcon: {
        flexBasis: 112,
        [mq.desktopOrBigger]: {
            flexBasis: 208,
        },
    },
    tabSelected: {
        color: colors.textPrimary,
        borderBottom: ({isAnimating}) =>
            isAnimating ? '2px solid transparent' : `2px solid ${colors.controlActivated}`,
    },
    icon: {
        marginRight: 8,
        height: pxToRem(24),
        width: pxToRem(24),
    },
    animatedLine: {
        display: 'none', // will be overriden by inline styles in animateLine function
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: 2,
        background: colors.controlActivated,
    },
}));

export type TabsProps = {
    selectedIndex: number;
    onChange: (selectedIndex: number) => void;
    tabs: ReadonlyArray<{
        readonly text: string;
        readonly trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
        readonly icon?: React.ReactNode;
        readonly 'aria-controls'?: string;
    }>;
    children?: void;
};

const Tabs: React.FC<TabsProps> = ({selectedIndex, onChange, tabs}: TabsProps) => {
    const id = useAriaId();
    const {width, ref} = useElementDimensions();
    const animatedLineRef = React.useRef<HTMLDivElement>(null);
    const scrollableContainerRef = React.useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const classes = useStyles({width, numTabs: tabs.length, isAnimating});

    const animateLine = (fromIndex: number, toIndex: number) => {
        const tabFrom = document.querySelector<HTMLElement>(`#${id} [data-tabindex="${fromIndex}"]`);
        const tabTo = document.querySelector<HTMLElement>(`#${id} [data-tabindex="${toIndex}"]`);
        const line = animatedLineRef.current;
        const scrollable = scrollableContainerRef.current;
        if (tabFrom && tabTo && line && scrollable) {
            setIsAnimating(true);
            // set initial line styles
            line.style.display = 'block';
            line.style.width = `${tabFrom.offsetWidth}px`;
            line.style.transform = `translate(${tabFrom.offsetLeft - scrollable.scrollLeft}px, 0)`;
            Promise.resolve().then(() => {
                // set final line styles
                line.style.width = `${tabTo.offsetWidth}px`;
                line.style.transform = `translate(${tabTo.offsetLeft - scrollable.scrollLeft}px, 0)`;
                line.style.transition = `transform ${LINE_ANIMATION_DURATION_MS}ms, width ${LINE_ANIMATION_DURATION_MS}ms`;
            });
            setTimeout(() => {
                // hide line
                line.style.transition = '';
                line.style.display = 'none';
                setIsAnimating(false);
            }, LINE_ANIMATION_DURATION_MS);
        }
    };

    return (
        <div id={id} role="tablist" ref={ref} className={classes.outerBorder}>
            <ResponsiveLayout fullWidth>
                <div className={classes.outer}>
                    <div ref={scrollableContainerRef} className={classes.inner}>
                        <div className={classes.tabsContainer}>
                            {tabs.map(({text, trackingEvent, icon, 'aria-controls': ariaControls}, index) => {
                                const isSelected = index === selectedIndex;
                                return (
                                    <Touchable
                                        dataAttributes={{tabindex: index}}
                                        key={index}
                                        className={classnames(
                                            classes.tab,
                                            isSelected && classes.tabSelected,
                                            icon && classes.tabWithIcon
                                        )}
                                        disabled={isSelected}
                                        onPress={() => {
                                            if (!isAnimating && selectedIndex !== index) {
                                                onChange(index);
                                                animateLine(selectedIndex, index);
                                            }
                                        }}
                                        trackingEvent={trackingEvent}
                                        role="tab"
                                        aria-controls={ariaControls}
                                        aria-selected={isSelected ? 'true' : 'false'}
                                    >
                                        {icon && <div className={classes.icon}>{icon}</div>}
                                        <Text3 medium color="inherit">
                                            {text}
                                        </Text3>
                                    </Touchable>
                                );
                            })}
                        </div>
                    </div>
                    <div ref={animatedLineRef} className={classes.animatedLine} />
                </div>
            </ResponsiveLayout>
        </div>
    );
};

export default Tabs;
