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

import type {BoundingRect} from './hooks';
import type {DataAttributes} from './utils/types';

const TOOLTIP_TRANSITION_DURATION_IN_MS = 800;
const TOOLTIP_TRANSITION_DELAY_IN_MS = 500;
const TOOLTIP_VIEWPORT_MARGIN = 16;

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
    const tooltipWidth = tooltip.clientWidth;
    const tooltipHeight = tooltip.clientHeight;
    const {top, bottom, left, right} = targetRect;

    const availableSpaceOnBottom = windowHeight - bottom;
    const availableSpaceOnRight = windowWidth - right;
    const availableSpaceOnTop = top;
    const availableSpaceOnLeft = left;

    switch (position) {
        case 'left':
            if (tooltipWidth <= availableSpaceOnLeft) {
                return 'left';
            }
            if (tooltipWidth <= availableSpaceOnRight) {
                return 'right';
            }
            if (tooltipHeight > Math.max(availableSpaceOnBottom, availableSpaceOnTop)) {
                return undefined;
            }
            return availableSpaceOnBottom > availableSpaceOnTop ? 'bottom' : 'top';

        case 'right':
            if (tooltipWidth <= availableSpaceOnRight) {
                return 'right';
            }
            if (tooltipWidth <= availableSpaceOnLeft) {
                return 'left';
            }
            if (tooltipHeight > Math.max(availableSpaceOnBottom, availableSpaceOnTop)) {
                return undefined;
            }
            return availableSpaceOnBottom > availableSpaceOnTop ? 'bottom' : 'top';

        case 'top':
            if (tooltipHeight <= availableSpaceOnTop) {
                return 'top';
            }
            if (tooltipHeight <= availableSpaceOnBottom) {
                return 'bottom';
            }
            if (tooltipWidth > Math.max(availableSpaceOnLeft, availableSpaceOnRight)) {
                return undefined;
            }
            return availableSpaceOnLeft > availableSpaceOnRight ? 'left' : 'right';

        case 'bottom':
            if (tooltipHeight <= availableSpaceOnBottom) {
                return 'bottom';
            }
            if (tooltipHeight <= availableSpaceOnTop) {
                return 'top';
            }
            if (tooltipWidth > Math.max(availableSpaceOnLeft, availableSpaceOnRight)) {
                return undefined;
            }
            return availableSpaceOnLeft > availableSpaceOnRight ? 'left' : 'right';

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
    offsetX?: number;
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
    offsetX = 0,
    delay = true,
    // targetStyle,
    // textCenter,
}) => {
    const ariaLabel = useAriaId();
    const [itemsComputedProps, setItemsComputedProps] = React.useState<{
        left?: number;
        top?: number;
    } | null>(null);

    const targetRef = React.useRef<HTMLDivElement | null>(null);
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

        let leftOffset;
        let topOffset;

        const {left, right, top, bottom} = targetRect;
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;

        const maxLeftOffset = windowSize.width - tooltipWidth - TOOLTIP_VIEWPORT_MARGIN;
        const maxTopOffset = windowSize.height - tooltipHeight - TOOLTIP_VIEWPORT_MARGIN;

        switch (finalPosition) {
            case 'top':
                leftOffset = Math.max(
                    TOOLTIP_VIEWPORT_MARGIN,
                    Math.min(maxLeftOffset, (left + right - tooltipWidth) / 2 + offsetX)
                );
                topOffset = top - tooltipHeight;
                break;

            case 'bottom':
                leftOffset = Math.max(
                    TOOLTIP_VIEWPORT_MARGIN,
                    Math.min(maxLeftOffset, (left + right - tooltipWidth) / 2)
                );
                topOffset = bottom;
                break;

            case 'left':
                leftOffset = left - tooltipWidth;
                topOffset = Math.max(
                    TOOLTIP_VIEWPORT_MARGIN,
                    Math.min(maxTopOffset, (top + bottom - tooltipHeight) / 2)
                );
                break;

            case 'right':
                leftOffset = right;
                topOffset = Math.max(
                    TOOLTIP_VIEWPORT_MARGIN,
                    Math.min(maxTopOffset, (top + bottom - tooltipHeight) / 2)
                );
                break;

            default:
        }

        setItemsComputedProps({
            top: topOffset,
            left: leftOffset,
        });
    }, [tooltip, targetRect, isTooltipOpen, position, windowSize, offsetX]);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isTooltipOpen) {
                switch (e.keyCode) {
                    case ESC:
                        cancelEvent(e);
                        if (isTooltipOpen) {
                            targetRef.current?.blur();
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
                ref={targetRef}
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
                style={{
                    display: 'inline-flex',
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
                                        ...(itemsComputedProps
                                            ? {
                                                  ...(itemsComputedProps.top !== undefined && {
                                                      [styles.vars.top]: `${itemsComputedProps.top}px`,
                                                  }),
                                                  ...(itemsComputedProps.left !== undefined && {
                                                      [styles.vars.left]: `${itemsComputedProps.left}px`,
                                                  }),
                                              }
                                            : {}),
                                        [styles.vars.delay]: `${
                                            delay ? TOOLTIP_TRANSITION_DELAY_IN_MS : 0
                                        }ms`,
                                        [styles.vars.enterTransform]:
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
                                    style={{width}}
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
