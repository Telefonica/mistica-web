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
    overInverse: boolean;
    'aria-live': 'off' | 'polite' | 'assertive';
    'aria-atomic': boolean;
};

const Template: StoryComponent<
    Args & {
        boxed?: boolean;
        inverse?: boolean;
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
    overInverse,
    inverse,
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
                isInverse={inverse}
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
                isInverse={inverse}
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
                isInverse={inverse}
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
                isInverse={inverse}
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
                isInverse={inverse}
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
                isInverse={inverse}
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
                isInverse={inverse}
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
                isInverse={inverse}
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
                isInverse={inverse}
                {...getControlProps(row++)}
            />
        </ListComponent>
    );

    const withLayout = (
        <ResponsiveLayout isInverse={overInverse}>
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
    overInverse: false,
    'aria-live': 'off' as const,
    'aria-atomic': false as const,
};

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
    'aria-live': {
        options: ['off', 'polite', 'assertive'],
        control: {type: 'select'},
    },
};

export const BoxedRowListStory: StoryComponent<Args & {inverse: boolean}> = (args) => (
    <Template boxed {...args} />
);
BoxedRowListStory.storyName = 'BoxedRowList';
BoxedRowListStory.args = {...defaultArgs, inverse: false};
BoxedRowListStory.argTypes = {...RowListStory.argTypes, danger: {if: {arg: 'inverse', eq: false}}};

type UnorderedListArgs = {
    inverse: boolean;
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
    inverse,
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
        <ResponsiveLayout variant={inverse ? 'inverse' : 'default'}>
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
    inverse: false,
    textPreset: 'Text1',
    customIcon: true,
    withMarker: true,
} as const;

UnorderedListStory.storyName = 'UnorderedList';
UnorderedListStory.argTypes = unorderedListArgTypes;
UnorderedListStory.args = unorderedListArgs;

type OrderedListArgs = UnorderedListArgs;

export const OrderedListStory: StoryComponent<OrderedListArgs> = ({
    inverse,
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
        <ResponsiveLayout variant={inverse ? 'inverse' : 'default'}>
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
