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
} from '..';
import {InternalCard, type SlotAlignment} from '../cards2';
import {Placeholder} from '../placeholder';
import avatarImg from './images/avatar.jpg';

import type {HeadingType} from '../utils/types';
import type {AspectRatio} from '../card';
import type {TagType} from '..';
import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Cards/InternalCard',
};

type InternalCardArgs = {
    type: 'data' | 'media' | 'cover' | 'naked';
    size: 'default' | 'snap' | 'display';
    backgroundColor?: string;
    variant: Variant | '';
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
    topActions: boolean;
    aspectRatio: string;
    showFooter: boolean;
    footerSlot: boolean;
    primaryAction: 'buttonPrimary' | 'buttonSecondary' | 'buttonLink' | 'none';
    secondaryAction: 'buttonPrimary' | 'buttonSecondary' | 'buttonLink' | 'none';
};

const fixedAspectRatioValues = ['1 1', '16 9', '7 10', '9 10'];

export const Default: StoryComponent<InternalCardArgs> = ({
    type,
    size,
    backgroundColor,
    variant,
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
    primaryAction,
    secondaryAction,
    topActions,
    aspectRatio,
    footerSlot,
    showFooter,
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

    const getAction = (action: string) => {
        if (action === 'buttonPrimary') {
            return (
                <ButtonPrimary small onPress={() => {}}>
                    Primary Action
                </ButtonPrimary>
            );
        }
        if (action === 'buttonSecondary') {
            return (
                <ButtonSecondary small onPress={() => {}}>
                    Secondary Action
                </ButtonSecondary>
            );
        }
        if (action === 'buttonLink') {
            return (
                <ButtonLink small href="#">
                    Link Action
                </ButtonLink>
            );
        }
        return undefined;
    };

    return (
        <>
            <InternalCard
                type={type}
                size={size}
                variant={variant || undefined}
                backgroundColor={backgroundColor || undefined}
                onClose={onClose ? () => {} : undefined}
                asset={assetElement}
                headline={headline && <Tag type={headlineType}>{headline}</Tag>}
                pretitle={pretitle}
                pretitleAs={pretitleAs}
                title={title}
                titleAs={titleAs}
                subtitle={subtitle}
                description={description}
                slot={slot ? <Placeholder height={64} /> : undefined}
                slotAlignment={slotAlignment}
                aspectRatio={aspectRatioValue as AspectRatio}
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
                primaryAction={getAction(primaryAction)}
                secondaryAction={getAction(secondaryAction)}
                footerSlot={footerSlot ? <Placeholder height={64} /> : undefined}
                showFooter={showFooter}
                onPress={() => {}}
            />
        </>
    );
};

Default.storyName = 'InternalCard';
Default.args = {
    type: 'data',
    backgroundColor: '',
    size: 'default',
    variant: '',
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
    topActions: true,
    primaryAction: 'buttonPrimary',
    secondaryAction: 'buttonLink',
    slot: true,
    slotAlignment: 'content',
    aspectRatio: '9 11',
    showFooter: true,
    footerSlot: true,
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
    primaryAction: {
        options: ['none', 'buttonPrimary', 'buttonSecondary', 'buttonLink', 'none'],
        control: {type: 'select'},
    },
    secondaryAction: {
        options: ['none', 'buttonPrimary', 'buttonSecondary', 'buttonLink', 'none'],
        control: {type: 'select'},
    },
    showFooter: true,
    footerSlot: true,
};
