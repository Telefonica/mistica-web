// https://www.figma.com/design/NfM16IJ4ffPVEdiFbtU0Lu/%F0%9F%94%B8-Drawer-Specs?node-id=10-5397&t=58YG59t526tkk7dP-1
'use client';
import * as React from 'react';
import Stack from './stack';
import {Text3, Text4, Text5} from './text';
import {vars} from './skins/skin-contract.css';
import {IconButton} from './icon-button';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import Box from './box';
import * as styles from './drawer.css';
import classnames from 'classnames';
import {Portal} from './portal';
import {useIsInViewport, useScreenSize, useTheme} from './hooks';
import FocusTrap from './focus-trap';
import {useSetModalStateEffect} from './modal-context-provider';
import ButtonLayout from './button-layout';
import {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import Divider from './divider';
import {getPrefixedDataAttributes} from './utils/dom';
import * as tokens from './text-tokens';

import type {DataAttributes, TrackingEvent} from './utils/types';

const PADDING_X_DESKTOP = 40;
const PADDING_X_MOBILE = 16;
const PADDING_X_TABLET = 16;
const WIDTH_CONTENT = 388;
const WIDTH_DESKTOP = WIDTH_CONTENT + PADDING_X_DESKTOP * 2;
const WIDTH_TABLET = WIDTH_CONTENT + PADDING_X_TABLET * 2;

/**
 * Renders divider or a div with transparent border to avoid the small but noticeable layout shift on scroll
 */
const MaybeDivider = ({show}: {show: boolean}) =>
    show ? <Divider /> : <div style={{borderBottom: '1px solid transparent'}} />;

/**
 * Restores the focus to the element that was focused before the Drawer was opened
 */
const useRestoreFocus = () => {
    const activeElementRef = React.useRef<HTMLElement | null>(document.activeElement as HTMLElement);
    React.useEffect(() => {
        const elementToFocus = activeElementRef.current;
        return () => {
            elementToFocus?.focus?.();
        };
    }, []);
};

type DrawerLayoutProps = {
    width?: number;
    children: React.ReactNode;
    onClose: () => void;
    onDismiss?: () => void;
};

type DrawerPropsRef = {
    close: () => Promise<void>;
    dismiss: () => Promise<void>;
};

const DrawerLayout = React.forwardRef<DrawerPropsRef, DrawerLayoutProps>(
    ({width, children, onClose, onDismiss}, ref) => {
        useSetModalStateEffect();
        useRestoreFocus();
        const {isMobile, isTablet} = useScreenSize();
        const [isOpen, setIsOpen] = React.useState(false);

        const open = React.useCallback((node: HTMLDivElement) => {
            if (node) {
                // small delay to allow the Portal to be mounted
                setTimeout(() => setIsOpen(true), 50);
            }
        }, []);

        const close = React.useCallback(() => {
            setIsOpen(false);
            return new Promise((resolve) => {
                setTimeout(resolve, styles.ANIMATION_DURATION_MS);
            }).then(onClose);
        }, [onClose]);

        const dismiss = React.useCallback(() => {
            return close().then(() => onDismiss?.());
        }, [onDismiss, close]);

        React.useImperativeHandle(ref, () => ({close, dismiss}));

        React.useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    dismiss();
                }
            };
            document.addEventListener('keydown', handleKeyDown);
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }, [dismiss]);

        return (
            <Portal>
                <FocusTrap>
                    {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                    <div
                        onClick={onDismiss ? dismiss : undefined}
                        className={classnames(
                            styles.overlay,
                            isOpen ? styles.overlayOpen : styles.overlayClosed
                        )}
                        {...getPrefixedDataAttributes({}, 'DrawerOverlay')}
                    />
                    <div
                        ref={open}
                        style={{
                            width: isMobile ? 'unset' : width || (isTablet ? WIDTH_TABLET : WIDTH_DESKTOP),
                        }}
                        className={classnames(styles.container, isOpen ? styles.open : styles.closed)}
                        {...getPrefixedDataAttributes({}, 'DrawerLayout')}
                    >
                        {children}
                    </div>
                </FocusTrap>
            </Portal>
        );
    }
);

type ButtonProps = {
    text: string;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    trackEvent?: boolean;
    onPress: () => unknown;
};

type DrawerProps = {
    title?: string;
    subtitle?: string;
    description?: string;
    /**
     * set this handler to enable dismiss:
     * - touching "X"
     * - touching overlay
     * - pressing ESC
     */
    onDismiss?: () => void;
    onClose: () => void;
    children?: React.ReactNode;
    /**
     * width is ignored in mobile viewport
     */
    width?: number;
    button?: ButtonProps;
    secondaryButton?: ButtonProps;
    buttonLink?: ButtonProps;
    dataAttributes?: DataAttributes;
};

const Drawer = ({
    title,
    subtitle,
    description,
    width,
    onClose,
    onDismiss,
    children,
    button,
    secondaryButton,
    buttonLink,
    dataAttributes,
}: DrawerProps): JSX.Element => {
    const layoutRef = React.useRef<DrawerPropsRef>(null);
    const hasButtons = !!(button || secondaryButton || buttonLink);
    const [scrollableParentElement, setScrollableParentElement] = React.useState<HTMLElement | null>(null);
    const topScrollSignalRef = React.useRef<HTMLDivElement>(null);
    const bottomScrollSignalRef = React.useRef<HTMLDivElement>(null);
    const {t, texts} = useTheme();

    const paddingX = {
        mobile: PADDING_X_MOBILE,
        tablet: PADDING_X_TABLET,
        desktop: PADDING_X_DESKTOP,
    } as const;

    const handleButtonPress = (pressHandlerFromProps: () => unknown) => {
        layoutRef.current?.close().then(pressHandlerFromProps);
    };

    const showTitleDivider = !useIsInViewport(topScrollSignalRef, true, {
        root: scrollableParentElement,
    });

    const showButtonsDivider = !useIsInViewport(bottomScrollSignalRef, true, {
        rootMargin: '1px', // bottomScrollSignal div has 0px height so we need a 1px margin to trigger the intersection observer
        root: scrollableParentElement,
    });

    return (
        <DrawerLayout width={width} ref={layoutRef} onClose={onClose} onDismiss={onDismiss}>
            <section
                role="dialog"
                aria-modal="true"
                className={styles.drawer}
                ref={setScrollableParentElement}
                {...getPrefixedDataAttributes(dataAttributes, 'Drawer')}
            >
                {onDismiss && (
                    <div className={styles.closeButtonContainer}>
                        <IconButton
                            dataAttributes={{testid: 'dismissButton'}}
                            onPress={() => layoutRef.current?.dismiss()}
                            Icon={IconCloseRegular}
                            aria-label={texts.modalClose || t(tokens.modalClose)}
                            type="neutral"
                            backgroundType="transparent"
                        />
                    </div>
                )}
                {title && (
                    <div className={styles.titleContainer}>
                        <Box paddingX={paddingX}>
                            <Text5 dataAttributes={{testid: 'title'}}>{title}</Text5>
                        </Box>
                    </div>
                )}
                <MaybeDivider show={showTitleDivider} />
                <div className={styles.scrollableSection}>
                    <div ref={topScrollSignalRef} />
                    <Box paddingX={paddingX}>
                        <Stack space={16}>
                            {subtitle && (
                                <Text4 regular dataAttributes={{testid: 'subtitle'}}>
                                    {subtitle}
                                </Text4>
                            )}
                            {description && (
                                <Text3
                                    regular
                                    color={vars.colors.textSecondary}
                                    dataAttributes={{testid: 'description'}}
                                >
                                    {description}
                                </Text3>
                            )}
                            {children}
                        </Stack>
                    </Box>
                    <div ref={bottomScrollSignalRef} />
                </div>
                <MaybeDivider show={showButtonsDivider} />
                <Box paddingBottom={16} />
                {hasButtons && (
                    <Box paddingX={paddingX}>
                        <ButtonLayout
                            primaryButton={
                                button && (
                                    <ButtonPrimary
                                        trackEvent={button.trackEvent}
                                        trackingEvent={button.trackingEvent}
                                        onPress={() => handleButtonPress(button.onPress)}
                                    >
                                        {button.text}
                                    </ButtonPrimary>
                                )
                            }
                            secondaryButton={
                                secondaryButton && (
                                    <ButtonSecondary
                                        trackEvent={secondaryButton.trackEvent}
                                        trackingEvent={secondaryButton.trackingEvent}
                                        onPress={() => handleButtonPress(secondaryButton.onPress)}
                                    >
                                        {secondaryButton.text}
                                    </ButtonSecondary>
                                )
                            }
                            link={
                                buttonLink && (
                                    <ButtonLink
                                        trackEvent={buttonLink.trackEvent}
                                        trackingEvent={buttonLink.trackingEvent}
                                        onPress={() => handleButtonPress(buttonLink.onPress)}
                                    >
                                        {buttonLink.text}
                                    </ButtonLink>
                                )
                            }
                        />
                    </Box>
                )}
            </section>
        </DrawerLayout>
    );
};

export default Drawer;