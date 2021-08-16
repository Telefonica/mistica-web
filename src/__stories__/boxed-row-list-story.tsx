import * as React from 'react';
import {
    AvatarPlaceholder,
    Circle,
    IconAcademicLight,
    BoxedRow,
    BoxedRowList,
    useTheme,
    Placeholder,
    Tag,
    RadioGroup,
} from '..';

export default {
    title: 'Components/Lists/BoxedRowList',
    argTypes: {
        control: {
            options: [
                'chevron',
                'navigates without chevron',
                'switch',
                'checkbox',
                'custom element',
                'action with custom element',
                'radio',
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
            case 'checkbox':
                controlProps = {checkbox: {defaultValue: true, onChange: () => {}}};
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
                    onPress: () => alert('pressed'),
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
        <BoxedRowList data-testid="row-list">
            <BoxedRow
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
            <BoxedRow
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
            <BoxedRow
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
        </BoxedRowList>
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

Default.storyName = 'BoxedRowList';
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
