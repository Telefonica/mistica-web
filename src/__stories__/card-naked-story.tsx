import * as React from 'react';
import {NakedCard, Placeholder} from '..';
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
    slot,
    slotAlignment,
    footerSlot,
    titleAs,
    pretitleAs,
    ariaLabel,
    ariaDescription,
    imageFit,
    ...args
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
                {...args}
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
