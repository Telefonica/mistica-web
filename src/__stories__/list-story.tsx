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
    IconLikeFilled,
    IconMobileDeviceRegular,
    Image,
    Text3,
    Inline,
    Avatar,
    IconTrashCanRegular,
    IconPauseFilled,
    IconPlayFilled,
    ResponsiveLayout,
    NegativeBox,
} from '..';
import usingVrImg from './images/using-vr.jpg';
import laptopImg from './images/laptop.jpg';
import avatarImg from './images/avatar.jpg';
import touchImg from './images/touch.jpg';
import personPortraitImg from './images/person-portrait.jpg';

export default {
    title: 'Components/Lists',
    argTypes: {
        control: {
            options: [
                'chevron',
                'navigates without chevron',
                'switch',
                'switch and onPress',
                'checkbox',
                'checkbox and onPress',
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
    },
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
    withBadge: boolean;
    oneLineTitle: boolean;
    oneLineSubtitle: boolean;
    oneLineDescription: boolean;
    extraContent: boolean;
    disabled: boolean;
    danger: boolean;
    overInverse: boolean;
};

const Template: StoryComponent<Args & {boxed?: boolean; isInverse?: boolean}> = ({
    boxed,
    headline,
    title,
    subtitle,
    description,
    detail,
    control,
    withBadge,
    oneLineTitle,
    oneLineSubtitle,
    oneLineDescription,
    extraContent,
    disabled,
    overInverse,
    isInverse,
    danger,
}) => {
    const extra = extraContent ? <Placeholder height={56} /> : undefined;

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
                controlProps = {switch: {defaultValue: true, onChange: () => {}}};
                break;
            case 'switch and onPress':
                controlProps = {
                    switch: {defaultValue: true, onChange: () => {}},
                    onPress,
                };
                break;
            case 'checkbox':
                controlProps = {checkbox: {defaultValue: true, onChange: () => {}}};
                break;
            case 'checkbox and onPress':
                controlProps = {
                    checkbox: {defaultValue: true, onChange: () => {}},
                    onPress,
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
        <ListComponent dataAttributes={{testid: 'list'}}>
            <RowComponent
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                detail={detail}
                badge={withBadge}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                disabled={disabled}
                danger={danger}
                isInverse={isInverse}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<IconLikeFilled size={24} color="currentColor" />}
                headline={headline && <Tag type="promo">{headline}</Tag>}
                title={title}
                subtitle={subtitle}
                description={description}
                detail={detail}
                badge={withBadge ? 2 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                disabled={disabled}
                danger={danger}
                isInverse={isInverse}
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
                badge={withBadge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                disabled={disabled}
                danger={danger}
                isInverse={isInverse}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<Circle size={40} backgroundImage={laptopImg} />}
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                detail={detail}
                badge={withBadge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                disabled={disabled}
                danger={danger}
                isInverse={isInverse}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<Image src={usingVrImg} height={80} aspectRatio="16:9" />}
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                detail={detail}
                badge={withBadge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                disabled={disabled}
                danger={danger}
                isInverse={isInverse}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<Image src={personPortraitImg} width={80} aspectRatio="7:10" />}
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                detail={detail}
                badge={withBadge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                disabled={disabled}
                danger={danger}
                isInverse={isInverse}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<Image src={touchImg} width={80} />}
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                detail={detail}
                badge={withBadge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                disabled={disabled}
                danger={danger}
                isInverse={isInverse}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<Avatar size={40} src={avatarImg} />}
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                detail={detail}
                badge={withBadge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                disabled={disabled}
                danger={danger}
                isInverse={isInverse}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<Avatar size={40} initials="MS" />}
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                detail={detail}
                badge={withBadge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                disabled={disabled}
                danger={danger}
                isInverse={isInverse}
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
    withBadge: false,
    oneLineTitle: false,
    oneLineSubtitle: false,
    oneLineDescription: false,
    extraContent: false,
    disabled: false,
    danger: false,
    overInverse: false,
};

export const RowListStory: StoryComponent<Args> = (args) => <Template {...args} />;
RowListStory.storyName = 'RowList';
RowListStory.args = defaultArgs;

export const BoxedRowListStory: StoryComponent<Args & {isInverse: boolean}> = (args) => (
    <Template boxed {...args} />
);
BoxedRowListStory.storyName = 'BoxedRowList';
BoxedRowListStory.args = {...defaultArgs, isInverse: false};
BoxedRowListStory.argTypes = {danger: {if: {arg: 'isInverse', eq: false}}};
