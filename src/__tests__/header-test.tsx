import * as React from 'react';
import {Header} from '../header';
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
    ${'h1'}      | ${undefined} | ${pretitleFirst}
    ${'h1'}      | ${'h3'}      | ${pretitleFirst}
    ${'h1'}      | ${'span'}    | ${pretitleFirst}
`(
    'Header has correct reading order with pretitleAs={$pretitleAs} and titleAs={$titleAs}',
    async ({pretitleAs, titleAs, expectedOrder}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <Header
                    headline="Headline"
                    pretitle="Pretitle"
                    title="Title"
                    description="Description"
                    titleAs={titleAs}
                    pretitleAs={pretitleAs}
                    dataAttributes={{testid: 'header'}}
                />
            </ThemeContextProvider>
        );

        const header = await screen.findByTestId('header');
        expect(header.textContent).toEqual(expectedOrder);
    }
);
