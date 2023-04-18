import * as React from 'react';
import {BlauLogo, Logo, MovistarLogo, O2Logo, TelefonicaLogo, VivoLogo} from '../logo';
import {StorySection} from './helpers';
import {Text2} from '../text';

export default {
    title: 'Components/Logo',
    component: Logo,
    parameters: {
        fullScreen: true,
    },
};

type Args = {logoType: 'isotipo' | 'imagotype' | 'vertical'; size: number};

export const Default: StoryComponent<Args> = ({logoType, size}) => {
    const [count, setCount] = React.useState(0);
    return (
        <>
            <StorySection title="Without touchable props">
                <Logo logoType={logoType} size={size} />
            </StorySection>
            <StorySection title="With to prop">
                <Logo logoType={logoType} size={size} to="#" replace />
            </StorySection>
            <StorySection title="With href prop">
                <Logo logoType={logoType} size={size} href="#" newTab />
            </StorySection>
            <StorySection title="With onPress prop">
                <Logo
                    logoType={logoType}
                    size={size}
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
                <MovistarLogo logoType={logoType} size={size} />
                <VivoLogo logoType={logoType} size={size} />
                <O2Logo logoType={logoType} size={size} />
                <TelefonicaLogo logoType={logoType} size={size} />
                <BlauLogo logoType={logoType} size={size} />
            </StorySection>
        </>
    );
};

Default.storyName = 'Logo';

Default.args = {
    logoType: 'isotipo',
    size: 48,
};

Default.argTypes = {
    logoType: {
        options: ['isotipo', 'imagotype', 'vertical'],
        control: {type: 'select'},
    },
    size: {
        control: {type: 'range', min: 8, max: 480, step: 8},
    },
};
