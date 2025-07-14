import * as React from 'react';
import {ButtonLink, ButtonPrimary, ButtonSecondary, MediaCard, Placeholder} from '..';
import {
    commonArgTypes,
    defaultCommonCardArgs,
    getAsset,
    getTopActions,
    imageNameToUrl,
    normalizeAspectRatio,
    videoNameToUrl,
} from './card-common';

import type {
    CardAspectRatio,
    DefaultOrInverseVariant,
    MediaAspectRatio,
    MediaPosition,
} from '../card-internal';
import type {CommonCardArgs} from './card-common';

export default {
    title: 'Components/Cards/MediaCard',
};

type MediaCardArgs = CommonCardArgs & {
    variant: DefaultOrInverseVariant | '';
    backgroundColor: string;
    imageSrc: string;
    videoSrc: string;
    mediaPosition: MediaPosition;
    mediaAspectRatio?: MediaAspectRatio | string;
    mediaWidth: string;
    circledImage: boolean;
};

export const Default: StoryComponent<MediaCardArgs> = ({
    asset,
    variant,
    aspectRatio,
    mediaAspectRatio,
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
    footerSlot,
    ...args
}) => {
    return (
        <MediaCard
            asset={getAsset(asset)}
            variant={variant || undefined}
            footerVariant={footerVariant || undefined}
            aspectRatio={normalizeAspectRatio(aspectRatio) as CardAspectRatio}
            mediaAspectRatio={(normalizeAspectRatio(mediaAspectRatio) as MediaAspectRatio) || undefined}
            topActions={getTopActions(topActions)}
            imageSrc={imageNameToUrl[imageSrc as never]}
            videoSrc={videoNameToUrl[videoSrc as never]}
            slot={slot ? <Placeholder height={50} /> : undefined}
            footerSlot={slot ? <Placeholder height={50} /> : undefined}
            buttonPrimary={
                buttonPrimary ? (
                    <ButtonPrimary small onPress={() => {}}>
                        Button Primary
                    </ButtonPrimary>
                ) : undefined
            }
            buttonSecondary={
                buttonSecondary ? (
                    <ButtonSecondary small onPress={() => {}}>
                        Button Secondary
                    </ButtonSecondary>
                ) : undefined
            }
            buttonLink={
                buttonLink ? (
                    <ButtonLink small onPress={() => {}} withChevron>
                        Button Link
                    </ButtonLink>
                ) : undefined
            }
            onClose={onClose ? () => {} : undefined}
            onPress={onPress ? () => {} : undefined}
            {...args}
        />
    );
};

Default.args = {
    ...defaultCommonCardArgs,
    variant: '',
    backgroundColor: '',
    imageSrc: 'beach',
    videoSrc: 'undefined',
    mediaPosition: 'top',
    mediaAspectRatio: '16 9',
    mediaWidth: '150px',
    circledImage: false,
};

Default.argTypes = {
    variant: {
        options: ['', 'default', 'inverse', 'alternative', 'media'],
        control: {
            type: 'select',
            labels: {
                '': 'undefined',
                default: 'default',
                inverse: 'inverse',
                alternative: 'alternative',
                media: 'media',
            },
        },
    },
    variantOutside: {
        options: ['default', 'inverse', 'alternative'],
        control: {
            type: 'select',
            labels: {
                default: 'default',
                inverse: 'inverse',
                alternative: 'alternative',
            },
        },
    },
    imageSrc: {
        options: Object.keys(imageNameToUrl),
        control: {type: 'select'},
    },
    videoSrc: {
        options: Object.keys(videoNameToUrl),
        control: {type: 'select'},
    },
    mediaPosition: {
        options: ['top', 'left', 'right'],
        control: {type: 'select'},
    },
    headlineType: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error', 'info'],
        control: {type: 'select'},
    },
    aspectRatio: {
        options: ['auto', '1 1', '16 9', '7 10', '9 10'],
        control: {
            type: 'select',
            labels: {
                '1 1': '1:1',
                '16 9': '16:9',
                '7 10': '7:10',
                '9 10': '9:10',
            },
        },
    },
    mediaAspectRatio: {
        options: ['auto', '1 1', '16 9', '7 10', '9 10'],
        control: {
            type: 'select',
            labels: {
                '1 1': '1:1',
                '16 9': '16:9',
                '7 10': '7:10',
                '9 10': '9:10',
            },
        },
    },
    ...commonArgTypes,
};
