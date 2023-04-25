import * as React from 'react';
import {useIsInverseVariant} from './theme-variant-context';
import Box from './box';
import {BaseTouchable} from './touchable';
import {Text, Text2} from './text';
import {Boxed} from './boxed';
import MaybeDismissable, {useIsDismissable} from './maybe-dismissable';
import * as styles from './highlighted-card.css';
import {vars} from './skins/skin-contract.css';
import {useTheme} from './hooks';

import type {ButtonLink, NullableButtonElement} from './button';
import type {DataAttributes, RendersNullableElement, TrackingEvent} from './utils/types';

interface CommonProps {
    title: string;
    titleLinesMax?: number;
    description: string;
    descriptionLinesMax?: number;
    imageUrl?: string;
    imageFit?: 'fit' | 'fill' | 'fill-center';
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

const Content = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const {title, description, imageUrl, imageFit} = props;
    const isInverseOutside = useIsInverseVariant();
    const isInverse = props.isInverse ?? isInverseOutside;
    const isDismissable = useIsDismissable();
    const {textPresets} = useTheme();

    const content = (
        <Boxed
            ref={ref}
            isInverse={isInverse}
            className={styles.container}
            dataAttributes={{'component-name': 'HighlightedCard', ...props.dataAttributes}}
            width={props.width ? `${props.width}px` : '100%'}
        >
            <div
                // don't create another region when the Content is inside a Dismissable wrapper
                role={!isDismissable ? 'region' : undefined}
                className={styles.textContainerVariant[imageUrl ? 'withImage' : 'withoutImage']}
                // aria-label is already in Dismisable wrapper
                aria-label={!isDismissable ? props['aria-label'] : undefined}
            >
                <Text
                    mobileSize={18}
                    mobileLineHeight="24px"
                    desktopSize={20}
                    desktopLineHeight="28px"
                    truncate={props.titleLinesMax}
                    weight={textPresets.cardTitle.weight}
                    as="h3"
                    hyphens="auto"
                >
                    {title}
                </Text>
                <Box paddingTop={8}>
                    <Text2
                        regular
                        color={vars.colors.textSecondary}
                        truncate={props.descriptionLinesMax}
                        as="p"
                        hyphens="auto"
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
                        backgroundImage: `url(${imageUrl})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: imageFit === 'fit' ? 'contain' : 'cover',
                        backgroundPosition:
                            imageFit === 'fit'
                                ? 'bottom right'
                                : `center ${imageFit === 'fill-center' ? 'center' : 'right'}`,
                    }}
                />
            )}
        </Boxed>
    );

    if (props.button) {
        return content;
    }
    if (props.onPress) {
        return (
            <BaseTouchable
                onPress={props.onPress}
                trackingEvent={props.trackingEvent}
                className={styles.touchableContainer}
            >
                {content}
            </BaseTouchable>
        );
    }
    if (props.to) {
        return (
            <BaseTouchable
                to={props.to}
                trackingEvent={props.trackingEvent}
                fullPageOnWebView={props.fullPageOnWebView}
                className={styles.touchableContainer}
            >
                {content}
            </BaseTouchable>
        );
    }
    if (props.href) {
        return (
            <BaseTouchable
                trackingEvent={props.trackingEvent}
                href={props.href}
                newTab={props.newTab}
                className={styles.touchableContainer}
            >
                {content}
            </BaseTouchable>
        );
    }

    return content;
});

const HighlightedCard = React.forwardRef<HTMLDivElement, Props>(
    ({'aria-label': ariaLabel, ...props}, ref) => {
        const label = ariaLabel ?? props.title;
        return (
            <MaybeDismissable onClose={props.onClose} aria-label={label} width={props.width}>
                <Content {...props} aria-label={label} ref={ref} />
            </MaybeDismissable>
        );
    }
);

export default HighlightedCard;
