import * as React from 'react';
import {
    ButtonPrimary,
    ButtonLink,
    IconMobileDeviceRegular,
    skinVars,
    Circle,
    Tag,
    IconStarFilled,
    IconStarRegular,
    ButtonSecondary,
    ThemeVariant,
} from '..';
import {InternalCard} from '../card-internal';
import {Placeholder} from '../placeholder';
import avatarImg from './images/avatar.jpg';
import beachVideo from './videos/beach.mp4';
import beachImg from './images/beach.jpg';

import type {HeadingType} from '../utils/types';
import type {TagType} from '..';
import type {Variant} from '../theme-variant-context';
import type {
    CardAspectRatio,
    CardSize,
    CardType,
    MediaAspectRatio,
    MediaPosition,
    SlotAlignment,
} from '../card-internal';

export default {
    title: 'Components/Cards/InternalCard',
    component: InternalCard,
    parameters: {
        fullScreen: true,
    },
};

const fixedAspectRatioValues = ['1 1', '16 9', '7 10', '9 10'];

type InternalCardArgs = {
    type: CardType;
    size: CardSize;
    backgroundColor: string;
    imageSrc: string;
    videoSrc: string;
    mediaPosition: MediaPosition;
    mediaAspectRatio: string;
    mediaWidth: string;
    variant: Variant | '';
    variantOutside: Variant;
    asset: 'icon' | 'image' | 'none';
    headlineType: TagType;
    headline: string;
    pretitle: string;
    pretitleAs: HeadingType;
    title: string;
    titleAs: HeadingType;
    subtitle: string;
    description: string;
    ariaLabel: string;
    slot: boolean;
    slotAlignment: SlotAlignment;
    onClose: boolean;
    onPress: boolean;
    topActions: boolean;
    aspectRatio: string;
    showFooter: boolean;
    footerSlot: boolean;
    buttonPrimary: boolean;
    buttonSecondary: boolean;
    buttonLink: boolean;
    footerBackgroundColor: string;
    footerVariant: Variant | '';
};

export const Default: StoryComponent<InternalCardArgs> = ({
    type,
    size,
    backgroundColor,
    imageSrc,
    videoSrc,
    mediaPosition,
    mediaAspectRatio,
    mediaWidth,
    variant,
    variantOutside,
    asset = 'icon',
    headline,
    headlineType,
    pretitle,
    pretitleAs,
    title,
    titleAs,
    subtitle,
    description,
    ariaLabel,
    slot,
    slotAlignment,
    onClose,
    onPress,
    buttonPrimary,
    buttonSecondary,
    buttonLink,
    topActions,
    aspectRatio,
    footerSlot,
    showFooter,
    footerBackgroundColor,
    footerVariant,
}) => {
    let assetElement;
    if (asset === 'icon') {
        assetElement = (
            <Circle size={40} background={skinVars.colors.brandLow}>
                <IconMobileDeviceRegular color={skinVars.colors.brand} />
            </Circle>
        );
    } else if (asset === 'image') {
        assetElement = <Circle size={40} backgroundImage={avatarImg} />;
    }

    const aspectRatioValue = fixedAspectRatioValues.includes(aspectRatio)
        ? aspectRatio.replace(' ', ':')
        : aspectRatio;

    return (
        <ThemeVariant variant={variantOutside}>
            <div
                data-testid="container"
                style={{
                    padding: 16,
                    backgroundColor:
                        variantOutside === 'inverse'
                            ? skinVars.colors.backgroundBrand
                            : variantOutside === 'alternative'
                              ? skinVars.colors.backgroundAlternative
                              : undefined,
                }}
            >
                <InternalCard
                    type={type}
                    size={size}
                    variant={variant || undefined}
                    backgroundColor={backgroundColor || undefined}
                    imageSrc={imageSrc === 'undefined' ? undefined : imageSrc}
                    videoSrc={videoSrc === 'undefined' ? undefined : videoSrc}
                    mediaAspectRatio={mediaAspectRatio.replace(' ', ':') as MediaAspectRatio}
                    mediaPosition={mediaPosition}
                    onClose={onClose ? () => {} : undefined}
                    onPress={onPress ? () => {} : undefined}
                    asset={assetElement}
                    mediaWidth={Number.isFinite(+mediaWidth) ? +mediaWidth : mediaWidth}
                    headline={headline && <Tag type={headlineType}>{headline}</Tag>}
                    pretitle={pretitle}
                    pretitleAs={pretitleAs}
                    title={title}
                    titleAs={titleAs}
                    subtitle={subtitle}
                    description={description}
                    slot={slot ? <Placeholder height={64} /> : undefined}
                    slotAlignment={slotAlignment}
                    aspectRatio={aspectRatioValue as CardAspectRatio}
                    dataAttributes={{testid: 'data-card'}}
                    aria-label={ariaLabel}
                    topActions={
                        topActions
                            ? [
                                  {
                                      Icon: IconMobileDeviceRegular,
                                      onPress: () => alert('Icon pressed'),
                                      label: 'Device',
                                  },
                                  {
                                      checkedProps: {Icon: IconStarFilled, label: 'checked'},
                                      uncheckedProps: {Icon: IconStarRegular, label: 'unchecked'},
                                      defaultChecked: false,
                                      onChange: () => {},
                                  },
                              ]
                            : undefined
                    }
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
                    footerSlot={footerSlot ? <Placeholder height={64} /> : undefined}
                    showFooter={showFooter}
                    footerBackgroundColor={footerBackgroundColor || undefined}
                    footerVariant={footerVariant || undefined}
                />
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'InternalCard';
Default.args = {
    type: 'data',
    size: 'default',
    variant: '',
    variantOutside: 'default',
    backgroundColor: '',
    imageSrc: 'beach image',
    videoSrc: 'undefined',
    mediaPosition: 'top',
    mediaAspectRatio: '16 9',
    mediaWidth: '150px',
    asset: 'icon',
    headlineType: 'promo',
    headline: 'Priority',
    pretitle: 'Pretitle',
    pretitleAs: 'span',
    title: 'Title',
    titleAs: 'h3',
    subtitle: 'Subtitle',
    description: 'This is a description for the card',
    ariaLabel: '',
    onClose: true,
    onPress: true,
    topActions: true,
    buttonPrimary: true,
    buttonSecondary: false,
    buttonLink: true,
    slot: true,
    slotAlignment: 'content',
    aspectRatio: '9 11',
    showFooter: true,
    footerSlot: true,
    footerBackgroundColor: '',
    footerVariant: '',
};

Default.argTypes = {
    type: {
        options: ['data', 'media', 'cover', 'naked'],
        control: {type: 'select'},
    },
    size: {
        options: ['default', 'snap', 'display'],
        control: {
            type: 'select',
        },
    },
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
        options: [
            'https://picsum.photos/id/292/1024/1024',
            'https://picsum.photos/id/130/1024/1024',
            'https://picsum.photos/id/892/1024/1024',
            beachImg,
            'undefined',
            '',
        ],
        control: {
            type: 'select',
            labels: {
                'https://picsum.photos/id/292/1024/1024': 'colored image',
                'https://picsum.photos/id/130/1024/1024': 'clear image',
                'https://picsum.photos/id/892/1024/1024': 'dark image',
                [beachImg]: 'beach image',
                undefined: 'undefined',
                '': 'empty string',
            },
        },
    },
    videoSrc: {
        options: [beachVideo, 'undefined', ''],
        control: {
            type: 'select',
            labels: {
                [beachVideo]: 'beach video',
                undefined: 'undefined',
                '': 'empty string',
            },
        },
    },
    mediaPosition: {
        options: ['top', 'left', 'right'],
        control: {type: 'select'},
    },
    asset: {
        options: ['icon', 'image', 'none'],
        control: {type: 'select'},
    },
    headlineType: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error', 'info'],
        control: {type: 'select'},
    },
    aspectRatio: {
        options: ['auto', ...fixedAspectRatioValues],
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
        options: ['auto', ...fixedAspectRatioValues],
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
    pretitleAs: {
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
        control: {type: 'select'},
    },
    titleAs: {
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
        control: {type: 'select'},
    },
    slotAlignment: {
        options: ['content', 'bottom'],
        control: {type: 'select'},
    },
    footerVariant: {
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
};
