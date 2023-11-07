import * as React from 'react';
import {useAriaId, useBoundingRect, useWindowSize} from './hooks';
import {Portal} from './portal';
import {Transition} from 'react-transition-group';
import * as styles from './tooltip.css';
import Stack from './stack';
import {Text2} from './text';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {getCssVarValue, getPrefixedDataAttributes} from './utils/dom';
import {ESC, TAB} from './utils/key-codes';
import {isClientSide} from './utils/environment';
import {isEqual} from './utils/helpers';
import classNames from 'classnames';
import {vars} from './skins/skin-contract.css';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import {combineRefs} from './utils/common';
import {useSetTooltipState, useTooltipState} from './tooltip-context-provider';

import type {BoundingRect} from './hooks';
import type {DataAttributes} from './utils/types';

const getBorderStyle = (isInverse: boolean): React.CSSProperties => {
    return {border: `1px solid ${isInverse ? vars.colors.backgroundContainer : vars.colors.border}`};
};

const TOOLTIP_MAX_WIDTH = 496;
const TOOLTIP_ENTER_TRANSITION_DURATION_IN_MS = 300;
const TOOLTIP_ENTER_TRANSITION_DELAY_IN_MS = 500;
const TOOLTIP_EXIT_TRANSITION_DURATION_IN_MS = 100;
const ARROW_SIZE = 20;
const TOOLTIP_OFFSET_FROM_TARGET = 6;
const TOOLTIP_PADDING_FROM_TARGET = TOOLTIP_OFFSET_FROM_TARGET + ARROW_SIZE / 2 + 1;

type Position = 'top' | 'bottom' | 'left' | 'right';

const getTooltipEnterTransform = (position?: Position) => {
    switch (position) {
        case 'left':
            return `translateX(-${TOOLTIP_OFFSET_FROM_TARGET}px)`;
        case 'right':
            return `translateX(${TOOLTIP_OFFSET_FROM_TARGET}px)`;
        case 'top':
            return `translateY(-${TOOLTIP_OFFSET_FROM_TARGET}px)`;
        case 'bottom':
            return `translateY(${TOOLTIP_OFFSET_FROM_TARGET}px)`;
        default:
            return '';
    }
};

const getElementDimensionsWithoutPadding = (element: HTMLElement) => {
    const horizontalPadding =
        parseFloat(getComputedStyle(element, null).paddingLeft) +
        parseFloat(getComputedStyle(element, null).paddingRight);

    const verticalPadding =
        parseFloat(getComputedStyle(element, null).paddingTop) +
        parseFloat(getComputedStyle(element, null).paddingBottom);

    const width = element.offsetWidth - horizontalPadding;
    const height = element.offsetHeight - verticalPadding;
    return {width, height};
};

const getFinalPosition = (
    targetRect: BoundingRect | undefined,
    tooltip: HTMLElement | undefined | null,
    position: Position,
    windowHeight: number,
    windowWidth: number
): Position | undefined => {
    if (!targetRect || !tooltip) {
        return undefined;
    }
    const {top, bottom, left, right} = targetRect;

    const availableSpaceOnBottom = windowHeight - bottom;
    const availableSpaceOnRight = windowWidth - right;
    const availableSpaceOnTop = top;
    const availableSpaceOnLeft = left;

    const {width, height} = getElementDimensionsWithoutPadding(tooltip);

    const tooltipWidth = width + TOOLTIP_PADDING_FROM_TARGET;
    const tooltipHeight = height + TOOLTIP_PADDING_FROM_TARGET;

    const fitsHorizontal = tooltipWidth <= Math.max(availableSpaceOnLeft, availableSpaceOnRight);
    const fitsVertical = tooltipHeight <= Math.max(availableSpaceOnBottom, availableSpaceOnTop);

    if (!fitsVertical && !fitsHorizontal) {
        return undefined;
    }

    switch (position) {
        case 'left':
            if (fitsHorizontal) {
                return tooltipWidth <= availableSpaceOnLeft ? 'left' : 'right';
            } else {
                return availableSpaceOnBottom > availableSpaceOnTop ? 'bottom' : 'top';
            }

        case 'right':
            if (fitsHorizontal) {
                return tooltipWidth <= availableSpaceOnRight ? 'right' : 'left';
            } else {
                return availableSpaceOnBottom > availableSpaceOnTop ? 'bottom' : 'top';
            }

        case 'top':
            if (fitsVertical) {
                return tooltipHeight <= availableSpaceOnTop ? 'top' : 'bottom';
            } else {
                return availableSpaceOnLeft > availableSpaceOnRight ? 'left' : 'right';
            }

        case 'bottom':
            if (fitsVertical) {
                return tooltipHeight <= availableSpaceOnBottom ? 'bottom' : 'top';
            } else {
                return availableSpaceOnLeft > availableSpaceOnRight ? 'left' : 'right';
            }

        default:
            return undefined;
    }
};

type Props = {
    children?: React.ReactNode;
    extra?: React.ReactNode;
    description?: string;
    target: React.ReactNode;
    title?: string;
    position?: Position;
    width?: number;
    delay?: boolean;
    dataAttributes?: DataAttributes;
    centerContent?: boolean;
    /**
     * @deprecated This field is deprecated.
     */
    targetLabel?: string;
    /**
     * @deprecated This field is deprecated.
     */
    targetStyle?: React.CSSProperties;
    /**
     * @deprecated This field is deprecated.
     */
    unstable_offsetX?: number | string;
    /**
     * @deprecated This field is deprecated, use centerContent instead.
     */
    textCenter?: boolean;
};

const Tooltip: React.FC<Props> = ({
    children,
    extra,
    description,
    target,
    title,
    width,
    position = 'top',
    dataAttributes,
    delay = true,
    centerContent,
}) => {
    const tooltipId = useAriaId();
    const {openTooltipId} = useTooltipState();
    const {open, close} = useSetTooltipState();

    const [tooltipComputedProps, setTooltipComputedProps] = React.useState<{
        left: number;
        top: number;
        padding: string;
    } | null>(null);

    const [arrowComputedProps, setArrowComputedProps] = React.useState<React.CSSProperties>({});

    const targetRef = React.useRef<Element | null>(null);
    const tooltipRef = React.useRef<HTMLDivElement | null>(null);
    const [tooltip, setTooltip] = React.useState<HTMLElement | null>(null);
    const isTouchableDevice = isClientSide() ? window.matchMedia('(pointer: coarse)').matches : false;

    const [isMouseOverTooltip, setIsMouseOverTooltip] = React.useState(false);
    const [isMouseOverTarget, setIsMouseOverTarget] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
    const isInverse = useIsInverseVariant();

    const targetRect = useBoundingRect(targetRef);
    const windowSize = useWindowSize();

    React.useEffect(() => {
        setIsTooltipOpen(tooltipId === openTooltipId);
    }, [tooltipId, openTooltipId]);

    const resetTooltipInteractions = React.useCallback(() => {
        setIsFocused(false);
        setIsMouseOverTooltip(false);
        setIsMouseOverTarget(false);
    }, []);

    React.useEffect(() => {
        if (!isTooltipOpen) {
            resetTooltipInteractions();
        }
    }, [isTooltipOpen, resetTooltipInteractions]);

    React.useEffect(() => {
        if (!tooltip || !isTooltipOpen) {
            return;
        }

        const finalPosition = getFinalPosition(
            targetRect,
            tooltip,
            position,
            windowSize.height,
            windowSize.width
        );

        if (!finalPosition || !targetRect) {
            setTooltipComputedProps(null);
            setArrowComputedProps({});
            resetTooltipInteractions();
            return;
        }

        let tooltipProps: {
            left: number;
            top: number;
            padding: string;
        };

        let arrowProps: React.CSSProperties;

        const {left, right, top, bottom} = targetRect;
        const {width: tooltipWidth, height: tooltipHeight} = getElementDimensionsWithoutPadding(tooltip);

        const maxLeftOffset = windowSize.width - tooltipWidth;
        const maxTopOffset = windowSize.height - tooltipHeight;

        const arrowOffsetFromViewport = parseInt(getCssVarValue(vars.borderRadii.container)) || 8;

        switch (finalPosition) {
            case 'top':
                tooltipProps = {
                    left: Math.max(0, Math.min(maxLeftOffset, (left + right - tooltipWidth) / 2)),
                    top: top - tooltipHeight - ARROW_SIZE / 2,
                    padding: `0px 0px ${TOOLTIP_PADDING_FROM_TARGET}px 0px`,
                };

                break;

            case 'bottom':
                tooltipProps = {
                    left: Math.max(0, Math.min(maxLeftOffset, (left + right - tooltipWidth) / 2)),
                    top: bottom - TOOLTIP_OFFSET_FROM_TARGET,
                    padding: `${TOOLTIP_PADDING_FROM_TARGET}px 0px 0px 0px`,
                };

                break;

            case 'left':
                tooltipProps = {
                    left: left - tooltipWidth - ARROW_SIZE / 2,
                    top: Math.max(0, Math.min(maxTopOffset, (top + bottom - tooltipHeight) / 2)),
                    padding: `0px ${TOOLTIP_PADDING_FROM_TARGET}px 0px 0px`,
                };

                break;

            case 'right':
            default:
                tooltipProps = {
                    left: right - TOOLTIP_OFFSET_FROM_TARGET,
                    top: Math.max(0, Math.min(maxTopOffset, (top + bottom - tooltipHeight) / 2)),
                    padding: `0px 0px 0px ${TOOLTIP_PADDING_FROM_TARGET}px`,
                };

                break;
        }

        switch (finalPosition) {
            case 'top':
                arrowProps = {
                    left: Math.max(
                        arrowOffsetFromViewport,
                        Math.min(
                            windowSize.width - arrowOffsetFromViewport - ARROW_SIZE,
                            (left + right - ARROW_SIZE) / 2
                        )
                    ),
                    top: '100%',
                };

                break;

            case 'bottom':
                arrowProps = {
                    left: Math.max(
                        arrowOffsetFromViewport,
                        Math.min(
                            windowSize.width - arrowOffsetFromViewport - ARROW_SIZE,
                            (left + right - ARROW_SIZE) / 2
                        )
                    ),
                    bottom: '100%',
                    transform: 'rotate(180deg)',
                };

                break;

            case 'left':
                arrowProps = {
                    top: Math.max(
                        arrowOffsetFromViewport,
                        Math.min(
                            windowSize.height - arrowOffsetFromViewport - ARROW_SIZE,
                            (top + bottom - ARROW_SIZE) / 2
                        )
                    ),
                    left: '100%',
                    transform: 'rotate(-90deg)',
                    transformOrigin: 'bottom',
                };

                break;

            case 'right':
            default:
                arrowProps = {
                    top: Math.max(
                        arrowOffsetFromViewport,
                        Math.min(
                            windowSize.height - arrowOffsetFromViewport - ARROW_SIZE,
                            (top + bottom - ARROW_SIZE) / 2
                        )
                    ),
                    right: '100%',
                    transform: 'rotate(90deg)',
                    transformOrigin: 'bottom',
                };

                break;
        }

        if (typeof arrowProps.top === 'number') {
            arrowProps.top -= tooltipProps.top;
        }
        if (typeof arrowProps.left === 'number') {
            arrowProps.left -= tooltipProps.left;
        }

        if (!isEqual(tooltipProps, tooltipComputedProps)) {
            setTooltipComputedProps(tooltipProps);
        }
        if (!isEqual(arrowProps, arrowComputedProps)) {
            setArrowComputedProps(arrowProps);
        }
    }, [
        tooltip,
        targetRect,
        isTooltipOpen,
        position,
        windowSize,
        tooltipComputedProps,
        arrowComputedProps,
        isInverse,
        isTouchableDevice,
        tooltipId,
        resetTooltipInteractions,
    ]);

    const isTabKeyDownRef = React.useRef(false);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.keyCode) {
                case ESC:
                    resetTooltipInteractions();
                    break;
                case TAB:
                    isTabKeyDownRef.current = true;
                    break;
                default:
                // do nothing
            }
        };

        const handleKeyUp = () => (isTabKeyDownRef.current = false);

        const handleOnClick = (e: MouseEvent) => {
            if (
                isTouchableDevice &&
                targetRect &&
                (e.clientX < targetRect.left ||
                    e.clientX > targetRect.right ||
                    e.clientY < targetRect.top ||
                    e.clientY > targetRect.bottom)
            ) {
                resetTooltipInteractions();
            }
        };

        document.addEventListener('keydown', handleKeyDown, false);
        document.addEventListener('keyup', handleKeyUp, false);
        document.addEventListener('click', handleOnClick, false);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
            document.removeEventListener('keyup', handleKeyUp, false);
            document.removeEventListener('click', handleOnClick, false);
        };
    });

    React.useEffect(() => {
        if (isMouseOverTarget || isMouseOverTooltip || isFocused) {
            open(tooltipId);
        } else {
            close(tooltipId);
        }
    }, [isMouseOverTarget, isMouseOverTooltip, isFocused, tooltipId, open, close]);

    const currentPosition = getFinalPosition(
        targetRect,
        tooltip,
        position,
        windowSize.height,
        windowSize.width
    );

    const renderTooltipContent = () => (
        <div
            className={styles.tooltip}
            style={{
                width,
                ...getBorderStyle(isInverse),
            }}
        >
            <div className={classNames(styles.content, centerContent ? styles.tooltipCenter : undefined)}>
                <ThemeVariant isInverse={false}>
                    {(title || description) && (
                        <Stack space={4}>
                            {title && <Text2 medium>{title}</Text2>}
                            {description && <Text2 regular>{description}</Text2>}
                        </Stack>
                    )}
                    {extra || children}
                </ThemeVariant>
            </div>
            <div
                className={styles.arrowContainer}
                style={{
                    ...arrowComputedProps,
                }}
            >
                <div className={classNames(styles.arrow)} style={{...getBorderStyle(isInverse)}} />
            </div>
        </div>
    );

    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
                ref={(element) => {
                    /**
                     * Hack to set the target ref to the target element that was actually passed as prop.
                     * If the target is absolutely positioned and we attach targetRef to the container div instead,
                     * its size will be 0 (and we need the target dimensions to compute the tooltip's position).
                     */
                    const targetElement = element?.firstElementChild;
                    if (targetElement && targetElement !== targetRef.current) {
                        targetRef.current = targetElement;
                    }
                }}
                onMouseOver={() => {
                    if (!isTouchableDevice) {
                        setIsMouseOverTarget(true);
                    }
                }}
                onMouseLeave={() => {
                    if (!isTouchableDevice) {
                        setIsMouseOverTarget(false);
                    }
                }}
                onClick={() => {
                    if (isTouchableDevice) {
                        setIsMouseOverTarget(true);
                    }
                }}
                onFocus={() => {
                    if (isTabKeyDownRef.current) {
                        setIsFocused(true);
                    }
                }}
                onBlur={() => {
                    if (!isTouchableDevice) {
                        setIsFocused(false);
                    }
                }}
                aria-describedby={tooltipId}
            >
                {target}
            </div>

            <Portal>
                <Transition
                    in={isTooltipOpen}
                    nodeRef={tooltipRef}
                    timeout={{
                        enter:
                            TOOLTIP_ENTER_TRANSITION_DURATION_IN_MS +
                            (delay ? TOOLTIP_ENTER_TRANSITION_DELAY_IN_MS : 0),
                        exit: TOOLTIP_EXIT_TRANSITION_DURATION_IN_MS,
                    }}
                    mountOnEnter
                    unmountOnExit
                >
                    {(transitionStatus) => {
                        return (
                            <div
                                style={{
                                    /**
                                     * Hack to prevent text from wrapping automatically when touching the viewport's edges,
                                     * even if the content's width didn't reach the max width.
                                     * https://stackoverflow.com/questions/66106629/how-to-disable-text-wrapping-when-viewport-border-is-reached
                                     */
                                    width: `calc(100vw + ${TOOLTIP_MAX_WIDTH}px)`,
                                    top: 0,
                                    left: 0,
                                    position: 'fixed',
                                    visibility: tooltipComputedProps ? 'visible' : 'hidden',
                                    ...assignInlineVars({
                                        ...(tooltipComputedProps
                                            ? {
                                                  [styles.tooltipVars.top]: `${tooltipComputedProps.top}px`,
                                                  [styles.tooltipVars.left]: `${tooltipComputedProps.left}px`,
                                                  [styles.tooltipVars.padding]: tooltipComputedProps.padding,
                                              }
                                            : {}),

                                        [styles.tooltipVars.delay]: `${
                                            delay ? TOOLTIP_ENTER_TRANSITION_DELAY_IN_MS : 0
                                        }ms`,
                                        [styles.tooltipVars.maxWidth]: `${Math.min(
                                            TOOLTIP_MAX_WIDTH,
                                            windowSize.width
                                        )}px`,
                                        [styles.tooltipVars.enterTransform]:
                                            getTooltipEnterTransform(currentPosition),
                                    }),
                                }}
                                {...getPrefixedDataAttributes(dataAttributes, 'Tooltip')}
                                role="tooltip"
                                aria-label={tooltipId}
                                tabIndex={-1}
                            >
                                <div
                                    className={classNames(
                                        styles.container,
                                        transitionStatus === 'entering'
                                            ? styles.enterTransition
                                            : styles.exitTransition
                                    )}
                                    style={{
                                        pointerEvents: transitionStatus === 'entered' ? 'auto' : 'none',
                                        ...styles.tooltipTransitionClasses[transitionStatus],
                                    }}
                                    ref={combineRefs(setTooltip, tooltipRef)}
                                    onMouseEnter={() => {
                                        if (!isTouchableDevice && transitionStatus === 'entered') {
                                            setIsMouseOverTooltip(true);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (!isTouchableDevice) {
                                            setIsMouseOverTooltip(false);
                                        }
                                    }}
                                >
                                    {renderTooltipContent()}
                                </div>
                            </div>
                        );
                    }}
                </Transition>
            </Portal>
        </>
    );
};

export default Tooltip;
