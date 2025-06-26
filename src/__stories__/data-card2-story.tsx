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
} from '..';
import {DataCard as DataCard2, type SlotAlignment} from '../cards2';
import {Placeholder} from '../placeholder';
import avatarImg from './images/avatar.jpg';

import type {HeadingType} from '../utils/types';
import type {AspectRatio} from '../card';
import type {TagType} from '..';

export default {
    title: 'Components/Cards/DataCard2',
};

type DataCardArgs = {
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
    actions: 'button' | 'link' | 'button and link' | 'onPress' | 'href' | 'to' | 'none';
    closable: boolean;
    topAction: boolean;
    aspectRatio: AspectRatio;
};

const fixedAspectRatioValues = ['1 1', '16 9', '7 10', '9 10'];

export const Default: StoryComponent<DataCardArgs> = ({
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
    actions = 'button',
    closable,
    topAction,
    aspectRatio,
}) => {
    let assetElement;
    if (asset === 'icon') {
        assetElement = (
            <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                <IconMobileDeviceRegular color={skinVars.colors.brand} />
            </Circle>
        );
    } else if (asset === 'image') {
        assetElement = <Circle size={40} backgroundImage={avatarImg} />;
    }

    const interactiveActions = {
        button: actions.includes('button') ? (
            <ButtonPrimary small fake>
                Action
            </ButtonPrimary>
        ) : undefined,
        buttonLink: actions.includes('link') ? (
            <ButtonLink small href="#">
                Link
            </ButtonLink>
        ) : undefined,
        onPress: actions === 'onPress' ? () => {} : undefined,
        to: actions === 'to' ? '#' : undefined,
        href: actions === 'href' ? 'https://example.org' : undefined,
    } as
        | {button?: JSX.Element; buttonLink?: JSX.Element}
        | {onPress: () => void}
        | {to: string}
        | {href: string}
        | {[key: string]: never};

    const aspectRatioValue = fixedAspectRatioValues.includes(aspectRatio)
        ? aspectRatio.replace(' ', ':')
        : aspectRatio;

    return (
        <>
            <DataCard2
                onClose={closable ? () => {} : undefined}
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
                {...interactiveActions}
                aspectRatio={aspectRatioValue as AspectRatio}
                dataAttributes={{testid: 'data-card'}}
                aria-label={ariaLabel}
                actions={
                    topAction
                        ? [
                              {
                                  Icon: IconMobileDeviceRegular,
                                  onPress: () => {
                                      alert('icon press');
                                  },
                                  label: 'Device',
                              },
                              {
                                  checkedProps: {
                                      Icon: IconStarFilled,
                                      label: 'checked',
                                  },
                                  uncheckedProps: {
                                      Icon: IconStarRegular,
                                      label: 'unchecked',
                                  },
                                  defaultChecked: false,
                                  onChange: () => {},
                              },
                          ]
                        : undefined
                }
                footerSlot={<Placeholder height={64} />}
                showFooter={true}
            />
        </>
    );
};

Default.storyName = 'DataCard';
Default.args = {
    asset: 'icon',
    headlineType: 'promo',
    headline: 'Priority',
    pretitle: 'Pretitle',
    pretitleAs: 'span',
    title: 'Title',
    titleAs: 'h3',
    subtitle: 'Subtitle',
    description: 'This is a description for the card',
    slot: false,
    slotAlignment: 'content',
    actions: 'button',
    ariaLabel: '',
    closable: false,
    topAction: false,
    aspectRatio: 'auto',
};

Default.argTypes = {
    asset: {
        options: ['icon', 'image', 'none'],
        control: {type: 'select'},
    },
    headlineType: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error', 'info'],
        control: {type: 'select'},
    },
    actions: {
        options: ['button', 'link', 'button and link', 'onPress', 'href', 'to', 'none'],
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
};
