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
} from '..';

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
                'custom element',
                'custom element with text',
                'action with custom element',
                'none',
            ],
            control: {type: 'select'},
        },
    },
};

type Args = {
    headline: string;
    title: string;
    subtitle: string;
    description: string;
    control: string;
    withBadge: boolean;
    oneLineTitle: boolean;
    oneLineSubtitle: boolean;
    oneLineDescription: boolean;
    extraContent: boolean;
    disabled: boolean;
};

const Template: StoryComponent<Args & {boxed?: boolean}> = ({
    boxed,
    headline,
    title,
    subtitle,
    description,
    control,
    withBadge,
    oneLineTitle,
    oneLineSubtitle,
    oneLineDescription,
    extraContent,
    disabled,
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
                badge={withBadge}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                disabled={disabled}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<IconLikeFilled size={24} />}
                headline={headline && <Tag type="promo">{headline}</Tag>}
                title={title}
                subtitle={subtitle}
                description={description}
                badge={withBadge ? 2 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                disabled={disabled}
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
                badge={withBadge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                disabled={disabled}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<Circle size={40} backgroundImage="https://i.imgur.com/QwNlo5s.png" />}
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                badge={withBadge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                disabled={disabled}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={
                    <Image
                        src="https://images.unsplash.com/photo-1622819584099-e04ccb14e8a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                        height={80}
                        aspectRatio="16:9"
                    />
                }
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                badge={withBadge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                disabled={disabled}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={
                    <Image
                        src="https://images.unsplash.com/photo-1570158268183-d296b2892211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                        width={80}
                        aspectRatio="7:10"
                    />
                }
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                badge={withBadge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                disabled={disabled}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={
                    <Image
                        src="https://images.unsplash.com/photo-1548446388-f35145b5a0c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
                        width={80}
                    />
                }
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                badge={withBadge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                disabled={disabled}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={
                    <Avatar
                        size={40}
                        src="https://images.unsplash.com/photo-1640951613773-54706e06851d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
                    />
                }
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                badge={withBadge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                disabled={disabled}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<Avatar size={40} initials="MS" />}
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                badge={withBadge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                disabled={disabled}
                {...getControlProps(row++)}
            />
        </ListComponent>
    );

    return control === 'radio' ? (
        <RadioGroup disabled={disabled} name="radio-group" defaultValue="apple" data-testid="radio-row-list">
            {list}
        </RadioGroup>
    ) : (
        list
    );
};

const defaultArgs = {
    headline: '',
    title: 'Title',
    subtitle: '',
    description: 'Description',
    control: 'chevron',
    withBadge: false,
    oneLineTitle: false,
    oneLineSubtitle: false,
    oneLineDescription: false,
    extraContent: false,
    disabled: false,
};

export const RowListStory: StoryComponent<Args> = (args) => <Template {...args} />;
RowListStory.storyName = 'Row list';
RowListStory.args = defaultArgs;

export const BoxedRowListStory: StoryComponent<Args> = (args) => <Template boxed {...args} />;
BoxedRowListStory.storyName = 'Boxed row list';
BoxedRowListStory.args = defaultArgs;
