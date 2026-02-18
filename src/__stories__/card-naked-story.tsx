import * as React from 'react';
import {NakedCard, Placeholder, Tag} from '..';
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

import type {CardAspectRatio, MediaAspectRatio, MediaPosition, SlotAlignment} from '../card-internal';
import type {CommonCardArgs} from './card-common';

export default {
    title: 'Components/Cards/NakedCard',
    parameters: {
        fullScreen: true,
    },
};

type NakedCardArgs = Omit<CommonCardArgs, 'variant' | 'footerVariant'> & {
    slotAlignment: SlotAlignment | '';
    imageSrc: string;
    videoSrc: string;
    videoLoop?: boolean;
    videoAutoPlay?: boolean;
    imageAlt: string;
    mediaPosition: MediaPosition;
    mediaAspectRatio?: MediaAspectRatio | string;
    mediaWidth: string;
    circledImage: boolean;
    imageFit: '' | 'fit' | 'fill' | 'fill-center';
};

export const Default: StoryComponent<NakedCardArgs> = ({
    asset,
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
    width,
    height,
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
    imageAlt,
    mediaPosition,
    circledImage,
}) => {
    return (
        <ThemeVariantWrapper variant={variantOutside}>
            <NakedCard
                titleAs={titleAs || undefined}
                pretitleAs={pretitleAs || undefined}
                asset={getAsset(asset)}
                aspectRatio={normalizeAspectRatio(aspectRatio) as CardAspectRatio}
                mediaAspectRatio={(normalizeAspectRatio(mediaAspectRatio) as MediaAspectRatio) || undefined}
                mediaWidth={mediaWidth || undefined}
                topActions={getTopActions(topActions)}
                imageSrc={imageNameToUrl[imageSrc as never]}
                videoSrc={videoNameToUrl[videoSrc as never]}
                videoLoop={videoLoop}
                videoAutoPlay={videoAutoPlay}
                slot={slot ? <Placeholder height={50} /> : undefined}
                slotAlignment={slotAlignment || undefined}
                footerSlot={footerSlot ? <Placeholder height={50} /> : undefined}
                buttonPrimary={getButtonPrimary(buttonPrimary)}
                buttonSecondary={getButtonSecondary(buttonSecondary)}
                buttonLink={getButtonLink(buttonLink)}
                onClose={onClose ? () => {} : undefined}
                onPress={onPress ? () => {} : undefined}
                aria-label={ariaLabel || undefined}
                aria-description={ariaDescription || undefined}
                imageFit={imageFit || undefined}
                size={size}
                width={width}
                height={height}
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
                imageAlt={imageAlt}
                mediaPosition={mediaPosition}
                circledImage={circledImage}
            />
        </ThemeVariantWrapper>
    );
};

Default.storyName = 'NakedCard';

const {variant, footerVariant, ...commonArgs} = defaultCommonCardArgs;

Default.args = {
    ...commonArgs,
    slotAlignment: '',
    imageSrc: 'beach',
    imageAlt: 'Image Alt Text',
    videoSrc: 'undefined',
    videoLoop: false,
    videoAutoPlay: false,
    mediaPosition: 'top',
    mediaAspectRatio: '16 9',
    mediaWidth: '150px',
    circledImage: false,
    imageFit: '',
};

Default.argTypes = {
    ...commonArgTypes,
    ...dataArgTypes,
    ...imageAndVideoArgTypes,
    ...mediaArgTypes,
};
