import * as React from 'react';
import {makeTheme} from '../test-utils/theme';
import ThemeContextProvider from '../theme-context-provider';
import {MainNavigationBar} from '../navigation-bar';
import {ButtonPrimary} from '../button';

export const Scenario1 = (): JSX.Element => {
    const [presses, setPresses] = React.useState(0);
    const firstSectionOnPressSpy = () => setPresses((count) => count + 1);
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <MainNavigationBar
                sections={[
                    // Section with custom interaction
                    {
                        title: 'section 1',
                        onPress: firstSectionOnPressSpy,
                        menu: {
                            columns: [
                                {
                                    title: 'column 1',
                                    items: [
                                        {title: 'item 1-1', onPress: () => {}},
                                        {title: 'item 1-2', href: '#'},
                                        {title: 'item 1-3', to: '/'},
                                    ],
                                },
                            ],
                        },
                    },
                    // Section without custom interaction
                    {
                        title: 'section 2',
                        menu: {
                            columns: [
                                {
                                    title: 'column 2',
                                    items: [{title: 'item 2-1', onPress: () => {}}],
                                },
                            ],
                        },
                    },
                ]}
            />
            <input type="hidden" data-testid="presses" value={presses} />
        </ThemeContextProvider>
    );
};
export const Scenario2 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <MainNavigationBar
                sections={[
                    {
                        title: 'section 1',
                        menu: {
                            content: ({closeMenu}) => (
                                <ButtonPrimary onPress={closeMenu}>Close menu</ButtonPrimary>
                            ),
                        },
                    },
                ]}
            />
        </ThemeContextProvider>
    );
};
