import * as React from 'react';
import {InternalCard} from './card-internal';

import type {CardAction} from './card-deprecated';
import type {
    CardAspectRatio,
    SlotAlignment,
    MaybeTouchableCard,
    CardActionButtonLink,
    CardActionButtonSecondary,
    CardActionButtonPrimary,
} from './card-internal';
import type Tag from './tag';
import type {Variant} from './theme-variant-context';
import type {RendersNullableElement} from './utils/renders-element';
import type {DataAttributes, HeadingType} from './utils/types';
import type {ExclusifyUnion} from './utils/utility-types';
import type {VideoSource, VideoElement} from './video';

type CoverCardProps = {
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-description'?: string;
    'aria-describedby'?: string;
    size?: 'default' | 'display';
    variant?: Variant;
    aspectRatio?: CardAspectRatio;
    width?: number | string;
    height?: number | string;
    asset?: React.ReactElement;
    imageSrc?: string;
    imageSrcSet?: string;
    videoSrc?: VideoSource;
    videoRef?: React.RefObject<VideoElement>;
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
};

export const CoverCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<CoverCardProps>>(
    ({size = 'default', ...rest}, ref) => {
        console.log(rest);
        return <InternalCard type="cover" size={size} {...rest} ref={ref} />;
    }
);

type PosterCardBaseProps = {
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-description'?: string;
    'aria-describedby'?: string;
    aspectRatio?: CardAspectRatio;
    /** @deprecated use variant */
    isInverse?: boolean;
    variant?: Variant;
    size?: 'default' | 'display';
    width?: number | string;
    height?: number | string;
    asset?: React.ReactElement;
    videoSrc?: VideoSource;
    videoRef?: React.RefObject<VideoElement>;
    imageSrc?: string;
    imageSrcSet?: string;
    /** @deprecated use topActions */
    actions?: ReadonlyArray<CardAction | React.ReactElement>;
    topActions?: ReadonlyArray<CardAction | React.ReactElement>;
    /** @deprecated use buttonPrimary or buttonSecondary */
    button?: CardActionButtonPrimary;
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
    /** @deprecated use slot */
    extra?: React.ReactNode;
    slotAlignment?: SlotAlignment;
    slot?: React.ReactNode;
    children?: undefined;
};

type DeprecatedImageProps = {
    /** @deprecated use imageSrc or imageSrcSet */
    backgroundImage: string | {src: string; srcSet?: string} | {src?: string; srcSet: string};
};

type DeprecatedBackgroundColorProps = {
    backgroundColor?: string | undefined;
};

type DeprecatedVideoProps = {
    /** @deprecated use videoSrc */
    backgroundVideo: VideoSource;
    /** @deprecated use imageSrc */
    poster?: string;
    /** @deprecated use videoRef */
    backgroundVideoRef?: React.RefObject<VideoElement>;
};

type PosterCardProps = PosterCardBaseProps &
    ExclusifyUnion<DeprecatedImageProps | DeprecatedBackgroundColorProps | DeprecatedVideoProps>;

/**
 * @deprecated use CoverCard
 */
export const PosterCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<PosterCardProps>>(
    (
        {
            size = 'default',
            /** @deprecated use variant */
            isInverse,
            variant,
            /** @deprecated use topActions */
            actions,
            topActions,
            /** @deprecated use slot */
            extra,
            slot,
            /** @deprecated use imageSrc or imageSrcSet */
            backgroundImage,
            /** @deprecated use videoSrc */
            backgroundVideo,
            /** @deprecated use imageSrc */
            poster,
            videoSrc,
            imageSrc,
            imageSrcSet,
            /** @deprecated use videoRef */
            backgroundVideoRef,
            videoRef,
            /** @deprecated use buttonPrimary */
            button,
            buttonPrimary,
            dataAttributes,
            ...rest
        },
        ref
    ) => {
        return (
            <CoverCard
                ref={ref}
                size={size}
                variant={variant || (isInverse ? 'inverse' : undefined)}
                dataAttributes={{
                    'component-name': 'PosterCard',
                    testid: 'PosterCard',
                    ...dataAttributes,
                }}
                topActions={topActions || actions}
                slot={slot || extra}
                buttonPrimary={buttonPrimary || button}
                imageSrc={
                    imageSrc || (typeof backgroundImage === 'string' ? backgroundImage : backgroundImage?.src)
                }
                imageSrcSet={
                    imageSrcSet || (typeof backgroundImage === 'string' ? undefined : backgroundImage?.srcSet)
                }
                videoSrc={videoSrc || backgroundVideo}
                videoRef={videoRef || backgroundVideoRef}
                {...rest}
            />
        );
    }
);

/**
 * @deprecated use <CoverCard size="display" />
 */
export const DisplayMediaCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<PosterCardProps>>(
    ({dataAttributes, ...rest}, ref) => {
        return (
            <PosterCard
                ref={ref}
                size="display"
                dataAttributes={{
                    'component-name': 'DisplayMediaCard',
                    testid: 'DisplayMediaCard',
                    ...dataAttributes,
                }}
                {...rest}
            />
        );
    }
);
