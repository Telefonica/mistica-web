import * as React from 'react';
import {Checkbox, Stack, Text6, Inline, SectionTitle} from '..';

export default {
    title: 'Components/Forms/Checkbox',
};

export const Default: StoryComponent = () => {
    const [checked, onChange] = React.useState(false);
    return (
        <Stack space={32}>
            <>
                <SectionTitle id="label">Uncontrolled</SectionTitle>
                <Checkbox
                    name="second"
                    defaultChecked={false}
                    render={(checkboxElement) => (
                        <Inline alignItems="center" space={8}>
                            {checkboxElement}
                            <Text6 regular>You accept to sell your soul</Text6>
                        </Inline>
                    )}
                />
            </>
            <>
                <SectionTitle id="label">Controlled</SectionTitle>
                <Checkbox
                    name="third"
                    checked={checked}
                    onChange={onChange}
                    render={(checkboxElement) => (
                        <Inline alignItems="center" space={8}>
                            {checkboxElement}
                            <Text6 regular>You accept to sell your soul: {checked ? 'sure!' : 'nahh'}</Text6>
                        </Inline>
                    )}
                />
            </>
            <>
                <SectionTitle id="label">Without box</SectionTitle>
                <Checkbox
                    name="third"
                    checked={checked}
                    onChange={onChange}
                    render={() => (
                        <Inline alignItems="center" space={8}>
                            <Text6 regular>You accept to sell your soul: {checked ? 'sure!' : 'nahh'}</Text6>
                        </Inline>
                    )}
                />
            </>
            <>
                <SectionTitle id="label">Without children</SectionTitle>
                <Checkbox name="first" defaultChecked={false} />
            </>
        </Stack>
    );
};

Default.storyName = 'Checkbox';
