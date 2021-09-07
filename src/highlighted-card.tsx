import * as React from 'react';
import {createUseStyles} from './jss';
import {useIsInverseVariant} from './theme-variant-context';
import Box from './box';
import Touchable from './touchable';
import IcnClose from './icons/icon-close';
import {applyAlpha} from './utils/color';
import {useTheme} from './hooks';
import {Text4, Text2} from './text';
import IconButton from './icon-button';
import {ButtonLink} from './button';

import type {TrackingEvent} from './utils/types';
import type {ButtonElement} from './button';
import {Boxed} from './boxed';

const useStyles = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageContent: {
        display: 'flex',
        width: 100,
        minWidth: 100,
        height: 'inherit',
    },
    dismissableContainer: {
        position: 'relative',
    },
    dismissableButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 48,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dismissableCircleContainer: {
        width: 24,
        height: 24,
        margin: '0 0 8px 8px',
        borderRadius: '50%',
        backgroundColor: applyAlpha(theme.colors.background, 0.7),
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
    },
}));

type DismissableProps = {
    children: React.ReactNode;
    onClose?: () => void;
};

const Dismissable: React.FC<DismissableProps> = ({children, onClose = () => {}}) => {
    const isInverse = useIsInverseVariant();
    const classes = useStyles({isInverse});
    const {colors, texts} = useTheme();

    return (
        <section className={classes.dismissableContainer}>
            {children}
            <IconButton
                className={classes.dismissableButton}
                onPress={onClose}
                aria-label={texts.closeButtonLabel}
                style={{display: 'flex', width: 48, height: 48}}
            >
                <div className={classes.dismissableCircleContainer}>
                    <IcnClose color={colors.neutralHigh} />
                </div>
            </IconButton>
        </section>
    );
};

interface CommonProps {
    title: string;
    description: string;
    imageUrl?: string;
    imageFit?: 'fit' | 'fill';
    backgroundImageUrl?: string;
    onClose?: () => void;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    isInverse?: boolean;
    children?: void;
    'aria-label'?: string;
}
interface BasicProps extends CommonProps {
    button?: undefined;
    onPress?: undefined;
    to?: undefined;
    href?: undefined;
}
interface ButtonProps extends CommonProps {
    button?: ButtonElement | React.ReactElement<typeof ButtonLink> | null;
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
    const classes = useStyles({isInverse, hasImage: !!imageUrl});
    const theme = useTheme();

    const content = (
        <Boxed isInverse={isInverse} className={classes.container}>
            <div
                // don't create another region when the Content is inside a Dismissable wrapper
                role={props['aria-label'] ? 'region' : undefined}
                className={classes.textContainer}
                aria-label={props['aria-label']}
            >
                <Text4 regular>{title}</Text4>
                <Box paddingTop={8}>
                    <Text2 regular color={theme.colors.textSecondary}>
                        {description}
                    </Text2>
                </Box>
                {props.button && <Box paddingTop={16}>{props.button}</Box>}
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
            <Touchable onPress={props.onPress} trackingEvent={props.trackingEvent}>
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
            >
                {content}
            </Touchable>
        );
    }
    if (props.href) {
        return (
            <Touchable trackingEvent={props.trackingEvent} href={props.href} newTab={props.newTab}>
                {content}
            </Touchable>
        );
    }

    return content;
};

const HighlightedCard: React.FC<Props> = ({'aria-label': ariaLabel, ...props}) => {
    const label = ariaLabel ?? props.title;
    return props.onClose ? (
        <Dismissable onClose={props.onClose} aria-label={label}>
            <Content {...props} />
        </Dismissable>
    ) : (
        <Content {...props} aria-label={label} />
    );
};

export default HighlightedCard;
