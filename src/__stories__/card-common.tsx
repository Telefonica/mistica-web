import * as React from 'react';
import {
    ButtonLink,
    ButtonPrimary,
    ButtonSecondary,
    Circle,
    IconMobileDeviceRegular,
    IconStarFilled,
    IconStarRegular,
    skinVars,
    ThemeVariant,
} from '..';
import avatarImg from './images/avatar.jpg';
import beachVideo from './videos/beach.mp4';
import beachImg from './images/beach.jpg';
import appleGadgetsImg from './images/apple-gadgets-portrait.jpg';
import gamingImg from './images/gaming.jpg';
import laptopImg from './images/laptop.jpg';
import personPortraitImg from './images/person-portrait.jpg';
import surfaceInSofaImg from './images/surface-in-sofa.jpg';
import tennisImg from './images/tennis.jpg';

import type {Variant} from '../theme-variant-context';
import type {HeadingType} from '../utils/types';
import type {TagType} from '..';
import type {CardSize, TopActionsArray} from '../card-internal';

/**
 * These are arguments for props that all cards have in common.
 */
export type CommonCardArgs = {
    // container
    size: CardSize;
    variant: Variant | '';
    aspectRatio: number | string;
    variantOutside: 'default' | 'inverse' | 'alternative';
    width?: number | string;
    height?: number | string;

    // content
    asset: 'icon' | 'image' | 'none';
    headlineType: TagType;
    headline: string;
    pretitle: string;
    pretitleAs: HeadingType | '';
    pretitleLinesMax?: number;
    title: string;
    titleAs: HeadingType | '';
    titleLinesMax?: number;
    subtitle: string;
    subtitleLinesMax?: number;
    description: string;
    descriptionLinesMax?: number;
    ariaLabel: string;
    ariaDescription: string;
    slot: boolean;

    // topActions
    onClose: boolean;
    onPress: boolean;
    topActions: boolean;

    // buttons
    buttonPrimary: boolean;
    buttonSecondary: boolean;
    buttonLink: boolean;

    // footer
    showFooter: boolean;
    footerSlot: boolean;
    footerVariant: 'default' | 'inverse' | '';
};

export const getAsset = (asset: CommonCardArgs['asset']): JSX.Element | undefined => {
    switch (asset) {
        case 'icon':
            return (
                <Circle size={40} background={skinVars.colors.brandLow}>
                    <IconMobileDeviceRegular color={skinVars.colors.brand} />
                </Circle>
            );
        case 'image':
            return <Circle size={40} backgroundImage={avatarImg} />;
        default:
            return undefined;
    }
};

export const getTopActions = (topActions: boolean): TopActionsArray | undefined => {
    return topActions
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
        : undefined;
};

export const getButtonPrimary = (buttonPrimary: boolean): JSX.Element | undefined => {
    return buttonPrimary ? (
        <ButtonPrimary small onPress={() => {}}>
            Button Primary
        </ButtonPrimary>
    ) : undefined;
};

export const getButtonSecondary = (buttonSecondary: boolean): JSX.Element | undefined => {
    return buttonSecondary ? (
        <ButtonSecondary small onPress={() => {}}>
            Button Secondary
        </ButtonSecondary>
    ) : undefined;
};

export const getButtonLink = (buttonLink: boolean): JSX.Element | undefined => {
    return buttonLink ? (
        <ButtonLink small onPress={() => {}} withChevron>
            Button Link
        </ButtonLink>
    ) : undefined;
};

export const ThemeVariantWrapper = ({
    children,
    variant,
}: {
    children: React.ReactNode;
    variant?: Variant;
}): JSX.Element => {
    return (
        <ThemeVariant variant={variant}>
            <div
                data-testid="card-container"
                style={{
                    padding: 16,
                    backgroundColor:
                        variant === 'inverse'
                            ? skinVars.colors.backgroundBrand
                            : variant === 'alternative'
                              ? skinVars.colors.backgroundAlternative
                              : undefined,
                }}
            >
                {children}
            </div>
        </ThemeVariant>
    );
};

export const normalizeAspectRatio = (aspectRatio?: string | number): string | number | undefined => {
    if (!aspectRatio) {
        return undefined;
    }
    if (Number.isFinite(+aspectRatio)) {
        return +aspectRatio;
    }
    if (typeof aspectRatio === 'string' && aspectRatio.match(/^\d+\s\d+$/)) {
        return aspectRatio.replace(' ', ':');
    }
    return aspectRatio;
};

export const imageNameToUrl = {
    ['undefined']: undefined,
    'empty string': '',
    beach: beachImg,
    'apple gadgets': appleGadgetsImg,
    gaming: gamingImg,
    laptop: laptopImg,
    'person portrait': personPortraitImg,
    'surface in sofa': surfaceInSofaImg,
    tennis: tennisImg,
};

export const videoNameToUrl = {
    ['undefined']: undefined,
    'empty string': '',
    beach: beachVideo,
};

export const defaultCommonCardArgs: CommonCardArgs = {
    size: 'default',
    variant: '',
    variantOutside: 'default',
    width: '',
    height: '',
    asset: 'icon',
    headlineType: 'promo',
    headline: 'Priority',
    pretitle: 'Pretitle',
    pretitleAs: '',
    pretitleLinesMax: 0,
    title: 'Title',
    titleAs: '',
    titleLinesMax: 0,
    subtitle: 'Subtitle',
    subtitleLinesMax: 0,
    description: 'This is a description for the card',
    descriptionLinesMax: 0,
    ariaLabel: 'Aria label',
    ariaDescription: 'Aria description',
    onClose: true,
    onPress: true,
    topActions: true,
    buttonPrimary: true,
    buttonSecondary: false,
    buttonLink: true,
    aspectRatio: 'auto',
    showFooter: true,
    footerSlot: true,
    footerVariant: '',
    slot: true,
};

export const commonArgTypes = {
    size: {
        options: ['default', 'snap', 'display'],
        control: {
            type: 'select',
        },
    },
    asset: {
        options: ['undefined', 'icon', 'image'],
        control: {
            type: 'select',
            labels: {'': 'undefined'},
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
    pretitleAs: {
        options: ['', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
        control: {
            type: 'select',
            labels: {'': 'undefined'},
        },
    },
    titleAs: {
        options: ['', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
        control: {
            type: 'select',
            labels: {'': 'undefined'},
        },
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
    footerVariant: {
        options: ['', 'default', 'inverse'],
        control: {
            type: 'select',
            labels: {
                '': 'undefined',
                default: 'default',
                inverse: 'inverse',
            },
        },
    },
};

export const imageAndVideoArgTypes = {
    imageSrc: {
        options: Object.keys(imageNameToUrl),
        control: {type: 'select'},
    },
    videoSrc: {
        options: Object.keys(videoNameToUrl),
        control: {type: 'select'},
    },
};

export const mediaArgTypes = {
    mediaPosition: {
        options: ['top', 'left', 'right'],
        control: {type: 'select'},
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
    imageFit: {
        options: ['', 'fit', 'fill', 'fill-center'],
        control: {
            type: 'select',
            labels: {'': 'undefined'},
        },
    },
};

export const dataArgTypes = {
    slotAlignment: {
        options: ['', 'content', 'bottom'],
        control: {
            type: 'select',
            labels: {'': 'undefined'},
        },
    },
};
