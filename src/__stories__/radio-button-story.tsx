import * as React from 'react';
import {
    Stack,
    SectionTitle,
    RadioGroup,
    RadioButton,
    Inline,
    Text6,
    IconHandLeftRegular,
    IconHandRightRegular,
} from '..';
import {useCheckbox} from './helpers';

export default {
    title: 'Components/Forms/RadioButton',
};

export const Default: StoryComponent = () => {
    const [value, setValue] = React.useState('banana');
    const [disabled, disabledCheckbox] = useCheckbox('Is disabled', false);
    const [disabledCustom, disabledCheckboxCustom] = useCheckbox('Is disabled', false);
    return (
        <Stack space={32}>
            <>
                <SectionTitle id="label">Selected fruit: {value}</SectionTitle>
                <Stack space={8}>
                    {disabledCheckbox}
                    <RadioGroup
                        disabled={disabled}
                        name="juicy-fruit"
                        aria-labelledby="label"
                        value="banana"
                        onChange={setValue}
                    >
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
                </Stack>
            </>
            <>
                <SectionTitle id="label">Custom - Selected fruit: {value}</SectionTitle>
                <Stack space={8}>
                    {disabledCheckboxCustom}
                    <RadioGroup
                        name="juicy-fruit"
                        disabled={disabledCustom}
                        aria-labelledby="label"
                        value="banana"
                        onChange={setValue}
                    >
                        <Stack space={8}>
                            <RadioButton
                                value="banana"
                                render={(_, disabled) => {
                                    const icon = disabled ? (
                                        <IconHandRightRegular size={20} />
                                    ) : (
                                        <IconHandLeftRegular size={20} />
                                    );
                                    return (
                                        <Inline space={8}>
                                            <Text6 regular>Banana</Text6>
                                            {value === 'banana' && icon}
                                        </Inline>
                                    );
                                }}
                            />
                            <RadioButton
                                value="apple"
                                render={(_, disabled) => {
                                    const icon = disabled ? (
                                        <IconHandRightRegular size={20} />
                                    ) : (
                                        <IconHandLeftRegular size={20} />
                                    );
                                    return (
                                        <Inline space={8}>
                                            <Text6 regular>Apple</Text6>
                                            {value === 'apple' && icon}
                                        </Inline>
                                    );
                                }}
                            />
                        </Stack>
                    </RadioGroup>
                </Stack>
            </>
        </Stack>
    );
};

Default.storyName = 'Radio Button';
