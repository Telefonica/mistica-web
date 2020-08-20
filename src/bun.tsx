import * as React from 'react';
import classnames from 'classnames';
import {createUseStyles} from './jss';
import TextLink from './text-link';
import IconChevron from './icons/icon-chevron';
import {ThemeVariant} from './theme-variant-context';
import {useTheme} from './hooks';
import {getPlatform} from './utils/platform';

import type {TrackingEvent} from './utils/types';

const useStyles = createUseStyles((theme) => ({
    title1: {
        margin: 0,
        color: theme.colors.textPrimary,
        fontSize: 18,
        fontWeight: 300,
        lineHeight: 1.3333333,
        letterSpacing: getPlatform(theme.platformOverrides) === 'ios' ? -0.32 : 'normal',
    },
    sub2: {
        color: theme.colors.textSecondary,
        lineHeight: 1.42857142,
        fontSize: 14,
        letterSpacing: getPlatform(theme.platformOverrides) === 'ios' ? -0.15 : 'normal',
        fontWeight: 500,
    },
    bunContainer: {
        backgroundColor: theme.colors.background,
    },
    headerContainer: {
        padding: 16,
    },
    textContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footer: {
        paddingTop: 16,
        borderTop: `1px solid ${theme.colors.divider}`,
        paddingLeft: 16,
        paddingRight: 16,
    },
    chevron: {
        minWidth: 24,
        marginRight: -8,
    },
    footerText: {
        color: 'inherit',
    },
    childrenContainer: {
        paddingTop: 8,
        paddingBottom: 8,
    },
}));

type BunProps = {
    children: React.ReactNode;
    title: string;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    action?:
        | {
              text: string;
              to: string;
              fullPageOnWebView: boolean;
          }
        | {
              text: string;
              href: string;
          };
};

const Bun: React.FC<BunProps> = ({children, title, trackingEvent, action}) => {
    const classes = useStyles();
    const {colors} = useTheme();

    const renderLink = (action: NonNullable<BunProps['action']>) => {
        const {text, ...rest} = action;
        const navigationProps = rest;
        return (
            <TextLink
                className={classnames(classes.textContainer)}
                trackingEvent={trackingEvent}
                {...navigationProps}
            >
                <span className={classnames(classes.sub2, classes.footerText)}>{text}</span>
                <IconChevron className={classes.chevron} color={colors.textLink} direction="right" />
            </TextLink>
        );
    };

    return (
        <ThemeVariant isInverse={false}>
            <div className={classes.bunContainer}>
                <div className={classes.headerContainer}>
                    <h2 className={classes.title1}>{title}</h2>
                </div>
                <div className={classes.childrenContainer}>{children}</div>
                {action && <div className={classes.footer}>{renderLink(action)}</div>}
            </div>
        </ThemeVariant>
    );
};

export default Bun;
