import * as React from 'react';
import {createUseStyles} from './jss';
import {useIsInverseVariant} from './theme-variant-context';
import Box from './box';
import Touchable from './touchable';
import TextLink from './text-link';
import IcnClose from './icons/icon-close';
import {applyAlpha} from './utils/color';
import {useTheme} from './hooks';
import Text from './text';

import type {TrackingEvent} from './utils/types';
import type {ButtonElement} from './button';

const useStyles = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        background: ({isInverse}) => (isInverse ? theme.colors.backgroundBrand : theme.colors.background),
        border: ({isInverse}) => (isInverse ? '0' : `1px solid ${theme.colors.divider}`),
        borderRadius: 4,
        overflow: 'hidden',
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
}));

type DismissableProps = {
    children: React.ReactNode;
    onClose?: () => void;
};

const Dismissable: React.FC<DismissableProps> = ({children, onClose}) => {
    const isInverse = useIsInverseVariant();
    const classes = useStyles({isInverse});
    const {colors, texts} = useTheme();
    const [close, setClose] = React.useState(false);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }

        return setClose(true);
    };

    if (close) {
        return null;
    }

    return (
        <div className={classes.dismissableContainer}>
            {children}
            <Touchable className={classes.dismissableButton} onPress={handleClose} label={texts.modalClose}>
                <div className={classes.dismissableCircleContainer}>
                    <IcnClose color={colors.iconPrimary} />
                </div>
            </Touchable>
        </div>
    );
};

interface CommonProps {
    title: string;
    description: string;
    imageUrl?: string;
    imageFit?: 'auto' | 'contain' | 'cover';
    backgroundImageUrl?: string;
    isInverse?: boolean;
    onClose?: () => void;
    button?: ButtonElement | React.ReactElement<typeof TextLink> | null;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
}

interface BasicProps extends CommonProps {
    href?: undefined;
    newTab?: undefined;
    onPress?: undefined;
    to?: undefined;
}

interface HrefProps extends CommonProps {
    href?: string;
    newTab?: boolean;
    onPress?: undefined;
    to?: undefined;
}

interface ToProps extends CommonProps {
    to?: string;
    fullPageOnWebView?: boolean;
    href?: undefined;
    onPress?: undefined;
}
interface OnPressProps extends CommonProps {
    onPress?: () => void;
    href?: undefined;
    to?: undefined;
}

type Props = BasicProps | HrefProps | ToProps | OnPressProps;

const Content: React.FC<Props> = (props) => {
    const isInverse = useIsInverseVariant();
    const classes = useStyles({isInverse});
    const theme = useTheme();
    const {title, description, button, imageUrl, backgroundImageUrl, imageFit} = props;

    const content = (
        <div className={classes.container} style={{backgroundImage: backgroundImageUrl}}>
            <Box paddingLeft={16} paddingRight={imageUrl ? 8 : 16} paddingY={24}>
                <Text size={18} lineHeight={1.33} weight="light">
                    {title}
                </Text>
                <Box paddingTop={8}>
                    <Text size={14} lineHeight={1.43} color={theme.colors.textSecondary}>
                        {description}
                    </Text>
                </Box>
                {button && <Box paddingTop={16}>{button}</Box>}
            </Box>
            {imageUrl && (
                <div
                    className={classes.imageContent}
                    style={{
                        background: `url(${imageUrl}) no-repeat`,
                        backgroundSize: imageFit,
                        backgroundPosition: 'center right',
                    }}
                />
            )}
        </div>
    );

    if (button) {
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

const HighlightedCard: React.FC<Props> = (props) =>
    props.onClose ? (
        <Dismissable onClose={props.onClose}>
            <Content {...props} />
        </Dismissable>
    ) : (
        <Content {...props} />
    );
export default HighlightedCard;
