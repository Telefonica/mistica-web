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
    const background = {
        default: 'transparent',
        inverse: skinVars.colors.backgroundBrand,
        alternative: skinVars.colors.backgroundAlternative,
    }[themeVariant];
    return (
        <div style={{background}}>
            <ResponsiveLayout>
                <Box paddingY={24}>
                    <ThemeVariant variant={themeVariant}>
                        <OtherComponent />
                    </ThemeVariant>
                </Box>
            </ResponsiveLayout>
        </div>
    );
};

Default.storyName = 'ThemeVariant';
Default.parameters = {fullScreen: true};
Default.args = {
    themeVariant: 'default',
};
Default.argTypes = {
    themeVariant: {
        options: ['default', 'inverse', 'alternative'],
        control: {type: 'select'},
    },
};

export const ComponentsOverDifferentThemeVariants: StoryComponent<Args> = ({themeVariant}) => {
    return (
        <ResponsiveLayout variant={themeVariant}>
            <Box paddingY={24}>
                <Stack space={16}>
                    <Callout
                        onClose={() => {}}
                        title="Title"
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
                            title="Title"
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
                            title="Title"
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

ComponentsOverDifferentThemeVariants.storyName = 'Components over different theme variants';
ComponentsOverDifferentThemeVariants.args = {
    themeVariant: 'default',
};
ComponentsOverDifferentThemeVariants.parameters = {fullScreen: true};
ComponentsOverDifferentThemeVariants.argTypes = {
    themeVariant: {
        options: ['default', 'inverse', 'alternative'],
        control: {type: 'select'},
    },
};
