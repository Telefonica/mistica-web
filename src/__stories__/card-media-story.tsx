import * as React from 'react';
import {MediaCard, Placeholder, Tag} from '..';
import {
    commonArgTypes,
    dataArgTypes,
    defaultCommonCardArgs,
    getAsset,
    getButtonLink,
    getButtonPrimary,
    getButtonSecondary,
    getTopActions,
    imageAndVideoArgTypes,
    imageNameToUrl,
    mediaArgTypes,
    normalizeAspectRatio,
    ThemeVariantWrapper,
    videoNameToUrl,
} from './card-common';

import type {Variant} from '../theme-variant-context';
import type {CardAspectRatio, MediaAspectRatio, MediaPosition, SlotAlignment} from '../card-internal';
import type {CommonCardArgs} from './card-common';

export default {
    title: 'Components/Cards/MediaCard',
    parameters: {
        fullScreen: true,
    },
};

type MediaCardArgs = CommonCardArgs & {
    slotAlignment: SlotAlignment | '';
    backgroundColor: string;
    footerBackgroundColor: string;
    imageSrc: string;
    imageAlt: string;
    videoSrc: string;
    videoLoop?: boolean;
    videoAutoPlay?: boolean;
    mediaPosition: MediaPosition;
    mediaAspectRatio?: MediaAspectRatio | string;
    mediaWidth: string;
    imageFit: '' | 'fit' | 'fill' | 'fill-center';
};

export const Default: StoryComponent<MediaCardArgs> = ({
    asset,
    width,
    height,
    variant,
    variantOutside,
    aspectRatio,
    mediaAspectRatio,
    mediaWidth,
    onClose,
    onPress,
    topActions,
    buttonPrimary,
    buttonSecondary,
    buttonLink,
    footerVariant,
    imageSrc,
    videoSrc,
    videoLoop,
    videoAutoPlay,
    slot,
    slotAlignment,
    footerSlot,
    titleAs,
    pretitleAs,
    ariaLabel,
    ariaDescription,
    imageFit,
    size,
    headlineType,
    headline,
    pretitle,
    pretitleLinesMax,
    title,
    titleLinesMax,
    subtitle,
    subtitleLinesMax,
    description,
    descriptionLinesMax,
    showFooter,
    backgroundColor,
    footerBackgroundColor,
    imageAlt,
    mediaPosition,
}) => {
    return (
        <ThemeVariantWrapper variant={variantOutside}>
            <MediaCard
                width={width ? (Number.isFinite(+width) ? +width : width) : undefined}
                height={height ? (Number.isFinite(+height) ? +height : height) : undefined}
                titleAs={titleAs || undefined}
                pretitleAs={pretitleAs || undefined}
                asset={getAsset(asset)}
                variant={(variant as Variant) || undefined}
                footerVariant={footerVariant || undefined}
                aspectRatio={normalizeAspectRatio(aspectRatio) as CardAspectRatio}
                mediaAspectRatio={(normalizeAspectRatio(mediaAspectRatio) as MediaAspectRatio) || undefined}
                topActions={getTopActions(topActions)}
                imageSrc={imageNameToUrl[imageSrc as never]}
                videoSrc={videoNameToUrl[videoSrc as never]}
                videoLoop={videoLoop}
                videoAutoPlay={videoAutoPlay}
                slot={slot ? <Placeholder height={50} /> : undefined}
                slotAlignment={slotAlignment || undefined}
                footerSlot={footerSlot ? <Placeholder height={50} /> : undefined}
                mediaWidth={mediaWidth || undefined}
                buttonPrimary={getButtonPrimary(buttonPrimary)}
                buttonSecondary={getButtonSecondary(buttonSecondary)}
                buttonLink={getButtonLink(buttonLink)}
                onClose={onClose ? () => {} : undefined}
                onPress={onPress ? () => {} : undefined}
                aria-label={ariaLabel || undefined}
                aria-description={ariaDescription || undefined}
                imageFit={imageFit || undefined}
                size={size}
                headline={headline && <Tag type={headlineType}>{headline}</Tag>}
                pretitle={pretitle}
                pretitleLinesMax={pretitleLinesMax}
                title={title}
                titleLinesMax={titleLinesMax}
                subtitle={subtitle}
                subtitleLinesMax={subtitleLinesMax}
                description={description}
                descriptionLinesMax={descriptionLinesMax}
                showFooter={showFooter}
                backgroundColor={backgroundColor}
                footerBackgroundColor={footerBackgroundColor}
                imageAlt={imageAlt}
                mediaPosition={mediaPosition}
            />
        </ThemeVariantWrapper>
    );
};

Default.storyName = 'MediaCard';

Default.args = {
    ...defaultCommonCardArgs,
    slotAlignment: '',
    backgroundColor: '',
    footerBackgroundColor: '',
    imageSrc: 'beach',
    imageAlt: 'Image Alt Text',
    videoSrc: 'undefined',
    videoLoop: false,
    videoAutoPlay: false,
    mediaPosition: 'top',
    mediaAspectRatio: '16 9',
    mediaWidth: '150px',
    imageFit: '',
};

Default.argTypes = {
    ...commonArgTypes,
    ...dataArgTypes,
    ...imageAndVideoArgTypes,
    ...mediaArgTypes,
};
