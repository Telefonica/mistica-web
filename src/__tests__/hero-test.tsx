import * as React from 'react';
import Hero from '../hero';
import Tag from '../tag';
import {makeTheme} from './test-utils';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';

const pretitleFirst = 'PretitleHeadlineTitleDescription';
const titleFirst = 'TitleHeadlinePretitleDescription';

test.each`
    pretitleAs   | titleAs      | expectedOrder
    ${undefined} | ${undefined} | ${titleFirst}
    ${undefined} | ${'span'}    | ${titleFirst}
    ${undefined} | ${'h1'}      | ${titleFirst}
    ${'span'}    | ${undefined} | ${titleFirst}
    ${'h3'}      | ${undefined} | ${titleFirst}
    ${'h3'}      | ${'h1'}      | ${titleFirst}
    ${'span'}    | ${'h1'}      | ${titleFirst}
    ${'h1'}      | ${undefined} | ${titleFirst}
    ${'h1'}      | ${'h3'}      | ${pretitleFirst}
    ${'h1'}      | ${'span'}    | ${pretitleFirst}
`(
    'Hero has correct reading order with pretitleAs={$pretitleAs} and titleAs={$titleAs}',
    async ({pretitleAs, titleAs, expectedOrder}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <Hero
                    media={<></>}
                    headline={<Tag>Headline</Tag>}
                    pretitle="Pretitle"
                    title="Title"
                    description="Description"
                    titleAs={titleAs}
                    pretitleAs={pretitleAs}
                    dataAttributes={{testid: 'hero'}}
                />
            </ThemeContextProvider>
        );

        const hero = await screen.findByTestId('hero');
        expect(hero.textContent).toEqual(expectedOrder);
    }
);
