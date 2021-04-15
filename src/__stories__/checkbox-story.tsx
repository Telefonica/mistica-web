import * as React from 'react';
import {Checkbox, Stack, Text3, Inline, SectionTitle} from '..';
import {useTheme} from '../hooks';
import {ThemeVariant} from '../theme-variant-context';

export default {
    title: 'Components/Forms/Checkbox',
};

export const Default: StoryComponent = () => {
    const [checked, onChange] = React.useState(false);
    const {colors} = useTheme();
    return (
        <Stack space={32}>
            <>
                <SectionTitle id="label">Uncontrolled (render prop)</SectionTitle>
                <Checkbox
                    name="uncontrolled-render"
                    defaultChecked={false}
                    render={(checkboxElement) => (
                        <Inline alignItems="center" space={16}>
                            {checkboxElement}
                            <Text3 regular>You accept to sell your soul</Text3>
                        </Inline>
                    )}
                />
            </>
            <>
                <SectionTitle id="label">Uncontrolled (children)</SectionTitle>
                <Checkbox name="uncontrolled-children" defaultChecked={false}>
                    You accept to sell your soul
                </Checkbox>
            </>
            <>
                <SectionTitle id="label">Controlled (render prop)</SectionTitle>
                <Checkbox
                    name="controlled-render"
                    checked={checked}
                    onChange={onChange}
                    render={(checkboxElement) => (
                        <Inline alignItems="center" space={16}>
                            {checkboxElement}
                            <Text3 regular>You accept to sell your soul: {checked ? 'sure!' : 'nahh'}</Text3>
                        </Inline>
                    )}
                />
            </>
            <>
                <SectionTitle id="label">Controlled (children)</SectionTitle>
                <Checkbox name="controlled-children" checked={checked} onChange={onChange}>
                    You accept to sell your soul: {checked ? 'sure!' : 'nahh'}
                </Checkbox>
            </>
            <>
                <SectionTitle id="label">Without box</SectionTitle>
                <Checkbox
                    name="no-box"
                    checked={checked}
                    onChange={onChange}
                    render={() => (
                        <Inline alignItems="center" space={16}>
                            <Text3 regular>You accept to sell your soul: {checked ? 'sure!' : 'nahh'}</Text3>
                        </Inline>
                    )}
                />
            </>
            <>
                <SectionTitle id="label">Disabled</SectionTitle>
                <Checkbox name="disabled-children" checked={checked} onChange={onChange} disabled>
                    You accept to sell your soul
                </Checkbox>
            </>

            <div style={{background: colors.backgroundBrand}}>
                <Stack space={32}>
                    <ThemeVariant isInverse>
                        <SectionTitle id="label">Inverse</SectionTitle>
                        <Checkbox name="inverse-children" checked={checked} onChange={onChange}>
                            You accept to sell your soul
                        </Checkbox>
                    </ThemeVariant>

                    <ThemeVariant isInverse>
                        <SectionTitle id="label">Inverse Disabled</SectionTitle>
                        <Checkbox name="inverse-disabled-children" checked={checked} onChange={onChange}>
                            You accept to sell your soul
                        </Checkbox>
                    </ThemeVariant>
                </Stack>
            </div>
        </Stack>
    );
};

Default.storyName = 'Checkbox';
