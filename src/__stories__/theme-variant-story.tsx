import * as React from 'react';
import {
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
    Image,
    Timer,
} from '..';
import personPortraitImg from './images/person-portrait.jpg';
import beachImg from './images/beach.jpg';

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
    return (
        <div style={{position: 'relative'}}>
            {themeVariant === 'media' && (
                <div style={{position: 'absolute', width: '100%', height: '100%'}}>
                    <Image src={beachImg} width="100%" height="100%" noBorderRadius />
                </div>
            )}
            <div style={{position: 'relative'}}>
                <ResponsiveLayout variant={themeVariant}>
                    <Box paddingY={24}>
                        <OtherComponent />
                    </Box>
                </ResponsiveLayout>
            </div>
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
        options: ['default', 'inverse', 'alternative', 'media'],
        control: {type: 'select'},
    },
};

export const ComponentsOverDifferentThemeVariants: StoryComponent<Args> = ({themeVariant}) => {
    return (
        <div style={{position: 'relative'}}>
            {themeVariant === 'media' && (
                <div style={{position: 'absolute', width: '100%', height: '100%'}}>
                    <Image src={beachImg} width="100%" height="100%" noBorderRadius />
                </div>
            )}
            <div style={{position: 'relative'}}>
                <ResponsiveLayout variant={themeVariant}>
                    <Box paddingY={24}>
                        <Stack space={16}>
                            <Callout
                                onClose={() => {}}
                                title="Callout title"
                                description="Callout description"
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

                            <Timer minTimeUnit="seconds" maxTimeUnit="days" endTimestamp={0} boxed />
                        </Stack>
                    </Box>
                </ResponsiveLayout>
            </div>
        </div>
    );
};

ComponentsOverDifferentThemeVariants.storyName = 'Components over different theme variants';
ComponentsOverDifferentThemeVariants.args = {
    themeVariant: 'default',
};
ComponentsOverDifferentThemeVariants.parameters = {fullScreen: true};
ComponentsOverDifferentThemeVariants.argTypes = {
    themeVariant: {
        options: ['default', 'inverse', 'alternative', 'media'],
        control: {type: 'select'},
    },
};
