import * as React from 'react';
import {RowList, Row, BoxedRowList, BoxedRow} from '../list';
import {RadioGroup} from '../radio-button';
import {
    ButtonPrimary,
    Form,
    IconPlayFilled,
    IconShopRegular,
    IconTrashCanRegular,
    Stack,
    Tag,
    Text2,
    ThemeContextProvider,
} from '..';
import {makeTheme} from '../test-utils/theme';

export const Scenario1 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row title="Title" to="/somewhere" />
                <Row title="Title 2" />
            </RowList>
        </ThemeContextProvider>
    );
};
export const Scenario2 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <BoxedRowList>
                <BoxedRow title="Title" to="/somewhere" />
                <BoxedRow title="Title 2" />
            </BoxedRowList>
        </ThemeContextProvider>
    );
};
export const Scenario3 = (): JSX.Element => {
    const CustomBoxedRow = () => {
        const [selected, setSelected] = React.useState(false);

        return (
            <BoxedRow
                selected={selected}
                title="Title"
                right={
                    <button onClick={() => setSelected(!selected)}>
                        {selected ? 'Selected' : 'Unselected'}
                    </button>
                }
            />
        );
    };
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <BoxedRowList>
                <CustomBoxedRow />
            </BoxedRowList>
        </ThemeContextProvider>
    );
};
export const Scenario4 = ({
    onPress,
}: {
    onPress: (...args: Array<any>) => Promise<void> | void;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <BoxedRowList>
                <BoxedRow title="Title" onPress={onPress} checkbox={{defaultValue: false}} />
            </BoxedRowList>
        </ThemeContextProvider>
    );
};
export const Scenario5 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row title="Title" href="/some/url" />
            </RowList>
        </ThemeContextProvider>
    );
};
export const Scenario6 = ({spy}: {spy: (...args: Array<any>) => Promise<void> | void}): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row title="Title" onPress={spy} />
            </RowList>
        </ThemeContextProvider>
    );
};
export const Scenario7 = ({spy}: {spy: (...args: Array<any>) => Promise<void> | void}): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row title="Title" onPress={spy} touchableRole="link" />
            </RowList>
        </ThemeContextProvider>
    );
};
export const Scenario8 = ({
    spyOnChange,
}: {
    spyOnChange: (...args: Array<any>) => Promise<void> | void;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row title="Title" switch={{defaultValue: false, onChange: spyOnChange}} />
            </RowList>
        </ThemeContextProvider>
    );
};
export const Scenario9 = ({
    spyOnChange,
}: {
    spyOnChange: (...args: Array<any>) => Promise<void> | void;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row title="Title" checkbox={{defaultValue: false, onChange: spyOnChange}} />
            </RowList>
        </ThemeContextProvider>
    );
};
export const Scenario10 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row title="Title" right={() => <div>custom</div>} />
            </RowList>
        </ThemeContextProvider>
    );
};
export const Scenario11 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <RadioGroup name="radio-group">
                <RowList>
                    <Row title="Banana" subtitle="bananabanana" radioValue="banana" />
                    <Row title="Apple" subtitle="appleapple" radioValue="apple" />
                </RowList>
            </RadioGroup>
        </ThemeContextProvider>
    );
};
export const Scenario12 = ({
    submitSpy,
}: {
    submitSpy: (...args: Array<any>) => Promise<void> | void;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={submitSpy}>
                <RadioGroup name="radio">
                    <RowList>
                        <Row title="Checkbox 1" checkbox={{name: 'checkbox1'}} />
                        <Row title="Checkbox 2" onPress={() => {}} checkbox={{name: 'checkbox2'}} />
                        <Row title="Switch 1" switch={{name: 'switch1'}} />
                        <Row title="Switch 2" onPress={() => {}} switch={{name: 'switch2'}} />
                        <Row title="Banana" radioValue="banana" />
                        <Row title="Apple" radioValue="apple" />
                    </RowList>
                </RadioGroup>
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );
};
export const Scenario13 = ({
    firstButtonSpy,
    secondButtonSpy,
}: {
    firstButtonSpy: (...args: Array<any>) => Promise<void> | void;
    secondButtonSpy: (...args: Array<any>) => Promise<void> | void;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row
                    title="Banana"
                    subtitle="bananabanana"
                    iconButton={{
                        Icon: IconPlayFilled,
                        onPress: firstButtonSpy,
                        'aria-label': 'first-button',
                    }}
                />
                <Row
                    title="Apple"
                    subtitle="appleapple"
                    iconButton={{
                        Icon: IconPlayFilled,
                        onPress: secondButtonSpy,
                        'aria-label': 'second-button',
                    }}
                />
            </RowList>
        </ThemeContextProvider>
    );
};
export const Scenario14 = ({
    onPressSpy,
    iconButtonOnPressSpy,
    logEventSpy,
}: {
    onPressSpy: (...args: Array<any>) => Promise<void> | void;
    iconButtonOnPressSpy: (...args: Array<any>) => Promise<void> | void;
    logEventSpy: (...args: Array<any>) => Promise<void>;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <RowList>
                <Row
                    asset={<IconShopRegular />}
                    title="Title"
                    description="Description"
                    onPress={onPressSpy}
                    trackingEvent={{name: 'row-tracking-event'}}
                    iconButton={{
                        'aria-label': 'Remove',
                        Icon: IconTrashCanRegular,
                        small: true,
                        backgroundType: 'transparent',
                        type: 'neutral',
                        onPress: iconButtonOnPressSpy,
                        trackingEvent: {name: 'icon-button-tracking-event'},
                    }}
                />
            </RowList>
        </ThemeContextProvider>
    );
};
export const Scenario15 = ({spy}: {spy: (...args: Array<any>) => Promise<void> | void}): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <BoxedRowList>
                <BoxedRow title="Title" onPress={spy} touchableRole="link" />
            </BoxedRowList>
        </ThemeContextProvider>
    );
};
export const Scenario16 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row
                    headline={<Tag type="promo">Headline</Tag>}
                    title="Title"
                    subtitle="Subtitle"
                    description="Description"
                    detail="Detail"
                    right="right"
                    asset={<IconShopRegular />}
                    slot={
                        <Stack space={4}>
                            <Text2 regular>Extra line 1</Text2>
                            <Text2 regular>Extra line 2</Text2>
                        </Stack>
                    }
                    href="/"
                />
            </RowList>
        </ThemeContextProvider>
    );
};
export const Scenario17 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row
                    headline={<Tag type="promo">Headline</Tag>}
                    title="Title"
                    subtitle="Subtitle"
                    description="Description"
                    detail="Detail"
                    right="right"
                    asset={<IconShopRegular />}
                    slot={
                        <Stack space={4}>
                            <Text2 regular>Extra line 1</Text2>
                            <Text2 regular>Extra line 2</Text2>
                        </Stack>
                    }
                    onPress={() => {}}
                />
            </RowList>
        </ThemeContextProvider>
    );
};
export const Scenario18 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row
                    headline={<Tag type="promo">Headline</Tag>}
                    title="Title"
                    subtitle="Subtitle"
                    description="Description"
                    slot={
                        <Stack space={4}>
                            <Text2 regular>Extra line 1</Text2>
                            <Text2 regular>Extra line 2</Text2>
                        </Stack>
                    }
                    detail="detail"
                    right="right"
                    asset={<IconShopRegular />}
                    checkbox={{defaultValue: false}}
                />
            </RowList>
        </ThemeContextProvider>
    );
};
export const Scenario19 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row
                    headline={<Tag type="promo">Headline</Tag>}
                    title="Title"
                    subtitle="Subtitle"
                    description="Description"
                    slot={
                        <Stack space={4}>
                            <Text2 regular>Extra line 1</Text2>
                            <Text2 regular>Extra line 2</Text2>
                        </Stack>
                    }
                    detail="detail"
                    right="right"
                    asset={<IconShopRegular />}
                    switch={{defaultValue: false}}
                />
            </RowList>
        </ThemeContextProvider>
    );
};
export const Scenario20 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <RadioGroup name="radio-group">
                <RowList>
                    <Row
                        headline={<Tag type="promo">Headline</Tag>}
                        title="Title"
                        subtitle="Subtitle"
                        description="Description"
                        slot={
                            <Stack space={4}>
                                <Text2 regular>Extra line 1</Text2>
                                <Text2 regular>Extra line 2</Text2>
                            </Stack>
                        }
                        detail="detail"
                        right="right"
                        asset={<IconShopRegular />}
                        radioValue="radio1"
                    />
                </RowList>
            </RadioGroup>
        </ThemeContextProvider>
    );
};
export const Scenario21 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row
                    aria-label="Some custom label"
                    headline={<Tag type="promo">Headline</Tag>}
                    title="Title"
                    description="Description"
                />
            </RowList>
        </ThemeContextProvider>
    );
};
export const Scenario22 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <RowList small>
                <Row title="Title" description="Description" subtitle="Subtitle" />
            </RowList>
        </ThemeContextProvider>
    );
};
export const Scenario23 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <BoxedRowList small>
                <BoxedRow title="Title" description="Description" subtitle="Subtitle" />
            </BoxedRowList>
        </ThemeContextProvider>
    );
};
export const Scenario24 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row title="First" />
                <Row title="Last" />
            </RowList>
        </ThemeContextProvider>
    );
};
export const Scenario25 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row title="First" onPress={() => {}} switch={{defaultValue: false}} />
                <Row title="Last" />
            </RowList>
        </ThemeContextProvider>
    );
};
export const DualAction = ({kind}: {kind: 'switch' | 'checkbox' | 'radioValue'}): JSX.Element => {
    const rows = (
        <RowList>
            <Row
                title="First"
                onPress={() => {}}
                {...(kind === 'radioValue' ? {radioValue: 'first'} : {[kind]: {defaultValue: false}})}
            />
            {kind === 'radioValue' ? <Row title="Last" radioValue="last" /> : <Row title="Last" />}
        </RowList>
    );
    return kind === 'radioValue' ? <RadioGroup name="radio-group">{rows}</RadioGroup> : rows;
};
