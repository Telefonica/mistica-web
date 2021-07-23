import * as React from 'react';
import {
    Stack,
    DataCard,
    ButtonPrimary,
    ButtonLink,
    Inline,
    Text2,
    createUseStyles,
    ResponsiveLayout,
    IconAcademicLight,
    useTheme,
    Circle,
    Tag,
} from '..';
import {Placeholder} from '../placeholder';

export default {
    title: 'Components/Cards/DataCard',
    argTypes: {
        asset: {
            options: ['icon', 'image', 'none'],
            control: {type: 'select'},
        },
        headlineColor: {
            options: ['promo', 'brand', 'success', 'warning', 'error'],
            control: {type: 'select'},
        },
        actions: {
            options: ['button', 'link', 'button + link'],
            control: {type: 'select'},
        },
    },
};

type DataCardArgs = {
    asset: 'icon' | 'image' | 'none';
    headlineColor: 'promo' | 'brand' | 'success' | 'warning' | 'error';
    headline: string;
    title: string;
    subtitle: string;
    description: string;
    actions: 'button' | 'link' | 'button + link';
};

export const Default: StoryComponent<DataCardArgs> = ({
    asset,
    headline,
    headlineColor,
    title,
    subtitle,
    description,
    actions,
}) => {
    const {colors} = useTheme();

    let icon;
    if (asset === 'icon') {
        icon = (
            <Circle size={40} backgroundColor={colors.neutralLow}>
                <IconAcademicLight />
            </Circle>
        );
    } else if (asset === 'image') {
        icon = <Circle size={40} backgroundImage="https://i.imgur.com/QwNlo5s.png" />;
    }

    const button = actions.includes('button') ? (
        <ButtonPrimary small fake>
            Action
        </ButtonPrimary>
    ) : undefined;

    const buttonLink = actions.includes('link') ? <ButtonLink href="#">Link</ButtonLink> : undefined;

    return (
        <DataCard
            icon={icon}
            headline={headline && <Tag color={colors[headlineColor]}>{headline}</Tag>}
            title={title}
            subtitle={subtitle}
            description={description}
            button={button}
            buttonLink={buttonLink}
            dataAttributes={{testid: 'data-card'}}
            aria-label="Data card label"
        />
    );
};

Default.storyName = 'DataCard';
Default.args = {
    asset: 'icon',
    headlineColor: 'promo',
    headline: 'priority',
    title: 'Some title',
    subtitle: 'Some subtitle',
    description: 'This is a description for the card',
    actions: 'button',
};

export const WithBody: StoryComponent = () => {
    const {colors} = useTheme();
    return (
        <DataCard
            headline={<Tag color={colors.promo}>headline</Tag>}
            title="title"
            subtitle="subtitle"
            description="description"
            body={<Placeholder />}
            icon={
                <Circle backgroundColor={colors.neutralLow} size={40}>
                    <IconAcademicLight />
                </Circle>
            }
            button={
                <ButtonPrimary small href="https://google.com">
                    Action
                </ButtonPrimary>
            }
            buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
        />
    );
};

WithBody.storyName = 'DataCard with body';

export const WithIconImage: StoryComponent = () => {
    const {colors} = useTheme();
    return (
        <DataCard
            headline={<Tag color={colors.promo}>headline</Tag>}
            title="title"
            subtitle="subtitle"
            description="description"
            icon={<Circle size={40} backgroundImage="https://i.imgur.com/QwNlo5s.png" />}
            button={
                <ButtonPrimary small href="https://google.com">
                    Action
                </ButtonPrimary>
            }
            buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
        />
    );
};

WithIconImage.storyName = 'DataCard with icon image';

const useCardGroupStyles = createUseStyles(() => ({
    group: {
        '& > *': {
            width: 300,
        },
    },
}));

export const Group: StoryComponent = () => {
    const classes = useCardGroupStyles();
    const {colors} = useTheme();
    return (
        <ResponsiveLayout>
            <Stack space={16}>
                <Text2 regular>
                    We can group multiple cards and they adjust to the same height. The card actions are
                    always fixed on bottom:
                </Text2>
                <Inline space={16} className={classes.group}>
                    <DataCard
                        headline={<Tag color={colors.promo}>headline</Tag>}
                        title="title"
                        subtitle="subtitle"
                        description="description"
                        icon={
                            <Circle size={40} backgroundColor={colors.neutralLow}>
                                <IconAcademicLight />
                            </Circle>
                        }
                        buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
                    />
                    <DataCard
                        title="title"
                        description="description"
                        icon={
                            <Circle size={40} backgroundColor={colors.neutralLow}>
                                <IconAcademicLight />
                            </Circle>
                        }
                        buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
                    />
                </Inline>
            </Stack>
        </ResponsiveLayout>
    );
};

Group.storyName = 'DataCard group';
