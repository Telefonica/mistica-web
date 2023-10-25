import * as React from 'react';
import {useAriaId, useBoundingRect, useWindowSize} from './hooks';
import {Portal} from './portal';
import {CSSTransition} from 'react-transition-group';
import * as styles from './tooltip.css';
import Stack from './stack';
import {Text2} from './text';
import {combineRefs} from './utils/common';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {Boxed} from './boxed';
import {cancelEvent, getPrefixedDataAttributes} from './utils/dom';
import {ESC} from './utils/key-codes';
import {isClientSide} from './utils/environment';
import Overlay from './overlay';
import {isEqual} from 'lodash';

import type {BoundingRect} from './hooks';
import type {DataAttributes} from './utils/types';

const TOOLTIP_TRANSITION_DURATION_IN_MS = 500;
const TOOLTIP_TRANSITION_DELAY_IN_MS = 500;
const TOOLTIP_OFFSET_FROM_TARGET = 8;

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

    const targetRef = React.useRef<Element | null>(null);
    const tooltipRef = React.useRef<HTMLDivElement | null>(null);
    const [tooltip, setTooltip] = React.useState<HTMLElement | null>(null);
    const isTouchableDevice = isClientSide() ? window.matchMedia('(pointer: coarse)').matches : false;

    const [isMouseOverTooltip, setIsMouseOverTooltip] = React.useState(false);
    const [isMouseOverTarget, setIsMouseOverTarget] = React.useState(false);
    const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);

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
            return;
        }

        let tooltipProps: {
            left: number;
            top: number;
            padding: string;
        };

        const {left, right, top, bottom} = targetRect;
        const tooltipWidth = tooltip.clientWidth;
        const tooltipHeight = tooltip.clientHeight;

        const maxLeftOffset = windowSize.width - tooltipWidth;
        const maxTopOffset = windowSize.height - tooltipHeight;

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

        if (!isEqual(tooltipProps, tooltipComputedProps)) {
            setTooltipComputedProps(tooltipProps);
        }
    }, [tooltip, targetRect, isTooltipOpen, position, windowSize, tooltipComputedProps]);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isTooltipOpen) {
                switch (e.keyCode) {
                    case ESC:
                        cancelEvent(e);
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
        setIsTooltipOpen(isMouseOverTarget || isMouseOverTooltip);
    }, [isMouseOverTarget, isMouseOverTooltip]);

    const currentPosition = getFinalPosition(
        targetRect,
        tooltip,
        position,
        windowSize.height,
        windowSize.width
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
                onMouseEnter={() => {
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
                aria-describedby={ariaLabel}
            >
                {target}
            </div>

            <Portal>
                <CSSTransition
                    in={isTooltipOpen}
                    nodeRef={tooltipRef}
                    timeout={{
                        enter:
                            TOOLTIP_TRANSITION_DURATION_IN_MS + (delay ? TOOLTIP_TRANSITION_DELAY_IN_MS : 0),
                        exit: TOOLTIP_TRANSITION_DURATION_IN_MS,
                    }}
                    classNames={styles.tooltipTransitionClasses}
                    mountOnEnter
                    unmountOnExit
                >
                    {(transitionStatus) => {
                        return (
                            <div
                                style={{
                                    ...assignInlineVars({
                                        ...(tooltipComputedProps
                                            ? {
                                                  [styles.tooltipVars.top]: `${tooltipComputedProps.top}px`,
                                                  [styles.tooltipVars.left]: `${tooltipComputedProps.left}px`,
                                                  [styles.tooltipVars.padding]: tooltipComputedProps.padding,
                                              }
                                            : {}),

                                        [styles.tooltipVars.delay]: `${
                                            delay ? TOOLTIP_TRANSITION_DELAY_IN_MS : 0
                                        }ms`,
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
                                    style={{
                                        width,
                                        display: 'flex',
                                        justifyContent: textCenter ? 'center' : undefined,
                                    }}
                                    ref={combineRefs(tooltipRef, setTooltip)}
                                    aria-label={targetLabel}
                                    onMouseEnter={() => {
                                        if (
                                            !isTouchableDevice &&
                                            (transitionStatus === 'entered' ||
                                                transitionStatus === 'entering')
                                        ) {
                                            setIsMouseOverTooltip(true);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (!isTouchableDevice) {
                                            setIsMouseOverTooltip(false);
                                        }
                                    }}
                                >
                                    <Boxed className={styles.tooltip}>
                                        {(title || description) && (
                                            <Stack space={4}>
                                                {title && <Text2 medium>{title}</Text2>}
                                                {description && <Text2 regular>{description}</Text2>}
                                            </Stack>
                                        )}
                                        {extra || children}
                                    </Boxed>
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
