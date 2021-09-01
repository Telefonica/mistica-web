import * as React from 'react';
import {
    Circle,
    Row,
    BoxedRow,
    RowList,
    BoxedRowList,
    RadioGroup,
    useTheme,
    Placeholder,
    Tag,
    IconLikeFilled,
    IconLightningRegular,
    Image,
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
    disableRadioGroup: boolean;
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
    disableRadioGroup,
}) => {
    const {colors} = useTheme();
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
            case 'action with custom element':
                controlProps = {
                    onPress,
                    right: (
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
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<IconLikeFilled size={24} />}
                headline={headline && <Tag color={colors.promo}>{headline}</Tag>}
                title={title}
                subtitle={subtitle}
                description={description}
                badge={withBadge ? 2 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={
                    <Circle backgroundColor={colors.neutralLow} size={40}>
                        <IconLightningRegular />
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
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<Image url="https://i.imgur.com/HRvhZ6F.jpeg" height={80} aspectRatio="16:9" />}
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                badge={withBadge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<Image url="https://i.imgur.com/G8aJDhB.jpeg" width={80} aspectRatio="7:10" />}
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                badge={withBadge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                {...getControlProps(row++)}
            />
            <RowComponent
                asset={<Image url="https://i.imgur.com/0T2IYB2.jpeg" width={80} />}
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                badge={withBadge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                {...getControlProps(row++)}
            />
        </ListComponent>
    );

    return control === 'radio' ? (
        <RadioGroup
            disabled={disableRadioGroup}
            name="radio-group"
            defaultValue="apple"
            data-testid="radio-row-list"
        >
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
    disableRadioGroup: false,
};

export const RowListStory: StoryComponent<Args> = (args) => <Template {...args} />;
RowListStory.storyName = 'RowList';
RowListStory.args = defaultArgs;

export const BoxedRowListStory: StoryComponent<Args> = (args) => <Template boxed {...args} />;
BoxedRowListStory.storyName = 'BoxedRowList';
BoxedRowListStory.args = defaultArgs;
