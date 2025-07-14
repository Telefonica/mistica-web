import * as React from 'react';
import {MediaCard, Placeholder} from '..';
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

import type {
    CardAspectRatio,
    DefaultOrInverseVariant,
    MediaAspectRatio,
    MediaPosition,
    SlotAlignment,
} from '../card-internal';
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
    imageSrc: string;
    videoSrc: string;
    mediaPosition: MediaPosition;
    mediaAspectRatio?: MediaAspectRatio | string;
    mediaWidth: string;
};

export const Default: StoryComponent<MediaCardArgs> = ({
    asset,
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
    slot,
    slotAlignment,
    footerSlot,
    titleAs,
    pretitleAs,
    ...args
}) => {
    return (
        <ThemeVariantWrapper variant={variantOutside}>
            <MediaCard
                titleAs={titleAs || undefined}
                pretitleAs={pretitleAs || undefined}
                asset={getAsset(asset)}
                variant={(variant as DefaultOrInverseVariant) || undefined}
                footerVariant={footerVariant || undefined}
                aspectRatio={normalizeAspectRatio(aspectRatio) as CardAspectRatio}
                mediaAspectRatio={(normalizeAspectRatio(mediaAspectRatio) as MediaAspectRatio) || undefined}
                topActions={getTopActions(topActions)}
                imageSrc={imageNameToUrl[imageSrc as never]}
                videoSrc={videoNameToUrl[videoSrc as never]}
                slot={slot ? <Placeholder height={50} /> : undefined}
                slotAlignment={slotAlignment || undefined}
                footerSlot={slot ? <Placeholder height={50} /> : undefined}
                mediaWidth={mediaWidth || undefined}
                buttonPrimary={getButtonPrimary(buttonPrimary)}
                buttonSecondary={getButtonSecondary(buttonSecondary)}
                buttonLink={getButtonLink(buttonLink)}
                onClose={onClose ? () => {} : undefined}
                onPress={onPress ? () => {} : undefined}
                {...args}
            />
        </ThemeVariantWrapper>
    );
};

Default.storyName = 'MediaCard';

Default.args = {
    ...defaultCommonCardArgs,
    slotAlignment: '',
    backgroundColor: '',
    imageSrc: 'beach',
    videoSrc: 'undefined',
    mediaPosition: 'top',
    mediaAspectRatio: '16 9',
    mediaWidth: '150px',
};

Default.argTypes = {
    ...commonArgTypes,
    ...dataArgTypes,
    ...imageAndVideoArgTypes,
    ...mediaArgTypes,
};
