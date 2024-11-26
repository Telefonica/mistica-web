import * as React from 'react';
import {AdvancedDataCard} from '../community';
import {makeTheme} from './test-utils';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import Tag from '../tag';
import Stack from '../stack';
import {Text2} from '../text';

const titleFirst =
    'Title Headline Pretitle Subtitle Description Extra line 1Extra line 2Extra line 3Extra line 4';
const pretitleFirst =
    'Pretitle Headline Title Subtitle Description Extra line 1Extra line 2Extra line 3Extra line 4';

test.each`
    pretitleAs   | titleAs      | expectedLabel
    ${undefined} | ${undefined} | ${titleFirst}
    ${'h1'}      | ${'h2'}      | ${pretitleFirst}
    ${'h2'}      | ${'h1'}      | ${titleFirst}
`(
    'AdvancedDataCard "href" label with pretitleAs={$pretitleAs} and titleAs={$titleAs}',
    async ({pretitleAs, titleAs, expectedLabel}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <AdvancedDataCard
                    href="https://example.org"
                    headline={<Tag type="promo">Headline</Tag>}
                    pretitle="Pretitle"
                    pretitleAs={pretitleAs}
                    titleAs={titleAs}
                    subtitle="Subtitle"
                    title="Title"
                    description="Description"
                    extra={[
                        <Stack space={4}>
                            <Text2 regular>Extra line 1</Text2>
                            <Text2 regular>Extra line 2</Text2>
                        </Stack>,
                        <Stack space={4}>
                            <Text2 regular>Extra line 3</Text2>
                            <Text2 regular>Extra line 4</Text2>
                        </Stack>,
                    ]}
                />
            </ThemeContextProvider>
        );

        await screen.findByRole('link', {name: expectedLabel});
    }
);

test.each`
    pretitleAs   | titleAs      | expectedLabel
    ${undefined} | ${undefined} | ${titleFirst}
    ${'h1'}      | ${'h2'}      | ${pretitleFirst}
    ${'h2'}      | ${'h1'}      | ${titleFirst}
`(
    'AdvancedDataCard "to" label with pretitleAs={$pretitleAs} and titleAs={$titleAs}',
    async ({pretitleAs, titleAs, expectedLabel}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <AdvancedDataCard
                    to="/foo/bar"
                    headline={<Tag type="promo">Headline</Tag>}
                    pretitle="Pretitle"
                    pretitleAs={pretitleAs}
                    titleAs={titleAs}
                    subtitle="Subtitle"
                    title="Title"
                    description="Description"
                    extra={[
                        <Stack space={4}>
                            <Text2 regular>Extra line 1</Text2>
                            <Text2 regular>Extra line 2</Text2>
                        </Stack>,
                        <Stack space={4}>
                            <Text2 regular>Extra line 3</Text2>
                            <Text2 regular>Extra line 4</Text2>
                        </Stack>,
                    ]}
                />
            </ThemeContextProvider>
        );

        await screen.findByRole('link', {name: expectedLabel});
    }
);

test.each`
    pretitleAs   | titleAs      | expectedLabel
    ${undefined} | ${undefined} | ${titleFirst}
    ${'h1'}      | ${'h2'}      | ${pretitleFirst}
    ${'h2'}      | ${'h1'}      | ${titleFirst}
`(
    'AdvancedDataCard "onPress" label with pretitleAs={$pretitleAs} and titleAs={$titleAs}',
    async ({pretitleAs, titleAs, expectedLabel}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <AdvancedDataCard
                    onPress={() => {}}
                    headline={<Tag type="promo">Headline</Tag>}
                    pretitle="Pretitle"
                    pretitleAs={pretitleAs}
                    titleAs={titleAs}
                    subtitle="Subtitle"
                    title="Title"
                    description="Description"
                    extra={[
                        <Stack space={4}>
                            <Text2 regular>Extra line 1</Text2>
                            <Text2 regular>Extra line 2</Text2>
                        </Stack>,
                        <Stack space={4}>
                            <Text2 regular>Extra line 3</Text2>
                            <Text2 regular>Extra line 4</Text2>
                        </Stack>,
                    ]}
                />
            </ThemeContextProvider>
        );

        await screen.findByRole('button', {name: expectedLabel});
    }
);
