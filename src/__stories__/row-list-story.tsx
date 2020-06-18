import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {StorySection, useTextField, useCheckbox, useSelect} from './helpers';
import {RowList, Row} from '../list';
import {Box, Stack, AvatarPlaceholder} from '..';

export default {
    title: 'Components|Lists/RowList',
    parameters: {
        fullScreen: true,
    },
};

const url = 'https://www.google.com';
const handleOnPress = () => window.alert('Button pressed!');

export const Default: StoryComponent = () => {
    const [title, titleTextField] = useTextField('title', 'Title', true);
    const [description, descriptionTextField] = useTextField('description', 'Description');
    const [iconSize, iconSizeSelectField] = useSelect('Icon Size', '40', ['40', '24 *', 'Without icon']);
    const [withLink, linkCheckbox] = useCheckbox('With link', true);
    const [newTab, newTabCheckbox] = useCheckbox('Link newTab prop', false);
    const [withBadge, badgeCheckbox] = useCheckbox('With badge', true);

    return (
        <MemoryRouter>
            <Box paddingX={16}>
                <Stack space={16}>
                    <Box paddingTop={16}>
                        <p>List options:</p>
                    </Box>
                    {linkCheckbox}
                    {newTabCheckbox}
                    {badgeCheckbox}
                    {titleTextField}
                    {descriptionTextField}
                    {iconSizeSelectField}
                    <Box paddingX={16}>
                        <p style={{fontSize: 12}}>
                            * 24 icon size only can be used with title and no description.
                        </p>
                    </Box>
                </Stack>
            </Box>
            <div data-testid="row-list">
                <StorySection title="Row List">
                    <RowList>
                        <Row
                            icon={iconSize !== 'Without icon' ? <AvatarPlaceholder size="100%" /> : undefined}
                            iconSize={iconSize === '40' ? 40 : 24}
                            title={title}
                            description={description}
                            href={withLink ? url : ''}
                            newTab={newTab}
                            badge={withBadge}
                        />
                        <Row
                            icon={iconSize !== 'Without icon' ? <AvatarPlaceholder size="100%" /> : undefined}
                            iconSize={iconSize === '40' ? 40 : 24}
                            title={title}
                            description={description}
                            onPress={withLink ? handleOnPress : undefined}
                            badge={withBadge ? 2 : undefined}
                        />
                        <Row
                            icon={iconSize !== 'Without icon' ? <AvatarPlaceholder size="100%" /> : undefined}
                            iconSize={iconSize === '40' ? 40 : 24}
                            title={title}
                            description={description}
                            to={withLink ? url : ''}
                            badge={withBadge ? 22 : undefined}
                        />
                    </RowList>
                </StorySection>
            </div>
        </MemoryRouter>
    );
};

Default.story = {name: 'RowList'};
