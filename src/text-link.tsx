// Specs: https://www.figma.com/file/koROdh3HpEPG2O8jG52Emh/Buttons-Component-Specs?node-id=0%3A1
import * as React from 'react';
import {BaseTouchable} from './touchable';
import classnames from 'classnames';
import {useTheme} from './hooks';
import {useIsInverseVariant} from './theme-variant-context';
import {useForm} from './form-context';
import {getTextFromChildren} from './utils/common';
import {eventActions, eventCategories, eventNames, useTrackingConfig} from './utils/analytics';
import * as styles from './text-link.css';

import type {TrackingEvent, DataAttributes} from './utils/types';

interface CommonProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    classes?: {[className: string]: string};
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

const TextLink: React.FC<TextLinkProps> = ({children, className = '', disabled, style, ...props}) => {
    const isInverse = useIsInverseVariant();
    const {isDarkMode} = useTheme();
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
        <BaseTouchable
            {...props}
            stopPropagation
            as={props.onPress ? 'a' : undefined}
            trackingEvent={
                props.trackingEvent ?? (props.trackEvent ? createDefaultTrackingEvent() : undefined)
            }
            disabled={disabled || formStatus === 'sending'}
            className={classnames(
                isInverse
                    ? isDarkMode
                        ? styles.variants.inverseDark
                        : styles.variants.inverseLight
                    : styles.variants.default,
                className
            )}
            style={style}
        >
            {children}
        </BaseTouchable>
    );
};

export default TextLink;
