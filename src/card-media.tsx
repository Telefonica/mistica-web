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
    DeprecatedMediaProp,
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
    /** @deprecated use imageSrc, imageSrcSet, videoSrc and related props */
    media?: DeprecatedMediaProp;
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
    videoSrc?: VideoSource;
    /** @deprecated use imageSrc */
    poster?: string;
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
    /** @deprecated use topActions */
    actions?: TopActionsArray;
    topActions?: TopActionsArray;
    /** @deprecated use buttonPrimary */
    button?: CardActionButtonPrimary;
    buttonLink?: CardActionButtonLink;
    buttonPrimary?: CardActionButtonPrimary;
    buttonSecondary?: CardActionButtonSecondary;
    dataAttributes?: DataAttributes;
    onClose?: () => unknown;
    closeButtonLabel?: string;
    showFooter?: boolean;
    footerBackgroundColor?: string;
    footerVariant?: 'default' | 'inverse';
    footerSlot?: React.ReactNode;
};

export const MediaCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<MediaCardProps>>(
    (
        {size = 'default', slot, extra, topActions, actions, button, buttonPrimary, dataAttributes, ...rest},
        ref
    ) => {
        return (
            <InternalCard
                type="media"
                variant="default"
                size={size}
                dataAttributes={{
                    'component-name': 'MediaCard',
                    testid: 'MediaCard',
                    ...dataAttributes,
                }}
                slot={slot || extra}
                topActions={topActions || actions}
                buttonPrimary={buttonPrimary || button}
                ref={ref}
                {...rest}
            />
        );
    }
);

type DeprecatedHighlightedCardProps = Omit<MediaCardProps, 'size' | 'mediaPosition'> & {
    /** @deprecated use imageSrc */
    imageUrl?: string;
    /** @deprecated use variant */
    isInverse?: boolean;
};

/**
 * @deprecated use <MediaCard size="default" mediaPosition="right" />
 */
export const HighlightedCard = React.forwardRef<
    HTMLDivElement,
    MaybeTouchableCard<DeprecatedHighlightedCardProps>
>(
    (
        {
            dataAttributes,
            isInverse,
            variant,
            imageUrl,
            imageSrc,
            mediaWidth,
            slotAlignment = 'bottom',
            ...rest
        },
        ref
    ) => {
        return (
            <MediaCard
                size="default"
                mediaPosition="right"
                mediaWidth={mediaWidth || 100}
                dataAttributes={{
                    'component-name': 'HighlightedCard',
                    testid: 'HighlightedCard',
                    ...dataAttributes,
                }}
                slotAlignment={slotAlignment}
                imageSrc={imageSrc || imageUrl}
                variant={variant || (isInverse ? 'inverse' : 'default')}
                ref={ref}
                {...rest}
            />
        );
    }
);
