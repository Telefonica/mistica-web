import {test, expect} from '../test-utils/component';

test.use({viewport: {width: 411, height: 731}});

test('SidenavBar mobile shows a top bar with the burger, and no panel', async ({mount, page}) => {
    const selected: Array<string> = [];

    await mount('sidenav-bar-mobile/Scenario1', {
        onSelectedItemIdChange: (id: string) => {
            selected.push(id);
        },
    });
    await expect(page.getByRole('button', {name: 'Open navigation menu'})).toHaveCount(1);
    await expect(page.getByRole('navigation', {name: 'Main navigation'})).toHaveCount(0);
});
test('SidenavBar mobile puts the header slot in the top bar', async ({mount, page}) => {
    const selected: Array<string> = [];

    await mount('sidenav-bar-mobile/Scenario2', {
        onSelectedItemIdChange: (id: string) => {
            selected.push(id);
        },
    });
    await expect(page.getByRole('button', {name: 'Header action'})).toHaveCount(1);
});
test('SidenavBar mobile reports the expanded state, at rest, to the function that headerSlot carries', async ({
    mount,
    page,
}) => {
    const selected: Array<string> = [];

    await mount('sidenav-bar-mobile/Scenario3', {
        onSelectedItemIdChange: (id: string) => {
            selected.push(id);
        },
    });
    await expect(page.getByRole('button', {name: 'Header expanded false'})).toHaveCount(1);
});
test('SidenavBar mobile ignores the collapsed state', async ({mount, page}) => {
    const selected: Array<string> = [];

    await mount('sidenav-bar-mobile/Scenario4', {
        onSelectedItemIdChange: (id: string) => {
            selected.push(id);
        },
    });
    await expect(page.getByRole('img', {name: 'Logo false'})).toHaveCount(1);
    await expect(page.getByRole('button', {name: 'Header expanded false'})).toHaveCount(1);
    await expect(page.getByRole('button', {name: 'Expand navigation'})).toHaveCount(0);
    await expect(page.getByRole('button', {name: 'Collapse navigation'})).toHaveCount(0);
    await page.getByRole('button', {name: 'Open navigation menu', exact: true}).click();
    await expect(page.getByRole('navigation', {name: 'Main navigation', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Footer expanded false'})).toHaveCount(1);
    await expect(page.getByRole('link', {name: 'Home'})).toHaveCount(1);
});
test('SidenavBar mobile opens the panel with one row per first-level item', async ({mount, page}) => {
    const selected: Array<string> = [];

    await mount('sidenav-bar-mobile/Scenario5', {
        onSelectedItemIdChange: (id: string) => {
            selected.push(id);
        },
    });
    await page.getByRole('button', {name: 'Open navigation menu', exact: true}).click();
    await expect(page.getByRole('navigation', {name: 'Main navigation', exact: true})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Dashboard'})).toHaveAttribute('href', '/dashboard');
    await expect(page.getByRole('link', {name: 'Home'})).toHaveAttribute('href', '/home');
    await expect(page.getByRole('button', {name: 'Projects'})).toHaveCount(1);
    await expect(page.getByRole('heading', {name: 'Workspace'})).toHaveCount(1);
});
test('SidenavBar mobile hides the heading of a section and keeps the name of its list', async ({
    mount,
    page,
}) => {
    const selected: Array<string> = [];

    await mount('sidenav-bar-mobile/Scenario6', {
        onSelectedItemIdChange: (id: string) => {
            selected.push(id);
        },
    });
    await page.getByRole('button', {name: 'Open navigation menu', exact: true}).click();
    await expect(page.getByRole('navigation', {name: 'Main navigation', exact: true})).toBeVisible();
    await expect(page.getByRole('heading', {name: 'Workspace'})).toHaveCount(0);
    await expect(page.getByRole('list', {name: 'Workspace'})).toHaveCount(1);
});
test('SidenavBar mobile renders no item of the desktop rail', async ({mount, page}) => {
    const selected: Array<string> = [];

    await mount('sidenav-bar-mobile/Scenario7', {
        onSelectedItemIdChange: (id: string) => {
            selected.push(id);
        },
    });
    await page.getByRole('button', {name: 'Open navigation menu', exact: true}).click();
    await expect(page.getByRole('navigation', {name: 'Main navigation', exact: true})).toBeVisible();
    await expect(page.getByTestId('SidenavItem')).toHaveCount(0);
    await expect(page.getByTestId('SidenavSection')).toHaveCount(0);
});
test('SidenavBar mobile renders the footer slot inside the panel', async ({mount, page}) => {
    const selected: Array<string> = [];

    await mount('sidenav-bar-mobile/Scenario8', {
        onSelectedItemIdChange: (id: string) => {
            selected.push(id);
        },
    });
    await expect(page.getByRole('button', {name: 'Footer action'})).toHaveCount(0);
    await page.getByRole('button', {name: 'Open navigation menu', exact: true}).click();
    await expect(page.getByRole('navigation', {name: 'Main navigation', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Footer action'})).toHaveCount(1);
});
test('SidenavBar mobile opens the second level of a parent item, and returns from it', async ({
    mount,
    page,
}) => {
    const selected: Array<string> = [];

    await mount('sidenav-bar-mobile/Scenario9', {
        onSelectedItemIdChange: (id: string) => {
            selected.push(id);
        },
    });
    await page.getByRole('button', {name: 'Open navigation menu', exact: true}).click();
    await expect(page.getByRole('navigation', {name: 'Main navigation', exact: true})).toBeVisible();
    await page.getByRole('button', {name: 'Projects'}).click();
    await expect(page.getByRole('link', {name: 'Active'})).toHaveCount(1);
    await expect(page.getByRole('link', {name: 'Archived'})).toHaveAttribute('href', '/archived');
    await expect(page.getByRole('heading', {name: 'Projects'})).toHaveCount(1);
    await page.getByRole('button', {name: 'Back'}).click();
    await expect(page.getByRole('button', {name: 'Projects'})).toHaveCount(1);
});
test('SidenavBar mobile closes the panel when the user presses an item that navigates', async ({
    mount,
    page,
}) => {
    const selected: Array<string> = [];
    let settings = 0;
    await mount('sidenav-bar-mobile/Scenario10', {
        onSelectedItemIdChange: (id: string) => {
            selected.push(id);
        },
        onSettingsPress: () => {
            settings++;
        },
    });
    await page.getByRole('button', {name: 'Open navigation menu', exact: true}).click();
    await expect(page.getByRole('navigation', {name: 'Main navigation', exact: true})).toBeVisible();
    await page.getByRole('button', {name: 'Settings'}).click();
    await expect.poll(() => selected).toEqual(['settings']);
    await expect.poll(() => settings).toBe(1);
    await expect(page.getByRole('navigation', {name: 'Main navigation'})).toHaveCount(0);
});
test('SidenavBar mobile keeps the panel open when the user presses a parent item', async ({mount, page}) => {
    const selected: Array<string> = [];

    await mount('sidenav-bar-mobile/Scenario11', {
        onSelectedItemIdChange: (id: string) => {
            selected.push(id);
        },
    });
    await page.getByRole('button', {name: 'Open navigation menu', exact: true}).click();
    await expect(page.getByRole('navigation', {name: 'Main navigation', exact: true})).toBeVisible();
    await page.getByRole('button', {name: 'Projects'}).click();
    expect(selected).toEqual([]);
    await expect(page.getByRole('navigation', {name: 'Main navigation'})).toHaveCount(1);
});
test('SidenavBar mobile marks the selected item for a screen reader only', async ({mount, page}) => {
    const selected: Array<string> = [];

    await mount('sidenav-bar-mobile/Scenario12', {
        onSelectedItemIdChange: (id: string) => {
            selected.push(id);
        },
    });
    await page.getByRole('button', {name: 'Open navigation menu', exact: true}).click();
    await expect(page.getByRole('navigation', {name: 'Main navigation', exact: true})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Home'})).toHaveAttribute('aria-current', 'page');
    await expect(page.getByRole('link', {name: 'Dashboard'})).not.toHaveAttribute('aria-current');
});
test('SidenavBar mobile closes the panel from the burger', async ({mount, page}) => {
    const selected: Array<string> = [];

    await mount('sidenav-bar-mobile/Scenario13', {
        onSelectedItemIdChange: (id: string) => {
            selected.push(id);
        },
    });
    await page.getByRole('button', {name: 'Open navigation menu', exact: true}).click();
    await expect(page.getByRole('navigation', {name: 'Main navigation', exact: true})).toBeVisible();
    await page.getByRole('button', {name: 'Close navigation menu'}).click();
    await expect(page.getByRole('navigation', {name: 'Main navigation'})).toHaveCount(0);
});
