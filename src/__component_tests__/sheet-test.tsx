import {test, expect} from '../test-utils/component';

test('Sheet', async ({mount, page}) => {
    await mount('sheet/Scenario1', {});
    const openButton = page.getByRole('button', {name: 'Open', exact: true});
    await openButton.click();
    const sheet = await page.getByRole('dialog', {name: 'Sheet title', exact: true});
    await expect(sheet).toHaveCount(1);
    const closeButton = await sheet.getByRole('button', {name: 'Close', exact: true});
    await closeButton.click();
    await expect(sheet).toHaveCount(0);
});
test('Sheet restores focus to the trigger when closed', async ({mount, page}) => {
    await mount('sheet/Scenario2', {});
    const openButton = page.getByRole('button', {name: 'Open', exact: true});
    await openButton.focus();
    await page.keyboard.press('Enter');
    const sheet = await page.getByRole('dialog', {name: 'Sheet title', exact: true});
    const closeButton = await sheet.getByRole('button', {name: 'Close', exact: true});
    await closeButton.click();
    await expect(sheet).toHaveCount(0);
    await expect(openButton).toBeFocused();
});
test('RadioListSheet', async ({mount, page}) => {
    const selectSpyCalls: Array<Array<unknown>> = [];
    const selectSpy = (...args: Array<unknown>) => {
        selectSpyCalls.push(args);
    };
    await mount('sheet/Scenario3', {selectSpy});
    const openButton = page.getByRole('button', {name: 'Open', exact: true});
    await openButton.click();
    const sheet = await page.getByRole('dialog', {name: 'Choose an item', exact: true});
    await expect(sheet).toHaveCount(1);
    const item1 = await sheet.getByRole('radio', {name: 'Item 1', exact: true});
    const item2 = await sheet.getByRole('radio', {name: 'Item 2', exact: true});
    const continueButton = await sheet.getByRole('button', {name: 'Continuar', exact: true});
    await expect(item2).toBeChecked();
    await item1.click();
    await continueButton.click();
    await expect(sheet).toHaveCount(0);
    await expect.poll(() => selectSpyCalls).toContainEqual(['1']);
});
test('ActionsListSheet', async ({mount, page}) => {
    const selectSpyCalls: Array<Array<unknown>> = [];
    const selectSpy = (...args: Array<unknown>) => {
        selectSpyCalls.push(args);
    };
    await mount('sheet/Scenario4', {selectSpy});
    const openButton = page.getByRole('button', {name: 'Open', exact: true});
    await openButton.click();
    const sheet = await page.getByRole('dialog', {name: 'Choose an action', exact: true});
    await expect(sheet).toHaveCount(1);
    const action1 = await sheet.getByRole('button', {name: 'Action 1', exact: true});
    const action2 = await sheet.getByRole('button', {name: 'Action 2', exact: true});
    await expect(action1).toHaveCount(1);
    await expect(action2).toHaveCount(1);
    await action1.click();
    await expect(sheet).toHaveCount(0);
    await expect.poll(() => selectSpyCalls).toContainEqual(['1']);
});
test('InfoSheet', async ({mount, page}) => {
    await mount('sheet/Scenario5', {});
    const openButton = page.getByRole('button', {name: 'Open', exact: true});
    await openButton.click();
    const sheet = await page.getByRole('dialog', {name: 'Title', exact: true});
    await expect(sheet).toHaveCount(1);
    const title = await sheet.getByRole('heading', {name: 'Title', exact: true});
    await expect(title).toHaveCount(1);
    const subtitle = await sheet.getByText('Subtitle');
    await expect(subtitle).toHaveCount(1);
    const description = await sheet.getByText('Description');
    await expect(description).toHaveCount(1);
    const itemList = await sheet.getByRole('list');
    await expect(itemList).toHaveCount(1);
    const items = await itemList.getByRole('listitem');
    await expect(items).toHaveCount(2);
});
test('ActionsSheet', async ({mount, page}) => {
    const onPressButtonSpyCalls: Array<Array<unknown>> = [];
    const onPressButtonSpy = (...args: Array<unknown>) => {
        onPressButtonSpyCalls.push(args);
    };
    await mount('sheet/Scenario6', {onPressButtonSpy});
    const openDialog = async () => {
        const openButton = page.getByRole('button', {name: 'Open', exact: true});
        await openButton.click();
        return await page.getByRole('dialog', {name: 'Title', exact: true});
    };
    const sheet = await openDialog();
    await expect(sheet).toHaveCount(1);
    const primary = await sheet.getByRole('button', {name: 'Button', exact: true});
    const secondary = await sheet.getByRole('button', {name: 'Secondary button', exact: true});
    const link = await sheet.getByRole('button', {name: 'Button link', exact: true});
    await expect(primary).toHaveCount(1);
    await expect(secondary).toHaveCount(1);
    await expect(link).toHaveCount(1);
    await secondary.click();
    await expect(sheet).toHaveCount(0);
    await expect.poll(() => onPressButtonSpyCalls).toContainEqual(['SECONDARY']);
});
test('showSheet INFO', async ({mount, page}) => {
    const resultSpyCalls: Array<Array<unknown>> = [];
    const resultSpy = (...args: Array<unknown>) => {
        resultSpyCalls.push(args);
    };
    await mount('sheet/Scenario7', {resultSpy});
    await page.getByRole('button', {name: 'Open sheet', exact: true}).click();
    const sheet = await page.getByRole('dialog', {name: 'Title', exact: true});
    await expect(sheet).toHaveCount(1);
    const closeButton = await page.getByRole('button', {name: 'Cerrar', exact: true});
    await closeButton.click();
    await expect(sheet).toHaveCount(0);
    await expect.poll(() => resultSpyCalls).toContainEqual([{action: 'DISMISS'}]);
});
test('showSheet ACTIONS_LIST', async ({mount, page}) => {
    const resultSpyCalls: Array<Array<unknown>> = [];
    const resultSpy = (...args: Array<unknown>) => {
        resultSpyCalls.push(args);
    };
    await mount('sheet/Scenario8', {resultSpy});
    await page.getByRole('button', {name: 'Open sheet', exact: true}).click();
    const sheet = await page.getByRole('dialog', {name: 'Title', exact: true});
    await expect(sheet).toHaveCount(1);
    const item1 = await page.getByRole('button', {name: 'Item 2', exact: true});
    await item1.click();
    await expect(sheet).toHaveCount(0);
    await expect.poll(() => resultSpyCalls).toContainEqual([{action: 'SUBMIT', selectedId: '2'}]);
});
test('showSheet ACTIONS_LIST dismiss', async ({mount, page}) => {
    const resultSpyCalls: Array<Array<unknown>> = [];
    const resultSpy = (...args: Array<unknown>) => {
        resultSpyCalls.push(args);
    };
    await mount('sheet/Scenario9', {resultSpy});
    await page.getByRole('button', {name: 'Open sheet', exact: true}).click();
    const sheet = await page.getByRole('dialog', {name: 'Title', exact: true});
    await expect(sheet).toHaveCount(1);
    const closeButton = await page.getByRole('button', {name: 'Cerrar', exact: true});
    await closeButton.click();
    await expect(sheet).toHaveCount(0);
    await expect.poll(() => resultSpyCalls).toContainEqual([{action: 'DISMISS'}]);
});
test('showSheet RADIO_LIST', async ({mount, page}) => {
    const resultSpyCalls: Array<Array<unknown>> = [];
    const resultSpy = (...args: Array<unknown>) => {
        resultSpyCalls.push(args);
    };
    await mount('sheet/Scenario10', {resultSpy});
    await page.getByRole('button', {name: 'Open sheet', exact: true}).click();
    const sheet = await page.getByRole('dialog', {name: 'Title', exact: true});
    await expect(sheet).toHaveCount(1);
    const item1 = await page.getByRole('radio', {name: 'Item 2', exact: true});
    const continueButton = await page.getByRole('button', {name: 'Continuar', exact: true});
    await item1.click();
    await continueButton.click();
    await expect(sheet).toHaveCount(0);
    await expect.poll(() => resultSpyCalls).toContainEqual([{action: 'SUBMIT', selectedId: '2'}]);
});
test('showSheet RADIO_LIST dismiss', async ({mount, page}) => {
    const resultSpyCalls: Array<Array<unknown>> = [];
    const resultSpy = (...args: Array<unknown>) => {
        resultSpyCalls.push(args);
    };
    await mount('sheet/Scenario11', {resultSpy});
    await page.getByRole('button', {name: 'Open sheet', exact: true}).click();
    const sheet = await page.getByRole('dialog', {name: 'Title', exact: true});
    await expect(sheet).toHaveCount(1);
    const closeButton = await page.getByRole('button', {name: 'Cerrar', exact: true});
    await closeButton.click();
    await expect(sheet).toHaveCount(0);
    await expect.poll(() => resultSpyCalls).toContainEqual([{action: 'DISMISS'}]);
});
test('showSheet ACTIONS', async ({mount, page}) => {
    const resultSpyCalls: Array<Array<unknown>> = [];
    const resultSpy = (...args: Array<unknown>) => {
        resultSpyCalls.push(args);
    };
    await mount('sheet/Scenario12', {resultSpy});
    await page.getByRole('button', {name: 'Open sheet', exact: true}).click();
    const sheet = await page.getByRole('dialog', {name: 'Title', exact: true});
    await expect(sheet).toHaveCount(1);
    const primary = await page.getByRole('button', {name: 'Button', exact: true});
    const secondary = await page.getByRole('button', {name: 'Secondary button', exact: true});
    const link = await page.getByRole('button', {name: 'Button link', exact: true});
    await expect(primary).toHaveCount(1);
    await expect(secondary).toHaveCount(1);
    await expect(link).toHaveCount(1);
    await link.click();
    await expect(sheet).toHaveCount(0);
    await expect.poll(() => resultSpyCalls).toContainEqual([{action: 'LINK'}]);
});
test('showSheet ACTIONS dismiss', async ({mount, page}) => {
    const resultSpyCalls: Array<Array<unknown>> = [];
    const resultSpy = (...args: Array<unknown>) => {
        resultSpyCalls.push(args);
    };
    await mount('sheet/Scenario13', {resultSpy});
    await page.getByRole('button', {name: 'Open sheet', exact: true}).click();
    const sheet = await page.getByRole('dialog', {name: 'Title', exact: true});
    await expect(sheet).toHaveCount(1);
    const closeButton = await page.getByRole('button', {name: 'Cerrar', exact: true});
    await closeButton.click();
    await expect(sheet).toHaveCount(0);
    await expect.poll(() => resultSpyCalls).toContainEqual([{action: 'DISMISS'}]);
});
test('showSheet with native implementation INFO', async ({mount, page}) => {
    const resultSpyCalls: Array<Array<unknown>> = [];
    const resultSpy = (...args: Array<unknown>) => {
        resultSpyCalls.push(args);
    };
    const nativeImplementationCalls: Array<Array<unknown>> = [];
    const nativeImplementation = (...args: Array<unknown>) => {
        nativeImplementationCalls.push(args);
        return (() => Promise.resolve({action: 'DISMISS' as const, result: []}))();
    };
    await mount('sheet/Scenario14', {resultSpy, nativeImplementation});
    await page.getByRole('button', {name: 'Open sheet', exact: true}).click();
    await expect
        .poll(() => nativeImplementationCalls)
        .toContainEqual([
            {
                title: 'Title',
                content: [
                    {
                        type: 'LIST',
                        id: 'list-0',
                        listType: 'INFORMATIVE',
                        autoSubmit: false,
                        selectedIds: [],
                        items: [{id: '1', title: 'Item 1', icon: {type: 'bullet'}}],
                    },
                ],
            },
        ]);
    await expect.poll(() => resultSpyCalls.length).toBeGreaterThan(0);
});
test('showSheet with native implementation ACTIONS_LIST', async ({mount, page}) => {
    const resultSpyCalls: Array<Array<unknown>> = [];
    const resultSpy = (...args: Array<unknown>) => {
        resultSpyCalls.push(args);
    };
    const nativeImplementationCalls: Array<Array<unknown>> = [];
    const nativeImplementation = (...args: Array<unknown>) => {
        nativeImplementationCalls.push(args);
        return (() =>
            Promise.resolve({
                action: 'SUBMIT' as const,
                result: [{id: 'list-0', selectedIds: ['2']}],
            }))();
    };
    await mount('sheet/Scenario15', {resultSpy, nativeImplementation});
    await page.getByRole('button', {name: 'Open sheet', exact: true}).click();
    await expect
        .poll(() => nativeImplementationCalls)
        .toContainEqual([
            {
                title: 'Title',
                content: [
                    {
                        type: 'LIST',
                        id: 'list-0',
                        listType: 'ACTIONS',
                        autoSubmit: true,
                        selectedIds: [],
                        items: [
                            {id: '1', title: 'Item 1'},
                            {id: '2', title: 'Item 2'},
                        ],
                    },
                ],
            },
        ]);
    await expect.poll(() => resultSpyCalls).toContainEqual([{action: 'SUBMIT', selectedId: '2'}]);
});
test('showSheet with native implementation RADIO_LIST', async ({mount, page}) => {
    const resultSpyCalls: Array<Array<unknown>> = [];
    const resultSpy = (...args: Array<unknown>) => {
        resultSpyCalls.push(args);
    };
    const nativeImplementationCalls: Array<Array<unknown>> = [];
    const nativeImplementation = (...args: Array<unknown>) => {
        nativeImplementationCalls.push(args);
        return (() =>
            Promise.resolve({
                action: 'SUBMIT' as const,
                result: [{id: 'list-0', selectedIds: ['2']}],
            }))();
    };
    await mount('sheet/Scenario16', {resultSpy, nativeImplementation});
    await page.getByRole('button', {name: 'Open sheet', exact: true}).click();
    await expect
        .poll(() => nativeImplementationCalls)
        .toContainEqual([
            {
                title: 'Title',
                content: [
                    {
                        type: 'LIST',
                        id: 'list-0',
                        listType: 'SINGLE_SELECTION',
                        autoSubmit: true,
                        selectedIds: ['1'],
                        items: [
                            {id: '1', title: 'Item 1'},
                            {id: '2', title: 'Item 2'},
                        ],
                    },
                ],
            },
        ]);
    await expect.poll(() => resultSpyCalls).toContainEqual([{action: 'SUBMIT', selectedId: '2'}]);
});
test('showSheet with native implementation ACTIONS', async ({mount, page}) => {
    const resultSpyCalls: Array<Array<unknown>> = [];
    const resultSpy = (...args: Array<unknown>) => {
        resultSpyCalls.push(args);
    };
    const nativeImplementationCalls: Array<Array<unknown>> = [];
    const nativeImplementation = (...args: Array<unknown>) => {
        nativeImplementationCalls.push(args);
        return (() =>
            Promise.resolve({
                action: 'SUBMIT' as const,
                result: [{id: 'bottom-actions-0', selectedIds: ['LINK']}],
            }))();
    };
    await mount('sheet/Scenario17', {resultSpy, nativeImplementation});
    await page.getByRole('button', {name: 'Open sheet', exact: true}).click();
    await expect
        .poll(() => nativeImplementationCalls)
        .toContainEqual([
            {
                title: 'Title',
                subtitle: 'Subtitle',
                description: 'Description',
                content: [
                    {
                        type: 'BOTTOM_ACTIONS',
                        id: 'bottom-actions-0',
                        button: {text: 'Button'},
                        secondaryButton: {text: 'Secondary button'},
                        link: {text: 'Button link', withChevron: true},
                    },
                ],
            },
        ]);
    await expect.poll(() => resultSpyCalls).toContainEqual([{action: 'LINK'}]);
});
test('showSheet with native implementation fallbacks to web if native fails', async ({mount, page}) => {
    const nativeImplementationCalls: Array<Array<unknown>> = [];
    const nativeImplementation = (...args: Array<unknown>) => {
        nativeImplementationCalls.push(args);
        return (() =>
            Promise.reject({
                code: '400',
            }))();
    };
    const resultSpyCalls: Array<Array<unknown>> = [];
    const resultSpy = (...args: Array<unknown>) => {
        resultSpyCalls.push(args);
    };
    await mount('sheet/Scenario18', {nativeImplementation, resultSpy});
    await page.getByRole('button', {name: 'Open sheet', exact: true}).click();
    await expect.poll(() => nativeImplementationCalls.length).toBeGreaterThan(0);
    const sheet = await page.getByRole('dialog', {name: 'Title', exact: true});
    await expect(sheet).toHaveCount(1);
    const link = await page.getByRole('button', {name: 'Button link', exact: true});
    await link.click();
    await expect(sheet).toHaveCount(0);
    await expect.poll(() => resultSpyCalls).toContainEqual([{action: 'LINK'}]);
});
for (const mounted of [false, true])
    test(
        mounted
            ? 'showSheet fails if there is already a sheet open'
            : 'showSheet fails if SheetRoot is not rendered',
        async ({mount, page}) => {
            const component = await mount('sheet/Invalid', {mounted});
            const open = component.getByRole('button', {name: 'Open sheet'});
            await open.click();
            if (mounted) {
                await expect(page.getByRole('dialog', {name: 'Title'})).toBeVisible();
                await open.dispatchEvent('click');
            }
            await expect(component.getByTestId('sheet-error')).toHaveValue(
                mounted
                    ? 'Tried to show a Sheet but there is already one open'
                    : 'Tried to show a Sheet but the SheetRoot component was not mounted'
            );
            if (mounted) {
                await page.getByRole('button', {name: 'Cerrar'}).click();
                await expect(page.getByRole('dialog', {name: 'Title'})).toHaveCount(0);
            }
        }
    );
