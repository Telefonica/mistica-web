import * as React from 'react';
import {
    Circle,
    Row,
    BoxedRow,
    RowList,
    BoxedRowList,
    RadioGroup,
    skinVars,
    Placeholder,
    Tag,
    IconThumbUpFilled,
    IconMobileDeviceRegular,
    Image,
    Inline,
    Avatar,
    IconTrashCanRegular,
    IconPauseFilled,
    IconPlayFilled,
    ResponsiveLayout,
    NegativeBox,
    Title2,
    OrderedList,
    UnorderedList,
    ListItem,
    IconLightningFilled,
    Box,
    Text1,
    Text2,
    Text3,
    Text4,
    Text5,
    Text6,
    Text7,
    Text8,
    Text9,
    Text10,
    Stack,
} from '..';
import usingVrImg from './images/using-vr.jpg';
import laptopImg from './images/laptop.jpg';
import avatarImg from './images/avatar.jpg';
import touchImg from './images/touch.jpg';
import personPortraitImg from './images/person-portrait.jpg';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Lists',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    headline: string;
    title: string;
    subtitle: string;
    description: string;
    detail: string;
    control: string;
    badge: boolean;
    oneLineTitle: boolean;
    oneLineSubtitle: boolean;
    oneLineDescription: boolean;
    extra: boolean;
    disabled: boolean;
    danger: boolean;
    variantOutside: Variant;
    'aria-live': 'off' | 'polite' | 'assertive';
    'aria-atomic': boolean;
};

const Template: StoryComponent<
    Args & {
        boxed?: boolean;
        variant?: 'default' | 'brand';
    }
> = ({
    boxed,
    headline,
    title,
    subtitle,
    description,
    detail,
    control,
    badge,
    oneLineTitle,
    oneLineSubtitle,
    oneLineDescription,
    extra,
    disabled,
    variant,
    variantOutside,
    danger,
    'aria-live': ariaLive,
    'aria-atomic': ariaAtomic,
}) => {
    const extraContent = extra ? <Placeholder height={56} /> : undefined;

    const getControlProps = (index: number) => {
        let controlProps: any = {};
        const onPress = () => alert('Pressed');
        switch (control) {
            case 'chevron':
                controlProps = {href: 'https://example.org', newTab: true};
                break;
            case 'navigates without chevron':
                controlProps = {href: 'https://example.org', newTab: true, right: null}; // right null removes the chevron
                break;
            case 'switch':
                controlProps = {
                    switch: {
                        defaultValue: true,
                        onChange: () => {},
                    },
                };
                break;
            case 'switch and onPress':
                controlProps = {
                    switch: {
                        defaultValue: true,
                        onChange: () => {},
                    },
                    onPress,
                };
                break;
            case 'checkbox':
                controlProps = {
                    checkbox: {
                        defaultValue: true,
                        onChange: () => {},
                    },
                };
                break;
            case 'checkbox and onPress':
                controlProps = {
                    checkbox: {
                        defaultValue: true,
                        onChange: () => {},
                    },
                    onPress,
                };
                break;
            case 'checkbox with custom element':
                controlProps = {
                    checkbox: {
                        defaultValue: true,
                        onChange: () => {},
                    },
                    right: () => (
                        <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                            <div style={{width: 32, height: 32, borderRadius: '50%', background: 'pink'}} />
                        </div>
                    ),
                };
                break;
            case 'custom element':
                controlProps = {
                    right: (
                        <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                            <div style={{width: 32, height: 32, borderRadius: '50%', background: 'pink'}} />
                        </div>
                    ),
                };
                break;
            case 'custom element with text':
                controlProps = {
                    onPress,
                    right: ({centerY}: {centerY: boolean}) => (
                        <div style={centerY ? {display: 'flex', alignItems: 'center', height: '100%'} : {}}>
                            <Inline space={0}>
                                <Text3 color={skinVars.colors.error} medium as="p">
                                    12,00 €
                                </Text3>
                            </Inline>
                        </div>
                    ),
                };
                break;
            case 'action with custom element':
                controlProps = {
                    onPress,
                    right: () => (
                        <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                            <div style={{width: 32, height: 32, borderRadius: '50%', background: 'pink'}} />
                        </div>
                    ),
                };
                break;
            case 'radio':
                controlProps = {radioValue: 'radio-value-' + index};
                break;
            case 'radio and onPress':
                controlProps = {
                    radioValue: 'radio-value-' + index,
                    onPress,
                };
                break;
            case 'iconButton':
                controlProps = {
                    iconButton: {
                        Icon: IconTrashCanRegular,
                        small: false,
                        onPress: () => console.log('Pressed button'),
                        type: 'brand',
                        backgroundType: 'solid',
                    },
                };
                break;
            case 'toggleIconButton':
                controlProps = {
                    iconButton: {
                        checkedProps: {
                            Icon: IconPauseFilled,
                            label: 'Pause',
                            type: 'brand',
                            backgroundType: 'solid',
                        },
                        uncheckedProps: {
                            Icon: IconPlayFilled,
                            label: 'Play',
                            type: 'brand',
                            backgroundType: 'solid',
                        },
                        defaultChecked: false,
                        onChange: () => {},
                    },
                };
                break;
            case 'iconButton and onPress':
                controlProps = {
                    iconButton: {
                        Icon: IconTrashCanRegular,
                        small: false,
                        onPress: () => console.log('Pressed button'),
                        type: 'brand',
                        backgroundType: 'solid',
                    },
                    onPress,
                };
                break;
            case 'none':
            default:
                controlProps = {};
        }
        return controlProps;
    };

    const ListComponent = boxed ? BoxedRowList : RowList;
    const RowComponent = boxed ? BoxedRow : Row;

    let row = 1;
    const list = (
        <ListComponent dataAttributes={{testid: 'list'}} aria-live={ariaLive} aria-atomic={ariaAtomic}>
            <RowComponent
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                detail={detail}
                badge={badge}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extraContent}
                disabled={disabled}
                danger={danger}
                variant={variant}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<IconThumbUpFilled size={24} color="currentColor" />}
                headline={headline && <Tag type="promo">{headline}</Tag>}
                title={title}
                subtitle={subtitle}
                description={description}
                detail={detail}
                badge={badge ? 2 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extraContent}
                disabled={disabled}
                danger={danger}
                variant={variant}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={
                    <Circle backgroundColor={skinVars.colors.brandLow} size={40}>
                        <IconMobileDeviceRegular color={skinVars.colors.brand} />
                    </Circle>
                }
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                detail={detail}
                badge={badge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extraContent}
                disabled={disabled}
                danger={danger}
                variant={variant}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<Circle size={40} backgroundImage={laptopImg} />}
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                detail={detail}
                badge={badge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extraContent}
                disabled={disabled}
                danger={danger}
                variant={variant}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<Image src={usingVrImg} height={80} aspectRatio="16:9" />}
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                detail={detail}
                badge={badge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extraContent}
                disabled={disabled}
                danger={danger}
                variant={variant}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<Image src={personPortraitImg} width={80} aspectRatio="7:10" />}
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                detail={detail}
                badge={badge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extraContent}
                disabled={disabled}
                danger={danger}
                variant={variant}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<Image src={touchImg} width={80} aspectRatio="1:1" />}
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                detail={detail}
                badge={badge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extraContent}
                disabled={disabled}
                danger={danger}
                variant={variant}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<Avatar size={40} src={avatarImg} />}
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                detail={detail}
                badge={badge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extraContent}
                disabled={disabled}
                danger={danger}
                variant={variant}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<Avatar size={40} initials="MS" />}
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                detail={detail}
                badge={badge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extraContent}
                disabled={disabled}
                danger={danger}
                variant={variant}
                {...getControlProps(row++)}
            />
        </ListComponent>
    );

    const withLayout = (
        <ResponsiveLayout variant={variantOutside}>
            {boxed ? list : <NegativeBox>{list}</NegativeBox>}
        </ResponsiveLayout>
    );

    return control.includes('radio') ? (
        <RadioGroup disabled={disabled} name="radio-group" defaultValue="apple" data-testid="radio-row-list">
            {withLayout}
        </RadioGroup>
    ) : (
        withLayout
    );
};

const defaultArgs = {
    headline: '',
    title: 'Title',
    subtitle: '',
    description: 'Description',
    detail: '',
    control: 'chevron',
    badge: false,
    oneLineTitle: false,
    oneLineSubtitle: false,
    oneLineDescription: false,
    extra: false,
    disabled: false,
    danger: false,
    variantOutside: 'default',
    'aria-live': 'off',
    'aria-atomic': false,
} as const;

export const RowListStory: StoryComponent<Args> = (args) => <Template {...args} />;
RowListStory.storyName = 'RowList';
RowListStory.args = defaultArgs;
RowListStory.argTypes = {
    control: {
        options: [
            'chevron',
            'navigates without chevron',
            'switch',
            'switch and onPress',
            'checkbox',
            'checkbox and onPress',
            'checkbox with custom element',
            'radio',
            'radio and onPress',
            'iconButton',
            'iconButton and onPress',
            'toggleIconButton',
            'custom element',
            'custom element with text',
            'action with custom element',
            'none',
        ],
        control: {type: 'select'},
    },
    variantOutside: {
        options: ['default', 'brand', 'negative', 'alternative'],
        control: {type: 'select'},
    },
    'aria-live': {
        options: ['off', 'polite', 'assertive'],
        control: {type: 'select'},
    },
};

export const BoxedRowListStory: StoryComponent<Args & {variant: 'default' | 'brand'}> = (args) => (
    <Template boxed {...args} />
);
BoxedRowListStory.storyName = 'BoxedRowList';
BoxedRowListStory.args = {...defaultArgs, variant: 'default'};
BoxedRowListStory.argTypes = {
    ...RowListStory.argTypes,
    variant: {
        options: ['default', 'brand'],
        control: {type: 'select'},
    },
    danger: {if: {arg: 'variant', eq: 'default'}},
};

type UnorderedListArgs = {
    variantOutside: Variant;
    textPreset:
        | 'Text1'
        | 'Text2'
        | 'Text3'
        | 'Text4'
        | 'Text5'
        | 'Text6'
        | 'Text7'
        | 'Text8'
        | 'Text9'
        | 'Text10';
    customIcon: boolean;
    withMarker: boolean;
};

export const UnorderedListStory: StoryComponent<UnorderedListArgs> = ({
    variantOutside,
    textPreset,
    customIcon,
    withMarker,
}) => {
    const TextComponent = {
        Text1,
        Text2,
        Text3,
        Text4,
        Text5,
        Text6,
        Text7,
        Text8,
        Text9,
        Text10,
    }[textPreset];
    const Icon = customIcon ? IconLightningFilled : undefined;
    return (
        <ResponsiveLayout variant={variantOutside}>
            <TextComponent as="div" regular>
                <Box paddingY={24}>
                    <Stack space={16}>
                        <Title2 id="title">Unordered List</Title2>
                        <UnorderedList aria-labelledby="title">
                            <ListItem Icon={Icon} withMarker={withMarker}>
                                List item 1
                            </ListItem>
                            <ListItem Icon={Icon} withMarker={withMarker}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                                in culpa qui officia deserunt mollit anim id est laborum
                                <UnorderedList>
                                    <ListItem Icon={Icon} withMarker={withMarker}>
                                        Nested list item 1.1
                                    </ListItem>
                                    <ListItem Icon={Icon} withMarker={withMarker}>
                                        Nested list item 1.2
                                        <UnorderedList>
                                            <ListItem Icon={Icon} withMarker={withMarker}>
                                                Nested list item 1.2.1
                                            </ListItem>
                                            <ListItem Icon={Icon} withMarker={withMarker}>
                                                Nested list item 1.2.2
                                            </ListItem>
                                        </UnorderedList>
                                    </ListItem>
                                    <ListItem Icon={Icon} withMarker={withMarker}>
                                        Nested list item 1.3
                                    </ListItem>
                                </UnorderedList>
                            </ListItem>
                            <ListItem Icon={Icon} withMarker={withMarker}>
                                List item 3
                            </ListItem>
                            <ListItem Icon={Icon} withMarker={withMarker}>
                                List item 4
                            </ListItem>
                        </UnorderedList>
                    </Stack>
                </Box>
            </TextComponent>
        </ResponsiveLayout>
    );
};

const unorderedListArgTypes = {
    textPreset: {
        control: 'select',
        options: ['Text1', 'Text2', 'Text3', 'Text4', 'Text5', 'Text6', 'Text7', 'Text8', 'Text9', 'Text10'],
    },
} as const;

const unorderedListArgs = {
    variantOutside: 'default',
    textPreset: 'Text1',
    customIcon: true,
    withMarker: true,
} as const;

UnorderedListStory.storyName = 'UnorderedList';
UnorderedListStory.argTypes = unorderedListArgTypes;
UnorderedListStory.args = unorderedListArgs;

type OrderedListArgs = UnorderedListArgs;

export const OrderedListStory: StoryComponent<OrderedListArgs> = ({
    variantOutside,
    textPreset,
    customIcon,
    withMarker,
}) => {
    const TextComponent = {
        Text1,
        Text2,
        Text3,
        Text4,
        Text5,
        Text6,
        Text7,
        Text8,
        Text9,
        Text10,
    }[textPreset];
    const Icon = customIcon ? IconLightningFilled : undefined;
    return (
        <ResponsiveLayout variant={variantOutside}>
            <TextComponent as="div" regular>
                <Box paddingY={24}>
                    <Stack space={16}>
                        <Title2 id="title">Ordered List</Title2>
                        <OrderedList aria-labelledby="title">
                            <ListItem Icon={Icon} withMarker={withMarker}>
                                List item 1
                            </ListItem>
                            <ListItem Icon={Icon} withMarker={withMarker}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                                in culpa qui officia deserunt mollit anim id est laborum
                                <OrderedList>
                                    <ListItem Icon={Icon} withMarker={withMarker}>
                                        Nested list item 1.1
                                    </ListItem>
                                    <ListItem Icon={Icon} withMarker={withMarker}>
                                        Nested list item 1.2
                                        <OrderedList>
                                            <ListItem Icon={Icon} withMarker={withMarker}>
                                                Nested list item 1.2.1
                                            </ListItem>
                                            <ListItem Icon={Icon} withMarker={withMarker}>
                                                Nested list item 1.2.2
                                            </ListItem>
                                        </OrderedList>
                                    </ListItem>
                                    <ListItem Icon={Icon} withMarker={withMarker}>
                                        Nested list item 1.3
                                    </ListItem>
                                </OrderedList>
                            </ListItem>
                            <ListItem Icon={Icon} withMarker={withMarker}>
                                List item 3
                            </ListItem>
                            <ListItem Icon={Icon} withMarker={withMarker}>
                                List item 4
                            </ListItem>
                        </OrderedList>
                    </Stack>
                </Box>
            </TextComponent>
        </ResponsiveLayout>
    );
};

const orderedListArgs = unorderedListArgs;
const orderedListArgTypes = unorderedListArgTypes;

OrderedListStory.storyName = 'OrderedList';
OrderedListStory.argTypes = orderedListArgTypes;
OrderedListStory.args = orderedListArgs;

type ExpandableRowsArgs = {
    variantOutside: Variant;
    expandDelay: number;
};

export const ExpandableRowsStory: StoryComponent<ExpandableRowsArgs> = ({variantOutside, expandDelay}) => {
    const [switchExpanded, setSwitchExpanded] = React.useState(false);
    const [checkboxExpanded, setCheckboxExpanded] = React.useState(false);
    const [iconButtonExpanded, setIconButtonExpanded] = React.useState(false);
    const [onPressExpanded, setOnPressExpanded] = React.useState(false);

    return (
        <ResponsiveLayout variant={variantOutside}>
            <NegativeBox>
                <RowList>
                    {/* Expandable Switch row */}
                    <Row
                        title="Notifications"
                        description="Turn on to receive push notifications"
                        switch={{
                            value: switchExpanded,
                            onChange: setSwitchExpanded,
                        }}
                        aria-expanded={switchExpanded}
                        aria-controls="switch-content"
                        expandDelay={expandDelay}
                    />
                    {switchExpanded && (
                        <div
                            id="switch-content"
                            style={{padding: '16px', background: skinVars.colors.backgroundAlternative}}
                        >
                            <Text2 regular>
                                Notification settings expanded. Configure your preferences here.
                            </Text2>
                        </div>
                    )}

                    {/* Expandable Checkbox row */}
                    <Row
                        title="Terms and Conditions"
                        description="Agree to terms and view details"
                        checkbox={{
                            value: checkboxExpanded,
                            onChange: setCheckboxExpanded,
                        }}
                        aria-expanded={checkboxExpanded}
                        aria-controls="checkbox-content"
                        expandDelay={expandDelay}
                    />
                    {checkboxExpanded && (
                        <div
                            id="checkbox-content"
                            style={{padding: '16px', background: skinVars.colors.backgroundAlternative}}
                        >
                            <Text2 regular>
                                Terms and conditions content. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.
                            </Text2>
                        </div>
                    )}

                    {/* Expandable IconButton row */}
                    <Row
                        title="Music Player"
                        description="Toggle playback and view details"
                        iconButton={{
                            checkedProps: {
                                Icon: IconPauseFilled,
                                'aria-label': 'Pause',
                                type: 'brand',
                                backgroundType: 'solid',
                            },
                            uncheckedProps: {
                                Icon: IconPlayFilled,
                                'aria-label': 'Play',
                                type: 'brand',
                                backgroundType: 'solid',
                            },
                            checked: iconButtonExpanded,
                            onChange: setIconButtonExpanded,
                        }}
                        aria-expanded={iconButtonExpanded}
                        aria-controls="iconbutton-content"
                        expandDelay={expandDelay}
                    />
                    {iconButtonExpanded && (
                        <div
                            id="iconbutton-content"
                            style={{padding: '16px', background: skinVars.colors.backgroundAlternative}}
                        >
                            <Text2 regular>Now playing: Example Track - Artist Name</Text2>
                        </div>
                    )}

                    {/* Expandable OnPress row */}
                    <Row
                        title="Account Details"
                        description="Tap to expand or collapse"
                        onPress={() => setOnPressExpanded(!onPressExpanded)}
                        aria-expanded={onPressExpanded}
                        aria-controls="onpress-content"
                        expandDelay={expandDelay}
                    />
                    {onPressExpanded && (
                        <div
                            id="onpress-content"
                            style={{padding: '16px', background: skinVars.colors.backgroundAlternative}}
                        >
                            <Stack space={8}>
                                <Text2 medium>Account Information</Text2>
                                <Text2 regular>Email: user@example.com</Text2>
                                <Text2 regular>Member since: January 2024</Text2>
                            </Stack>
                        </div>
                    )}
                </RowList>
            </NegativeBox>
        </ResponsiveLayout>
    );
};

ExpandableRowsStory.storyName = 'Expandable Rows';
ExpandableRowsStory.args = {
    variantOutside: 'default',
    expandDelay: 300,
};
ExpandableRowsStory.argTypes = {
    variantOutside: {
        options: ['default', 'brand', 'negative', 'alternative'],
        control: {type: 'select'},
    },
    expandDelay: {
        control: {type: 'number', min: 0, max: 1000, step: 50},
    },
};

type DualInteractionExpandableArgs = {
    variantOutside: Variant;
    expandDelay: number;
};

export const DualInteractionExpandableStory: StoryComponent<DualInteractionExpandableArgs> = ({
    variantOutside,
    expandDelay,
}) => {
    const [switchExpanded, setSwitchExpanded] = React.useState(false);
    const [switchValue, setSwitchValue] = React.useState(false);

    return (
        <ResponsiveLayout variant={variantOutside}>
            <NegativeBox>
                <RowList>
                    {/* Dual interaction: onPress navigates, switch expands */}
                    <Row
                        title="Wi-Fi Settings"
                        description="Tap row to navigate to settings, toggle switch to expand details"
                        onPress={() => alert('Navigating to Wi-Fi settings page')}
                        switch={{
                            value: switchExpanded,
                            onChange: (checked) => {
                                setSwitchExpanded(checked);
                                setSwitchValue(checked);
                            },
                        }}
                        aria-expanded={switchExpanded}
                        aria-controls="dual-switch-content"
                        expandDelay={expandDelay}
                    />
                    {switchExpanded && (
                        <div
                            id="dual-switch-content"
                            style={{padding: '16px', background: skinVars.colors.backgroundAlternative}}
                        >
                            <Stack space={8}>
                                <Text2 medium>Wi-Fi Status: {switchValue ? 'Enabled' : 'Disabled'}</Text2>
                                <Text2 regular>Network: MyNetwork-5G</Text2>
                                <Text2 regular>Signal strength: Excellent</Text2>
                            </Stack>
                        </div>
                    )}
                </RowList>
            </NegativeBox>
        </ResponsiveLayout>
    );
};

DualInteractionExpandableStory.storyName = 'Dual Interaction Expandable';
DualInteractionExpandableStory.args = {
    variantOutside: 'default',
    expandDelay: 300,
};
DualInteractionExpandableStory.argTypes = {
    variantOutside: {
        options: ['default', 'brand', 'negative', 'alternative'],
        control: {type: 'select'},
    },
    expandDelay: {
        control: {type: 'number', min: 0, max: 1000, step: 50},
    },
};

type ExpandDelayDemoArgs = {
    variantOutside: Variant;
};

export const ExpandDelayDemoStory: StoryComponent<ExpandDelayDemoArgs> = ({variantOutside}) => {
    const [expanded0, setExpanded0] = React.useState(false);
    const [expanded100, setExpanded100] = React.useState(false);
    const [expanded300, setExpanded300] = React.useState(false);
    const [expanded500, setExpanded500] = React.useState(false);

    return (
        <ResponsiveLayout variant={variantOutside}>
            <NegativeBox>
                <Stack space={16}>
                    <Box paddingY={16}>
                        <Text2 regular>
                            Compare different expandDelay values. The delay helps screen readers by preventing
                            premature announcements during CSS transitions.
                        </Text2>
                    </Box>
                    <RowList>
                        <Row
                            title="expandDelay=0 (immediate)"
                            description="aria-expanded updates immediately"
                            switch={{
                                value: expanded0,
                                onChange: setExpanded0,
                            }}
                            aria-expanded={expanded0}
                            aria-controls="content-0"
                            expandDelay={0}
                        />
                        {expanded0 && (
                            <div
                                id="content-0"
                                style={{padding: '16px', background: skinVars.colors.backgroundAlternative}}
                            >
                                <Text2 regular>Content with 0ms delay</Text2>
                            </div>
                        )}

                        <Row
                            title="expandDelay=100"
                            description="100ms delay before aria-expanded updates"
                            switch={{
                                value: expanded100,
                                onChange: setExpanded100,
                            }}
                            aria-expanded={expanded100}
                            aria-controls="content-100"
                            expandDelay={100}
                        />
                        {expanded100 && (
                            <div
                                id="content-100"
                                style={{padding: '16px', background: skinVars.colors.backgroundAlternative}}
                            >
                                <Text2 regular>Content with 100ms delay</Text2>
                            </div>
                        )}

                        <Row
                            title="expandDelay=300 (recommended)"
                            description="300ms delay matches typical CSS transitions"
                            switch={{
                                value: expanded300,
                                onChange: setExpanded300,
                            }}
                            aria-expanded={expanded300}
                            aria-controls="content-300"
                            expandDelay={300}
                        />
                        {expanded300 && (
                            <div
                                id="content-300"
                                style={{padding: '16px', background: skinVars.colors.backgroundAlternative}}
                            >
                                <Text2 regular>Content with 300ms delay (recommended)</Text2>
                            </div>
                        )}

                        <Row
                            title="expandDelay=500"
                            description="500ms delay for slower transitions"
                            switch={{
                                value: expanded500,
                                onChange: setExpanded500,
                            }}
                            aria-expanded={expanded500}
                            aria-controls="content-500"
                            expandDelay={500}
                        />
                        {expanded500 && (
                            <div
                                id="content-500"
                                style={{padding: '16px', background: skinVars.colors.backgroundAlternative}}
                            >
                                <Text2 regular>Content with 500ms delay</Text2>
                            </div>
                        )}
                    </RowList>
                </Stack>
            </NegativeBox>
        </ResponsiveLayout>
    );
};

ExpandDelayDemoStory.storyName = 'Expand Delay Comparison';
ExpandDelayDemoStory.args = {
    variantOutside: 'default',
};
ExpandDelayDemoStory.argTypes = {
    variantOutside: {
        options: ['default', 'brand', 'negative', 'alternative'],
        control: {type: 'select'},
    },
};
