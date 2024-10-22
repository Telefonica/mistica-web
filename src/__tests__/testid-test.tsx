import * as React from 'react';
import {RowList, Row} from '../list';
import {screen, render, within} from '@testing-library/react';
import {
    ButtonPrimary,
    ButtonSecondary,
    DataCard,
    DateField,
    IconShopRegular,
    Placeholder,
    SearchField,
    Stack,
    SuccessFeedbackScreen,
    TextField,
    ThemeContextProvider,
} from '..';
import {makeTheme} from './test-utils';

const checkTestIds = (
    content: React.ReactElement,
    elements: ReadonlyArray<{componentName: string; internalTestIds: ReadonlyArray<string>}>
) => {
    render(<ThemeContextProvider theme={makeTheme()}>{content}</ThemeContextProvider>);

    elements.forEach(({componentName, internalTestIds}) => {
        const element = screen.getByTestId(componentName);
        expect(element).toBeInTheDocument();

        internalTestIds.forEach((id) => expect(within(element).getByTestId(id)).toBeInTheDocument());
    });
};

test('Row test ids', () => {
    checkTestIds(
        <RowList>
            <Row
                title="Title"
                headline="Headline"
                subtitle="Subtitle"
                description="Description"
                detail="Detail"
                asset={<IconShopRegular />}
                extra={<Placeholder />}
                right="right"
                href="#"
            />
        </RowList>,
        [
            {
                componentName: 'Row',
                internalTestIds: [
                    'headline',
                    'title',
                    'subtitle',
                    'description',
                    'detail',
                    'asset',
                    'slot',
                    'chevron',
                    'endSlot',
                ],
            },
        ]
    );
});

test('Cards test ids', () => {
    checkTestIds(
        <DataCard
            headline="Headline"
            pretitle="Pretitle"
            title="Title"
            subtitle="Subtitle"
            description="Description"
            extra={<Placeholder />}
            asset={<IconShopRegular />}
            actions={[
                {
                    Icon: IconShopRegular,
                    onPress: () => {},
                    label: 'Lightning',
                },
            ]}
        />,
        [
            {
                componentName: 'DataCard',
                internalTestIds: [
                    'headline',
                    'pretitle',
                    'title',
                    'subtitle',
                    'description',
                    'asset',
                    'topActions',
                    'slot',
                ],
            },
        ]
    );
});

test('FeedbackScreen test ids', () => {
    checkTestIds(
        <SuccessFeedbackScreen
            title="Title"
            description="Description"
            extra={<Placeholder />}
            primaryButton={<ButtonPrimary onPress={() => {}}>Action</ButtonPrimary>}
            imageUrl="https://picsum.photos/1200/1200"
        />,
        [
            {
                componentName: 'SuccessFeedbackScreen',
                internalTestIds: ['icon', 'title', 'description', 'image', 'slot'],
            },
        ]
    );
});

test('InputFields test ids', () => {
    checkTestIds(
        <Stack space={16}>
            <TextField
                name="textField"
                label="Label 1"
                helperText="Helper"
                multiline
                maxLength={200}
                endIcon={<IconShopRegular />}
            />
            <SearchField name="searchField" label="Label 2" helperText="helperText" error />
            <DateField name="dateField" label="Label 3" />
        </Stack>,

        [
            {
                componentName: 'TextField',
                internalTestIds: ['label', 'helperText', 'endHelperText', 'endIcon'],
            },
            {
                componentName: 'SearchField',
                internalTestIds: ['startIcon', 'errorText'],
            },
            // In DateField/MonthField/DatetimeField, we use endIconOverlay for setting the endIcon
            {
                componentName: 'DateField',
                internalTestIds: ['endIcon'],
            },
        ]
    );
});

test('Buttons test ids', () => {
    checkTestIds(
        <Stack space={16}>
            <ButtonPrimary StartIcon={IconShopRegular} EndIcon={IconShopRegular} onPress={() => {}}>
                Action
            </ButtonPrimary>
            <ButtonSecondary loadingText="Loading text" showSpinner onPress={() => {}}>
                Action 2
            </ButtonSecondary>
        </Stack>,
        [
            {
                componentName: 'ButtonPrimary',
                internalTestIds: ['startIcon', 'endIcon'],
            },
            {
                componentName: 'ButtonSecondary',
                internalTestIds: ['loadingText'],
            },
        ]
    );
});
