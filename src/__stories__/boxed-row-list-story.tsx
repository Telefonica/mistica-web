import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {StorySection, useTextField, useCheckbox, useSelect} from './helpers';
import {BoxedRowList, BoxedRow} from '../list';
import {Box, Stack, AvatarPlaceholder} from '..';

export default {
    title: 'Components|Lists/BoxedRowList',
    parameters: {
        fullScreen: true,
    },
};

const url = 'https://www.google.com';

export const Default: StoryComponent = () => {
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
        <MemoryRouter>
            <Box paddingX={16}>
                <Stack space={16}>
                    <Box paddingTop={16}>
                        <p>List options:</p>
                    </Box>
                    {controlSelect}
                    {badgeCheckbox}
                    {headlineTextField}
                    {titleTextField}
                    {subtitleTextField}
                    {descriptionTextField}
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
                            {...controlProps}
                        />
                        <BoxedRow
                            icon={iconSize !== 'Without icon' ? <AvatarPlaceholder size="100%" /> : undefined}
                            iconSize={iconSize === '40' ? 40 : 24}
                            headline={headline}
                            title={title}
                            subtitle={subtitle}
                            description={description}
                            badge={withBadge ? 2 : undefined}
                            {...controlProps}
                        />
                        <BoxedRow
                            icon={iconSize !== 'Without icon' ? <AvatarPlaceholder size="100%" /> : undefined}
                            iconSize={iconSize === '40' ? 40 : 24}
                            headline={headline}
                            title={title}
                            subtitle={subtitle}
                            description={description}
                            badge={withBadge ? 22 : undefined}
                            {...controlProps}
                        />
                    </BoxedRowList>
                </StorySection>
            </div>
        </MemoryRouter>
    );
};

Default.story = {name: 'BoxedRowList'};
