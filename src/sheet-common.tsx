'use client';
/*
 * IMPORTANT: Do NOT import anything from here into `sheet-root.tsx`

 * The idea is to keep the SheetRoot component as small as possible (to keep the initial load time low)
 * and lazy load the implementations when needed.
 *
 * This file contains code that is shared between different sheet implementations.
 */
import classnames from 'classnames';
import * as React from 'react';
import * as styles from './sheet-common.css';
import FocusTrap from './focus-trap';
import {useDisableBodyScroll, useIsInViewport, useIsWithinIFrame, useScreenSize, useTheme} from './hooks';
import {useSetModalStateEffect} from './modal-context-provider';
import {Portal} from './portal';
import {Text2, Text3, Text5} from './text';
import {vars as skinVars} from './skins/skin-contract.css';
import Stack from './stack';
import Box from './box';
import Divider from './divider';
import {getPrefixedDataAttributes, getScrollableParentElement} from './utils/dom';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import {InternalIconButton} from './icon-button';
import ButtonLayout from './button-layout';
import {safeAreaInsetBottom} from './utils/css';
import {MOBILE_SIDE_MARGIN, TABLET_SIDE_MARGIN} from './responsive-layout.css';
import * as tokens from './text-tokens';
import Touchable from './touchable';

import type {DataAttributes, RendersNullableElement} from './utils/types';
import type {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';

const transitionDuration = process.env.NODE_ENV === 'test' ? 0 : styles.transitionDuration;

const getClientY = (ev: TouchEvent | MouseEvent | React.TouchEvent | React.MouseEvent) => {
    if ('touches' in ev) {
        return ev.touches[0].clientY;
    }
    return ev.clientY;
};

const useDraggableSheetProps = ({closeModal}: {closeModal: () => void}) => {
    const [dragDistance, setDragDistance] = React.useState(0);
    const isDraggingRef = React.useRef(false);
    const initialMoveEventsCount = React.useRef(0);
    const dragInitTimeRef = React.useRef(0);
    const initialYRef = React.useRef(0);
    const currentYRef = React.useRef(0);

    const {isDesktopOrBigger} = useScreenSize();

    const handleTouchStart = React.useCallback((ev: React.TouchEvent | React.MouseEvent) => {
        isDraggingRef.current = true;
        initialMoveEventsCount.current = 0;
        dragInitTimeRef.current = Date.now();
        initialYRef.current = getClientY(ev);
    }, []);

    const handleScroll = React.useCallback(() => {
        isDraggingRef.current = false;
        setDragDistance(0);
    }, []);

    React.useEffect(() => {
        if (isDesktopOrBigger) {
            return;
        }

        const handleTouchMove = (ev: TouchEvent | MouseEvent) => {
            if (!isDraggingRef.current) {
                return;
            }

            // we discard the first move events to allow scroll events to have priority. When the first
            // scroll event is fired, dragging is disabled. If no scroll event is fired, we continue
            // handling the dragging. After doing some tests in Android/iOS, 3 seems like a good number
            if (initialMoveEventsCount.current < 3) {
                initialMoveEventsCount.current++;
                return;
            }

            currentYRef.current = getClientY(ev);

            setDragDistance(currentYRef.current - initialYRef.current);
        };

        const handleTouchEnd = () => {
            if (!isDraggingRef.current) {
                return;
            }
            const dragTime = Date.now() - dragInitTimeRef.current;
            const dragDistance = currentYRef.current - initialYRef.current;
            const dragSpeed = dragDistance / dragTime;

            isDraggingRef.current = false;
            setDragDistance(0);
            if (dragDistance > 50 && (currentYRef.current > window.innerHeight * 0.75 || dragSpeed > 0.5)) {
                closeModal();
            }
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
        document.addEventListener('mousemove', handleTouchMove);
        document.addEventListener('mouseup', handleTouchEnd);

        return () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            document.removeEventListener('mousemove', handleTouchMove);
            document.removeEventListener('mouseup', handleTouchEnd);
        };
    }, [closeModal, isDesktopOrBigger]);

    if (isDesktopOrBigger) {
        return {};
    }

    return {
        onTouchStart: handleTouchStart,
        onMouseDown: handleTouchStart,
        style: dragDistance
            ? {
                  transform: `translateY(${dragDistance}px)`,
                  transition: 'none',
              }
            : undefined,
        onScroll: handleScroll,
        overlayStyle: dragDistance
            ? {
                  // decrease opacity when dragging down the sheet
                  opacity: 0.25 + 1 - dragDistance / (window.innerHeight - initialYRef.current),
                  transition: 'none',
              }
            : undefined,
    };
};

type ModalState = 'closed' | 'opening' | 'open' | 'closing' | 'closed';
type ModalAction = 'close' | 'open' | 'transitionEnd';

const transitions: Record<ModalState, Partial<Record<ModalAction, ModalState>>> = {
    closed: {
        open: 'opening',
    },
    opening: {
        close: 'closed',
        transitionEnd: 'open',
    },
    open: {
        close: 'closing',
    },
    closing: {
        transitionEnd: 'closed',
    },
};

const modalReducer = (state: ModalState, action: ModalAction): ModalState =>
    transitions[state][action] || state;

type SheetProps = {
    onClose?: () => void;
    dataAttributes?: DataAttributes;
    children:
        | React.ReactNode
        | ((renderParams: {closeModal: () => void; modalTitleId: string}) => React.ReactNode);
};

const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(({onClose, children, dataAttributes}, ref) => {
    const {texts, t} = useTheme();
    const [modalState, dispatch] = React.useReducer(modalReducer, 'closed');
    const initRef = React.useRef(false);
    const modalTitleId = React.useId();
    const isInIframe = useIsWithinIFrame();

    const handleTransitionEnd = React.useCallback((ev: React.AnimationEvent | React.TransitionEvent) => {
        // Don't trigger transitionEnd if the event is not triggered by the sheet element.
        if (ev.target === ev.currentTarget) {
            dispatch('transitionEnd');
        }
    }, []);

    const closeModal = () => {
        if (modalState === 'open') {
            dispatch('close');
        }
    };

    // transitionEnd/animationEnd dom events may not trigger in some cases, so we use a timeout as fallback
    React.useEffect(() => {
        if (modalState === 'opening' || modalState === 'closing') {
            const tid = setTimeout(() => {
                dispatch('transitionEnd');
            }, transitionDuration);

            return () => clearTimeout(tid);
        }
    }, [modalState]);

    React.useEffect(() => {
        if (modalState === 'closed') {
            if (initRef.current) {
                onClose?.();
            } else {
                dispatch('open');
            }
        } else {
            initRef.current = true;
        }
    }, [modalState, onClose]);

    const {onScroll, overlayStyle, ...dragableSheetProps} = useDraggableSheetProps({closeModal});

    useSetModalStateEffect();
    useDisableBodyScroll(modalState !== 'closed');

    if (modalState === 'closed') {
        return null;
    }

    return (
        <Portal>
            <FocusTrap disabled={isInIframe}>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <div
                    className={classnames(styles.overlay, {
                        [styles.closingOverlay]: modalState === 'closing',
                    })}
                    style={overlayStyle}
                    onClick={closeModal}
                />
                <div
                    className={classnames(styles.SheetContainer, {
                        [styles.closingSheet]: modalState === 'closing',
                    })}
                    onTransitionEnd={handleTransitionEnd}
                    onAnimationEnd={handleTransitionEnd}
                    {...dragableSheetProps}
                    {...getPrefixedDataAttributes(dataAttributes, 'Sheet')}
                    ref={ref}
                >
                    <div className={styles.Sheet}>
                        <div className={styles.SheetContent}>
                            {/**
                             * Space rendered on the top part of the sheet on top of
                             * the content in order to be able to drag the sheet
                             */}
                            <div className={styles.sheetTopDraggingArea} />

                            <section
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby={modalTitleId}
                                onScroll={onScroll}
                                className={styles.children}
                                style={{
                                    paddingBottom: safeAreaInsetBottom,
                                }}
                            >
                                {typeof children === 'function'
                                    ? children({closeModal, modalTitleId})
                                    : children}
                                <div className={styles.modalCloseButton}>
                                    <InternalIconButton
                                        onPress={closeModal}
                                        aria-label={texts.modalClose || t(tokens.modalClose)}
                                        Icon={IconCloseRegular}
                                        bleedLeft
                                        bleedRight
                                        bleedY
                                    />
                                </div>
                                {/**
                                 * We put a button behind the top dragging area so that the sheet can
                                 * be closed while navigating with the keyboard or with a screen reader.
                                 */}
                                <div className={styles.handleContainer}>
                                    <Touchable
                                        onPress={closeModal}
                                        className={styles.handleTouchable}
                                        aria-label={texts.modalClose || t(tokens.modalClose)}
                                    >
                                        <div className={styles.handleBar} />
                                    </Touchable>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </FocusTrap>
        </Portal>
    );
});

const paddingX = {
    mobile: MOBILE_SIDE_MARGIN,
    tablet: TABLET_SIDE_MARGIN,
    desktop: 40, // to keep consistency with the rest of the dialogs components
} as const;

type SheetBodyProps = {
    title?: string;
    subtitle?: string;
    description?: string | ReadonlyArray<string>;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    secondaryButton?: RendersNullableElement<typeof ButtonSecondary>;
    link?: RendersNullableElement<typeof ButtonLink>;
    modalTitleId: string;
    children?: React.ReactNode;
};

export const SheetBody = ({
    title,
    subtitle,
    description,
    modalTitleId,
    button,
    secondaryButton,
    link,
    children,
}: SheetBodyProps): JSX.Element => {
    const topScrollSignalRef = React.useRef<HTMLDivElement>(null);
    const bottomScrollSignalRef = React.useRef<HTMLDivElement>(null);
    const scrollableParentRef = React.useRef<HTMLElement | null>(null);

    React.useEffect(() => {
        if (bottomScrollSignalRef.current) {
            scrollableParentRef.current = getScrollableParentElement(bottomScrollSignalRef.current);
        }
    }, []);

    const showTitleDivider = !useIsInViewport(topScrollSignalRef, true, {
        root: scrollableParentRef.current,
    });
    const showButtonsDivider = !useIsInViewport(bottomScrollSignalRef, true, {
        rootMargin: '1px', // bottomScrollSignal div has 0px height so we need a 1px margin to trigger the intersection observer
        root: scrollableParentRef.current,
    });

    const hasButtons = !!button || !!secondaryButton || !!link;
    return (
        <>
            <div ref={topScrollSignalRef} />
            <div className={styles.stickyTitle}>
                {title ? (
                    <Box paddingBottom={8} paddingTop={{mobile: 0, desktop: 40}} paddingX={paddingX}>
                        <Text5 as="h2" id={modalTitleId} truncate>
                            {title}
                        </Text5>
                    </Box>
                ) : (
                    <Box paddingTop={{mobile: 0, desktop: 40}} />
                )}
                {showTitleDivider && <Divider />}
            </div>
            <div className={styles.bodyContent}>
                <Box paddingBottom={hasButtons ? 0 : {desktop: 40, mobile: 0}} paddingX={paddingX}>
                    <Stack space={8}>
                        {subtitle || description ? (
                            <Stack space={{mobile: 8, desktop: 16}}>
                                {subtitle && (
                                    <Text3 as="p" regular>
                                        {subtitle}
                                    </Text3>
                                )}
                                {description &&
                                    (Array.isArray(description) ? (
                                        <Text2 as="div" regular color={skinVars.colors.textSecondary}>
                                            {description.map((text, index) => (
                                                <p
                                                    key={index}
                                                    style={{
                                                        margin: 0,
                                                        marginBottom:
                                                            index < description.length - 1
                                                                ? '1em'
                                                                : undefined,
                                                    }}
                                                >
                                                    {text}
                                                </p>
                                            ))}
                                        </Text2>
                                    ) : (
                                        <Text2 as="p" regular color={skinVars.colors.textSecondary}>
                                            {description}
                                        </Text2>
                                    ))}
                            </Stack>
                        ) : null}
                        {children}
                    </Stack>
                </Box>
            </div>
            {hasButtons && (
                <div className={styles.stickyButtons}>
                    {showButtonsDivider && <Divider />}
                    <Box paddingY={{mobile: 16, desktop: 40}} paddingX={paddingX}>
                        <ButtonLayout
                            align="full-width"
                            link={link}
                            primaryButton={button}
                            secondaryButton={secondaryButton}
                        />
                    </Box>
                </div>
            )}
            <div ref={bottomScrollSignalRef} />
        </>
    );
};

export default Sheet;
