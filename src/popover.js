// @flow
import * as React from 'react';
import {createUseStyles} from './jss';
import {applyAlpha} from './utils/color';
import IcnClose from './icons/icn-close';
import IconButton from './icon-button';
import {useWindowSize, useTheme, useScreenSize} from './hooks';
import {getPlatform} from './utils/platform';

import type {CssStyle, TrackingEvent} from './utils/types';

// Zeplin definition:
// https://app.zeplin.io/project/5c9b6f097168bc065782b5c3/screen/5d15d87e46571573089f2863

const defaultPositionDesktop = 'bottom';
const defaultPositionMobile = 'top';
const arrowSize = 12;
const distanceToTarget = 8 + arrowSize;
const marginLeftRightMobile = 16;
const maxWidthDesktop = 488;
const arrowWrapperWidth = arrowSize * 2;
const arrowWrapperHeight = arrowSize;

const useStyles = createUseStyles((theme) => ({
    arrow: {
        position: 'absolute',
        backgroundColor: theme.colors.background,
        width: arrowSize,
        height: arrowSize,
        top: 0,
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(45deg)',
        border: `1px solid ${theme.colors.divider}`,
        borderRadius: 2,
        boxShadow: ({position}) =>
            position === 'bottom' ? undefined : `0 0 4px 0 ${applyAlpha(theme.colors.layerDecorations, 0.2)}`,
    },

    arrowWrapper: {
        position: 'absolute',
        color: theme.colors.background,
        width: arrowWrapperWidth,
        height: arrowWrapperHeight,
        overflow: 'hidden',
    },

    wrapper: {
        position: 'relative',
    },

    container: {
        position: 'absolute',
        width: 'auto',
        zIndex: 9,
        boxShadow: `0 2px 4px 0 ${applyAlpha(theme.colors.layerDecorations, 0.2)}`,
        backgroundColor: theme.colors.background,
        border: `1px solid ${theme.colors.divider}`,
        borderRadius: 6,
    },

    title: {
        marginBottom: 4,
        color: theme.colors.textPrimary,
        fontWeight: 500,
        lineHeight: 1.5,
        fontSize: 16,
        letterSpacing: getPlatform(theme.platformOverrides) === 'ios' ? -0.32 : undefined,
    },

    boxContainer: {
        position: 'relative',
        display: 'flex',
        minHeight: 80,
        justifyContent: 'space-between',
    },

    textContent: {
        display: 'flex',
        flexDirection: 'column',
        margin: 16,
        marginRight: 8,
        justifyContent: 'center',
    },
    assetContent: {
        width: 40,
        minWidth: 40,
        height: 40,
        margin: 16,
        marginRight: 0,
    },
    text: {
        color: theme.colors.textPrimary,
        textAlign: 'left',
        lineHeight: 1.42857142,
        fontSize: 14,
        letterSpacing: getPlatform(theme.platformOverrides) === 'ios' ? -0.15 : undefined,
    },

    closeButtonIcon: {
        paddingTop: 8,
        paddingRight: 8,
    },
}));

type Position = 'top' | 'bottom' | 'left' | 'right';

type TargetPosition = {
    left: number,
    top: number,
    width: number,
    height: number,
    parentLeft: number,
};

const getWidthDesktop = (customWidth): number => (customWidth ? customWidth : maxWidthDesktop);

const getPosition = (position: Position = defaultPositionDesktop, isMobile: boolean) =>
    isMobile && (position === 'left' || position === 'right') ? defaultPositionMobile : position;

const getWidth = (width?: number, isMobile: boolean): number =>
    isMobile ? window.innerWidth - marginLeftRightMobile * 2 : getWidthDesktop(width);

const getPositionStyles = (
    position: Position,
    width: number,
    targetPosition: TargetPosition,
    isMobile: boolean
) => {
    const containerStylesByPos: {[Position]: CssStyle, ...} = {
        right: {
            left: targetPosition.width + distanceToTarget,
            top: targetPosition.height / 2,
            transform: 'translateY(-50%)',
            WebkitTransform: 'translateY(-50%)',
        },
        left: {
            left: targetPosition.left - width - distanceToTarget,
            top: targetPosition.height / 2,
            transform: 'translateY(-50%)',
            WebkitTransform: 'translateY(-50%)',
        },
        top: {
            transform: 'translateY(-100%)',
            WebkitTransform: 'translateY(-100%)',
            top: -distanceToTarget,
            left: isMobile
                ? marginLeftRightMobile - targetPosition.parentLeft
                : Math.max(targetPosition.width / 2 - width / 2, 0),
        },
        bottom: {
            top: targetPosition.height + distanceToTarget,
            left: isMobile
                ? marginLeftRightMobile - targetPosition.parentLeft
                : Math.max(targetPosition.width / 2 - width / 2, 0),
        },
    };

    const containerStyles = containerStylesByPos[position];

    const arrowStylesByPos: {[Position]: CssStyle, ...} = {
        right: {
            right: '100%',
            top: '50%',
            transform: 'translateY(-100%) rotate(90deg)',
            transformOrigin: 'bottom',
        },
        left: {
            left: '100%',
            top: '50%',
            transform: 'translateY(-100%) rotate(-90deg)',
            transformOrigin: 'bottom',
        },
        top: {
            top: '100%',
            left: containerStyles.left === 0 ? targetPosition.width / 2 : '50%',
            transform: 'translateX(-50%)',
        },
        bottom: {
            bottom: '100%',
            left: containerStyles.left === 0 ? targetPosition.width / 2 : '50%',
            transform: 'translateX(-50%) rotate(180deg)',
        },
    };

    const arrowStyles = arrowStylesByPos[position];

    if (isMobile) {
        arrowStyles.left = targetPosition.parentLeft + targetPosition.width / 2 - marginLeftRightMobile;
    }

    return {containerStyles, arrowStyles};
};

const getTargetPosition = (targetWrapper: HTMLDivElement | null): TargetPosition | null =>
    targetWrapper
        ? {
              left: targetWrapper.offsetLeft,
              top: targetWrapper.offsetTop,
              width: targetWrapper.offsetWidth,
              height: targetWrapper.offsetHeight,
              // $FlowFixMe
              parentLeft: targetWrapper.parentNode.offsetLeft,
          }
        : null;

type Props = {
    description: string,
    target: React.Node,
    title?: string,
    asset?: React.Node,
    onClose?: () => void,
    position?: Position,
    width?: number,
    trackingEvent?: TrackingEvent,
    isVisible?: boolean,
};

const Popover = ({
    description,
    title,
    onClose,
    trackingEvent,
    position,
    width,
    target,
    asset,
    isVisible = true,
}: Props): React.Element<'div'> => {
    const {texts, colors} = useTheme();
    const {isMobile} = useScreenSize();
    const windowSize = useWindowSize();
    const [targetPosition, setTargetPosition] = React.useState<TargetPosition | null>(null);

    const targetWrapperRef = React.useRef<HTMLDivElement | null>(null);

    position = getPosition(position, isMobile);
    const innerWidth = getWidth(width, isMobile);
    const classes = useStyles({position});

    React.useEffect(() => {
        setTargetPosition(getTargetPosition(targetWrapperRef.current));
    }, [isVisible]);

    React.useEffect(() => {
        setTargetPosition(getTargetPosition(targetWrapperRef.current));
    }, [windowSize]);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    let popoverContainer = null;

    if (isVisible && targetPosition) {
        const {containerStyles, arrowStyles} = getPositionStyles(
            position,
            innerWidth,
            targetPosition,
            isMobile
        );

        popoverContainer = (
            <div
                className={classes.container}
                style={{
                    width: innerWidth,
                    ...containerStyles,
                }}
            >
                <div className={classes.arrowWrapper} style={arrowStyles}>
                    <div className={classes.arrow} />
                </div>
                <div className={classes.boxContainer}>
                    {asset && <div className={classes.assetContent}>{asset}</div>}
                    <div className={classes.textContent}>
                        {title && <span className={classes.title}>{title}</span>}
                        <span className={classes.text}>{description}</span>
                    </div>
                    <div className={classes.closeButtonIcon}>
                        <IconButton
                            onPress={handleClose}
                            trackingEvent={trackingEvent ? trackingEvent : undefined}
                            label={texts.modalClose}
                        >
                            <IcnClose color={colors.textPrimary} />
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.wrapper}>
            <div ref={targetWrapperRef}>{target}</div>
            {popoverContainer}
        </div>
    );
};

export default Popover;
