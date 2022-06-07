import * as React from 'react';
import {IconAcademicRegular, useTheme, Circle, SnapCard, ResponsiveLayout, Stack, Text2, Inline} from '..';
import {ThemeVariant} from '../theme-variant-context';

export default {
    title: 'Components/Cards/SnapCard',
    argTypes: {
        asset: {
            options: ['icon in circle', 'icon', 'image', 'none'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    asset: 'icon' | 'icon in circle' | 'image' | 'none';
    title: string;
    subtitle: string;
    touchable: boolean;
};

export const Default: StoryComponent<Args> = ({asset, title, subtitle, touchable}) => {
    const {colors} = useTheme();

    let icon;
    if (asset === 'icon') {
        icon = <IconAcademicRegular />;
    } else if (asset === 'icon in circle') {
        icon = (
            <Circle size={40} backgroundColor={colors.brand}>
                <ThemeVariant isInverse>
                    <IconAcademicRegular />
                </ThemeVariant>
            </Circle>
        );
    } else if (asset === 'image') {
        icon = <Circle size={40} backgroundImage="https://i.imgur.com/QwNlo5s.png" />;
    }

    return (
        <SnapCard
            icon={icon}
            title={title}
            subtitle={subtitle}
            dataAttributes={{testid: 'snap-card'}}
            aria-label="SnapCard card label"
            onPress={
                touchable
                    ? () => {
                          window.alert('SnapCard clicked');
                      }
                    : undefined
            }
        />
    );
};

Default.storyName = 'SnapCard';
Default.args = {
    asset: 'icon in circle',
    title: 'Some title',
    subtitle: 'Some subtitle',
    touchable: true,
};

export const Group: StoryComponent = () => {
    const {colors} = useTheme();
    return (
        <ResponsiveLayout>
            <Stack space={16}>
                <Text2 regular>We can group multiple cards and they adjust to the same height:</Text2>
                <Inline space={8} fullWidth>
                    <SnapCard
                        title="Title 1"
                        subtitle="Subtitle"
                        icon={
                            <Circle size={40} backgroundColor={colors.brand}>
                                <ThemeVariant isInverse>
                                    <IconAcademicRegular />
                                </ThemeVariant>
                            </Circle>
                        }
                    />
                    <SnapCard
                        title="Title 2"
                        icon={
                            <Circle size={40} backgroundColor={colors.brand}>
                                <ThemeVariant isInverse>
                                    <IconAcademicRegular />
                                </ThemeVariant>
                            </Circle>
                        }
                    />
                    <SnapCard title="Title 3" />
                </Inline>
            </Stack>
        </ResponsiveLayout>
    );
};

Group.storyName = 'SnapCard group';
