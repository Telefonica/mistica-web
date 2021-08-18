import * as React from 'react';
import {
    AvatarPlaceholder,
    Circle,
    IconAcademicLight,
    Row,
    RowList,
    RadioGroup,
    useTheme,
    Placeholder,
    Tag,
} from '..';

export default {
    title: 'Components/Lists/RowList',
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
        iconSize: {
            options: ['40', '24', 'Without icon'],
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
    iconSize: string;
    withBadge: boolean;
    oneLineTitle: boolean;
    oneLineSubtitle: boolean;
    oneLineDescription: boolean;
    extraContent: boolean;
    disableRadioGroup: boolean;
};

export const Default: StoryComponent<Args> = ({
    headline,
    title,
    subtitle,
    description,
    control,
    iconSize,
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
                controlProps = {radioValue: ['banana', 'apple', 'orange'][index]};
                break;
            case 'none':
            default:
                controlProps = {};
        }
        return controlProps;
    };

    const list = (
        <RowList dataAttributes={{testid: 'row-list'}}>
            <Row
                icon={iconSize !== 'Without icon' ? <AvatarPlaceholder size="100%" /> : undefined}
                iconSize={iconSize === '40' ? 40 : 24}
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                badge={withBadge}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                {...getControlProps(0)}
            />
            <Row
                icon={
                    iconSize !== 'Without icon' ? (
                        <Circle backgroundColor={colors.neutralLow} size={iconSize === '40' ? 40 : 24}>
                            <IconAcademicLight />
                        </Circle>
                    ) : undefined
                }
                iconSize={iconSize === '40' ? 40 : 24}
                headline={headline && <Tag color={colors.promo}>{headline}</Tag>}
                title={title}
                subtitle={subtitle}
                description={description}
                badge={withBadge ? 2 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                {...getControlProps(1)}
            />
            <Row
                icon={
                    iconSize !== 'Without icon' ? (
                        <Circle
                            size={iconSize === '40' ? 40 : 24}
                            backgroundImage="https://i.imgur.com/QwNlo5s.png"
                        />
                    ) : undefined
                }
                iconSize={iconSize === '40' ? 40 : 24}
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                badge={withBadge ? 22 : undefined}
                titleLinesMax={oneLineTitle ? 1 : 2}
                subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                descriptionLinesMax={oneLineDescription ? 1 : 2}
                extra={extra}
                {...getControlProps(2)}
            />
        </RowList>
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

Default.storyName = 'RowList';
Default.args = {
    headline: '',
    title: 'Title',
    subtitle: '',
    description: 'Description',
    control: 'chevron',
    iconSize: '40',
    withBadge: false,
    oneLineTitle: false,
    oneLineSubtitle: false,
    oneLineDescription: false,
    extraContent: false,
    disableRadioGroup: false,
};
