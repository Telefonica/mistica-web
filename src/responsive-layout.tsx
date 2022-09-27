import * as React from 'react';
import {createUseStyles} from './jss';
import classnames from 'classnames';
import {useScreenSize} from './hooks';
import {getPrefixedDataAttributes} from './utils/dom';
import ContainerTypeContext from './container-type-context';

import type {DataAttributes} from './utils/types';

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

        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',

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

const ResponsiveLayoutMarginContext = React.createContext<null | number>(0);
export const useResonsiveLayoutMargin = (): null | number => React.useContext(ResponsiveLayoutMarginContext);

type Props = {
    children: React.ReactNode;
    fullWidth?: boolean;
    className?: string;
    dataAttributes?: DataAttributes;
};

const ResponsiveLayout: React.FC<Props> = ({children, className, fullWidth, dataAttributes}) => {
    const classes = useStyles();
    const {isMobile, isTablet} = useScreenSize();

    const sideMargin = isMobile ? MOBILE_SIDE_MARGIN : isTablet ? TABLET_SIDE_MARGIN : null;

    const containerType = isMobile ? 'mobile-column' : isTablet ? 'tablet-column' : 'desktop-wide-column';

    return (
        <ResponsiveLayoutMarginContext.Provider value={sideMargin}>
            <ContainerTypeContext.Provider value={containerType}>
                <div
                    className={classnames(classes.container, className)}
                    {...getPrefixedDataAttributes(dataAttributes)}
                >
                    <div className={classnames(classes.layout, {[classes.layoutFullWidth]: fullWidth})}>
                        {children}
                    </div>
                </div>
            </ContainerTypeContext.Provider>
        </ResponsiveLayoutMarginContext.Provider>
    );
};

export default ResponsiveLayout;
