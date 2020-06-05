// @flow
import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {StorySection, useTextField, useCheckbox, useSelect} from './helpers';
import {RowList, Row, BoxedRowList, BoxedRow} from '../list';
import {Box, Stack, AvatarPlaceholder} from '..';

export default {
    title: 'Components|List',
    parameters: {
        fullScreen: true,
    },
};

export const RowListExample = (): React.Node => {
    const [title, titleTextField] = useTextField('title', 'Title', true);
    const [description, descriptionTextField] = useTextField('description', 'Description');
    const [iconSize, iconSizeSelectField] = useSelect('Icon Size', '40', ['40', '24 *', 'Without icon']);
    const [withLink, linkCheckbox] = useCheckbox('With link', true);

    return (
        <MemoryRouter>
            <Box paddingX={16}>
                <Stack space={16}>
                    <Box paddingTop={16}>
                        <p>List options:</p>
                    </Box>
                    {titleTextField}
                    {descriptionTextField}
                    {linkCheckbox}
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
                            href={withLink ? 'url/url' : ''}
                        />
                        <Row
                            icon={iconSize !== 'Without icon' ? <AvatarPlaceholder size="100%" /> : undefined}
                            iconSize={iconSize === '40' ? 40 : 24}
                            title={title}
                            description={description}
                            onPress={withLink ? () => {} : ''}
                        />
                        <Row
                            icon={iconSize !== 'Without icon' ? <AvatarPlaceholder size="100%" /> : undefined}
                            iconSize={iconSize === '40' ? 40 : 24}
                            title={title}
                            description={description}
                            to={withLink ? 'url/url' : ''}
                        />
                    </RowList>
                </StorySection>
            </div>
        </MemoryRouter>
    );
};

export const BoxedRowListExample = (): React.Node => {
    const [title, titleTextField] = useTextField('title', 'Title', true);
    const [description, descriptionTextField] = useTextField('description', 'Description');
    const [iconSize, iconSizeSelectField] = useSelect('Icon Size', '40', ['40', '24 *', 'Without icon']);
    const [withLink, linkCheckbox] = useCheckbox('With link', true);

    return (
        <MemoryRouter>
            <Box paddingX={16}>
                <Stack space={16}>
                    <Box paddingTop={16}>
                        <p>List options:</p>
                    </Box>
                    {titleTextField}
                    {descriptionTextField}
                    {linkCheckbox}
                    {iconSizeSelectField}
                    <Box paddingX={16}>
                        <p style={{fontSize: 12}}>
                            * 24 icon size only can be used with title and no description.
                        </p>
                    </Box>
                </Stack>
            </Box>
            <div data-testid="boxed-list">
                <StorySection title="Boxed row list">
                    <BoxedRowList>
                        <BoxedRow
                            icon={iconSize !== 'Without icon' ? <AvatarPlaceholder size="100%" /> : undefined}
                            iconSize={iconSize === '40' ? 40 : 24}
                            title={title}
                            description={description}
                            href={withLink ? 'url/url' : ''}
                        />
                        <BoxedRow
                            icon={iconSize !== 'Without icon' ? <AvatarPlaceholder size="100%" /> : undefined}
                            iconSize={iconSize === '40' ? 40 : 24}
                            title={title}
                            description={description}
                            onPress={withLink ? () => {} : ''}
                        />
                        <BoxedRow
                            icon={iconSize !== 'Without icon' ? <AvatarPlaceholder size="100%" /> : undefined}
                            iconSize={iconSize === '40' ? 40 : 24}
                            title={title}
                            description={description}
                            to={withLink ? 'url/url' : ''}
                        />
                    </BoxedRowList>
                </StorySection>
            </div>
        </MemoryRouter>
    );
};
