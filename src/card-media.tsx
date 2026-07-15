import * as React from 'react';
import {InternalCard} from './card-internal';

import type {Variant} from './theme-variant-context';
import type Tag from './tag';
import type {VideoSource} from './video';
import type {
    CardActionButtonLink,
    CardActionButtonPrimary,
    CardActionButtonSecondary,
    CardAspectRatio,
    CardSize,
    MaybeTouchableCard,
    MediaAspectRatio,
    SlotAlignment,
    TopActionsArray,
} from './card-internal';
import type {DataAttributes, HeadingType, RendersNullableElement} from './utils/types';

/**
 * The Naked card shares the same props as the MediaCard
 */
export type MediaCardProps = {
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-description'?: string;
    'aria-describedby'?: string;
    size?: CardSize;
    mediaPosition?: 'top' | 'left' | 'right';
    mediaWidth?: number | string;
    /** Ignored when mediaPosition is 'left' or 'right' */
    mediaAspectRatio?: MediaAspectRatio;
    /** Ignored when media position is not 'left' or 'right' */
    imageFit?: 'fit' | 'fill' | 'fill-center';
    backgroundColor?: string;
    width?: number | string;
    height?: number | string;
    aspectRatio?: CardAspectRatio;
    imageAlt?: string;
    imageSrc?: string;
    imageSrcSet?: string;
    circledImage?: boolean;
    videoSrc?: VideoSource;
    videoLoop?: boolean;
    videoAutoPlay?: boolean;
    videoDataAttributes?: DataAttributes;
    variant?: Variant;
    asset?: React.ReactElement;
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
    /** @deprecated use slot */
    extra?: React.ReactNode;
    slot?: React.ReactNode;
    slotAlignment?: SlotAlignment;
    topActions?: TopActionsArray;
    buttonLink?: CardActionButtonLink;
    buttonPrimary?: CardActionButtonPrimary;
    buttonSecondary?: CardActionButtonSecondary;
    dataAttributes?: DataAttributes;
    onClose?: () => unknown;
    closeButtonLabel?: string;
    showFooter?: boolean;
    footerBackgroundColor?: string;
    footerVariant?: 'default' | 'brand' | 'inverse';
    footerSlot?: React.ReactNode;
    footerDivider?: boolean;
};

export const MediaCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<MediaCardProps>>(
    ({size = 'default', slot, extra, topActions, buttonPrimary, dataAttributes, ...rest}, ref) => {
        return (
            <InternalCard
                type="media"
                variant="default"
                size={size}
                dataAttributes={{
                    testid: 'MediaCard',
                    ...dataAttributes,
                }}
                slot={slot || extra}
                topActions={topActions}
                buttonPrimary={buttonPrimary}
                ref={ref}
                {...rest}
            />
        );
    }
);
