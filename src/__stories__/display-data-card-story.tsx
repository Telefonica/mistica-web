import * as React from 'react';
import {
    DisplayDataCard,
    ButtonPrimary,
    ButtonLink,
    IconInvoicePlanFileRegular,
    skinVars,
    Circle,
    Tag,
    Image,
    ButtonSecondary,
    IconLightningRegular,
    ResponsiveLayout,
    Stack,
    Text2,
    Carousel,
    IconStarFilled,
    IconStarRegular,
} from '..';
import {Placeholder} from '../placeholder';
import avatarImg from './images/avatar.jpg';

import type {CardAspectRatio} from '../card-internal';
import type {HeadingType} from '../utils/types';
import type {TagType} from '..';

export default {
    title: 'Private/Deprecated Card Stories/DisplayDataCard',
};

type DisplayDataCardArgs = {
    asset: 'icon' | 'circle + icon' | 'image' | 'circle + image';
    headlineType: TagType;
    headline: string;
    pretitle: string;
    pretitleAs: HeadingType;
    title: string;
    titleAs: HeadingType;
    description: string;
    extra: boolean;
    closable: boolean;
    topAction: boolean;
    actions:
        | 'button'
        | 'link'
        | 'button and link'
        | 'button and secondary button'
        | 'onPress'
        | 'href'
        | 'to'
        | 'none';
    isInverse: boolean;
    aspectRatio: string;
};

const fixedAspectRatioValues = ['1 1', '16 9', '7 10', '9 10'];

export const Default: StoryComponent<DisplayDataCardArgs> = ({
    asset = 'icon',
    headline,
    headlineType,
    pretitle,
    pretitleAs,
    title,
    titleAs,
    description,
    extra,
    actions = 'button',
    closable,
    topAction,
    isInverse,
    aspectRatio,
}) => {
    let assetElement;
    if (asset === 'circle + icon') {
        assetElement = (
            <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                <IconInvoicePlanFileRegular color={skinVars.colors.brand} />
            </Circle>
        );
    } else if (asset === 'circle + image') {
        assetElement = <Circle size={40} backgroundImage={avatarImg} />;
    } else if (asset === 'icon') {
        assetElement = <IconInvoicePlanFileRegular size={40} />;
    } else if (asset === 'image') {
        assetElement = <Image src={avatarImg} width={40} height={40} />;
    }

    const interactiveActions = {
        button: actions.includes('button') ? (
            <ButtonPrimary small fake>
                Action
            </ButtonPrimary>
        ) : undefined,
        secondaryButton: actions.includes('secondary') ? (
            <ButtonSecondary small fake>
                Action 2
            </ButtonSecondary>
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
        | {button?: JSX.Element; buttonLink?: JSX.Element; secondaryButton?: JSX.Element}
        | {onPress: () => void}
        | {to: string}
        | {href: string}
        | {[key: string]: never};

    const aspectRatioValue = fixedAspectRatioValues.includes(aspectRatio)
        ? aspectRatio.replace(' ', ':')
        : aspectRatio;

    return (
        <DisplayDataCard
            isInverse={isInverse}
            onClose={closable ? () => {} : undefined}
            actions={
                topAction
                    ? [
                          {
                              Icon: IconLightningRegular,
                              onPress: () => {},
                              label: 'Lightning',
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
            asset={assetElement}
            headline={headline ? <Tag type={headlineType}>{headline}</Tag> : undefined}
            pretitle={pretitle}
            pretitleAs={pretitleAs}
            title={title}
            titleAs={titleAs}
            description={description}
            aspectRatio={aspectRatioValue as CardAspectRatio}
            extra={extra ? <Placeholder /> : undefined}
            {...interactiveActions}
            dataAttributes={{testid: 'display-data-card'}}
            aria-label="Display data card label"
        />
    );
};

Default.storyName = 'DisplayDataCard';
Default.args = {
    asset: 'icon',
    headlineType: 'promo',
    headline: 'Priority',
    pretitle: 'Pretitle',
    pretitleAs: 'span',
    title: 'Title',
    titleAs: 'h3',
    description: 'This is a description for the card',
    extra: false,
    actions: 'button',
    closable: false,
    topAction: false,
    isInverse: false,
    aspectRatio: 'auto',
};
Default.argTypes = {
    asset: {
        options: ['icon', 'circle + icon', 'image', 'circle + image', 'none'],
        control: {type: 'select'},
    },
    headlineType: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error', 'info'],
        control: {type: 'select'},
    },
    actions: {
        options: [
            'button',
            'link',
            'button and link',
            'button and secondary button',
            'onPress',
            'href',
            'to',
            'none',
        ],
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
    pretitleAs: {
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
        control: {type: 'select'},
    },
    titleAs: {
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
        control: {type: 'select'},
    },
};

export const Group: StoryComponent = () => {
    return (
        <ResponsiveLayout>
            <Stack space={16}>
                <Text2 regular>
                    We can group multiple cards and they adjust to the same height. The card content is
                    aligned to the bottom.
                </Text2>
                <Carousel
                    items={[
                        <DisplayDataCard
                            headline={<Tag type="promo">Headline</Tag>}
                            pretitle="Pretitle"
                            title="Title"
                            description="Description"
                            button={
                                <ButtonPrimary small href="https://google.com">
                                    Action
                                </ButtonPrimary>
                            }
                        />,
                        <DisplayDataCard
                            asset={
                                <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                    <IconInvoicePlanFileRegular color={skinVars.colors.brand} />
                                </Circle>
                            }
                            title="Title"
                            button={
                                <ButtonPrimary small href="https://google.com">
                                    Action
                                </ButtonPrimary>
                            }
                        />,
                    ]}
                />
            </Stack>
        </ResponsiveLayout>
    );
};

Group.storyName = 'DisplayDataCard group';
