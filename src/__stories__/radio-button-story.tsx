import * as React from 'react';
import {Stack, SectionTitle, RadioGroup, RadioButton, Inline, Text6} from '..';
import {IconHandLeftRegular} from '../../playroom/components';

export default {
    title: 'Components/Forms/RadioButton',
};

export const Default: StoryComponent = () => {
    const [value, setValue] = React.useState('banana');
    return (
        <Stack space={32}>
            <>
                <SectionTitle id="label">Selected fruit: {value}</SectionTitle>
                <RadioGroup name="juicy-fruit" aria-labelledby="label" value="banana" onChange={setValue}>
                    <Stack space={8}>
                        <RadioButton
                            value="banana"
                            render={(radio) => (
                                <Inline alignItems="center" space={8}>
                                    {radio}
                                    <Text6 regular>Banana</Text6>
                                </Inline>
                            )}
                        />
                        <RadioButton
                            value="apple"
                            render={(radio) => (
                                <Inline alignItems="center" space={8}>
                                    {radio}
                                    <Text6 regular>Apple</Text6>
                                </Inline>
                            )}
                        />
                    </Stack>
                </RadioGroup>
            </>
            <>
                <SectionTitle id="label">Custom - Selected fruit: {value}</SectionTitle>
                <RadioGroup name="juicy-fruit" aria-labelledby="label" value="banana" onChange={setValue}>
                    <Stack space={8}>
                        <RadioButton
                            value="banana"
                            render={() => (
                                <Inline space={8}>
                                    <Text6 regular>Banana</Text6>
                                    {value === 'banana' && <IconHandLeftRegular size={20} />}
                                </Inline>
                            )}
                        />
                        <RadioButton
                            value="apple"
                            render={() => (
                                <Inline space={8}>
                                    <Text6 regular>Apple</Text6>
                                    {value === 'apple' && <IconHandLeftRegular size={20} />}
                                </Inline>
                            )}
                        />
                    </Stack>
                </RadioGroup>
            </>
        </Stack>
    );
};

Default.storyName = 'Radio Button';
