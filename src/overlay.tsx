import * as React from 'react';
import {isAndroid, isChrome} from './utils/platform';
import {useDisableBodyScroll, useTheme} from './hooks';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

const defaultStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 12,
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
};

type Props = {
    children?: React.ReactNode;
    onPress?: (evt: React.MouseEvent<HTMLDivElement>) => unknown;
    style?: React.CSSProperties;
    className?: string;
    disableScroll?: boolean;
    dataAttributes?: DataAttributes;
};

const Overlay: React.FC<Props> = ({
    onPress,
    children,
    className,
    style,
    disableScroll = false,
    dataAttributes,
}) => {
    const [showChildren, setChildrenVisibility] = React.useState(true);
    useDisableBodyScroll(disableScroll);
    const {platformOverrides} = useTheme();

    // In mobile browsers event.button === 0. This event does not need to be handled in mobile. In desktop event.button === 2
    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.button === 2 && onPress) {
            onPress(event);
        }
    };

    return (
        <div
            data-overlay="true"
            {...getPrefixedDataAttributes(dataAttributes, 'Overlay')}
            style={{...defaultStyle, ...style}}
            className={className}
            onPointerDown={(e) => {
                // We use listen to and cancel pointerdown to close overlay if user scrolls on iOS.
                // In Android with children we hide children and onPress later in onClick to ensure click event doesn't hit element below overlay.
                if ((e.target as any).dataset.overlay && onPress) {
                    if (children && isAndroid(platformOverrides) && isChrome(platformOverrides)) {
                        setChildrenVisibility(false);
                        e.stopPropagation();
                    } else {
                        onPress(e);
                    }
                }
            }}
            onClick={(e) => {
                // In Android we need to call onPress here in onClick to ensure click event doesn't hit element below overlay.
                if (
                    (e.target as any).dataset.overlay &&
                    onPress &&
                    children &&
                    isAndroid(platformOverrides) &&
                    isChrome(platformOverrides)
                ) {
                    setChildrenVisibility(true);
                    onPress(e);
                }
            }}
            touch-action="auto" // Prop needed for Pointer Events Polyfill to work properly
            onContextMenu={handleContextMenu}
            role="button"
            tabIndex={0}
        >
            {showChildren && children}
        </div>
    );
};

export default Overlay;
