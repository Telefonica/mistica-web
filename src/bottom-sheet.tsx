import classnames from 'classnames';
import * as React from 'react';
import * as styles from './bottom-sheet.css';
import FocusTrap from './focus-trap';
import {useAriaId, useIsInViewport, useScreenSize, useTheme} from './hooks';
import {useSetModalStateEffect} from './modal-context-provider';
import {Portal} from './portal';
import {Text2, Text3, Text5} from './text';
import {vars as skinVars} from './skins/skin-contract.css';
import {RadioGroup} from './radio-button';
import {Row, RowList} from './list';
import ResponsiveLayout from './responsive-layout';
import NegativeBox from './negative-box';
import Stack from './stack';
import Box from './box';
import Touchable from './touchable';
import Inline from './inline';
import Circle from './circle';
import Divider from './divider';
import {getPrefixedDataAttributes, getScrollableParentElement} from './utils/dom';
import {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import IconButton from './icon-button';
import ButtonLayout from './button-layout';

import type {DataAttributes, IconProps, RendersNullableElement, TrackingEvent} from './utils/types';

const getClientY = (ev: TouchEvent | MouseEvent | React.TouchEvent | React.MouseEvent) => {
    if ('touches' in ev) {
        return ev.touches[0].clientY;
    }
    return ev.clientY;
};

const useDraggableSheet = ({closeModal}: {closeModal: () => void}) => {
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

const useLockBodyScroll = () => {
    React.useLayoutEffect(() => {
        const scrollY = window.scrollY;
        // When the modal is shown, we want a fixed body (no-scroll)
        document.body.style.top = `-${scrollY}px`;
        return () => {
            window.scrollTo(0, scrollY);
        };
    }, []);

    // disable pull down to refresh when the modal is open
    // disable body scroll when the modal is open
    const bodyStyle = `
        body {
            position: fixed;
            left: 0;
            right: 0;
            overscroll-behavior-y: contain;
            overflow: hidden;
        }
    `;

    return <style>{bodyStyle}</style>;
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

type BottomSheetProps = {
    onClose?: () => void;
    dataAttributes?: DataAttributes;
    children: (renderParams: {closeModal: () => void; modalTitleId: string}) => React.ReactNode;
};

const BottomSheet = React.forwardRef<HTMLDivElement, BottomSheetProps>(
    ({onClose, children, dataAttributes}, ref) => {
        const {texts} = useTheme();
        const [modalState, dispatch] = React.useReducer(modalReducer, 'closed');
        const initRef = React.useRef(false);
        const modalTitleId = useAriaId();

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
                }, styles.transitionDuration);

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

        const {onScroll, overlayStyle, ...dragableSheetProps} = useDraggableSheet({closeModal});

        useSetModalStateEffect();
        const bodyStyle = useLockBodyScroll();

        if (modalState === 'closed') {
            return null;
        }

        return (
            <Portal>
                <FocusTrap>
                    {bodyStyle}
                    {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                    <div
                        className={classnames(styles.overlay, {
                            [styles.closingOverlay]: modalState === 'closing',
                        })}
                        style={overlayStyle}
                        onClick={closeModal}
                    />
                    <div
                        className={classnames(styles.bottomSheetContainer, {
                            [styles.closingSheet]: modalState === 'closing',
                        })}
                        onTransitionEnd={handleTransitionEnd}
                        onAnimationEnd={handleTransitionEnd}
                        {...dragableSheetProps}
                        {...getPrefixedDataAttributes(dataAttributes, 'BottomSheet')}
                        ref={ref}
                    >
                        <div className={styles.bottomSheet}>
                            <div className={styles.bottomSheetContent}>
                                <div className={styles.handleContainer}>
                                    <div className={styles.handle} />
                                </div>
                                <section
                                    role="dialog"
                                    aria-modal="true"
                                    aria-describedby={modalTitleId}
                                    onScroll={onScroll}
                                    className={styles.children}
                                >
                                    {children({closeModal, modalTitleId})}
                                </section>
                            </div>
                            <div className={styles.modalCloseButton}>
                                <IconButton size={32} onPress={closeModal} aria-label={texts.modalClose}>
                                    <IconCloseRegular />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </FocusTrap>
            </Portal>
        );
    }
);

type SheetBodyProps = {
    title?: string;
    subitile?: string;
    description?: string;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    secondaryButton?: RendersNullableElement<typeof ButtonSecondary>;
    link?: RendersNullableElement<typeof ButtonLink>;
    modalTitleId: string;
    children?: React.ReactNode;
};

const SheetBody = ({
    title,
    subitile,
    description,
    modalTitleId,
    button,
    secondaryButton,
    link,
    children,
}: SheetBodyProps) => {
    const topScrollSignalRef = React.useRef<HTMLDivElement>(null);
    const bottomScrollSignalRef = React.useRef<HTMLDivElement>(null);
    const scrollableParentRef = React.useRef<HTMLElement | null>(null);

    React.useEffect(() => {
        if (bottomScrollSignalRef.current) {
            scrollableParentRef.current = getScrollableParentElement(bottomScrollSignalRef.current);
        }
    }, []);

    const showTitleDivider = !useIsInViewport(topScrollSignalRef, false, {root: scrollableParentRef.current});
    const showButtonsDivider = !useIsInViewport(bottomScrollSignalRef, false, {
        rootMargin: '1px', // bottomScrollSignal div has 0px height so we need a 1px margin to trigger the intersection observer
        root: scrollableParentRef.current,
    });

    const hasButtons = !!button || !!secondaryButton || !!link;
    return (
        <>
            <div ref={topScrollSignalRef} />
            {title && (
                <div className={styles.stickyTitle}>
                    <Box paddingBottom={8} paddingTop={{mobile: 0, desktop: 40}}>
                        <ResponsiveLayout>
                            <Text5 as="h2" id={modalTitleId} truncate>
                                {title}
                            </Text5>
                        </ResponsiveLayout>
                    </Box>
                    {showTitleDivider && <Divider />}
                </div>
            )}
            <Box paddingBottom={hasButtons ? 0 : {desktop: 40, mobile: 0}}>
                <ResponsiveLayout>
                    <Stack space={8}>
                        {subitile || description ? (
                            <Stack space={{mobile: 8, desktop: 16}}>
                                {subitile && (
                                    <Text3 as="p" regular>
                                        {subitile}
                                    </Text3>
                                )}
                                {description && (
                                    <Text2 as="p" regular color={skinVars.colors.textSecondary}>
                                        {description}
                                    </Text2>
                                )}
                            </Stack>
                        ) : null}
                        {children}
                    </Stack>
                </ResponsiveLayout>
            </Box>
            {hasButtons && (
                <div className={styles.stickyButtons}>
                    {showButtonsDivider && <Divider />}
                    <Box paddingY={16}>
                        <ResponsiveLayout>
                            <ButtonLayout align="full-width" link={link}>
                                {button}
                                {secondaryButton}
                            </ButtonLayout>
                        </ResponsiveLayout>
                    </Box>
                </div>
            )}
            <div ref={bottomScrollSignalRef} />
        </>
    );
};

type RadioListBottomSheetProps = {
    title?: string;
    subitile?: string;
    description?: string;
    items: Array<{
        id: string;
        title?: string;
        description?: string;
        asset?: React.ReactNode;
    }>;
    selectedId?: string;
    onClose?: () => void;
    onSelect?: (id: string) => void;
    dataAttributes?: DataAttributes;
    button?: {
        text: string;
    };
};

export const RadioListBottomSheet = React.forwardRef<HTMLDivElement, RadioListBottomSheetProps>(
    ({title, subitile, description, items, selectedId, onClose, onSelect, button, dataAttributes}, ref) => {
        const [selectedItemId, setSelectedItemId] = React.useState(selectedId);
        const hasSelectedRef = React.useRef(false);
        const {isDesktopOrBigger} = useScreenSize();
        const {texts} = useTheme();

        return (
            <BottomSheet
                onClose={onClose}
                ref={ref}
                dataAttributes={{...dataAttributes, 'component-name': 'RadioListBottomSheet'}}
            >
                {({closeModal, modalTitleId}) => (
                    <SheetBody
                        title={title}
                        subitile={subitile}
                        description={description}
                        modalTitleId={modalTitleId}
                        button={
                            isDesktopOrBigger ? (
                                <ButtonPrimary
                                    onPress={() => {
                                        if (hasSelectedRef.current) {
                                            onSelect?.(selectedItemId ?? '');
                                        }
                                        closeModal();
                                    }}
                                >
                                    {button?.text ?? texts.bottomSheetConfirmButton}
                                </ButtonPrimary>
                            ) : undefined
                        }
                    >
                        <NegativeBox>
                            <RadioGroup
                                aria-labelledby={modalTitleId}
                                name="sheetselection"
                                value={selectedItemId}
                                onChange={(value) => {
                                    setSelectedItemId(value);
                                    hasSelectedRef.current = true;

                                    // In desktop, the modal is closed with the ButtonPrimary
                                    if (isDesktopOrBigger) {
                                        return;
                                    }

                                    onSelect?.(value);
                                    // Wait for radio animation to finish before closing the modal
                                    setTimeout(() => {
                                        closeModal();
                                    }, 200);
                                }}
                            >
                                <RowList>
                                    {items.map((item) => (
                                        <Row
                                            key={item.id}
                                            title={item.title ?? ''}
                                            description={item.description}
                                            asset={item.asset}
                                            radioValue={item.id}
                                        />
                                    ))}
                                </RowList>
                            </RadioGroup>
                        </NegativeBox>
                    </SheetBody>
                )}
            </BottomSheet>
        );
    }
);

type ActionsListSheetProps = {
    title?: string;
    subitile?: string;
    description?: string;
    items: Array<{
        id: string;
        title: string;
        style?: 'default' | 'destructive'; // "normal" by default
        Icon?: React.ComponentType<IconProps>;
    }>;
    onClose?: () => void;
    onSelect?: (id: string) => void;
    dataAttributes?: DataAttributes;
};

export const ActionsListBottomSheet = React.forwardRef<HTMLDivElement, ActionsListSheetProps>(
    ({title, subitile, description, items, onClose, onSelect, dataAttributes}, ref) => {
        return (
            <BottomSheet
                onClose={onClose}
                ref={ref}
                dataAttributes={{...dataAttributes, 'component-name': 'ActionsListBottomSheet'}}
            >
                {({closeModal, modalTitleId}) => (
                    <SheetBody
                        title={title}
                        subitile={subitile}
                        description={description}
                        modalTitleId={modalTitleId}
                    >
                        <NegativeBox>
                            {items.map(({id, style, title, Icon}) => (
                                <Touchable
                                    key={id}
                                    onPress={() => {
                                        onSelect?.(id);
                                        closeModal();
                                    }}
                                >
                                    <div className={styles.sheetActionRow}>
                                        {Icon && (
                                            <Box paddingRight={16}>
                                                <Icon
                                                    size={24}
                                                    color={
                                                        style === 'destructive'
                                                            ? skinVars.colors.textLinkDanger
                                                            : skinVars.colors.neutralHigh
                                                    }
                                                />
                                            </Box>
                                        )}
                                        <Text3
                                            regular
                                            color={
                                                style === 'destructive'
                                                    ? skinVars.colors.textLinkDanger
                                                    : skinVars.colors.textPrimary
                                            }
                                        >
                                            {title}
                                        </Text3>
                                    </div>
                                </Touchable>
                            ))}
                        </NegativeBox>
                    </SheetBody>
                )}
            </BottomSheet>
        );
    }
);

type InfoBottomSheetProps = {
    title?: string;
    subitile?: string;
    description?: string;
    items: Array<{
        id?: string;
        title: string;
        description?: string;
        icon:
            | {
                  type: 'regular' | 'small';
                  Icon: React.ComponentType<IconProps>;
              }
            | {type: 'bullet'};
    }>;
    onClose?: () => void;
    dataAttributes?: DataAttributes;
};

export const InfoBottomSheet = React.forwardRef<HTMLDivElement, InfoBottomSheetProps>(
    ({title, subitile, description, items, onClose, dataAttributes}, ref) => {
        return (
            <BottomSheet
                onClose={onClose}
                ref={ref}
                dataAttributes={{...dataAttributes, 'component-name': 'InfoBottomSheet'}}
            >
                {({modalTitleId}) => (
                    <SheetBody
                        title={title}
                        subitile={subitile}
                        description={description}
                        modalTitleId={modalTitleId}
                    >
                        <Box paddingBottom={16}>
                            <Stack space={16} role="list">
                                {items.map((item, idx) => (
                                    <Inline key={item.id || idx} space={8}>
                                        <div className={styles.infoItemIcon}>
                                            {item.icon.type === 'bullet' ? (
                                                <Circle
                                                    size={8}
                                                    backgroundColor={skinVars.colors.textPrimary}
                                                />
                                            ) : (
                                                <item.icon.Icon size={item.icon.type === 'small' ? 16 : 24} />
                                            )}
                                        </div>
                                        <Stack space={2}>
                                            <Text3 regular>{item.title}</Text3>
                                            {item.description && (
                                                <Text2 regular color={skinVars.colors.textSecondary}>
                                                    {item.description}
                                                </Text2>
                                            )}
                                        </Stack>
                                    </Inline>
                                ))}
                            </Stack>
                        </Box>
                    </SheetBody>
                )}
            </BottomSheet>
        );
    }
);

type PressedButton = 'PRIMARY' | 'SECONDARY' | 'LINK';

type ButtonProps = {
    text: string;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    trackEvent?: boolean;
};

type ActionsBottomSheetProps = {
    title?: string;
    subitile?: string;
    description?: string;
    button: ButtonProps;
    secondaryButton?: ButtonProps;
    buttonLink?: ButtonProps & {withChevron?: boolean};
    onClose?: () => void;
    onPressButton?: (pressedButton: PressedButton) => void;
    dataAttributes?: DataAttributes;
};

export const ActionsBottomSheet = React.forwardRef<HTMLDivElement, ActionsBottomSheetProps>(
    (
        {
            title,
            subitile,
            description,
            button,
            secondaryButton,
            buttonLink,
            onClose,
            dataAttributes,
            onPressButton,
        },
        ref
    ) => {
        const createPressHandler = (closeModal: () => void, pressedButton: PressedButton) => () => {
            onPressButton?.(pressedButton);
            closeModal();
        };

        const getButtonProps = <T extends {text: string}>({text, ...otherProps}: T) => ({
            children: text,
            ...otherProps,
        });

        return (
            <BottomSheet
                onClose={onClose}
                ref={ref}
                dataAttributes={{...dataAttributes, 'component-name': 'ActionsBottomSheet'}}
            >
                {({modalTitleId, closeModal}) => (
                    <SheetBody
                        title={title}
                        subitile={subitile}
                        description={description}
                        modalTitleId={modalTitleId}
                        button={
                            <ButtonPrimary
                                {...getButtonProps(button)}
                                onPress={createPressHandler(closeModal, 'PRIMARY')}
                            />
                        }
                        secondaryButton={
                            secondaryButton ? (
                                <ButtonSecondary
                                    {...getButtonProps(secondaryButton)}
                                    onPress={createPressHandler(closeModal, 'SECONDARY')}
                                />
                            ) : undefined
                        }
                        link={
                            buttonLink ? (
                                <ButtonLink
                                    {...getButtonProps(buttonLink)}
                                    onPress={createPressHandler(closeModal, 'LINK')}
                                />
                            ) : undefined
                        }
                    />
                )}
            </BottomSheet>
        );
    }
);

export default BottomSheet;
