import * as React from 'react';
import {Circle, IconMobileDeviceRegular, IconStarFilled, IconStarRegular, skinVars} from '..';
import avatarImg from './images/avatar.jpg';
import beachVideo from './videos/beach.mp4';
import beachImg from './images/beach.jpg';
import appleGadgetsImg from './images/apple-gadgets-portrait.jpg';
import gamingImg from './images/gaming.jpg';
import laptopImg from './images/laptop.jpg';
import personPortraitImg from './images/person-portrait.jpg';
import surfaceInSofaImg from './images/surface-in-sofa.jpg';
import tennisImg from './images/tennis.jpg';

import type {HeadingType} from '../utils/types';
import type {TagType} from '..';
import type {CardSize, DefaultOrInverseVariant, SlotAlignment, TopActionsArray} from '../card-internal';

export type CommonCardArgs = {
    size: CardSize;
    aspectRatio: number | string;
    variantOutside: 'default' | 'inverse' | 'alternative';
    asset: 'icon' | 'image' | 'none';

    // content
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
    footerBackgroundColor: string;
    footerVariant: DefaultOrInverseVariant | '';
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

export const normalizeAspectRatio = (aspectRatio?: string | number): string | number | undefined => {
    if (!aspectRatio) {
        return undefined;
    }
    if (Number.isFinite(+aspectRatio)) {
        return +aspectRatio;
    }
    if (typeof aspectRatio === 'string') {
        return aspectRatio.replace(' ', ':');
    }
    return aspectRatio;
};

export const imageNameToUrl = {
    '-undefined-': undefined,
    '-empty string-': '',
    beach: beachImg,
    'apple gadgets': appleGadgetsImg,
    gaming: gamingImg,
    laptop: laptopImg,
    'person portrait': personPortraitImg,
    'surface in sofa': surfaceInSofaImg,
    tennis: tennisImg,
};

export const videoNameToUrl = {
    '-undefined-': undefined,
    '-empty string-': '',
    beach: beachVideo,
};

export const defaultCommonCardArgs: CommonCardArgs = {
    size: 'default',
    variantOutside: 'default',
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

export const commonArgTypes = {
    asset: {
        options: ['undefined', 'icon', 'image'],
        control: {
            type: 'select',
            labels: {'': 'undefined'},
        },
    },
};
