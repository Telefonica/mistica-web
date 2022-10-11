import * as React from 'react';
import classnames from 'classnames';
import {CSSTransition} from 'react-transition-group';
import {useAriaId, useScreenSize} from './hooks';
import {Portal} from './portal';
import Overlay from './overlay';
import {Text2, Text3} from './text';
import * as key from './utils/key-codes';
import {createUseStyles} from './jss';
import Stack from './stack';

const defaultPositionDesktop = 'bottom';
const defaultPositionMobile = 'top';
const arrowSize = 12;
const distanceToTarget = 4 + arrowSize;
const marginLeftRightMobile = 16;
const defaultWidthDesktop = 340;
const arrowWrapperWidth = arrowSize * 2;
const arrowWrapperHeight = arrowSize;

const transitionDurationMs = 500;
const animationMovement = 12;
const animationTiming = 'cubic-bezier(0.215, 0.61, 0.355, 1)';
const defaultShowTooltipDelayMs = 2000;

const noOp = () => {};

const useStyles = createUseStyles((theme) => {
    const shadowAlpha = theme.isDarkMode ? 1 : 0.2;
    return {
        arrow: {
            position: 'absolute',
            backgroundColor: theme.colors.backgroundContainer,
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
                boxShadow: `0 2px 4px 0 rgba(0, 0, 0, ${shadowAlpha})`,
            },
        },
        arrowRight: {
            right: '100%',
            top: '50%',
            transform: 'translateY(-100%) rotate(90deg)',
            transformOrigin: 'bottom',
            '& > div': {
                boxShadow: `0 0 4px 0 rgba(0, 0, 0, ${shadowAlpha})`,
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
                boxShadow: `0 0 4px 0 rgba(0, 0, 0, ${shadowAlpha})`,
            },
        },
        arrowWrapper: {
            position: 'absolute',
            color: theme.colors.backgroundContainer,
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
            boxShadow: `0 2px 4px 0 rgba(0, 0, 0, ${shadowAlpha})`,
            padding: 8,
            backgroundColor: theme.colors.backgroundContainer,
            zIndex: 12,
            border: `1px solid ${theme.colors.divider}`,
            borderRadius: 8,
        },
    };
});

const useAnimationStyles = createUseStyles(() => ({
    enter: {
        transform: ({position}: {position: Position}) => {
            if (position === 'bottom') {
                return `translateY(${animationMovement}px)`;
            }

            if (position === 'top') {
                return `translateY(calc(-100% - ${animationMovement}px))`;
            }

            if (position === 'right') {
                return `translateX(${animationMovement}px) translateY(-50%)`;
            }

            if (position === 'left') {
                return `translateX(-${animationMovement}px) translateY(-50%)`;
            }

            return `translateY(-${animationMovement}px)`;
        },
    },

    enterActive: {
        animationName: ({position}: {position: Position}) => {
            if (position === 'top') return '$fadeInTop';

            if (position === 'bottom') return '$fadeInBottom';

            return '$fadeInX';
        },
        animationFillMode: 'both',
        animationDuration: `${transitionDurationMs}ms`,
        animationTimingFunction: animationTiming,
    },
    enterDone: {
        transform: ({position}: {position: Position}) => {
            if (position === 'top') return 'translateY(-100%)';
            if (position === 'bottom') return 'translateY(0)';

            return 'translateY(-50%)';
        },
    },

    exit: {
        transform: ({position}: {position: Position}) => {
            if (position === 'bottom') {
                return 'translateY(0)';
            }

            if (position === 'top') {
                return 'translateY(-100%)';
            }

            if (position === 'right') {
                return 'translateX(0px) translateY(-50%)';
            }

            if (position === 'left') {
                return 'translateX(0px) translateY(-50%)';
            }

            return 'translateY(0px)';
        },

        opacity: 1,
        transition: `opacity 0.3s ${animationTiming}`,
    },

    exitActive: {
        animation: `$fadeOut 0.3s ${animationTiming} both`,
    },

    '@keyframes fadeInBottom': {
        from: {opacity: 0},
        '40%': {opacity: 1},
        to: {
            opacity: 1,
            transform: 'translateY(0)',
        },
    },
    '@keyframes fadeInTop': {
        from: {opacity: 0},
        '40%': {opacity: 1},
        to: {
            opacity: 1,
            transform: 'translateY(-100%)',
        },
    },

    '@keyframes fadeInX': {
        from: {opacity: 0},
        '40%': {opacity: 1},
        to: {
            opacity: 1,
            transform: 'translateX(0) translateY(-50%)',
        },
    },

    '@keyframes fadeOut': {from: {opacity: 1}, to: {opacity: 0}},
}));

type Position = 'top' | 'bottom' | 'left' | 'right';

const getWidthDesktop = (customWidth?: number) => (customWidth ? customWidth : defaultWidthDesktop);

type Props = {
    children?: React.ReactNode;
    extra?: React.ReactNode;
    description?: string;
    target: React.ReactNode;
    title?: string;
    position?: Position;
    width?: number;
    targetLabel: string;
    delay?: boolean;
};

const Tooltip: React.FC<Props> = ({
    children,
    extra,
    description,
    target,
    title,
    targetLabel,
    delay = 0,
    ...rest
}) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const {isTabletOrSmaller} = useScreenSize();
    const ariaId = useAriaId();
    const isPointerOver = React.useRef(false);
    const closeTooltipTimeoutId = React.useRef<NodeJS.Timeout | null>(null);
    const showTooltipTimeoutId = React.useRef<NodeJS.Timeout | null>(null);
    const targetRef = React.useRef<HTMLDivElement>(null);
    const targetBoundingClientRect = React.useRef({
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        width: 0,
        height: 0,
    });

    const getPosition = (position: Position = defaultPositionDesktop) =>
        isTabletOrSmaller && (position === 'left' || position === 'right') ? defaultPositionMobile : position;

    const position = getPosition(rest.position);

    const classes = useStyles();
    const animationClasses = useAnimationStyles({position});

    const isTouchableDevice =
        typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false;

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
        setIsVisible(false);
    };

    const toggleVisibility = () => {
        if (!targetRef.current) return;

        targetBoundingClientRect.current = targetRef.current.getBoundingClientRect();
        setIsVisible(!isVisible);
    };

    const handleFocus = () => {
        if (!isVisible) {
            toggleVisibility();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.keyCode === key.TAB) {
            handleClickOutside();
        }
    };

    const getContainerPosition = (position: Position, width: number) => {
        if (typeof window === 'undefined') {
            return {};
        }

        const containerPos = {
            right: {
                left: targetBoundingClientRect.current.right + distanceToTarget,
                top:
                    window.pageYOffset +
                    targetBoundingClientRect.current.top +
                    targetBoundingClientRect.current.height / 2,
            },
            left: {
                left: targetBoundingClientRect.current.left - width - distanceToTarget,
                top:
                    window.pageYOffset +
                    targetBoundingClientRect.current.top +
                    targetBoundingClientRect.current.height / 2,
            },
            top: {
                top: window.pageYOffset + targetBoundingClientRect.current.top - distanceToTarget,
                left: isTabletOrSmaller
                    ? marginLeftRightMobile
                    : window.pageXOffset +
                      targetBoundingClientRect.current.left +
                      targetBoundingClientRect.current.width / 2 -
                      width / 2,
            },
            bottom: {
                top: window.pageYOffset + targetBoundingClientRect.current.bottom + distanceToTarget,
                left: isTabletOrSmaller
                    ? marginLeftRightMobile
                    : window.pageXOffset +
                      targetBoundingClientRect.current.left +
                      targetBoundingClientRect.current.width / 2 -
                      width / 2,
            },
        };
        return containerPos[position];
    };

    const getCustomStylesForMobile = () =>
        isTabletOrSmaller
            ? {
                  left:
                      targetBoundingClientRect.current.left +
                      targetBoundingClientRect.current.width / 2 -
                      marginLeftRightMobile,
              }
            : {};

    const getWidth = () =>
        isTabletOrSmaller ? window.innerWidth - marginLeftRightMobile * 2 : getWidthDesktop(rest.width);

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
                ref={targetRef}
                className={classes.wrapper}
                onPointerOver={() => {
                    if (closeTooltipTimeoutId.current) {
                        clearTimeout(closeTooltipTimeoutId.current);
                        closeTooltipTimeoutId.current = null;
                    }

                    if (isPointerOver.current) return;

                    isPointerOver.current = true;

                    showTooltipTimeoutId.current = setTimeout(
                        () => {
                            showTooltipTimeoutId.current = null;
                            toggleVisibility();
                        },
                        delay ? defaultShowTooltipDelayMs : 0
                    );
                }}
                onPointerLeave={
                    isTouchableDevice
                        ? noOp
                        : () => {
                              if (showTooltipTimeoutId.current) {
                                  clearTimeout(showTooltipTimeoutId.current);
                                  showTooltipTimeoutId.current = null;
                                  isPointerOver.current = false;
                                  return;
                              }

                              closeTooltipTimeoutId.current = setTimeout(() => {
                                  if (!isPointerOver.current) return;
                                  closeTooltipTimeoutId.current = null;
                                  isPointerOver.current = false;
                                  toggleVisibility();
                              }, 100);
                          }
                }
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

            <Portal>
                {isVisible && isTouchableDevice && <Overlay onPress={handleClickOutside} />}
                <CSSTransition
                    in={isVisible}
                    timeout={transitionDurationMs}
                    classNames={{
                        enter: animationClasses.enter,
                        enterActive: animationClasses.enterActive,
                        enterDone: animationClasses.enterDone,

                        exit: animationClasses.exit,
                        exitActive: animationClasses.exitActive,
                    }}
                    unmountOnExit
                >
                    <div
                        role="tooltip"
                        id={ariaId}
                        className={classes.container}
                        style={{
                            width,
                            ...getContainerPosition(position, width),
                        }}
                        onPointerOver={() => {
                            if (closeTooltipTimeoutId.current) {
                                clearTimeout(closeTooltipTimeoutId.current);
                                closeTooltipTimeoutId.current = null;
                            }
                        }}
                        onPointerLeave={
                            isTouchableDevice
                                ? noOp
                                : () => {
                                      closeTooltipTimeoutId.current = setTimeout(() => {
                                          if (!isPointerOver.current) return;

                                          closeTooltipTimeoutId.current = null;
                                          isPointerOver.current = false;
                                          toggleVisibility();
                                      }, 100);
                                  }
                        }
                    >
                        <div
                            className={classnames(classes.arrowWrapper, classNameByPosition[position])}
                            style={getCustomStylesForMobile()}
                        >
                            <div className={classes.arrow} />
                        </div>
                        {(title || description) && (
                            <Stack space={4}>
                                {title && <Text2 medium>{title}</Text2>}
                                {description && <Text2 regular>{description}</Text2>}
                            </Stack>
                        )}
                        {extra || children}
                    </div>
                </CSSTransition>
            </Portal>
        </>
    );
};

export default Tooltip;
