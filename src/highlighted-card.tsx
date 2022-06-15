import * as React from 'react';
import {createUseStyles} from './jss';
import {useIsInverseVariant} from './theme-variant-context';
import Box from './box';
import Touchable from './touchable';
import {useTheme} from './hooks';
import {Text4, Text2} from './text';
import {ButtonLink} from './button';
import {Boxed} from './boxed';
import MaybeDismissable, {useIsDismissable} from './maybe-dismissable';

import type {DataAttributes, RendersNullableElement, TrackingEvent} from './utils/types';
import type {NullableButtonElement} from './button';

const useStyles = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: ({width}) => width || '100%',
        flexShrink: 0,
        alignSelf: 'stretch',
    },
    imageContent: {
        display: 'flex',
        width: 100,
        minWidth: 100,
        height: 'inherit',
    },
    textContainer: {
        paddingLeft: 16,
        paddingTop: 24,
        paddingBottom: 24,
        paddingRight: ({hasImage}) => (hasImage ? 8 : 56),

        [theme.mq.desktopOrBigger]: {
            padding: 24,
            paddingRight: ({hasImage}) => (hasImage ? 24 : 56),
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    touchableContainer: {
        display: 'flex',
        flexShrink: 0,
        width: ({width}) => width || '100%',
    },
}));

interface CommonProps {
    title: string;
    description: string;
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
    const classes = useStyles({isInverse, hasImage: !!imageUrl, width: props.width});
    const theme = useTheme();
    const isDismissable = useIsDismissable();

    const content = (
        <Boxed isInverse={isInverse} className={classes.container} dataAttributes={props.dataAttributes}>
            <div
                // don't create another region when the Content is inside a Dismissable wrapper
                role={!isDismissable ? 'region' : undefined}
                className={classes.textContainer}
                // aria-label is already in Dismisable wrapper
                aria-label={!isDismissable ? props['aria-label'] : undefined}
            >
                <Text4 as="h1" regular>
                    {title}
                </Text4>
                <Box paddingTop={8}>
                    <Text2 regular color={theme.colors.textSecondary}>
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
                    className={classes.imageContent}
                    style={{
                        background: `url(${imageUrl}) no-repeat`,
                        backgroundSize: imageFit === 'fit' ? 'contain' : 'cover',
                        backgroundPosition: imageFit === 'fit' ? 'bottom right' : 'center right',
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
            <Touchable
                onPress={props.onPress}
                trackingEvent={props.trackingEvent}
                className={classes.touchableContainer}
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
                className={classes.touchableContainer}
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
                className={classes.touchableContainer}
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
