// Specs: https://www.figma.com/file/koROdh3HpEPG2O8jG52Emh/Buttons-Component-Specs?node-id=0%3A1

'use client';
import * as React from 'react';
import {BaseTouchable} from './touchable';
import classnames from 'classnames';
import {useTheme} from './hooks';
import {useIsInverseOrMediaVariant} from './theme-variant-context';
import {useForm} from './form-context';
import {getTextFromChildren} from './utils/common';
import {eventActions, eventCategories, eventNames, useTrackingConfig} from './utils/analytics';
import * as styles from './text-link.css';

import type {AlwaysTouchableComponentProps} from './touchable';
import type {TrackingEvent, DataAttributes} from './utils/types';

interface CommonProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    classes?: {[className: string]: string};
    disabled?: boolean;
    'aria-label'?: string;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    trackEvent?: boolean;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    /** IMPORTANT: try to avoid using role="link" with onPress and first consider other alternatives like to/href + onNavigate */
    role?: string;
    underline?: 'always' | 'on hover';
}

export type TextLinkProps = AlwaysTouchableComponentProps & CommonProps;

const TextLink = ({
    children,
    className = '',
    disabled,
    style,
    trackEvent,
    underline = 'always',
    ...props
}: TextLinkProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const {isDarkMode} = useTheme();
    const {formStatus} = useForm();
    const {eventFormat} = useTrackingConfig();

    const underlineStyle =
        underline === 'always' ? styles.linkStyles.underlineAlways : styles.linkStyles.underlineOnHover;

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
            trackingEvent={props.trackingEvent ?? (trackEvent ? createDefaultTrackingEvent() : undefined)}
            disabled={disabled || formStatus === 'sending'}
            className={classnames(
                isInverse
                    ? isDarkMode
                        ? styles.variants.inverseDark
                        : styles.variants.inverseLight
                    : styles.variants.default,
                underlineStyle,
                className
            )}
            style={style}
        >
            {children}
        </BaseTouchable>
    );
};

export default TextLink;
