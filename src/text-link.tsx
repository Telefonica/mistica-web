import * as React from 'react';
import {createUseStyles} from './jss';
import Touchable from './touchable';
import classnames from 'classnames';
import {useIsInverseVariant} from './theme-variant-context';
import {useForm} from './form-context';
import {getTextFromChildren} from './utils/common';
import {eventActions, eventCategories, eventNames, useTrackingConfig} from './utils/analytics';

import type {TrackingEvent, DataAttributes} from './utils/types';

const useStyles = createUseStyles((theme) => ({
    textLink: {
        width: 'auto',
        lineHeight: 'inherit',
        display: 'inline-block',
        color: theme.colors.textLink,
        wordBreak: 'break-word',
        [theme.mq.supportsHover]: {
            '&:hover:not([disabled])': {
                textDecoration: 'underline',
            },
        },
        '&[disabled]': {
            opacity: 0.5,
        },
    },
    inverse: {
        color: theme.colors.textLinkInverse,
    },
    small: {
        fontSize: 14,
    },
}));

interface CommonProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    classes?: {[className: string]: string};
    small?: boolean;
    disabled?: boolean;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    trackEvent?: boolean;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
}

export interface HrefProps extends CommonProps {
    href: string;
    newTab?: boolean;
    onPress?: undefined;
    to?: undefined;
}

export interface ToProps extends CommonProps {
    to: string;
    fullPageOnWebView?: boolean;
    href?: undefined;
    onPress?: undefined;
}
export interface OnPressProps extends CommonProps {
    onPress: (event: React.MouseEvent<HTMLElement>) => void | boolean;
    href?: undefined;
    to?: undefined;
}

export type TextLinkProps = HrefProps | ToProps | OnPressProps;

const TextLink: React.FC<TextLinkProps> = ({children, className = '', small, disabled, ...props}) => {
    const classes = useStyles();
    const isInverse = useIsInverseVariant();
    const {formStatus} = useForm();
    const {eventFormat} = useTrackingConfig();

    const createDefaultTrackingEvent = (): TrackingEvent => {
        if (eventFormat === 'google-analytics-4') {
            return {
                name: eventNames.userInteraction,
                component_type: 'link',
                component_copy: getTextFromChildren(children),
            };
        } else {
            return {
                category: eventCategories.userInteraction,
                action: eventActions.linkTapped,
                label: getTextFromChildren(children),
            };
        }
    };

    return (
        <Touchable
            {...props}
            trackingEvent={
                props.trackingEvent ?? (props.trackEvent ? createDefaultTrackingEvent() : undefined)
            }
            disabled={disabled || formStatus === 'sending'}
            className={classnames(classes.textLink, className, {
                [classes.small]: small,
                [classes.inverse]: isInverse,
            })}
        >
            {children}
        </Touchable>
    );
};

export default TextLink;
