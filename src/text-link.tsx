import * as React from 'react';
import {createUseStyles} from './jss';
import Touchable from './touchable';
import classnames from 'classnames';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';

import type {TrackingEvent} from './utils/types';

const useStyles = createUseStyles((theme) => ({
    textLink: {
        width: 'auto',
        lineHeight: 'inherit',
        display: 'inline-block',
        color: ({isInverse}) => (isInverse ? theme.colors.textPrimaryInverse : theme.colors.textLink),
        wordBreak: 'break-word',
        '&:hover': {
            textDecoration: 'underline',
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
    const isInverse = useIsInverseVariant();
    const classes = useStyles({isInverse});

    return (
        <ThemeVariant isInverse={isInverse}>
            <Touchable
                {...props}
                className={classnames(classes.textLink, className, {[classes.small]: small})}
            >
                {children}
            </Touchable>
        </ThemeVariant>
    );
};

export default TextLink;
