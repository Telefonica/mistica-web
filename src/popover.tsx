import * as React from 'react';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import IconButton from './icon-button';
import {useTheme, useScreenSize} from './hooks';
import Stack from './stack';
import Box from './box';
import Inline from './inline';
import {Text3, Text2} from './text';
import * as styles from './popover.css';
import {sprinkles} from './sprinkles.css';

import type {TrackingEvent} from './utils/types';

// Zeplin definition:
// https://app.zeplin.io/project/5c9b6f097168bc065782b5c3/screen/5d15d87e46571573089f2863

const {
    defaultPositionDesktop,
    defaultPositionMobile,
    distanceToTarget,
    marginLeftRightMobile,
    maxWidthDesktop,
    arrowSize,
} = styles;

type Position = 'top' | 'bottom' | 'left' | 'right';

type TargetPosition = {
    left: number;
    top: number;
    width: number;
    height: number;
    parentLeft: number;
};

const getWidthDesktop = (customWidth?: number): number => (customWidth ? customWidth : maxWidthDesktop);

const getPosition = (position: Position = defaultPositionDesktop, isTabletOrSmaller: boolean) =>
    isTabletOrSmaller && (position === 'left' || position === 'right') ? defaultPositionMobile : position;

const getWidth = (isTabletOrSmaller: boolean, isIos: boolean, width?: number): number =>
    // in iOS, when the webview is rendered offscreen (eg. acccount tab), window.innerWidth value is wrong, it returns strange values like 0 or 80.
    isTabletOrSmaller
        ? (isIos ? window.screen.width : window.innerWidth) - marginLeftRightMobile * 2
        : getWidthDesktop(width);

const getPositionStyles = (
    position: Position,
    width: number,
    targetPosition: TargetPosition,
    isTabletOrSmaller: boolean
) => {
    const containerStylesByPos: Record<Position, React.CSSProperties> = {
        right: {
            left: targetPosition.width + distanceToTarget,
            top: targetPosition.height / 2,
            transform: 'translateY(-50%)',
            WebkitTransform: 'translateY(-50%)',
        },
        left: {
            left: targetPosition.left - width - distanceToTarget,
            top: targetPosition.height / 2,
            transform: 'translateY(-50%)',
            WebkitTransform: 'translateY(-50%)',
        },
        top: {
            transform: 'translateY(-100%)',
            WebkitTransform: 'translateY(-100%)',
            top: -distanceToTarget,
            left: isTabletOrSmaller
                ? marginLeftRightMobile - targetPosition.parentLeft
                : Math.max(targetPosition.width / 2 - width / 2, 0),
        },
        bottom: {
            top: targetPosition.height + distanceToTarget,
            left: isTabletOrSmaller
                ? marginLeftRightMobile - targetPosition.parentLeft
                : Math.max(targetPosition.width / 2 - width / 2, 0),
        },
    };

    const containerStyles = containerStylesByPos[position];

    const arrowStylesByPos: Record<Position, React.CSSProperties> = {
        right: {
            right: '100%',
            top: '50%',
            transform: 'translateY(-100%) rotate(90deg)',
            transformOrigin: 'bottom',
        },
        left: {
            left: '100%',
            top: '50%',
            transform: 'translateY(-100%) rotate(-90deg)',
            transformOrigin: 'bottom',
        },
        top: {
            top: '100%',
            left: containerStyles.left === 0 ? targetPosition.width / 2 : '50%',
            transform: 'translateX(-50%)',
        },
        bottom: {
            bottom: '100%',
            left: containerStyles.left === 0 ? targetPosition.width / 2 : '50%',
            transform: 'translateX(-50%) rotate(180deg)',
        },
    };

    const arrowStyles = arrowStylesByPos[position];

    if (isTabletOrSmaller) {
        arrowStyles.left = targetPosition.parentLeft + targetPosition.width / 2 - marginLeftRightMobile;
    }

    return {containerStyles, arrowStyles};
};

const getTargetPosition = (targetWrapper: HTMLDivElement | null): TargetPosition | null =>
    targetWrapper
        ? {
              left: targetWrapper.offsetLeft,
              top: targetWrapper.offsetTop,
              width: targetWrapper.offsetWidth,
              height: targetWrapper.offsetHeight,
              // @ts-expect-error - parentNode must exist
              parentLeft: targetWrapper.parentNode.offsetLeft,
          }
        : null;

type Props = {
    description?: string;
    target: React.ReactNode;
    title?: string;
    asset?: React.ReactNode;
    onClose?: () => void;
    position?: Position;
    width?: number;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    isVisible?: boolean;
    children?: void;
    extra?: React.ReactNode;
};

const Popover: React.FC<Props> = ({
    description,
    title,
    onClose,
    trackingEvent,
    position,
    width,
    target,
    asset,
    isVisible = true,
    extra,
}) => {
    const {texts, colors, isIos, isDarkMode} = useTheme();
    const {isTabletOrSmaller} = useScreenSize();
    const [targetPosition, setTargetPosition] = React.useState<TargetPosition | null>(null);

    const targetWrapperRef = React.useRef<HTMLDivElement | null>(null);

    position = getPosition(position, isTabletOrSmaller);
    const innerWidth = getWidth(isTabletOrSmaller, isIos, width);
    const shadowAlpha = isDarkMode ? 1 : 0.2;

    React.useEffect(() => {
        const handleResize = () => {
            setTargetPosition(getTargetPosition(targetWrapperRef.current));
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    React.useEffect(() => {
        setTargetPosition(getTargetPosition(targetWrapperRef.current));
    }, [isVisible]);

    let popoverContainer = null;

    if (isVisible && targetPosition) {
        const {containerStyles, arrowStyles} = getPositionStyles(
            position,
            innerWidth,
            targetPosition,
            isTabletOrSmaller
        );

        popoverContainer = (
            <div
                className={styles.container}
                style={{
                    width: innerWidth,
                    boxShadow: `0 2px 4px 0 rgba(0, 0, 0, ${shadowAlpha})`,
                    ...containerStyles,
                }}
            >
                <div className={styles.arrowWrapper} style={arrowStyles}>
                    <div
                        className={styles.arrow}
                        style={{
                            width: arrowSize,
                            height: arrowSize,
                            boxSizing: 'border-box',
                            boxShadow:
                                position === 'bottom' ? 'initial' : `0 0 4px 0 rgba(0, 0, 0, ${shadowAlpha})`,
                        }}
                    />
                </div>
                <Box padding={16}>
                    <Box paddingRight={24} className={sprinkles({display: 'flex'})}>
                        <Inline space={16}>
                            {asset}
                            <Box className={styles.textAlign}>
                                <Stack space={4} className={styles.textContent}>
                                    {title && <Text3 regular>{title}</Text3>}
                                    <Text2 regular color={colors.textSecondary}>
                                        {description}
                                    </Text2>
                                </Stack>
                            </Box>
                        </Inline>
                    </Box>
                    <IconButton
                        className={styles.closeButtonIcon}
                        onPress={(e) => {
                            onClose?.();
                            e.stopPropagation();
                        }}
                        trackingEvent={trackingEvent}
                        aria-label={texts.modalClose}
                    >
                        <IconCloseRegular color={colors.neutralHigh} />
                    </IconButton>
                    {extra}
                </Box>
            </div>
        );
    }

    return (
        <div className={sprinkles({position: 'relative'})}>
            <div ref={targetWrapperRef}>{target}</div>
            {popoverContainer}
        </div>
    );
};

export default Popover;
