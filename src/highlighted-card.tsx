import * as React from 'react';
import {createUseStyles} from './jss';
import {ThemeVariant} from './theme-variant-context';
import {getPlatform} from './utils/platform';
import Box from './box';
import Touchable from './touchable';
import {ButtonPrimary, ButtonSecondary} from './button';
import TextLink from './text-link';
import IcnClose from './icons/icon-close';
import IconButton from './icon-button';
import {applyAlpha} from './utils/color';
import {useTheme} from './hooks';

import type {TrackingEvent} from './utils/types';

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
    title: {
        margin: 0,
        color: ({isInverse}) => (isInverse ? theme.colors.textPrimaryInverse : theme.colors.textPrimary),
        fontSize: 18,
        fontWeight: 300,
        lineHeight: 1.33,
        letterSpacing: getPlatform(theme.platformOverrides) === 'ios' ? -0.45 : 'normal',
    },
    paragraph: {
        margin: '8px 0 0',
        color: ({isInverse}) => (isInverse ? theme.colors.textPrimaryInverse : theme.colors.textSecondary),
        fontSize: 14,
        lineHeight: 1.43,
        letterSpacing: getPlatform(theme.platformOverrides) === 'ios' ? -0.15 : 'normal',
    },
    imageContent: {
        display: 'flex',
        alignItems: 'flex-end',
        width: 100,
        minWidth: 100,
    },
    dismissContainer: {
        position: 'relative',
    },
    dismissButtonContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: applyAlpha(theme.colors.background, 0.7),
    },
}));

type DismissProps = {
    children: React.ReactNode;
    isInverse: boolean;
};

const Dismiss: React.FC<DismissProps> = ({children, isInverse = false}) => {
    const classes = useStyles({isInverse});
    const {colors, texts} = useTheme();
    const [close, setClose] = React.useState(false);
    const handleClose = () => setClose(true);

    if (close) {
        return null;
    }

    return (
        <div className={classes.dismissContainer}>
            {children}
            <div className={classes.dismissButtonContainer}>
                <IconButton onPress={handleClose} label={texts.modalClose}>
                    <IcnClose color={colors.iconPrimary} />
                </IconButton>
            </div>
        </div>
    );
};

type ContentProps = {
    title: string;
    paragraph: string;
    image?: React.ReactElement<any> | string | null;
    backgroundImage?: string;
    isInverse?: boolean;
    isClosable?: boolean;
    action?:
        | React.ReactElement<typeof ButtonPrimary>
        | React.ReactElement<typeof ButtonSecondary>
        | React.ReactElement<typeof TextLink>
        | null;
};

const Content: React.FC<ContentProps> = ({
    title,
    paragraph,
    image,
    backgroundImage,
    isInverse = false,
    action,
}) => {
    const classes = useStyles({isInverse});

    return (
        <div className={classes.container} style={{backgroundImage}}>
            <Box paddingLeft={16} paddingRight={image ? 8 : 16} paddingY={24}>
                <h2 className={classes.title}>{title}</h2>
                <p className={classes.paragraph}>{paragraph}</p>
                {action && <Box paddingTop={16}>{action}</Box>}
            </Box>
            {image && <div className={classes.imageContent}>{image}</div>}
        </div>
    );
};

interface HrefProps extends ContentProps {
    href?: string;
    newTab?: boolean;
    onPress?: undefined;
    to?: undefined;
    trackingEvent?: TrackingEvent;
}

interface ToProps extends ContentProps {
    to?: string;
    fullPageOnWebView?: boolean;
    href?: undefined;
    onPress?: undefined;
    trackingEvent?: TrackingEvent;
}
interface OnPressProps extends ContentProps {
    onPress?: () => void;
    href?: undefined;
    to?: undefined;
    trackingEvent?: TrackingEvent;
}

type TouchableContentProps = HrefProps | ToProps | OnPressProps;

const TouchableContent: React.FC<TouchableContentProps> = (props) => {
    if (props.action) {
        return <Content {...props} />;
    }
    if (props.onPress) {
        return (
            <Touchable onPress={props.onPress} trackingEvent={props.trackingEvent}>
                <Content {...props} />
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
                <Content {...props} />
            </Touchable>
        );
    }
    if (props.href) {
        return (
            <Touchable trackingEvent={props.trackingEvent} href={props.href} newTab={props.newTab}>
                <Content {...props} />
            </Touchable>
        );
    }

    return <Content {...props} />;
};

const HighlightedCard: React.FC<TouchableContentProps> = ({isClosable, ...props}) => (
    <ThemeVariant isInverse={props.isInverse}>
        {isClosable ? (
            <Dismiss isInverse={props.isInverse}>
                <TouchableContent {...props} />
            </Dismiss>
        ) : (
            <TouchableContent {...props} />
        )}
    </ThemeVariant>
);

export default HighlightedCard;
