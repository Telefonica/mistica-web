import * as React from 'react';
import {StorySection, useTextField, useCheckbox, useSelect} from './helpers';
import {Box, Stack, AvatarPlaceholder, Circle, IconAcademicLight, BoxedRowList, BoxedRow, useTheme} from '..';

export default {
    title: 'Components/Lists/BoxedRowList',
    parameters: {
        fullScreen: true,
    },
};

const url = 'https://www.google.com';

export const Default: StoryComponent = () => {
    const {colors} = useTheme();
    const [headline, headlineTextField] = useTextField('headline', '');
    const [title, titleTextField] = useTextField('title', 'Title', true);
    const [subtitle, subtitleTextField] = useTextField('subtitle', '');
    const [description, descriptionTextField] = useTextField('description', 'Description');
    const [iconSize, iconSizeSelectField] = useSelect('Icon Size', '40', ['40', '24', 'Without icon']);
    const [control, controlSelect] = useSelect('Control type', 'chevron', [
        'chevron',
        'navigates without chevron',
        'switch',
        'checkbox',
        'custom element',
        'action with custom element',
        'none',
    ]);
    const [withBadge, badgeCheckbox] = useCheckbox('With badge', false);
    const [oneLineTitle, oneLineTitleCheckbox] = useCheckbox('one line title', false);
    const [oneLineSubtitle, oneLineSubtitleCheckbox] = useCheckbox('one line subtitle ', false);
    const [oneLineDescription, oneLineDescriptionCheckbox] = useCheckbox('one line description ', false);

    let controlProps = {};

    switch (control) {
        case 'chevron':
            controlProps = {href: url, newTab: true};
            break;
        case 'navigates without chevron':
            controlProps = {href: url, newTab: true, right: null}; // right null removes the chevron
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
        case 'none':
        default:
            controlProps = {};
    }

    return (
        <>
            <Box paddingX={16}>
                <Stack space={16}>
                    <Box paddingTop={16}>
                        <p>List options:</p>
                    </Box>
                    {controlSelect}
                    {badgeCheckbox}
                    {headlineTextField}
                    {titleTextField}
                    {oneLineTitleCheckbox}
                    {subtitleTextField}
                    {oneLineSubtitleCheckbox}
                    {descriptionTextField}
                    {oneLineDescriptionCheckbox}
                    {iconSizeSelectField}
                </Stack>
            </Box>
            <div data-testid="row-list">
                <StorySection title="Boxed Row List">
                    <BoxedRowList>
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
                            {...controlProps}
                        />
                        <BoxedRow
                            icon={
                                iconSize !== 'Without icon' ? (
                                    <Circle backgroundColor={colors.neutralLow} size={40}>
                                        <IconAcademicLight />
                                    </Circle>
                                ) : undefined
                            }
                            iconSize={iconSize === '40' ? 40 : 24}
                            headline={headline}
                            title={title}
                            subtitle={subtitle}
                            description={description}
                            badge={withBadge ? 2 : undefined}
                            titleLinesMax={oneLineTitle ? 1 : 2}
                            subtitleLinesMax={oneLineSubtitle ? 1 : 2}
                            descriptionLinesMax={oneLineDescription ? 1 : 2}
                            {...controlProps}
                        />
                        <BoxedRow
                            icon={
                                iconSize !== 'Without icon' ? (
                                    <Circle size={40} backgroundImage="https://i.imgur.com/QwNlo5s.png" />
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
                            {...controlProps}
                        />
                    </BoxedRowList>
                </StorySection>
            </div>
        </>
    );
};

Default.storyName = 'BoxedRowList';
