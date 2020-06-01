// @flow
import * as React from 'react';
import {createUseStyles} from './jss';
import Touchable from './touchable';
import classnames from 'classnames';

import type {CssStyle, TrackingEvent} from './utils/types';

const useStyles = createUseStyles((theme) => ({
    textLink: {
        display: 'inline-block',
        color: theme.colors.textLink,
        wordBreak: 'break-word',
        '&:hover': {
            textDecoration: 'underline',
        },
    },

    small: {
        fontSize: 14,
    },
}));

type TouchableProps<T> =
    | {
          ...$Exact<T>,
          href: string,
      }
    | {
          ...$Exact<T>,
          to: string,
          fullPageOnWebView?: boolean,
      }
    | {
          ...$Exact<T>,
          onPress: (SyntheticEvent<HTMLElement>) => void | boolean,
      };

type Props = TouchableProps<{
    children?: React.Node,
    className?: string,
    style?: CssStyle,
    classes?: {...},
    small?: boolean,
    newTab?: boolean,
    trackingEvent?: TrackingEvent,
    'data-testid'?: string,
}>;

const TextLink = ({
    children,
    style,
    className = '',
    small,
    newTab,
    trackingEvent,
    // $FlowFixMe
    href,
    // $FlowFixMe
    to,
    // $FlowFixMe
    onPress,
    fullPageOnWebView = true,
    'data-testid': dataTestId,
}: Props): React.Node => {
    const classes = useStyles();

    return (
        // $FlowFixMe
        <Touchable
            className={classnames(classes.textLink, className, {[classes.small]: small})}
            style={style}
            href={href}
            to={to}
            onPress={onPress}
            newTab={newTab}
            fullPageOnWebView={!!to && fullPageOnWebView}
            trackingEvent={trackingEvent}
            data-testid={dataTestId}
        >
            {children}
        </Touchable>
    );
};

export default TextLink;
