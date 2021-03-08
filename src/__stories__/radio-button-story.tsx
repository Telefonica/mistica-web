import * as React from 'react';
import {Stack, SectionTitle, RadioGroup, RadioButton, Inline, Text6, IconHandLeftRegular} from '..';

export default {
    title: 'Components/Forms/RadioButton',
};

export const Default: StoryComponent = () => {
    const [value, setValue] = React.useState('banana');
    return (
        <Stack space={32}>
            <>
                <SectionTitle id="label">Selected fruit: {value}</SectionTitle>
                <RadioGroup name="juicy-fruit" aria-labelledby="label" value={value} onChange={setValue}>
                    <Stack space={16}>
                        <RadioButton value="banana">
                            <Text6 regular>Banana</Text6>
                        </RadioButton>
                        <RadioButton value="apple">
                            <Text6 regular>Apple</Text6>
                        </RadioButton>
                    </Stack>
                </RadioGroup>
            </>
            <>
                <SectionTitle id="label">Custom render - Selected fruit: {value}</SectionTitle>
                <RadioGroup name="juicy-fruit" aria-labelledby="label" value={value} onChange={setValue}>
                    <Stack space={16}>
                        <RadioButton
                            value="banana"
                            render={() => (
                                <Inline space={16}>
                                    <Text6 regular>Banana</Text6>
                                    {value === 'banana' && <IconHandLeftRegular size={20} />}
                                </Inline>
                            )}
                        />
                        <RadioButton
                            value="apple"
                            render={() => (
                                <Inline space={16}>
                                    <Text6 regular>Apple</Text6>
                                    {value === 'apple' && <IconHandLeftRegular size={20} />}
                                </Inline>
                            )}
                        />
                    </Stack>
                </RadioGroup>
            </>
            <>
                <SectionTitle id="label">Disabled</SectionTitle>
                <RadioGroup
                    disabled
                    name="juicy-fruit"
                    aria-labelledby="label"
                    value={value}
                    onChange={setValue}
                >
                    <Stack space={16}>
                        <RadioButton value="banana">
                            <Text6 regular>Banana</Text6>
                        </RadioButton>
                        <RadioButton value="apple">
                            <Text6 regular>Apple</Text6>
                        </RadioButton>
                    </Stack>
                </RadioGroup>
            </>
        </Stack>
    );
};

Default.storyName = 'Radio Button';
