import * as React from 'react';
import classnames from 'classnames';
import {CSSTransition} from 'react-transition-group';
import {useAriaId, useScreenSize, useTheme} from './hooks';
import {Portal} from './portal';
import Overlay from './overlay';
import {Text2} from './text';
import * as key from './utils/key-codes';
import Stack from './stack';
import * as styles from './tooltip.css';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {getPrefixedDataAttributes} from './utils/dom';
import {isClientSide, isServerSide} from './utils/environment';

import type {DataAttributes} from './utils/types';

const defaultPositionDesktop = 'bottom';
const defaultPositionMobile = 'top';
const arrowSize = 12;
const distanceToTarget = 4 + arrowSize;
const transitionDurationMs = 500;
const animationMovement = 12;
const defaultShowTooltipDelayMs = 500;

const noOp = () => {};

type Position = 'top' | 'bottom' | 'left' | 'right';

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
    targetStyle?: React.CSSProperties;
    changedPosition?: string;
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
    targetStyle,
    changedPosition,
    ...rest
}) => {
    const {isDarkMode} = useTheme();
    const [isVisible, setIsVisible] = React.useState(false);
    const {isTabletOrSmaller} = useScreenSize();
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

    const getPosition = React.useCallback(
        (position: Position | undefined) =>
            isTabletOrSmaller ? position || defaultPositionMobile : position || defaultPositionDesktop,
        [isTabletOrSmaller]
    );

    const [tooltipClientRect, setTooltipClientRect] = React.useState<DOMRect | undefined>(undefined);

    const tooltipBoundingClientRect = React.useCallback(() => {
        if (!tooltipRef.current) return undefined;

        return tooltipRef.current.getBoundingClientRect();
    }, []);

    const hasRightSpace = React.useCallback(() => {
        if (!tooltipClientRect) return undefined;

        return targetBoundingClientRect.current.right + tooltipClientRect.width > window.innerWidth;
    }, [tooltipClientRect]);

    const hasLeftSpace = React.useCallback(() => {
        if (!tooltipClientRect) return undefined;

        return targetBoundingClientRect.current.left < tooltipClientRect.width;
    }, [tooltipClientRect]);

    const validatePosition = React.useCallback(
        (position: Position) => {
            if (!tooltipClientRect) return position;

            const validatePositionLeft = (position: Position) => {
                const hasTopSpace = targetBoundingClientRect.current.top > tooltipClientRect.height;
                return hasLeftSpace() ? (hasTopSpace ? 'top' : 'bottom') : position;
            };

            const alternativePosition = (position: Position) => {
                return hasRightSpace() ? validatePositionLeft('left') : position;
            };

            const positionValidated = {
                top:
                    targetBoundingClientRect.current.top < tooltipClientRect.height
                        ? alternativePosition('bottom')
                        : alternativePosition(position),
                right: alternativePosition(position),
                left:
                    targetBoundingClientRect.current.left < tooltipClientRect.width
                        ? hasRightSpace()
                            ? targetBoundingClientRect.current.top < tooltipClientRect.height
                                ? 'bottom'
                                : 'top'
                            : 'right'
                        : position,
                bottom:
                    targetBoundingClientRect.current.bottom + tooltipClientRect.height > window.innerHeight
                        ? alternativePosition('top')
                        : alternativePosition(position),
            };

            return positionValidated[position];
        },
        [hasLeftSpace, hasRightSpace, tooltipClientRect]
    );

    const [position, setPosition] = React.useState<Position | undefined>(rest.position);

    React.useEffect(() => {
        setPosition(validatePosition(getPosition(rest.position)));
    }, [getPosition, rest.position, validatePosition]);

    const isTouchableDevice = isClientSide() ? window.matchMedia('(pointer: coarse)').matches : false;

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

    const getArrowStyles = (position: Position) => {
        if (!tooltipClientRect) {
            return {};
        }

        const arrowPosition =
            tooltipClientRect.width > targetBoundingClientRect.current.width &&
            targetBoundingClientRect.current.left + targetBoundingClientRect.current.width / 2 <
                tooltipClientRect.width / 2 + 16
                ? targetBoundingClientRect.current.width / 2
                : '50%';
        const aux = position === 'bottom' || position === 'top' ? {left: arrowPosition} : {};

        return aux;
    };

    const getContainerPosition = React.useCallback(
        (position: Position, width: number) => {
            if (isServerSide() || !tooltipClientRect) {
                return {};
            }

            const tooltipMarginFix =
                tooltipClientRect.width > targetBoundingClientRect.current.width &&
                targetBoundingClientRect.current.left + targetBoundingClientRect.current.width / 2 <
                    tooltipClientRect.width / 2 + 16
                    ? Math.round(tooltipClientRect.width / 2 - targetBoundingClientRect.current.width / 2)
                    : 0;

            const bottomAdjustment = changedPosition
                ? changedPosition
                : !width
                ? window.pageXOffset +
                  targetBoundingClientRect.current.left +
                  tooltipMarginFix +
                  targetBoundingClientRect.current.width / 2 -
                  tooltipClientRect.width / 2
                : window.pageXOffset +
                  targetBoundingClientRect.current.left +
                  targetBoundingClientRect.current.width / 2 -
                  width / 2;

            const leftAdjustment = hasLeftSpace()
                ? bottomAdjustment
                : !width
                ? targetBoundingClientRect.current.left - tooltipClientRect.width - distanceToTarget
                : targetBoundingClientRect.current.left - width - distanceToTarget;

            const topAdjustment = hasLeftSpace()
                ? targetBoundingClientRect.current.top < tooltipClientRect.height
                    ? window.pageYOffset + targetBoundingClientRect.current.bottom + distanceToTarget
                    : window.pageYOffset + targetBoundingClientRect.current.top - distanceToTarget
                : changedPosition
                ? changedPosition
                : window.pageYOffset +
                  targetBoundingClientRect.current.top +
                  targetBoundingClientRect.current.height / 2;

            const containerPos = {
                right: {
                    left: hasRightSpace()
                        ? leftAdjustment
                        : targetBoundingClientRect.current.right + distanceToTarget,
                    top: hasRightSpace()
                        ? topAdjustment
                        : changedPosition
                        ? changedPosition
                        : window.pageYOffset +
                          targetBoundingClientRect.current.top +
                          targetBoundingClientRect.current.height / 2,
                },
                left: {
                    left: leftAdjustment,
                    top: topAdjustment,
                },
                top: {
                    top: hasRightSpace()
                        ? topAdjustment
                        : window.pageYOffset + targetBoundingClientRect.current.top - distanceToTarget,

                    left: hasRightSpace() ? leftAdjustment : bottomAdjustment,
                },
                bottom: {
                    top: hasRightSpace()
                        ? topAdjustment
                        : window.pageYOffset + targetBoundingClientRect.current.bottom + distanceToTarget,
                    left: hasRightSpace() ? leftAdjustment : bottomAdjustment,
                },
            };

            return containerPos[position];
        },
        [changedPosition, hasLeftSpace, hasRightSpace, tooltipClientRect]
    );

    const getWidth = () => rest.width;
    const width = getWidth();

    const arrowClassNameByPosition = {
        top: styles.arrowTop,
        bottom: styles.arrowBottom,
        left: styles.arrowLeft,
        right: styles.arrowRight,
    };

    const vars =
        position &&
        assignInlineVars({
            [styles.vars.enterTransform]: getEnterTransform(position),
            [styles.vars.exitTransform]: getExitTransform(position),
            [styles.vars.enterActiveAnimationName]: getEnterActiveAnimationName(position),
            [styles.vars.enterDoneTransform]: getEnterDoneTransform(position),
            [styles.vars.shadowAlpha]: getShadowAlpha(isDarkMode),
            [styles.vars.arrowBoxShadow]: getArrowBoxShadow(position),
        });

    React.useEffect(() => {
        if (position && tooltipRef.current && isVisible) {
            const widthAux = width ? width : 0;
            setContainerPosition(getContainerPosition(position, widthAux));
        }
    }, [isVisible, getContainerPosition, position, width]);

    React.useEffect(() => {
        if (isVisible) {
            setTooltipClientRect(tooltipBoundingClientRect);
        }
    }, [isVisible, tooltipBoundingClientRect]);

    return (
        <>
            <div
                ref={targetRef}
                style={targetStyle}
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
                // eslint-disable-next-line react/no-unknown-property
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
                        className={classnames(styles.container, styles.textAlign)}
                        style={{
                            width,
                            ...containerPosition,
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
                            style={getArrowStyles(getPosition(position))}
                            className={classnames(
                                styles.arrowWrapper,
                                arrowClassNameByPosition[getPosition(position)]
                            )}
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
