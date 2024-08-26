'use client';
import classnames from 'classnames';
import * as React from 'react';
import * as styles from './sheet.css';
import FocusTrap from './focus-trap';
import {useId, useDisableBodyScroll, useIsInViewport, useScreenSize, useTheme} from './hooks';
import {useSetModalStateEffect} from './modal-context-provider';
import {Portal} from './portal';
import {Text2, Text3, Text5} from './text';
import {vars as skinVars} from './skins/skin-contract.css';
import {RadioGroup} from './radio-button';
import {Row, RowList} from './list';
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
import {InternalIconButton} from './icon-button';
import ButtonLayout from './button-layout';
import Image from './image';
import {safeAreaInsetBottom} from './utils/css';
import {MOBILE_SIDE_MARGIN, SMALL_DESKTOP_SIDE_MARGIN, TABLET_SIDE_MARGIN} from './responsive-layout.css';
import * as tokens from './text-tokens';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes, IconProps, RendersNullableElement, TrackingEvent} from './utils/types';

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
    const modalTitleId = useId();

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
            <FocusTrap>
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
                            <div className={styles.handleContainer}>
                                <div className={styles.handle} />
                            </div>
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
    desktop: SMALL_DESKTOP_SIDE_MARGIN,
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

type RadioListSheetProps = {
    title?: string;
    subtitle?: string;
    description?: string | ReadonlyArray<string>;
    items: ReadonlyArray<{
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

export const RadioListSheet = React.forwardRef<HTMLDivElement, RadioListSheetProps>(
    ({title, subtitle, description, items, selectedId, onClose, onSelect, button, dataAttributes}, ref) => {
        const [selectedItemId, setSelectedItemId] = React.useState(selectedId);
        const hasSelectedRef = React.useRef(false);
        const {isDesktopOrBigger} = useScreenSize();
        const {texts, t} = useTheme();

        return (
            <Sheet
                onClose={onClose}
                ref={ref}
                dataAttributes={{'component-name': 'RadioListSheet', ...dataAttributes}}
            >
                {({closeModal, modalTitleId}) => (
                    <SheetBody
                        title={title}
                        subtitle={subtitle}
                        description={description}
                        modalTitleId={modalTitleId}
                        button={
                            isDesktopOrBigger ? (
                                <ButtonPrimary
                                    onPress={() => {
                                        if (hasSelectedRef.current) {
                                            onSelect?.(selectedItemId || '');
                                        }
                                        closeModal();
                                    }}
                                >
                                    {button?.text || texts.sheetConfirmButton || t(tokens.sheetConfirmButton)}
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
            </Sheet>
        );
    }
);

type ActionsListSheetProps = {
    title?: string;
    subtitle?: string;
    description?: string | ReadonlyArray<string>;
    items: ReadonlyArray<{
        id: string;
        title: string;
        style?: 'normal' | 'destructive'; // "normal" by default
        icon?: ExclusifyUnion<
            | {
                  Icon: React.ComponentType<IconProps>;
              }
            | {
                  url: string;
                  urlDark?: string;
              }
        >;
    }>;
    onClose?: () => void;
    onSelect?: (id: string) => void;
    dataAttributes?: DataAttributes;
};

export const ActionsListSheet = React.forwardRef<HTMLDivElement, ActionsListSheetProps>(
    ({title, subtitle, description, items, onClose, onSelect, dataAttributes}, ref) => {
        const {isDarkMode} = useTheme();

        return (
            <Sheet
                onClose={onClose}
                ref={ref}
                dataAttributes={{'component-name': 'ActionsListSheet', ...dataAttributes}}
            >
                {({closeModal, modalTitleId}) => (
                    <SheetBody
                        title={title}
                        subtitle={subtitle}
                        description={description}
                        modalTitleId={modalTitleId}
                    >
                        <NegativeBox>
                            {items.map(({id, style, title, icon}) => (
                                <Touchable
                                    key={id}
                                    onPress={() => {
                                        onSelect?.(id);
                                        closeModal();
                                    }}
                                >
                                    <div className={styles.sheetActionRow}>
                                        {icon && (
                                            <Box paddingRight={16}>
                                                {icon.Icon ? (
                                                    <icon.Icon
                                                        size={24}
                                                        color={
                                                            style === 'destructive'
                                                                ? skinVars.colors.textLinkDanger
                                                                : skinVars.colors.neutralHigh
                                                        }
                                                    />
                                                ) : (
                                                    <Image
                                                        circular
                                                        src={
                                                            isDarkMode && icon.urlDark
                                                                ? icon.urlDark
                                                                : icon.url
                                                        }
                                                        width={40}
                                                    />
                                                )}
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
            </Sheet>
        );
    }
);

type InfoSheetProps = {
    title?: string;
    subtitle?: string;
    description?: string | ReadonlyArray<string>;
    items: ReadonlyArray<{
        id?: string;
        title: string;
        description?: string;
        icon: ExclusifyUnion<
            | {
                  type: 'regular' | 'small';
                  Icon: React.ComponentType<IconProps>;
              }
            | {
                  type: 'regular' | 'small';
                  url: string;
                  urlDark?: string;
              }
            | {type: 'bullet'}
        >;
    }>;
    onClose?: () => void;
    dataAttributes?: DataAttributes;
};

export const InfoSheet = React.forwardRef<HTMLDivElement, InfoSheetProps>(
    ({title, subtitle, description, items, onClose, dataAttributes}, ref) => {
        const {isDarkMode} = useTheme();
        return (
            <Sheet
                onClose={onClose}
                ref={ref}
                dataAttributes={{'component-name': 'InfoSheet', ...dataAttributes}}
            >
                {({modalTitleId}) => (
                    <SheetBody
                        title={title}
                        subtitle={subtitle}
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
                                            ) : item.icon.Icon ? (
                                                <item.icon.Icon size={item.icon.type === 'small' ? 16 : 24} />
                                            ) : (
                                                <Image
                                                    src={
                                                        isDarkMode && item.icon.urlDark
                                                            ? item.icon.urlDark
                                                            : item.icon.url
                                                    }
                                                    width={item.icon.type === 'small' ? 16 : 24}
                                                    height={item.icon.type === 'small' ? 16 : 24}
                                                />
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
            </Sheet>
        );
    }
);

type PressedButton = 'PRIMARY' | 'SECONDARY' | 'LINK';

type ButtonProps = {
    text: string;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    trackEvent?: boolean;
};

type ActionsSheetProps = {
    title?: string;
    subtitle?: string;
    description?: string | ReadonlyArray<string>;
    button: ButtonProps;
    secondaryButton?: ButtonProps;
    buttonLink?: ButtonProps & {withChevron?: boolean};
    onClose?: () => void;
    onPressButton?: (pressedButton: PressedButton) => void;
    dataAttributes?: DataAttributes;
};

export const ActionsSheet = React.forwardRef<HTMLDivElement, ActionsSheetProps>(
    (
        {
            title,
            subtitle,
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
            <Sheet
                onClose={onClose}
                ref={ref}
                dataAttributes={{'component-name': 'ActionsSheet', ...dataAttributes}}
            >
                {({modalTitleId, closeModal}) => (
                    <SheetBody
                        title={title}
                        subtitle={subtitle}
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
            </Sheet>
        );
    }
);

export default Sheet;
