import * as React from 'react';
import {
    ThemeVariant,
    skinVars,
    Text2,
    Stack,
    ResponsiveLayout,
    Box,
    Callout,
    Inline,
    HighlightedCard,
    Tag,
    Chip,
    ButtonPrimary,
    useThemeVariant,
} from '..';
import personPortraitImg from './images/person-portrait.jpg';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Utilities/ThemeVariant',
    argTypes: {
        themeVariant: {
            options: ['default', 'inverse', 'alternative'],
            control: {type: 'select'},
        },
    },
    args: {
        themeVariant: 'default',
    },
};

const OtherComponent = (): JSX.Element => {
    const variant = useThemeVariant();
    return (
        <Stack space={16}>
            <Text2 regular as="pre">
                variant: {variant}
            </Text2>
            <Text2 regular color={skinVars.colors.textPrimary}>
                Some components, like Text, or Button, automatically react to theme variant changes
            </Text2>
            <ButtonPrimary onPress={() => alert('pressed')}>Button</ButtonPrimary>
        </Stack>
    );
};

type Args = {
    themeVariant: Variant;
};

export const Default: StoryComponent<Args> = ({themeVariant}) => {
    return (
        <ResponsiveLayout variant={themeVariant}>
            <Box paddingY={24}>
                <ThemeVariant variant={themeVariant}>
                    <OtherComponent />
                </ThemeVariant>
            </Box>
        </ResponsiveLayout>
    );
};

export const ComponentsOverDifferentThemeVariants: StoryComponent<Args> = ({themeVariant}) => {
    return (
        <ResponsiveLayout variant={themeVariant}>
            <Box paddingY={24}>
                <Stack space={16}>
                    <Callout
                        onClose={() => {}}
                        title="Callout title"
                        description="Calloout description"
                        button={
                            <ButtonPrimary small onPress={() => {}}>
                                Action
                            </ButtonPrimary>
                        }
                    />
                    <Inline space={16}>
                        <HighlightedCard
                            isInverse={false}
                            title="Card title"
                            description="Card description"
                            imageUrl={personPortraitImg}
                            imageFit="fill"
                            onClose={() => {}}
                            button={
                                <ButtonPrimary href="#" small>
                                    Action
                                </ButtonPrimary>
                            }
                        />
                        <HighlightedCard
                            isInverse
                            title="Inverse card title"
                            description="Card description"
                            imageUrl={personPortraitImg}
                            imageFit="fill"
                            onClose={() => {}}
                            button={
                                <ButtonPrimary href="#" small>
                                    Action
                                </ButtonPrimary>
                            }
                        />
                    </Inline>
                    <Tag type="inactive">Inactive tag</Tag>
                    <Chip>A chip</Chip>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'ThemeVariant';
ComponentsOverDifferentThemeVariants.storyName = 'Components over different theme variants';
