import * as React from 'react';
import {InternalCard} from './card-internal';

import type {CardAction} from './card-deprecated';
import type {
    CardAspectRatio,
    SlotAlignment,
    MaybeTouchableCard,
    BackgroundImageOrVideoProps,
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

type CoverCardBaseProps = {
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

type ImageProps = {
    backgroundImageSrc?: string;
    backgroundImageSrcSet?: string;
};

type BackgroundColorProps = {
    backgroundColor?: string;
};

type VideoProps = {
    backgroundVideo: VideoSource;
    poster?: string;
    backgroundVideoRef?: React.RefObject<VideoElement>;
};

type CoverCardProps = CoverCardBaseProps & ExclusifyUnion<ImageProps | VideoProps | BackgroundColorProps>;

export const CoverCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<CoverCardProps>>(
    ({size = 'default', ...rest}, ref) => {
        return <InternalCard size={size} {...rest} ref={ref} type="cover" />;
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
    width?: number | string;
    height?: number | string;
    asset?: React.ReactElement;
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
    backgroundImage: string | {src: string; srcSet?: string} | {src?: string; srcSet: string};
};

type DeprecatedBackgroundColorProps = {
    backgroundColor?: string | undefined;
};

type PosterCardProps = PosterCardBaseProps &
    ExclusifyUnion<DeprecatedImageProps | DeprecatedBackgroundColorProps>;

/**
 * @deprecated use CoverCard
 */
export const PosterCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<PosterCardProps>>(
    (
        {
            isInverse,
            variant,
            actions,
            topActions,
            extra,
            slot,
            backgroundImage,
            button,
            buttonPrimary,
            buttonSecondary,
            dataAttributes,
            ...rest
        },
        ref
    ) => {
        const imageProps = {
            imageSrc: typeof backgroundImage === 'string' ? backgroundImage : backgroundImage?.src,
            imageSrcSet: typeof backgroundImage === 'string' ? undefined : backgroundImage?.srcSet,
        } as BackgroundImageOrVideoProps;
        return (
            <CoverCard
                ref={ref}
                size="default"
                variant={variant || (isInverse ? 'inverse' : undefined)}
                dataAttributes={{'component-name': 'PosterCard', testid: 'PosterCard', ...dataAttributes}}
                topActions={topActions || actions}
                slot={slot || extra}
                buttonPrimary={buttonPrimary || button}
                buttonSecondary={buttonSecondary}
                {...imageProps}
                {...rest}
            />
        );
    }
);

/**
 * @deprecated use <CoverCard size="display" />
 */
export const DisplayMediaCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<PosterCardProps>>(
    ({backgroundImage, dataAttributes, ...rest}, ref) => {
        return (
            <CoverCard
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
