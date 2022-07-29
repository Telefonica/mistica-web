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
    IconMobileDeviceRegular,
    useTheme,
    Circle,
    Tag,
    TagType,
} from '..';
import {Placeholder} from '../placeholder';

export default {
    title: 'Components/Cards/Data card',
};

type DataCardArgs = {
    asset: 'icon' | 'image' | 'none';
    headlineType: TagType;
    headline: string;
    title: string;
    subtitle: string;
    description: string;
    withExtra: boolean;
    actions: 'button' | 'link' | 'button and link';
    closable: boolean;
};

export const Default: StoryComponent<DataCardArgs> = ({
    asset = 'icon',
    headline,
    headlineType,
    title,
    subtitle,
    description,
    withExtra,
    actions = 'button',
    closable,
}) => {
    const {colors} = useTheme();

    let icon;
    if (asset === 'icon') {
        icon = (
            <Circle size={40} backgroundColor={colors.brandLow}>
                <IconMobileDeviceRegular color={colors.brand} />
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
            onClose={closable ? () => {} : undefined}
            icon={icon}
            headline={headline && <Tag type={headlineType}>{headline}</Tag>}
            title={title}
            subtitle={subtitle}
            description={description}
            extra={withExtra ? <Placeholder /> : undefined}
            button={button}
            buttonLink={buttonLink}
            dataAttributes={{testid: 'data-card'}}
            aria-label="Data card label"
        />
    );
};

Default.storyName = 'Data card';
Default.args = {
    asset: 'icon',
    headlineType: 'promo',
    headline: 'Priority',
    title: 'Some title',
    subtitle: 'Some subtitle',
    description: 'This is a description for the card',
    withExtra: false,
    actions: 'button',
    closable: false,
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
        options: ['button', 'link', 'button and link', 'none'],
        control: {type: 'select'},
    },
};

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
                        headline={<Tag type="promo">Headline</Tag>}
                        title="Title"
                        subtitle="Subtitle"
                        description="Description"
                        icon={
                            <Circle size={40} backgroundColor={colors.brandLow}>
                                <IconMobileDeviceRegular color={colors.brand} />
                            </Circle>
                        }
                        buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
                    />
                    <DataCard
                        title="Title"
                        description="Description"
                        icon={
                            <Circle size={40} backgroundColor={colors.brandLow}>
                                <IconMobileDeviceRegular color={colors.brand} />
                            </Circle>
                        }
                        buttonLink={<ButtonLink href="https://google.com">Link</ButtonLink>}
                    />
                </Inline>
            </Stack>
        </ResponsiveLayout>
    );
};

Group.storyName = 'Data card group';
