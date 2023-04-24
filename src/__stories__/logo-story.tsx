import * as React from 'react';
import {BlauLogo, Logo, MovistarLogo, O2Logo, TelefonicaLogo, VivoLogo} from '../logo';
import {StorySection} from './helpers';
import {Text2} from '../text';
import {ThemeVariant} from '../theme-variant-context';
import {skinVars} from '../index';

export default {
    title: 'Components/Logo',
    component: Logo,
    parameters: {
        fullScreen: true,
    },
    inverse: false,
};

type Args = {type: 'isotype' | 'imagotype' | 'vertical'; size: number; inverse: boolean};

export const Default: StoryComponent<Args> = ({type, size, inverse}) => {
    const [count, setCount] = React.useState(0);
    return (
        <div
            data-testid="logo"
            style={{
                padding: 16,
                background: inverse ? skinVars.colors.backgroundBrand : skinVars.colors.background,
            }}
        >
            <ThemeVariant isInverse={inverse}>
                <StorySection title="Without touchable props">
                    <Logo type={type} size={size} />
                </StorySection>
                <StorySection title="With to prop">
                    <Logo type={type} size={size} to="#" aria-label="logo link" replace />
                </StorySection>
                <StorySection title="With href prop">
                    <Logo type={type} size={size} href="#" aria-label="logo link" newTab />
                </StorySection>
                <StorySection title="With onPress prop">
                    <Logo
                        type={type}
                        size={size}
                        aria-label="pressable logo"
                        onPress={() => {
                            setCount((prev) => ++prev);
                        }}
                    />
                    <Text2 as="div" regular>
                        Pressed {count} times
                    </Text2>
                </StorySection>
                <StorySection title="Explicit Logos">
                    <Text2 as="p" regular>
                        Same properties apply. It does not depend on the skin.
                    </Text2>
                    <MovistarLogo type={type} size={size} />
                    <VivoLogo type={type} size={size} />
                    <O2Logo type={type} size={size} />
                    <TelefonicaLogo type={type} size={size} />
                    <BlauLogo type={type} size={size} />
                </StorySection>
            </ThemeVariant>
        </div>
    );
};

Default.storyName = 'Logo';

Default.args = {
    type: 'isotype',
    size: 48,
    inverse: false,
};

Default.argTypes = {
    type: {
        options: ['isotype', 'imagotype', 'vertical'],
        control: {type: 'select'},
    },
    size: {
        control: {type: 'range', min: 8, max: 480, step: 8},
    },
};
