import * as React from 'react';
import classnames from 'classnames';
import {useAriaId, useScreenSize} from './hooks';
import Portal from './portal';
import Overlay from './overlay';
import {applyAlpha} from './utils/color';
import * as key from './utils/key-codes';
import {createUseStyles} from './jss';

const defaultPositionDesktop = 'bottom';
const defaultPositionMobile = 'top';
const arrowSize = 12;
const distanceToTarget = 8 + arrowSize;
const marginLeftRightMobile = 16;
const defaultWidthDesktop = 340;
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
    },
    arrowTop: {
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        '& > div': {
            boxShadow: `0 2px 4px 0 ${applyAlpha(theme.colors.layerDecorations, 0.2)}`,
        },
    },
    arrowRight: {
        right: '100%',
        top: '50%',
        transform: 'translateY(-100%) rotate(90deg)',
        transformOrigin: 'bottom',
        '& > div': {
            boxShadow: `0 0 4px 0 ${applyAlpha(theme.colors.layerDecorations, 0.2)}`,
        },
    },
    arrowBottom: {
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%) rotate(180deg)',
    },
    arrowLeft: {
        left: '100%',
        top: '50%',
        transform: 'translateY(-100%) rotate(-90deg)',
        transformOrigin: 'bottom',
        '& > div': {
            boxShadow: `0 0 4px 0 ${applyAlpha(theme.colors.layerDecorations, 0.2)}`,
        },
    },
    arrowWrapper: {
        position: 'absolute',
        color: theme.colors.background,
        width: arrowWrapperWidth,
        height: arrowWrapperHeight,
        overflow: 'hidden',
    },
    wrapper: {
        display: 'inline-block',
    },
    container: {
        position: 'absolute',
        left: 16,
        width: 'auto',
        boxShadow: `0 2px 4px 0 ${applyAlpha(theme.colors.layerDecorations, 0.2)}`,
        padding: 16,
        backgroundColor: theme.colors.background,
        zIndex: 12,
        border: `1px solid ${theme.colors.divider}`,
        borderRadius: 2,
    },
    title: {
        margin: 0,
        marginBottom: 12,
        color: theme.colors.textPrimary,
        lineHeight: 1.42857142,
        fontSize: 14,
    },
    description: {
        margin: 0,
        color: theme.colors.textPrimary,
        lineHeight: 1.42857142,
        fontSize: 14,
    },
}));

type Position = 'top' | 'bottom' | 'left' | 'right';

const getWidthDesktop = (customWidth?: number) => (customWidth ? customWidth : defaultWidthDesktop);

const EVENT_THROTTLE_TIME = process.env.NODE_ENV === 'test' ? 0 : 200;

type Props = {
    children?: React.ReactNode;
    description?: string;
    target: React.ReactNode;
    title?: string;
    position?: Position;
    width?: number;
    targetLabel: string;
};

/**
 * @deprecated This component will be removed on the next major mistica release
 */
const Tooltip: React.FC<Props> = ({children, description, target, title, targetLabel, ...rest}) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const {isMobile} = useScreenSize();
    const ariaId = useAriaId();
    const targetBoundingClientRect = React.useRef({
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        width: 0,
        height: 0,
    });
    // This property is needed because safari is making a mess with the events (it has problems
    // when the overlay layer appears and disappears). This way we ensure that events don't get handled twice
    const lastChangeTime = React.useRef(0);
    const classes = useStyles();

    const closeTooltip = () => {
        if (isVisible) {
            setIsVisible(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener('resize', closeTooltip);
        return () => {
            window.removeEventListener('resize', closeTooltip);
        };
    });

    const handleClickOutside = () => {
        if (Date.now() - lastChangeTime.current < EVENT_THROTTLE_TIME) {
            return;
        }
        lastChangeTime.current = Date.now();
        setIsVisible(false);
    };

    const toggleVisibility = (e: React.FocusEvent<HTMLDivElement> | React.PointerEvent<HTMLDivElement>) => {
        if (Date.now() - lastChangeTime.current < EVENT_THROTTLE_TIME) {
            return;
        }
        lastChangeTime.current = Date.now();
        targetBoundingClientRect.current = e.currentTarget.getBoundingClientRect();
        setIsVisible(!isVisible);
    };

    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
        if (!isVisible) {
            toggleVisibility(e);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.keyCode === key.TAB) {
            handleClickOutside();
        }
    };

    const getContainerPosition = (position: Position, width: number) => {
        const containerPos = {
            right: {
                left: targetBoundingClientRect.current.right + distanceToTarget,
                top:
                    window.pageYOffset +
                    targetBoundingClientRect.current.top +
                    targetBoundingClientRect.current.height / 2,
                transform: 'translateY(-50%)',
                WebKitTransform: 'translateY(-50%)',
            },
            left: {
                left: targetBoundingClientRect.current.left - width - distanceToTarget,
                top:
                    window.pageYOffset +
                    targetBoundingClientRect.current.top +
                    targetBoundingClientRect.current.height / 2,
                transform: 'translateY(-50%)',
                WebKitTransform: 'translateY(-50%)',
            },
            top: {
                transform: 'translateY(-100%)',
                WebKitTransform: 'translateY(-100%)',
                top: window.pageYOffset + targetBoundingClientRect.current.top - distanceToTarget,
                left: isMobile
                    ? marginLeftRightMobile
                    : window.pageXOffset +
                      targetBoundingClientRect.current.left +
                      targetBoundingClientRect.current.width / 2 -
                      width / 2,
            },
            bottom: {
                top: window.pageYOffset + targetBoundingClientRect.current.bottom + distanceToTarget,
                left: isMobile
                    ? marginLeftRightMobile
                    : window.pageXOffset +
                      targetBoundingClientRect.current.left +
                      targetBoundingClientRect.current.width / 2 -
                      width / 2,
            },
        };
        return containerPos[position];
    };

    const getPosition = (position: Position = defaultPositionDesktop) =>
        isMobile && (position === 'left' || position === 'right') ? defaultPositionMobile : position;

    const getCustomStylesForMobile = () =>
        isMobile
            ? {
                  left:
                      targetBoundingClientRect.current.left +
                      targetBoundingClientRect.current.width / 2 -
                      marginLeftRightMobile,
              }
            : {};

    const getWidth = () =>
        isMobile ? window.innerWidth - marginLeftRightMobile * 2 : getWidthDesktop(rest.width);

    const position = getPosition(rest.position);
    const width = getWidth();

    const classNameByPosition = {
        top: classes.arrowTop,
        bottom: classes.arrowBottom,
        left: classes.arrowLeft,
        right: classes.arrowRight,
    };

    return (
        <>
            <div
                className={classes.wrapper}
                onPointerDown={toggleVisibility}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                touch-action="auto" // Prop needed for Pointer Events Polyfill to work properly
                role="button"
                tabIndex={0}
                aria-describedby={ariaId}
                aria-expanded={isVisible}
                aria-label={targetLabel}
            >
                {target}
            </div>
            {isVisible && (
                <Portal>
                    <Overlay onPress={handleClickOutside} />
                    <div
                        data-testid="tooltip-container"
                        role="tooltip"
                        id={ariaId}
                        className={classes.container}
                        style={{
                            width,
                            ...getContainerPosition(position, width),
                        }}
                    >
                        <div
                            className={classnames(classes.arrowWrapper, classNameByPosition[position])}
                            style={getCustomStylesForMobile()}
                        >
                            <div className={classes.arrow} />
                        </div>
                        {(title || description) && (
                            <>
                                {title && <p className={classes.title}>{title}</p>}
                                {description && <p className={classes.description}>{description}</p>}
                            </>
                        )}
                        {children}
                    </div>
                </Portal>
            )}
        </>
    );
};

export default Tooltip;
