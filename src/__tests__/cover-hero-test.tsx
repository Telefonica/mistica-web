import * as React from 'react';
import CoverHero from '../cover-hero';
import Tag from '../tag';
import {makeTheme} from './test-utils';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';

const pretitleFirst = 'HeadlinePretitleTitleDescription';
const titleFirst = 'HeadlineTitlePretitleDescription';

test.each`
    pretitleAs   | titleAs      | expectedOrder
    ${undefined} | ${undefined} | ${titleFirst}
    ${undefined} | ${'span'}    | ${titleFirst}
    ${undefined} | ${'h1'}      | ${titleFirst}
    ${'span'}    | ${undefined} | ${titleFirst}
    ${'h3'}      | ${undefined} | ${titleFirst}
    ${'h3'}      | ${'h1'}      | ${titleFirst}
    ${'span'}    | ${'h1'}      | ${titleFirst}
    ${'h1'}      | ${undefined} | ${pretitleFirst}
    ${'h1'}      | ${'h3'}      | ${pretitleFirst}
    ${'h1'}      | ${'span'}    | ${pretitleFirst}
`(
    'CoverHero has correct reading order with pretitleAs={$pretitleAs} and titleAs={$titleAs}',
    async ({pretitleAs, titleAs, expectedOrder}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <CoverHero
                    background="white"
                    headline={<Tag>Headline</Tag>}
                    pretitle="Pretitle"
                    title="Title"
                    description="Description"
                    titleAs={titleAs}
                    pretitleAs={pretitleAs}
                    dataAttributes={{testid: 'cover-hero'}}
                />
            </ThemeContextProvider>
        );

        const coverHero = await screen.findByTestId('cover-hero');
        expect(coverHero.textContent).toEqual(expectedOrder);
    }
);