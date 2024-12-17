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
import {useScreenSize} from './hooks';
import FocusTrap from './focus-trap';

const PADDING_X_DESKTOP = 40;
const PADDING_X_MOBILE = 16;
const CONTENT_WIDTH_DESKTOP = 388;

type DrawerLayoutProps = {
    width?: number;
    children: React.ReactNode;
    onClose?: () => void;
};

type DrawerPropsRef = {
    close: () => void;
};

const DrawerLayout = React.forwardRef<DrawerPropsRef, DrawerLayoutProps>(
    ({width, children, onClose}, ref) => {
        const defaultWidth = CONTENT_WIDTH_DESKTOP + PADDING_X_DESKTOP * 2;

        const {isDesktopOrBigger} = useScreenSize();

        const [isOpen, setIsOpen] = React.useState(false);

        const open = React.useCallback((node: HTMLDivElement) => {
            if (node) {
                // small delay to allow the Portal to be mounted
                setTimeout(() => setIsOpen(true), 50);
            }
        }, []);

        const close = React.useCallback(() => {
            setIsOpen(false);
            setTimeout(() => {
                onClose?.();
            }, styles.ANIMATION_DURATION_MS);
        }, [onClose]);

        React.useImperativeHandle(ref, () => ({
            close,
        }));

        return (
            <Portal>
                <FocusTrap>
                    {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                    <div
                        onClick={close}
                        className={classnames(
                            styles.overlay,
                            isOpen ? styles.overlayOpen : styles.overlayClosed
                        )}
                    />
                    <div
                        ref={open}
                        style={{width: isDesktopOrBigger ? width || defaultWidth : 'unset'}}
                        className={classnames(styles.container, isOpen ? styles.open : styles.closed)}
                    >
                        {children}
                    </div>
                </FocusTrap>
            </Portal>
        );
    }
);

type DrawerProps = {
    title?: string;
    subtitle?: string;
    description?: string;
    onClose?: () => void;
    children?: React.ReactNode;
    // actions?: React.ReactNode;
    /** Ignored in mobile viewport */
    width?: number;
};

const Drawer = ({title, subtitle, description, onClose, width, children}: DrawerProps): JSX.Element => {
    const layoutRef = React.useRef<DrawerPropsRef>(null);

    return (
        <DrawerLayout width={width} ref={layoutRef} onClose={onClose}>
            <Box
                paddingX={{desktop: PADDING_X_DESKTOP, mobile: PADDING_X_MOBILE}}
                paddingTop={40}
                paddingBottom={24}
            >
                {onClose && (
                    <div className={styles.closeButton}>
                        <IconButton
                            onPress={() => layoutRef.current?.close()}
                            Icon={IconCloseRegular}
                            aria-label="Close drawer"
                            type="neutral"
                            backgroundType="transparent"
                        ></IconButton>
                    </div>
                )}
                <Stack space={16}>
                    {title && <Text5>{title}</Text5>}
                    {subtitle && <Text4 regular>{subtitle}</Text4>}
                    {description && (
                        <Text3 regular color={vars.colors.textSecondary}>
                            {description}
                        </Text3>
                    )}
                    {children}
                </Stack>
            </Box>
        </DrawerLayout>
    );
};

export default Drawer;
