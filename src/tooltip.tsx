'use client';
import * as React from 'react';
import {useBoundingRect, useTheme, useWindowSize} from './hooks';
import {Portal} from './portal';
import {Transition} from 'react-transition-group';
import * as styles from './tooltip.css';
import Stack from './stack';
import {Text2} from './text';
import {getCssVarValue} from './utils/dom';
import {ESC, TAB} from './utils/keys';
import {isTouchableDevice} from './utils/environment';
import {isEqual} from './utils/helpers';
import classNames from 'classnames';
import {vars} from './skins/skin-contract.css';
import {ThemeVariant, useIsInverseOrMediaVariant} from './theme-variant-context';
import {combineRefs} from './utils/common';
import {useSetTooltipState, useTooltipState} from './tooltip-context-provider';
import {isRunningAcceptanceTest} from './utils/platform';
import {IconButton} from './icon-button';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import * as tokens from './text-tokens';

import type {BoundingRect} from './hooks';
import type {DataAttributes, TrackingEvent} from './utils/types';

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
    targetStyle?: React.CSSProperties;
    title?: string;
    position?: Position;
    width?: number;
    delay?: boolean;
    dataAttributes?: DataAttributes;
    centerContent?: boolean;
    open?: boolean;
};

type BaseTooltipProps = {
    content?: React.ReactNode;
    target: React.ReactNode;
    targetStyle?: React.CSSProperties;
    position?: Position;
    width?: number;
    delay?: boolean;
    dataAttributes?: DataAttributes;
    centerContent?: boolean;
    open?: boolean;
    hasPointerInteractionOnly?: boolean;
    onClose?: () => void;
    closeButtonLabel?: string;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
};

export const BaseTooltip = ({
    content,
    target,
    targetStyle,
    width,
    position = 'top',
    dataAttributes,
    delay = true,
    centerContent,
    open,
    onClose,
    closeButtonLabel,
    hasPointerInteractionOnly = false,
    trackingEvent,
}: BaseTooltipProps): JSX.Element => {
    const {texts, t} = useTheme();
    const tooltipId = React.useId();
    const {openTooltipId} = useTooltipState();
    const {openTooltip, closeTooltip} = useSetTooltipState();

    const [tooltipComputedStyles, setTooltipComputedStyles] = React.useState<React.CSSProperties>();

    const [arrowComputedStyles, setArrowComputedStyles] = React.useState<React.CSSProperties>();

    const targetRef = React.useRef<Element | null>(null);
    const tooltipRef = React.useRef<HTMLDivElement | null>(null);
    const [tooltip, setTooltip] = React.useState<HTMLElement | null>(null);
    const isTouchable = isTouchableDevice();
    const tooltipEnterDelay = delay ? TOOLTIP_ENTER_TRANSITION_DELAY_IN_MS : 0;

    const [isMouseOverTooltip, setIsMouseOverTooltip] = React.useState(false);
    const [isMouseOverTarget, setIsMouseOverTarget] = React.useState(false);

    const hasControlledValue = open !== undefined;
    const [isFocused, setIsFocused] = React.useState(false);
    const isTooltipOpen = hasControlledValue ? open : tooltipId === openTooltipId;
    const isInverse = useIsInverseOrMediaVariant();

    const targetRect = useBoundingRect(targetRef, isTooltipOpen);
    const tooltipRect = useBoundingRect(tooltipRef, isTooltipOpen, true);
    const windowSize = useWindowSize();

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
            setTooltipComputedStyles(undefined);
            setArrowComputedStyles(undefined);
            resetTooltipInteractions();
            return;
        }

        let tooltipStyles: React.CSSProperties;
        let arrowStyles: React.CSSProperties;

        const {left, right, top, bottom} = targetRect;
        const {width: tooltipWidth, height: tooltipHeight} = getElementDimensionsWithoutPadding(tooltip);

        const maxLeftOffset = windowSize.width - tooltipWidth;
        const maxTopOffset = windowSize.height - tooltipHeight;

        const arrowOffsetFromViewport = parseInt(getCssVarValue(vars.borderRadii.popup)) ?? 8;

        switch (finalPosition) {
            case 'top':
                tooltipStyles = {
                    left: Math.max(0, Math.min(maxLeftOffset, (left + right - tooltipWidth) / 2)),
                    top: top - tooltipHeight - ARROW_SIZE / 2,
                    padding: `0px 0px ${TOOLTIP_PADDING_FROM_TARGET}px 0px`,
                };

                arrowStyles = {
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
                tooltipStyles = {
                    left: Math.max(0, Math.min(maxLeftOffset, (left + right - tooltipWidth) / 2)),
                    top: bottom - TOOLTIP_OFFSET_FROM_TARGET,
                    padding: `${TOOLTIP_PADDING_FROM_TARGET}px 0px 0px 0px`,
                };

                arrowStyles = {
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
                tooltipStyles = {
                    left: left - tooltipWidth - ARROW_SIZE / 2,
                    top: Math.max(0, Math.min(maxTopOffset, (top + bottom - tooltipHeight) / 2)),
                    padding: `0px ${TOOLTIP_PADDING_FROM_TARGET}px 0px 0px`,
                };

                arrowStyles = {
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
                tooltipStyles = {
                    left: right - TOOLTIP_OFFSET_FROM_TARGET,
                    top: Math.max(0, Math.min(maxTopOffset, (top + bottom - tooltipHeight) / 2)),
                    padding: `0px 0px 0px ${TOOLTIP_PADDING_FROM_TARGET}px`,
                };

                arrowStyles = {
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

        /**
         * Using numbers for top/left positions of arrow element was causing the arrow to
         * be misaligned by +/- 1 pixel in some cases. Using percentages works better when
         * dealing with decimals for some reason.
         */
        if (typeof arrowStyles.top === 'number') {
            arrowStyles.top -= tooltipStyles.top as number;
            arrowStyles.top = `${(arrowStyles.top / tooltipHeight) * 100}%`;
        }
        if (typeof arrowStyles.left === 'number') {
            arrowStyles.left -= tooltipStyles.left as number;
            arrowStyles.left = `${(arrowStyles.left / tooltipWidth) * 100}%`;
        }

        if (!isEqual(tooltipStyles, tooltipComputedStyles)) {
            setTooltipComputedStyles(tooltipStyles);
        }
        if (!isEqual(arrowStyles, arrowComputedStyles)) {
            setArrowComputedStyles(arrowStyles);
        }
    }, [
        tooltip,
        targetRect,
        tooltipRect,
        isTooltipOpen,
        position,
        windowSize,
        tooltipComputedStyles,
        arrowComputedStyles,
        isInverse,
        isTouchable,
        tooltipId,
        resetTooltipInteractions,
    ]);

    const isTabKeyDownRef = React.useRef(false);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case ESC:
                    if (!hasPointerInteractionOnly) {
                        resetTooltipInteractions();
                    }
                    break;
                case TAB:
                    isTabKeyDownRef.current = true;
                    break;
                default:
                // do nothing
            }
        };

        const handleKeyUp = () => (isTabKeyDownRef.current = false);

        // click outside the target when tooltip is closed
        const handleOnClick = (e: MouseEvent) => {
            if (
                !hasPointerInteractionOnly &&
                isTouchable &&
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
    }, [isTouchable, resetTooltipInteractions, targetRect, hasPointerInteractionOnly]);

    React.useEffect(() => {
        if (!hasControlledValue) {
            if (isMouseOverTarget || isMouseOverTooltip || isFocused) {
                openTooltip(tooltipId);
            } else {
                closeTooltip(tooltipId);
            }
        }
    }, [
        isMouseOverTarget,
        isMouseOverTooltip,
        isFocused,
        tooltipId,
        openTooltip,
        closeTooltip,
        hasControlledValue,
    ]);

    const currentPosition = getFinalPosition(
        targetRect,
        tooltip,
        position,
        windowSize.height,
        windowSize.width
    );

    // by default, center content only if tooltip has minimum possible width
    const hasCenteredContent =
        centerContent !== undefined ? centerContent : tooltipRect?.width === styles.CONTENT_MIN_WIDTH;

    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
                style={targetStyle}
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
                    if (!isTouchable && !hasPointerInteractionOnly) {
                        setIsMouseOverTarget(true);
                    }
                }}
                onMouseLeave={() => {
                    if (!isTouchable && !hasPointerInteractionOnly) {
                        setIsMouseOverTarget(false);
                    }
                }}
                onClick={() => {
                    if (isTouchable || hasPointerInteractionOnly) {
                        // if hasPointerInteractionOnly is true, pressing on the target should switch the state of the tooltip
                        setIsMouseOverTarget(hasPointerInteractionOnly ? !isMouseOverTarget : true);
                    }
                }}
                onFocus={() => {
                    if (isTabKeyDownRef.current && !hasPointerInteractionOnly) {
                        setIsFocused(true);
                    }
                }}
                onBlur={() => {
                    if (!isTouchable && !hasPointerInteractionOnly) {
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
                    timeout={
                        isRunningAcceptanceTest()
                            ? 0
                            : {
                                  enter: TOOLTIP_ENTER_TRANSITION_DURATION_IN_MS + tooltipEnterDelay,
                                  exit: TOOLTIP_EXIT_TRANSITION_DURATION_IN_MS,
                              }
                    }
                    onExited={() => {
                        setTooltipComputedStyles(undefined);
                        setArrowComputedStyles(undefined);
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
                                    visibility: tooltipComputedStyles ? 'visible' : 'hidden',
                                }}
                                {...dataAttributes}
                                role="tooltip"
                                aria-label={tooltipId}
                                tabIndex={-1}
                            >
                                <div
                                    className={classNames(styles.container)}
                                    style={{
                                        pointerEvents: transitionStatus === 'entered' ? 'auto' : 'none',
                                        transform: getTooltipEnterTransform(currentPosition),
                                        ...tooltipComputedStyles,
                                        ...styles.tooltipTransitionClasses[transitionStatus],
                                        transition:
                                            transitionStatus === 'entering'
                                                ? `opacity .1s linear ${tooltipEnterDelay}ms,transform .3s cubic-bezier(0.215,0.61,0.335,1) ${tooltipEnterDelay}ms`
                                                : `opacity .1s linear`,
                                    }}
                                    ref={combineRefs(setTooltip, tooltipRef)}
                                    onMouseEnter={() => {
                                        if (
                                            !isTouchable &&
                                            transitionStatus === 'entered' &&
                                            !hasPointerInteractionOnly
                                        ) {
                                            setIsMouseOverTooltip(true);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (!isTouchable && !hasPointerInteractionOnly) {
                                            setIsMouseOverTooltip(false);
                                        }
                                    }}
                                >
                                    <div
                                        className={styles.tooltip}
                                        style={{
                                            width,
                                            ...getBorderStyle(isInverse),
                                            maxWidth: Math.min(TOOLTIP_MAX_WIDTH, windowSize.width),
                                        }}
                                    >
                                        <div
                                            className={classNames(styles.contentContainer, {
                                                [styles.tooltipCenter]: hasCenteredContent,
                                            })}
                                        >
                                            <ThemeVariant isInverse={false}>
                                                {content}

                                                {onClose && (
                                                    <div className={styles.closeButtonIcon}>
                                                        <IconButton
                                                            onPress={() => {
                                                                setIsMouseOverTarget(false);
                                                                onClose();
                                                            }}
                                                            trackingEvent={trackingEvent}
                                                            aria-label={
                                                                closeButtonLabel ||
                                                                texts.closeButtonLabel ||
                                                                t(tokens.closeButtonLabel)
                                                            }
                                                            Icon={IconCloseRegular}
                                                            small
                                                        />
                                                    </div>
                                                )}
                                            </ThemeVariant>
                                        </div>
                                        <div className={styles.arrowContainer} style={arrowComputedStyles}>
                                            <div
                                                className={classNames(styles.arrow)}
                                                style={getBorderStyle(isInverse)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                </Transition>
            </Portal>
        </>
    );
};

const Tooltip = ({
    centerContent,
    extra,
    children,
    dataAttributes,
    title,
    description,
    ...props
}: Props): JSX.Element => {
    return (
        <BaseTooltip
            content={
                <div className={styles.content}>
                    {(title || description) && (
                        <Stack space={4}>
                            {title && <Text2 medium>{title}</Text2>}
                            {description && <Text2 regular>{description}</Text2>}
                        </Stack>
                    )}
                    {extra ?? children}
                </div>
            }
            centerContent={centerContent}
            dataAttributes={{'component-name': 'Tooltip', ...dataAttributes}}
            {...props}
        />
    );
};

export default Tooltip;
