import * as React from 'react';
import {
    Box,
    Stack,
    Row,
    RowList,
    RadioGroup,
    NegativeBox,
    ResponsiveLayout,
    Title3,
    Text3,
    IconShopRegular,
} from '..';

export default {
    title: 'Private/Lists/ControlDisclosure',
    parameters: {
        fullScreen: true,
    },
};

export const ControlDisclosureExample: StoryComponent = () => {
    // Example state for the radio rows
    const [fruit, setFruit] = React.useState<'banana' | 'apple'>('banana');

    // Example state for switch + checkbox rows
    const [switchA, setSwitchA] = React.useState(false);
    const [checkboxB, setCheckboxB] = React.useState(false);

    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <Stack space={32}>
                    {/* Example 1: Radio rows that expand additional content */}
                    <Stack space={16}>
                        <Title3 as="h1">Radio rows with expandable content</Title3>

                        <RadioGroup
                            name="fruit"
                            value={fruit}
                            onChange={(value) => setFruit(value as 'banana' | 'apple')}
                        >
                            <RowList>
                                <Row
                                    asset={<IconShopRegular />}
                                    title="Banana"
                                    description="Yellow"
                                    radioValue="banana"
                                    radio={{
                                        controlDisclosure: {
                                            expanded: fruit === 'banana',
                                            'aria-live': 'assertive',
                                        },
                                    }}
                                />

                                <Row
                                    asset={<IconShopRegular />}
                                    title="Apple"
                                    description="Green"
                                    radioValue="apple"
                                    radio={{
                                        controlDisclosure: {
                                            expanded: fruit === 'apple',
                                            'aria-live': 'assertive',
                                        },
                                    }}
                                />
                            </RowList>
                        </RadioGroup>

                        {fruit === 'banana' && (
                            <Box id="panel-banana" paddingLeft={16}>
                                <Stack space={8}>
                                    <Title3 as="h1">Additional options for BANANA</Title3>
                                    <Text3 light>
                                        Example content for Banana. Use this section to validate that the
                                        radio row triggers the correct ARIA announcements and expansion
                                        behaviour.
                                    </Text3>
                                </Stack>
                            </Box>
                        )}

                        {fruit === 'apple' && (
                            <Box id="panel-apple" paddingLeft={16}>
                                <Stack space={8}>
                                    <Title3 as="h1">Additional options for APPLE</Title3>
                                    <Text3 light>
                                        Example content for Apple. Expands when the corresponding radio row is
                                        selected.
                                    </Text3>
                                </Stack>
                            </Box>
                        )}
                    </Stack>
                    {/* Example 2: Switch / Checkbox rows that expand */}
                    <Stack space={16}>
                        <Title3 as="h2">Switch and checkbox rows with expandable content</Title3>

                        <NegativeBox>
                            <RowList>
                                <Row
                                    title="Call forwarding A"
                                    description="Additional options appear when enabled."
                                    switch={{
                                        name: 'switch-a',
                                        value: switchA,
                                        onChange: setSwitchA,
                                        controlDisclosure: {
                                            expanded: switchA,
                                            'aria-live': 'assertive',
                                            onLabelWhenExpanded: 'Options available below.',
                                        },
                                    }}
                                />

                                <Row
                                    title="Call forwarding B"
                                    description="Another example of expandable content."
                                    checkbox={{
                                        name: 'checkbox-b',
                                        value: checkboxB,
                                        onChange: setCheckboxB,
                                        controlDisclosure: {
                                            expanded: checkboxB,
                                            'aria-live': 'assertive',
                                            onLabelWhenExpanded: 'Options available below.',
                                        },
                                    }}
                                />
                            </RowList>
                        </NegativeBox>

                        {switchA && (
                            <Box id="switch-a-panel" paddingLeft={16}>
                                <Stack space={8}>
                                    <Title3 as="h1">Extra options for A</Title3>
                                    <Text3 light>
                                        This section becomes visible when the switch is active. Used to
                                        validate accessibility announcements for switch-based disclosure.
                                    </Text3>
                                </Stack>
                            </Box>
                        )}

                        {checkboxB && (
                            <Box id="switch-b-panel" paddingLeft={16}>
                                <Stack space={8}>
                                    <Title3 as="h1">Extra options for B</Title3>
                                    <Text3 light>
                                        Example content for the checkbox row. Helpful to test both visual and
                                        screen-reader behaviour.
                                    </Text3>
                                </Stack>
                            </Box>
                        )}
                    </Stack>
                </Stack>
            </ResponsiveLayout>
        </Box>
    );
};

ControlDisclosureExample.storyName = 'ControlDisclosure';
