import * as React from 'react';
import {createUseStyles} from './jss';
import classnames from 'classnames';

const MOBILE_SIDE_MARGIN = 16;
const TABLET_SIDE_MARGIN = 32;
const SMALL_DESKTOP_SIDE_MARGIN = 40;
const LARGE_DESKTOP_MAX_WIDTH = 1224;

const useStyles = createUseStyles((theme) => ({
    container: {
        width: '100%',
    },
    layout: {
        margin: 'auto',

        [theme.mq.largeDesktop]: {
            width: LARGE_DESKTOP_MAX_WIDTH,
        },
        [theme.mq.desktop]: {
            width: `calc(100% - ${SMALL_DESKTOP_SIDE_MARGIN * 2}px)`,
            margin: `0 ${SMALL_DESKTOP_SIDE_MARGIN}px`,
        },
        [theme.mq.tablet]: {
            width: `calc(100% - ${TABLET_SIDE_MARGIN * 2}px)`,
            margin: `0 ${TABLET_SIDE_MARGIN}px`,
        },
        [theme.mq.mobile]: {
            width: `calc(100% - ${MOBILE_SIDE_MARGIN * 2}px)`,
            margin: `0 ${MOBILE_SIDE_MARGIN}px`,
        },
    },
    layoutFullWidth: {
        width: '100%',
        margin: 0,

        [theme.mq.largeDesktop]: {
            width: 'auto',
            margin: 'auto',
        },
    },
}));

type Props = {
    children: React.ReactNode;
    fullWidth?: boolean;
    className?: string;
};

const ResponsiveLayout: React.FC<Props> = ({children, className, fullWidth}) => {
    const classes = useStyles();

    return (
        <div className={classnames(classes.container, className)}>
            <div className={classnames(classes.layout, {[classes.layoutFullWidth]: fullWidth})}>
                {children}
            </div>
        </div>
    );
};

export default ResponsiveLayout;
