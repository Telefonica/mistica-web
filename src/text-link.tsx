import * as React from 'react';
import {createUseStyles} from './jss';
import Touchable from './touchable';
import classnames from 'classnames';

import type {TrackingEvent} from './utils/types';

const useStyles = createUseStyles((theme) => ({
    textLink: {
        width: 'auto',
        lineHeight: 'inherit',
        display: 'inline-block',
        color: theme.colors.textLink,
        wordBreak: 'break-word',
        '&:hover': {
            textDecoration: 'underline',
            // Revert hover effect in touch devices
            '@media (pointer: coarse)': {
                textDecoration: 'initial',
            },
        },
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
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    'data-testid'?: string;
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

type Props = HrefProps | ToProps | OnPressProps;

const TextLink: React.FC<Props> = ({children, className = '', small, ...props}) => {
    const classes = useStyles();

    return (
        <Touchable {...props} className={classnames(classes.textLink, className, {[classes.small]: small})}>
            {children}
        </Touchable>
    );
};

export default TextLink;
