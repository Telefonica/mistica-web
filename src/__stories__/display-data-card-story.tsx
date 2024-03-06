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
    IconPauseRegular,
    IconPlayRegular,
} from '..';
import {Placeholder} from '../placeholder';
import avatarImg from './images/avatar.jpg';

import type {AspectRatio} from '../card';
import type {TagType} from '..';

export default {
    title: 'Components/Cards/DisplayDataCard',
};

type DisplayDataCardArgs = {
    asset: 'icon' | 'circle + icon' | 'image' | 'circle + image';
    headlineType: TagType;
    headline: string;
    pretitle: string;
    title: string;
    description: string;
    withExtra: boolean;
    closable: boolean;
    withTopAction: boolean;
    actions: 'button' | 'link' | 'button and link' | 'button and secondary button';
    isInverse: boolean;
    aspectRatio: AspectRatio;
};

const fixedAspectRatioValues = ['1 1', '16 9', '7 10', '9 10'];

export const Default: StoryComponent<DisplayDataCardArgs> = ({
    asset = 'icon',
    headline,
    headlineType,
    pretitle,
    title,
    description,
    withExtra,
    actions = 'button',
    closable,
    withTopAction,
    isInverse,
    aspectRatio,
}) => {
    let icon;
    if (asset === 'circle + icon') {
        icon = (
            <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                <IconInvoicePlanFileRegular color={skinVars.colors.brand} />
            </Circle>
        );
    } else if (asset === 'circle + image') {
        icon = <Circle size={40} backgroundImage={avatarImg} />;
    } else if (asset === 'icon') {
        icon = <IconInvoicePlanFileRegular size={40} />;
    } else if (asset === 'image') {
        icon = <Image src={avatarImg} width={40} height={40} />;
    }

    const button = actions.includes('button') ? (
        <ButtonPrimary small fake>
            Action
        </ButtonPrimary>
    ) : undefined;

    const buttonLink = actions.includes('link') ? <ButtonLink href="#">Link</ButtonLink> : undefined;
    const secondaryButton = actions.includes('secondary') ? (
        <ButtonSecondary small fake>
            Action 2
        </ButtonSecondary>
    ) : undefined;

    const onPress = actions.includes('press') ? () => null : undefined;

    const interactiveActions = onPress
        ? {onPress}
        : {
              button,
              buttonLink,
              secondaryButton,
          };

    const aspectRatioValue = fixedAspectRatioValues.includes(aspectRatio)
        ? aspectRatio.replace(' ', ':')
        : aspectRatio;

    return (
        <DisplayDataCard
            isInverse={isInverse}
            onClose={closable ? () => {} : undefined}
            actions={
                withTopAction
                    ? [
                          {
                              Icon: IconLightningRegular,
                              onPress: () => {},
                              label: 'Lightning',
                          },
                          {
                              checkedProps: {
                                  Icon: IconPauseRegular,
                                  label: 'Pause',
                              },
                              uncheckedProps: {
                                  Icon: IconPlayRegular,
                                  label: 'Play',
                              },
                              defaultChecked: false,
                              onChange: () => {},
                          },
                      ]
                    : undefined
            }
            icon={icon}
            headline={headline ? <Tag type={headlineType}>{headline}</Tag> : undefined}
            pretitle={pretitle}
            title={title}
            description={description}
            aspectRatio={aspectRatioValue as AspectRatio}
            extra={withExtra ? <Placeholder /> : undefined}
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
    title: 'Title',
    description: 'This is a description for the card',
    withExtra: false,
    actions: 'button',
    closable: false,
    withTopAction: false,
    isInverse: false,
    aspectRatio: 'auto',
};
Default.argTypes = {
    asset: {
        options: ['icon', 'circle + icon', 'image', 'circle + image', 'none'],
        control: {type: 'select'},
    },
    headlineType: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error'],
        control: {type: 'select'},
    },
    actions: {
        options: ['button', 'link', 'button and link', 'button and secondary button', 'on press'],
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
                            icon={
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
