import * as React from 'react';
import {
    DisplayMediaCard,
    ButtonPrimary,
    ButtonLink,
    IconInvoicePlanFileRegular,
    skinVars,
    Circle,
    Tag,
    TagType,
    ButtonSecondary,
    IconLightningRegular,
    ResponsiveLayout,
    Stack,
    Text2,
    Inline,
} from '..';

export default {
    title: 'Components/Cards/Display media card',
};

const BACKGROUND_SRC =
    'https://images.unsplash.com/photo-1622819584099-e04ccb14e8a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80';

type DisplayMediaCardArgs = {
    asset: 'icon' | 'circle + icon' | 'image' | 'circle + image';
    background: 'image' | 'none';
    headlineType: TagType;
    headline: string;
    pretitle: string;
    title: string;
    description: string;
    closable: boolean;
    withTopAction: boolean;
    actions: 'button' | 'link' | 'button and link' | 'button and secondary button';
};

export const Default: StoryComponent<DisplayMediaCardArgs> = ({
    asset = 'icon',
    background,
    headline,
    headlineType,
    pretitle,
    title,
    description,
    actions = 'button',
    closable,
    withTopAction,
}) => {
    let icon;
    if (asset === 'circle + icon') {
        icon = (
            <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                <IconInvoicePlanFileRegular color={skinVars.colors.brand} />
            </Circle>
        );
    } else if (asset === 'circle + image') {
        icon = <Circle size={40} backgroundImage="https://i.imgur.com/QwNlo5s.png" />;
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

    return (
        <DisplayMediaCard
            onClose={closable ? () => {} : undefined}
            actions={
                withTopAction
                    ? [
                          {
                              Icon: IconLightningRegular,
                              onPress: () => {},
                              label: 'Lightning',
                          },
                      ]
                    : undefined
            }
            backgroundImage={background === 'image' ? BACKGROUND_SRC : undefined}
            icon={icon}
            headline={headline ? <Tag type={headlineType}>{headline}</Tag> : undefined}
            pretitle={pretitle}
            title={title}
            description={description}
            button={button}
            buttonLink={buttonLink}
            secondaryButton={secondaryButton}
            dataAttributes={{testid: 'display-data-card'}}
            aria-label="Display data card label"
        />
    );
};

Default.storyName = 'Display Media card';
Default.args = {
    asset: 'icon',
    background: 'image',
    headlineType: 'promo',
    headline: 'Priority',
    pretitle: 'Pretitle',
    title: 'Title',
    description: 'This is a description for the card',
    actions: 'button',
    closable: false,
    withTopAction: false,
};
Default.argTypes = {
    asset: {
        options: ['circle + icon', 'circle + image', 'none'],
        control: {type: 'select'},
    },
    background: {
        options: ['image', 'none'],
        control: {type: 'select'},
    },
    headlineType: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error'],
        control: {type: 'select'},
    },
    actions: {
        options: ['button', 'link', 'button and link', 'button and secondary button'],
        control: {type: 'select'},
    },
};

export const Group: StoryComponent = () => {
    return (
        <ResponsiveLayout>
            <Stack space={16}>
                <Text2 regular>
                    We can group multiple cards and they adjust to the same height. The card content is
                    aligned to the bottom
                </Text2>
                <style>{`.group > * {width: 300px}`}</style>
                <Inline space={16} className="group">
                    <DisplayMediaCard
                        headline={<Tag type="promo">Headline</Tag>}
                        pretitle="Pretitle"
                        title="Title"
                        description="Description"
                        backgroundImage={BACKGROUND_SRC}
                        button={
                            <ButtonPrimary small href="https://google.com">
                                Action
                            </ButtonPrimary>
                        }
                    />
                    <DisplayMediaCard title="Title" backgroundImage={BACKGROUND_SRC} />
                </Inline>
            </Stack>
        </ResponsiveLayout>
    );
};

Group.storyName = 'Display media card group';
