import * as React from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { useAriaId, useScreenSize, useTheme } from './hooks';
import { Portal } from './portal';
import Overlay from './overlay';
import { Text2 } from './text';
import * as key from './utils/key-codes';
import Stack from './stack';
import * as styles from './tooltip.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { getPrefixedDataAttributes } from './utils/dom';

import type { DataAttributes } from './utils/types';

const defaultPositionDesktop = 'bottom';
const defaultPositionMobile = 'top';
const arrowSize = 12;
const distanceToTarget = 4 + arrowSize;
const transitionDurationMs = 500;
const animationMovement = 12;
const defaultShowTooltipDelayMs = 500;

const noOp = () => { };

type Position = 'top' | 'bottom' | 'left' | 'right';

const getWidthTooltip = (customWidth?: number) => (customWidth ? customWidth : '');

const getEnterTransform = (position: Position) => {
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
};

const getEnterDoneTransform = (position: Position) => {
    if (position === 'top') return 'translateY(-100%)';
    if (position === 'bottom') return 'translateY(0)';
    return 'translateY(-50%)';
};

const getExitTransform = (position: Position) => {
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
};

const getEnterActiveAnimationName = (position: Position) => {
    if (position === 'top') return styles.fadeInTopKeyframes;
    if (position === 'bottom') return styles.fadeInBottomKeyframes;
    return styles.fadeInXKeyframes;
};

const getShadowAlpha = (isDarkMode: boolean) => {
    return isDarkMode ? '1' : '0.2';
};

const getArrowBoxShadow = (position: Position) => {
    if (position === 'top') {
        return `2px 2px 4px 0 rgba(0, 0, 0, ${styles.vars.shadowAlpha})`;
    }
    if (position === 'right') {
        return `0 0 4px 0 rgba(0, 0, 0, ${styles.vars.shadowAlpha})`;
    }
    if (position === 'left') {
        return `0 0 4px 0 rgba(0, 0, 0, ${styles.vars.shadowAlpha})`;
    }
    if (position === 'bottom') {
        return `-1px -1px 4px 0 rgba(0, 0, 0, ${styles.vars.shadowAlpha})`;
    }
    return '';
};

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
    dataAttributes?: DataAttributes;
    fullWidth?: boolean;
    justifyContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
};

const Tooltip: React.FC<Props> = ({
    children,
    extra,
    description,
    target,
    title,
    targetLabel,
    delay = true,
    dataAttributes,
    justifyContent = 'left',
    fullWidth,
    ...rest
}) => {
    const { isDarkMode } = useTheme();
    const [isVisible, setIsVisible] = React.useState(false);
    const { isTabletOrSmaller } = useScreenSize();
    const ariaId = useAriaId();
    const isPointerOver = React.useRef(false);
    const closeTooltipTimeoutId = React.useRef<NodeJS.Timeout | null>(null);
    const showTooltipTimeoutId = React.useRef<NodeJS.Timeout | null>(null);
    const targetRef = React.useRef<HTMLDivElement>(null);
    const tooltipRef = React.useRef<HTMLDivElement>(null);
    const targetBoundingClientRect = React.useRef({
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        width: 0,
        height: 0,
    });

    const [containerPosition, setContainerPosition] = React.useState({});

    const getPosition = (position: Position = defaultPositionDesktop) =>
        isTabletOrSmaller && (position === 'left' || position === 'right') ? defaultPositionMobile : position;

    const position = getPosition(rest.position);

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

    const getContainerPosition = React.useCallback((position: Position, width: number) => {
        if (typeof window === 'undefined' || !tooltipRef.current) {
            return {};
        }

        const tooltipBoundingClientRect = tooltipRef.current.getBoundingClientRect();

        const containerPos = {
            right: {
                left: targetBoundingClientRect.current.right + distanceToTarget,
                top:
                    window.pageYOffset +
                    targetBoundingClientRect.current.top +
                    targetBoundingClientRect.current.height / 2,
            },
            left: {
                left: !width
                    ? targetBoundingClientRect.current.left -
                    tooltipBoundingClientRect.width -
                    distanceToTarget
                    : targetBoundingClientRect.current.left - width - distanceToTarget,
                top:
                    window.pageYOffset +
                    targetBoundingClientRect.current.top +
                    targetBoundingClientRect.current.height / 2,
            },
            top: {
                top: window.pageYOffset + targetBoundingClientRect.current.top - distanceToTarget,
                left: !width
                    ? window.pageXOffset +
                    targetBoundingClientRect.current.left +
                    targetBoundingClientRect.current.width / 2 -
                    tooltipBoundingClientRect.width / 2
                    :
                    window.pageXOffset +
                    targetBoundingClientRect.current.left +
                    targetBoundingClientRect.current.width / 2 -
                    width / 2,
            },
            bottom: {
                top: window.pageYOffset + targetBoundingClientRect.current.bottom + distanceToTarget,
                left: !width
                    ? window.pageXOffset +
                    targetBoundingClientRect.current.left +
                    targetBoundingClientRect.current.width / 2 -
                    tooltipBoundingClientRect.width / 2
                    :
                    window.pageXOffset +
                    targetBoundingClientRect.current.left +
                    targetBoundingClientRect.current.width / 2 -
                    width / 2,
            },
        };

        return containerPos[position];
    }, []);


    const getWidth = () =>
        getWidthTooltip(rest.width);
    const width = getWidth();

    const arrowClassNameByPosition = {
        top: styles.arrowTop,
        bottom: styles.arrowBottom,
        left: styles.arrowLeft,
        right: styles.arrowRight,
    };

    const vars = assignInlineVars({
        [styles.vars.enterTransform]: getEnterTransform(position),
        [styles.vars.exitTransform]: getExitTransform(position),
        [styles.vars.enterActiveAnimationName]: getEnterActiveAnimationName(position),
        [styles.vars.enterDoneTransform]: getEnterDoneTransform(position),
        [styles.vars.shadowAlpha]: getShadowAlpha(isDarkMode),
        [styles.vars.arrowBoxShadow]: getArrowBoxShadow(position),
    });

    React.useEffect(() => {
        if (tooltipRef.current && isVisible) {
            const widthAux = width ? width : 0;
            setContainerPosition(getContainerPosition(position, widthAux));
        }
    }, [isVisible, getContainerPosition, position, width]);

    return (
        <>
            <div
                style={{ width: fullWidth ? '100%' : '' }}
                ref={targetRef}
                className={styles.wrapper}
                onPointerOver={() => {
                    if (closeTooltipTimeoutId.current) {
                        clearTimeout(closeTooltipTimeoutId.current);
                        closeTooltipTimeoutId.current = null;
                    }

                    if (isPointerOver.current) return;

                    isPointerOver.current = true;

                    if (delay) {
                        showTooltipTimeoutId.current = setTimeout(() => {
                            showTooltipTimeoutId.current = null;
                            toggleVisibility();
                        }, defaultShowTooltipDelayMs);
                    } else {
                        toggleVisibility();
                    }
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
                        enter: styles.enter,
                        enterActive: styles.enterActive,
                        enterDone: styles.enterDone,
                        exit: styles.exit,
                        exitActive: styles.exitActive,
                    }}
                    unmountOnExit
                >
                    <div
                        ref={tooltipRef}
                        {...getPrefixedDataAttributes(dataAttributes, 'Tooltip')}
                        role="tooltip"
                        id={ariaId}
                        className={styles.container}
                        style={{
                            width,
                            ...containerPosition,
                            justifyContent,
                            ...vars,
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
                            className={classnames(styles.arrowWrapper, arrowClassNameByPosition[position])}
                        >
                            <div className={styles.arrow} />
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
