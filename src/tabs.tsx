import * as React from 'react';
import classnames from 'classnames';
import {createUseStyles} from './jss';
import Touchable from './touchable';
import ResponsiveLayout from './responsive-layout';
import {useElementSize} from './hooks';
import {getPlatform} from './utils/platform';

import type {TrackingProps} from './utils/types';

const smallOuterStyles = {
    display: 'flex',
};

const bigTabStyles = {
    flex: '0 1 208px',
    padding: `16px 32px`,
};

const height = 56;

type StyleProps = {
    width: number;
};

const useStyles = createUseStyles(({colors, mq, platformOverrides}) => ({
    outerBorder: {
        borderBottom: `1px solid ${colors.divider}`,
        width: '100%',
    },
    outer: {
        height,

        position: 'relative',
        overflow: 'hidden',

        [mq.mobile]: smallOuterStyles,
        [mq.tablet]: smallOuterStyles,
    },
    inner: {
        position: 'absolute',
        left: 0,
        overflowX: 'scroll',
        overflowY: 'hidden',
        height: 80,
    },
    tabsContainer: {
        height,
        width: (p: StyleProps) => p.width,
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
        height,
        maxWidth: 284,
        textAlign: 'center',
        borderBottom: '2px solid transparent',

        [mq.desktop]: bigTabStyles,
        [mq.largeDesktop]: bigTabStyles,
    },
    tebText: {
        color: colors.textSecondary,
        lineHeight: 1.5,
        fontSize: 16,
        letterSpacing: getPlatform(platformOverrides) === 'ios' ? -0.32 : 'normal',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    tabTextSelected: {
        color: colors.textPrimary,
    },
    tabSelected: {
        borderBottom: `2px solid ${colors.controlActive}`,
    },
    icon: {
        marginRight: 8,
        height: 24,
        width: 24,
    },
}));

export type TabsProps = {
    selectedIndex: number;
    onChange: (selectedIndex: number) => void;
    tabs: ReadonlyArray<
        {
            readonly text: string;
            readonly icon?: React.ReactNode;
            readonly 'aria-controls'?: string;
        } & TrackingProps
    >;
};

const Tabs: React.FC<TabsProps> = ({selectedIndex, onChange, tabs}: TabsProps) => {
    const ref = React.useRef(null);
    const {width} = useElementSize(ref);
    const classes = useStyles({width});
    return (
        <div role="tablist" ref={ref} className={classes.outerBorder}>
            <ResponsiveLayout fullWidth>
                <div className={classes.outer}>
                    <div className={classes.inner}>
                        <div className={classes.tabsContainer}>
                            {tabs.map(({text, trackingEvent, icon, 'aria-controls': ariaControls}, index) => {
                                const isSelected = index === selectedIndex;
                                return (
                                    <Touchable
                                        key={index}
                                        className={classnames(classes.tab, isSelected && classes.tabSelected)}
                                        disabled={isSelected}
                                        onPress={() => onChange(index)}
                                        trackingEvent={trackingEvent}
                                        role="tab"
                                        aria-controls={ariaControls}
                                        aria-selected={isSelected ? 'true' : 'false'}
                                    >
                                        {icon && <div className={classes.icon}>{icon}</div>}
                                        <span
                                            className={classnames(
                                                classes.tebText,
                                                isSelected && classes.tabTextSelected
                                            )}
                                        >
                                            {text}
                                        </span>
                                    </Touchable>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </ResponsiveLayout>
        </div>
    );
};

export default Tabs;
