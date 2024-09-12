import * as React from 'react';
import {
    Stack,
    DataCard,
    ButtonPrimary,
    ButtonLink,
    Text2,
    ResponsiveLayout,
    IconMobileDeviceRegular,
    skinVars,
    Circle,
    Tag,
    Carousel,
    IconStarFilled,
    IconStarRegular,
} from '..';
import {Placeholder} from '../placeholder';
import avatarImg from './images/avatar.jpg';

import type {AspectRatio} from '../card';
import type {TagType} from '..';

export default {
    title: 'Components/Cards/DataCard',
};

type DataCardArgs = {
    asset: 'icon' | 'image' | 'none';
    headlineType: TagType;
    headline: string;
    pretitle: string;
    title: string;
    subtitle: string;
    description: string;
    ariaLabel: string;
    extra: boolean;
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
    title,
    subtitle,
    description,
    ariaLabel,
    extra,
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
        <DataCard
            onClose={closable ? () => {} : undefined}
            asset={assetElement}
            headline={headline && <Tag type={headlineType}>{headline}</Tag>}
            pretitle={pretitle}
            title={title}
            subtitle={subtitle}
            description={description}
            extra={extra ? <Placeholder /> : undefined}
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
        />
    );
};

Default.storyName = 'DataCard';
Default.args = {
    asset: 'icon',
    headlineType: 'promo',
    headline: 'Priority',
    pretitle: 'Pretitle',
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'This is a description for the card',
    extra: false,
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
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error'],
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
};

export const Group: StoryComponent = () => {
    return (
        <ResponsiveLayout>
            <Stack space={16}>
                <Text2 regular>
                    We can group multiple cards and they adjust to the same height. The card actions are
                    always fixed on bottom.
                </Text2>
                <Carousel
                    items={[
                        <DataCard
                            headline={<Tag type="promo">Headline</Tag>}
                            pretitle="Pretitle"
                            title="Title"
                            subtitle="Subtitle"
                            description="Description"
                            asset={
                                <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                    <IconMobileDeviceRegular color={skinVars.colors.brand} />
                                </Circle>
                            }
                            buttonLink={
                                <ButtonLink small href="https://google.com">
                                    Link
                                </ButtonLink>
                            }
                        />,
                        <DataCard
                            title="Title"
                            description="Description"
                            asset={
                                <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                                    <IconMobileDeviceRegular color={skinVars.colors.brand} />
                                </Circle>
                            }
                            buttonLink={
                                <ButtonLink small href="https://google.com">
                                    Link
                                </ButtonLink>
                            }
                        />,
                    ]}
                />
            </Stack>
        </ResponsiveLayout>
    );
};

Group.storyName = 'DataCard group';
