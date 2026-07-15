import * as React from 'react';
import {InternalCard} from './card-internal';

import type {Variant} from './theme-variant-context';
import type {
    CardAspectRatio,
    SlotAlignment,
    MaybeTouchableCard,
    CardActionButtonLink,
    CardActionButtonSecondary,
    CardActionButtonPrimary,
    CardAction,
    CardSize,
} from './card-internal';
import type Tag from './tag';
import type {RendersNullableElement} from './utils/renders-element';
import type {DataAttributes, HeadingType} from './utils/types';
import type {VideoSource, VideoElement} from './video';

type CoverCardProps = {
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-description'?: string;
    'aria-describedby'?: string;
    size?: CardSize;
    variant?: Variant;
    backgroundColor?: string;
    gradientOverlayColor?: 'transparent' | string;
    aspectRatio?: CardAspectRatio;
    width?: number | string;
    height?: number | string;
    asset?: React.ReactElement;
    imageSrc?: string;
    imageSrcSet?: string;
    videoSrc?: VideoSource;
    videoRef?: React.RefObject<VideoElement>;
    videoLoop?: boolean;
    videoAutoPlay?: boolean;
    videoDataAttributes?: DataAttributes;
    topActions?: ReadonlyArray<CardAction | React.ReactElement>;
    buttonPrimary?: CardActionButtonPrimary;
    buttonSecondary?: CardActionButtonSecondary;
    buttonLink?: CardActionButtonLink;
    onClose?: () => unknown;
    closeButtonLabel?: string;
    dataAttributes?: DataAttributes;
    headline?: string | RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleAs?: HeadingType;
    pretitleLinesMax?: number;
    title?: string;
    titleAs?: HeadingType;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    slotAlignment?: SlotAlignment;
    slot?: React.ReactNode;
    children?: undefined;
    showFooter?: boolean;
    footerBackgroundColor?: string;
    footerVariant?: 'default' | 'brand' | 'inverse';
    footerSlot?: React.ReactNode;
    footerDivider?: boolean;
};

export const CoverCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<CoverCardProps>>(
    ({size = 'default', dataAttributes, ...rest}, ref) => {
        return (
            <InternalCard
                ref={ref}
                dataAttributes={{
                    testid: 'CoverCard',
                    ...dataAttributes,
                }}
                type="cover"
                size={size}
                {...rest}
            />
        );
    }
);
