import * as React from 'react';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {useIsInverseVariant} from './theme-variant-context';
import Box from './box';
import Touchable from './touchable';
import {Text4, Text2} from './text';
import {ButtonLink} from './button';
import {Boxed} from './boxed';
import MaybeDismissable, {useIsDismissable} from './maybe-dismissable';
import * as styles from './highlighted-card.css';
import {vars} from './skins/skin-contract.css';

import type {DataAttributes, RendersNullableElement, TrackingEvent} from './utils/types';
import type {NullableButtonElement} from './button';

interface CommonProps {
    title: string;
    titleLinesMax?: number;
    description: string;
    descriptionLinesMax?: number;
    imageUrl?: string;
    imageFit?: 'fit' | 'fill';
    onClose?: () => void;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    isInverse?: boolean;
    children?: void;
    'aria-label'?: string;
    width?: string | number;
    dataAttributes?: DataAttributes;
}
interface BasicProps extends CommonProps {
    button?: undefined;
    onPress?: undefined;
    to?: undefined;
    href?: undefined;
}
interface ButtonProps extends CommonProps {
    button?: NullableButtonElement | RendersNullableElement<typeof ButtonLink>;
    onPress?: undefined;
    to?: undefined;
    href?: undefined;
}
interface HrefProps extends CommonProps {
    href?: string;
    newTab?: boolean;
    onPress?: undefined;
    to?: undefined;
    button?: undefined;
}
interface ToProps extends CommonProps {
    to?: string;
    fullPageOnWebView?: boolean;
    href?: undefined;
    onPress?: undefined;
    button?: undefined;
}
interface OnPressProps extends CommonProps {
    onPress?: () => void;
    href?: undefined;
    to?: undefined;
    button?: undefined;
}

type Props = BasicProps | ButtonProps | HrefProps | ToProps | OnPressProps;

const Content: React.FC<Props> = (props) => {
    const {title, description, imageUrl, imageFit} = props;
    const isInverseOutside = useIsInverseVariant();
    const isInverse = props.isInverse ?? isInverseOutside;
    const isDismissable = useIsDismissable();

    const content = (
        <div
            style={{
                ...assignInlineVars({[styles.vars.width]: props.width ? `${props.width}px` : '100%'}),
                display: 'flex',
                width: '100%',
            }}
        >
            <Boxed isInverse={isInverse} className={styles.container} dataAttributes={props.dataAttributes}>
                <div
                    // don't create another region when the Content is inside a Dismissable wrapper
                    role={!isDismissable ? 'region' : undefined}
                    className={styles.textContainerVariant[imageUrl ? 'withImage' : 'withoutImage']}
                    // aria-label is already in Dismisable wrapper
                    aria-label={!isDismissable ? props['aria-label'] : undefined}
                >
                    <Text4 as="h1" regular truncate={props.titleLinesMax}>
                        {title}
                    </Text4>
                    <Box paddingTop={8}>
                        <Text2
                            regular
                            color={vars.colors.textSecondary}
                            truncate={props.descriptionLinesMax}
                            as="p"
                        >
                            {description}
                        </Text2>
                    </Box>
                    {props.button && (
                        <>
                            <div style={{minHeight: 16, flexGrow: 1}} />
                            {props.button}
                        </>
                    )}
                </div>
                {imageUrl && (
                    <div
                        className={styles.imageContent}
                        style={{
                            background: `url(${imageUrl}) no-repeat`,
                            backgroundSize: imageFit === 'fit' ? 'contain' : 'cover',
                            backgroundPosition: imageFit === 'fit' ? 'bottom right' : 'center right',
                        }}
                    />
                )}
            </Boxed>
        </div>
    );

    if (props.button) {
        return content;
    }
    if (props.onPress) {
        return (
            <Touchable
                onPress={props.onPress}
                trackingEvent={props.trackingEvent}
                className={styles.touchableContainer}
            >
                {content}
            </Touchable>
        );
    }
    if (props.to) {
        return (
            <Touchable
                to={props.to}
                trackingEvent={props.trackingEvent}
                fullPageOnWebView={props.fullPageOnWebView}
                className={styles.touchableContainer}
            >
                {content}
            </Touchable>
        );
    }
    if (props.href) {
        return (
            <Touchable
                trackingEvent={props.trackingEvent}
                href={props.href}
                newTab={props.newTab}
                className={styles.touchableContainer}
            >
                {content}
            </Touchable>
        );
    }

    return content;
};

const HighlightedCard: React.FC<Props> = ({'aria-label': ariaLabel, ...props}) => {
    const label = ariaLabel ?? props.title;
    return (
        <MaybeDismissable onClose={props.onClose} aria-label={label} width={props.width}>
            <Content {...props} aria-label={label} />
        </MaybeDismissable>
    );
};

export default HighlightedCard;
