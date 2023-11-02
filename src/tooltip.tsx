import * as React from 'react';
import {useAriaId, useBoundingRect, useWindowSize} from './hooks';
import {Portal} from './portal';
import {CSSTransition} from 'react-transition-group';
import * as styles from './tooltip.css';
import Stack from './stack';
import {Text2} from './text';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {getCssVarValue, getPrefixedDataAttributes} from './utils/dom';
import {ESC} from './utils/key-codes';
import {isClientSide} from './utils/environment';
import Overlay from './overlay';
import {isEqual} from './utils/helpers';
import classNames from 'classnames';
import {vars} from './skins/skin-contract.css';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import {combineRefs} from './utils/common';
import {sprinkles} from './sprinkles.css';

import type {BoundingRect} from './hooks';
import type {DataAttributes} from './utils/types';

const getBorderStyle = (isInverse: boolean) => {
    return sprinkles({border: isInverse ? 'none' : 'regular'});
};

const TOOLTIP_MAX_WIDTH = 496;
const TOOLTIP_ENTER_TRANSITION_DURATION_IN_MS = 500;
const TOOLTIP_ENTER_TRANSITION_DELAY_IN_MS = 500;
const TOOLTIP_EXIT_TRANSITION_DURATION_IN_MS = 300;
const TOOLTIP_OFFSET_FROM_TARGET = 8;
const ARROW_SIZE = 12;

type Position = 'top' | 'bottom' | 'left' | 'right';

const getTooltipEnterTransform = (position?: Position) => {
    switch (position) {
        case 'left':
            return 'translateX(8px)';
        case 'right':
            return 'translateX(-8px)';
        case 'top':
            return 'translateY(8px)';
        case 'bottom':
            return 'translateY(-8px)';
        default:
            return '';
    }
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
    const tooltipWidth = tooltip.offsetWidth + TOOLTIP_OFFSET_FROM_TARGET;
    const tooltipHeight = tooltip.offsetHeight + TOOLTIP_OFFSET_FROM_TARGET;
    const {top, bottom, left, right} = targetRect;

    const availableSpaceOnBottom = windowHeight - bottom;
    const availableSpaceOnRight = windowWidth - right;
    const availableSpaceOnTop = top;
    const availableSpaceOnLeft = left;

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
    targetLabel: string;
    delay?: boolean;
    dataAttributes?: DataAttributes;
    targetStyle?: React.CSSProperties;
    textCenter?: boolean;
};

const Tooltip: React.FC<Props> = ({
    children,
    extra,
    description,
    target,
    targetStyle,
    title,
    targetLabel,
    width,
    position = 'top',
    dataAttributes,
    delay = true,
    textCenter,
}) => {
    const ariaLabel = useAriaId();
    const [tooltipComputedProps, setTooltipComputedProps] = React.useState<{
        left: number;
        top: number;
        padding: string;
    } | null>(null);

    const [arrowComputedProps, setArrowComputedProps] = React.useState<{
        left: number;
        top: number;
        borderStyle?: string;
    } | null>(null);

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
        if (!tooltip || !targetRect || !isTooltipOpen) {
            return;
        }

        const finalPosition = getFinalPosition(
            targetRect,
            tooltip,
            position,
            windowSize.height,
            windowSize.width
        );

        if (!finalPosition) {
            setTooltipComputedProps(null);
            setArrowComputedProps(null);
            return;
        }

        let tooltipProps: {
            left: number;
            top: number;
            padding: string;
        };

        let arrowProps: {
            left: number;
            top: number;
            borderStyle?: string;
        };

        const {left, right, top, bottom} = targetRect;
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;

        const maxLeftOffset = windowSize.width - tooltipWidth;
        const maxTopOffset = windowSize.height - tooltipHeight;

        const arrowOffsetFromViewport =
            ARROW_SIZE + (parseInt(getCssVarValue(vars.borderRadii.container)) || 8);

        switch (finalPosition) {
            case 'top':
                tooltipProps = {
                    left: Math.max(0, Math.min(maxLeftOffset, (left + right - tooltipWidth) / 2)),
                    top: top - tooltipHeight,
                    padding: `0px 0px ${TOOLTIP_OFFSET_FROM_TARGET}px 0px`,
                };

                break;

            case 'bottom':
                tooltipProps = {
                    left: Math.max(0, Math.min(maxLeftOffset, (left + right - tooltipWidth) / 2)),
                    top: bottom,
                    padding: `${TOOLTIP_OFFSET_FROM_TARGET}px 0px 0px 0px`,
                };

                break;

            case 'left':
                tooltipProps = {
                    left: left - tooltipWidth,
                    top: Math.max(0, Math.min(maxTopOffset, (top + bottom - tooltipHeight) / 2)),
                    padding: `0px ${TOOLTIP_OFFSET_FROM_TARGET}px 0px 0px`,
                };

                break;

            case 'right':
            default:
                tooltipProps = {
                    left: right,
                    top: Math.max(0, Math.min(maxTopOffset, (top + bottom - tooltipHeight) / 2)),
                    padding: `0px 0px 0px ${TOOLTIP_OFFSET_FROM_TARGET}px`,
                };

                break;
        }

        switch (finalPosition) {
            case 'top':
                arrowProps = {
                    left: Math.max(
                        arrowOffsetFromViewport,
                        Math.min(windowSize.width - arrowOffsetFromViewport, (left + right - ARROW_SIZE) / 2)
                    ),
                    top: top - TOOLTIP_OFFSET_FROM_TARGET - ARROW_SIZE / 2,
                    borderStyle: !isInverse ? styles.topArrowBorder : undefined,
                };

                break;

            case 'bottom':
                arrowProps = {
                    left: Math.max(
                        arrowOffsetFromViewport,
                        Math.min(windowSize.width - arrowOffsetFromViewport, (left + right - ARROW_SIZE) / 2)
                    ),
                    top: bottom + TOOLTIP_OFFSET_FROM_TARGET - ARROW_SIZE / 2 + 1 / Math.sqrt(2),
                    borderStyle: !isInverse ? styles.bottomArrowBorder : undefined,
                };

                break;

            case 'left':
                arrowProps = {
                    left: left - TOOLTIP_OFFSET_FROM_TARGET - ARROW_SIZE / 2 - 1 / Math.sqrt(2),
                    top: Math.max(
                        arrowOffsetFromViewport,
                        Math.min(windowSize.height - arrowOffsetFromViewport, (top + bottom - ARROW_SIZE) / 2)
                    ),
                    borderStyle: !isInverse ? styles.leftArrowBorder : undefined,
                };

                break;

            case 'right':
            default:
                arrowProps = {
                    left: right + TOOLTIP_OFFSET_FROM_TARGET - ARROW_SIZE / 2 + 1 / Math.sqrt(2),
                    top: Math.max(
                        arrowOffsetFromViewport,
                        Math.min(windowSize.height - arrowOffsetFromViewport, (top + bottom - ARROW_SIZE) / 2)
                    ),
                    borderStyle: !isInverse ? styles.rightArrowBorder : undefined,
                };

                break;
        }

        arrowProps.top -= tooltipProps.top;
        arrowProps.left -= tooltipProps.left;

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
    ]);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isTooltipOpen) {
                switch (e.keyCode) {
                    case ESC:
                        if (isTooltipOpen) {
                            setIsMouseOverTarget(false);
                            setIsTooltipOpen(false);
                        }
                        break;
                    default:
                    // do nothing
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown, false);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
        };
    });

    React.useEffect(() => {
        setIsTooltipOpen(isMouseOverTarget || isMouseOverTooltip || isFocused);
    }, [isMouseOverTarget, isMouseOverTooltip, isFocused]);

    const currentPosition = getFinalPosition(
        targetRect,
        tooltip,
        position,
        windowSize.height,
        windowSize.width
    );

    const renderTooltipContent = () => (
        <div
            style={{width, boxSizing: 'border-box'}}
            className={classNames(
                styles.tooltip,
                textCenter ? styles.tooltipCenter : undefined,
                getBorderStyle(isInverse),
                sprinkles({
                    borderRadius: vars.borderRadii.popup,
                    overflow: 'hidden',
                    background: vars.colors.backgroundContainer,
                })
            )}
        >
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
    );

    return (
        <>
            {isTooltipOpen && isTouchableDevice && (
                <Overlay
                    onPress={(e) => {
                        if (
                            !targetRect ||
                            e.clientX < targetRect.left ||
                            e.clientX > targetRect.right ||
                            e.clientY < targetRect.top ||
                            e.clientY > targetRect.bottom
                        ) {
                            setIsTooltipOpen(false);
                        }
                    }}
                />
            )}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
                ref={(element) => {
                    /**
                     * Hack to set the target ref to the target element that was actually passed as prop.
                     * If the target is absolutely positioned and we attach targetRef to the container div instead,
                     * its size will be 0 (and we need the target dimensions to compute the tooltip's position).
                     */
                    const targetElement = element?.firstElementChild;
                    if (targetElement) {
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
                    setIsTooltipOpen(true);
                }}
                onFocus={() => {
                    if (!isTouchableDevice) {
                        setIsFocused(true);
                    }
                }}
                onBlur={() => {
                    if (!isTouchableDevice) {
                        setIsFocused(false);
                    }
                }}
                aria-describedby={ariaLabel}
                style={targetStyle}
            >
                {target}
            </div>

            <Portal>
                <CSSTransition
                    in={isTooltipOpen}
                    nodeRef={tooltipRef}
                    timeout={{
                        enter:
                            TOOLTIP_ENTER_TRANSITION_DURATION_IN_MS +
                            (delay ? TOOLTIP_ENTER_TRANSITION_DELAY_IN_MS : 0),
                        exit: TOOLTIP_EXIT_TRANSITION_DURATION_IN_MS,
                    }}
                    classNames={styles.tooltipTransitionClasses}
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
                                        ...(arrowComputedProps
                                            ? {
                                                  [styles.tooltipVars
                                                      .arrowTop]: `${arrowComputedProps.top}px`,
                                                  [styles.tooltipVars
                                                      .arrowLeft]: `${arrowComputedProps.left}px`,
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
                                aria-label={ariaLabel}
                                tabIndex={-1}
                            >
                                <div
                                    className={styles.container}
                                    ref={combineRefs(setTooltip, tooltipRef)}
                                    aria-label={targetLabel}
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
                                    <div className={styles.arrowContainer}>
                                        <div
                                            className={classNames(
                                                styles.arrow,
                                                arrowComputedProps?.borderStyle
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                </CSSTransition>
            </Portal>
        </>
    );
};

export default Tooltip;
