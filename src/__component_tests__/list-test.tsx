import {test, expect} from '../test-utils/component';

test('RowList has a list role by default', async ({mount}) => {
    const component = await mount('list/Scenario1', {});
    const list = component.getByRole('list');
    await expect(list).toHaveCount(1);
    const items = component.getByRole('listitem');
    await expect(items).toHaveCount(2);
});
test('BoxedRowList has a list role by default', async ({mount}) => {
    const component = await mount('list/Scenario2', {});
    const list = component.getByRole('list');
    await expect(list).toHaveCount(1);
    const items = component.getByRole('listitem');
    await expect(items).toHaveCount(2);
});
test('BoxedRow updates its selected state from custom right content', async ({mount}) => {
    const component = await mount('list/Scenario3', {});
    await expect(component.getByText('Unselected')).toHaveCount(1);
    await component.getByRole('button', {name: 'Unselected'}).click();
    await expect(component.getByText('Selected')).toHaveCount(1);
});
test('BoxedRow follows checkbox state with an onPress action', async ({mount}) => {
    const onPressCalls: Array<Array<unknown>> = [];
    const onPress = async (...args: Array<unknown>) => {
        onPressCalls.push(args);
    };
    const component = await mount('list/Scenario4', {onPress});
    const checkbox = component.getByRole('checkbox', {name: 'Title'});
    await checkbox.click();
    await expect(checkbox).toBeChecked();
    expect(onPressCalls).toEqual([]);
    await checkbox.click();
    await expect(checkbox).not.toBeChecked();
});
test('Row which navigates', async ({mount}) => {
    const component = await mount('list/Scenario5', {});
    const anchor = component.getByRole('link');
    await expect(anchor).toHaveCount(1);
    await expect(anchor).toHaveAttribute('href', '/some/url');
});
test('Row as a button', async ({mount}) => {
    const spyCalls: Array<Array<unknown>> = [];
    const spy = async (...args: Array<unknown>) => {
        spyCalls.push(args);
    };
    const component = await mount('list/Scenario6', {spy});
    const button = component.getByRole('button', {name: 'Title'});
    await expect(button).toHaveCount(1);
    await button.click();
    await expect.poll(() => spyCalls.length).toBeGreaterThan(0);
});
test('Row, keeping its listitem role, containing a button reporting link role', async ({mount}) => {
    const spyCalls: Array<Array<unknown>> = [];
    const spy = async (...args: Array<unknown>) => {
        spyCalls.push(args);
    };
    const component = await mount('list/Scenario7', {spy});
    const rowDiv = component.getByRole('listitem');
    await expect(rowDiv).toHaveCount(1);
    const button = rowDiv.getByRole('link', {name: 'Title'});
    await expect(button).toHaveCount(1);
    await expect(component.getByTestId('content-container')).toHaveAttribute('aria-hidden', 'true');
    await button.click();
    await expect.poll(() => spyCalls.length).toBeGreaterThan(0);
});
test('Row with switch', async ({mount}) => {
    const spyOnChangeCalls: Array<Array<unknown>> = [];
    const spyOnChange = async (...args: Array<unknown>) => {
        spyOnChangeCalls.push(args);
    };
    const component = await mount('list/Scenario8', {spyOnChange});
    const switchEl = component.getByRole('switch', {name: 'Title'});
    await expect(switchEl).not.toBeChecked();
    await switchEl.click();
    await expect(switchEl).toBeChecked();
    await expect.poll(() => spyOnChangeCalls).toContainEqual([true]);
    await switchEl.click();
    await expect.poll(() => spyOnChangeCalls).toContainEqual([false]);
});
test('Row with checkbox', async ({mount}) => {
    const spyOnChangeCalls: Array<Array<unknown>> = [];
    const spyOnChange = async (...args: Array<unknown>) => {
        spyOnChangeCalls.push(args);
    };
    const component = await mount('list/Scenario9', {spyOnChange});
    const checkboxEl = component.getByRole('checkbox', {name: 'Title'});
    await expect(checkboxEl).not.toBeChecked();
    await checkboxEl.click();
    await expect(checkboxEl).toBeChecked();
    await expect.poll(() => spyOnChangeCalls).toContainEqual([true]);
    await checkboxEl.click();
    await expect.poll(() => spyOnChangeCalls).toContainEqual([false]);
});
test('Row with custom right element', async ({mount}) => {
    const component = await mount('list/Scenario10', {});
    await expect(component.getByText('custom')).toHaveCount(1);
});
test('Row list with radio buttons', async ({mount}) => {
    const component = await mount('list/Scenario11', {});
    const radioBanana = component.getByRole('radio', {name: 'Banana bananabanana'});
    const radioApple = component.getByRole('radio', {name: 'Apple appleapple'});
    await expect(radioBanana).not.toBeChecked();
    await expect(radioApple).not.toBeChecked();
    await radioBanana.click();
    await expect(radioBanana).toBeChecked();
    await expect(radioApple).not.toBeChecked();
    await radioApple.click();
    await expect(radioBanana).not.toBeChecked();
    await expect(radioApple).toBeChecked();
});
test('RowList inside Form', async ({mount}) => {
    const submitSpyCalls: Array<Array<unknown>> = [];
    const submitSpy = async (...args: Array<unknown>) => {
        submitSpyCalls.push(args);
    };
    const component = await mount('list/Scenario12', {submitSpy});
    await component.getByRole('radio', {name: 'Banana'}).click();
    await component.getByRole('checkbox', {name: 'Checkbox 1'}).click();
    await component.getByRole('switch', {name: 'Switch 1'}).click();
    await component.getByRole('button', {name: 'Submit'}).click();
    await expect(component.getByRole('checkbox', {name: 'Checkbox 1'})).toBeChecked();
    await expect(component.getByRole('checkbox', {name: 'Checkbox 2'})).not.toBeChecked();
    await expect(component.getByRole('switch', {name: 'Switch 1'})).toBeChecked();
    await expect(component.getByRole('switch', {name: 'Switch 2'})).not.toBeChecked();
    await expect(component.getByRole('radio', {name: 'Banana'})).toBeChecked();
    await expect(component.getByRole('radio', {name: 'Apple'})).not.toBeChecked();

    await expect.poll(() => submitSpyCalls.length).toBeGreaterThan(0);
    await expect
        .poll(() => submitSpyCalls[0]?.[0])
        .toEqual({
            checkbox1: true,
            checkbox2: false,
            switch1: true,
            switch2: false,
            radio: 'banana',
        });
});
test('Row list with icon buttons', async ({mount}) => {
    const firstButtonSpyCalls: Array<Array<unknown>> = [];
    const firstButtonSpy = async (...args: Array<unknown>) => {
        firstButtonSpyCalls.push(args);
    };
    const secondButtonSpyCalls: Array<Array<unknown>> = [];
    const secondButtonSpy = async (...args: Array<unknown>) => {
        secondButtonSpyCalls.push(args);
    };
    const component = await mount('list/Scenario13', {firstButtonSpy, secondButtonSpy});
    const firstButton = component.getByRole('button', {name: 'first-button'});
    const secondButton = component.getByRole('button', {name: 'second-button'});
    await firstButton.click();
    await secondButton.click();
    await secondButton.click();
    await expect.poll(() => firstButtonSpyCalls).toHaveLength(1);
    await expect.poll(() => secondButtonSpyCalls).toHaveLength(2);
});
test('Row list with iconButton', async ({mount}) => {
    const onPressSpyCalls: Array<Array<unknown>> = [];
    const onPressSpy = async (...args: Array<unknown>) => {
        onPressSpyCalls.push(args);
    };
    const iconButtonOnPressSpyCalls: Array<Array<unknown>> = [];
    const iconButtonOnPressSpy = async (...args: Array<unknown>) => {
        iconButtonOnPressSpyCalls.push(args);
    };
    const logEventSpyCalls: Array<Array<unknown>> = [];
    const logEventSpy = async (...args: Array<unknown>) => {
        logEventSpyCalls.push(args);
    };
    const component = await mount('list/Scenario14', {onPressSpy, iconButtonOnPressSpy, logEventSpy});
    const rowButton = component.getByRole('button', {name: 'Title Description'});
    await rowButton.click();
    await expect.poll(() => onPressSpyCalls).toHaveLength(1);
    await expect.poll(() => logEventSpyCalls).toContainEqual([{name: 'row-tracking-event'}]);
    const iconButton = component.getByRole('button', {name: 'Remove'});
    await iconButton.click();
    await expect.poll(() => iconButtonOnPressSpyCalls).toHaveLength(1);
    await expect.poll(() => logEventSpyCalls).toContainEqual([{name: 'icon-button-tracking-event'}]);
});
test('BoxedRow, keeping its listitem role, containing a button reporting link role', async ({mount}) => {
    const spyCalls: Array<Array<unknown>> = [];
    const spy = async (...args: Array<unknown>) => {
        spyCalls.push(args);
    };
    const component = await mount('list/Scenario15', {spy});
    const rowDiv = component.getByRole('listitem');
    await expect(rowDiv).toHaveCount(1);
    const button = rowDiv.getByRole('link', {name: 'Title'});
    await expect(button).toHaveCount(1);
    await button.click();
    await expect.poll(() => spyCalls.length).toBeGreaterThan(0);
});
test('Text content is read by screen readers in the right order in Rows with link', async ({mount}) => {
    const component = await mount('list/Scenario16', {});
    const row = component.getByRole('link', {
        name: 'Title Headline Subtitle Description Extra line 1 Extra line 2 Detail right',
    });
    await expect(row).toHaveCount(1);
});
test('Text content is read by screen readers in the right order in Rows with button', async ({mount}) => {
    const component = await mount('list/Scenario17', {});
    const row = component.getByRole('button', {
        name: 'Title Headline Subtitle Description Extra line 1 Extra line 2 Detail right',
    });
    await expect(row).toHaveCount(1);
});
test('Text content is read by screen readers in the right order in Rows with checkbox', async ({mount}) => {
    const component = await mount('list/Scenario18', {});
    const row = component.getByRole('checkbox', {
        name: 'Title Headline Subtitle Description Extra line 1 Extra line 2 detail right',
    });
    await expect(row).toHaveCount(1);
});
test('Text content is read by screen readers in the right order in Rows with switch', async ({mount}) => {
    const component = await mount('list/Scenario19', {});
    const row = component.getByRole('switch', {
        name: 'Title Headline Subtitle Description Extra line 1 Extra line 2 detail right',
    });
    await expect(row).toHaveCount(1);
});
test('Text content is read by screen readers in the right order in Rows with radio', async ({mount}) => {
    const component = await mount('list/Scenario20', {});
    const row = component.getByRole('radio', {
        name: 'Title Headline Subtitle Description Extra line 1 Extra line 2 detail right',
    });
    await expect(row).toHaveCount(1);
});
test('aria-label is read by screen readers in informative rows', async ({mount}) => {
    const component = await mount('list/Scenario21', {});
    await expect(component.getByText('Some custom label')).toHaveCount(1);
});
test('RowList renders with small prop', async ({mount}) => {
    const component = await mount('list/Scenario22', {});
    await expect(component.getByTestId('title')).toHaveCount(1);
    await expect(component.getByTestId('description')).toHaveCount(1);
    await expect(component.getByTestId('subtitle')).toHaveCount(1);
});
test('BoxedRowList renders with small prop', async ({mount}) => {
    const component = await mount('list/Scenario23', {});
    await expect(component.getByTestId('title')).toHaveCount(1);
    await expect(component.getByTestId('description')).toHaveCount(1);
    await expect(component.getByTestId('subtitle')).toHaveCount(1);
});
test('RowList renders divider between rows', async ({mount}) => {
    const component = await mount('list/Scenario24', {});
    const rows = component.getByRole('listitem');
    await expect(rows).toHaveCount(2);
    await expect(rows.nth(0).getByTestId('row-divider')).toHaveCount(1);
});
test('dual-action divider has inline paddingLeft style for offset measurement', async ({mount}) => {
    const component = await mount('list/Scenario25', {});
    const rows = component.getByRole('listitem');
    const firstRow = rows.nth(0);
    const dualActionDivider = firstRow.getByTestId('row-divider-dual-action');
    const title = firstRow.getByTestId('title');
    const rowBounds = await firstRow.boundingBox();
    const titleBounds = await title.boundingBox();
    if (!rowBounds || !titleBounds) {
        throw new Error('Row and title must have visible bounds');
    }
    await expect
        .poll(() => dualActionDivider.evaluate((element) => (element as HTMLElement).style.paddingLeft))
        .toBe(`${titleBounds.x - rowBounds.x}px`);
});
test('interactive rows include visible avatar initials in their accessible name', async ({mount}) => {
    const component = await mount('list/Scenario26', {});
    await expect(component.getByRole('link', {name: 'MS Title Description'})).toHaveCount(1);
});
for (const kind of ['switch', 'checkbox', 'radioValue'])
    test(
        'Row with ' + kind + ' and onPress hides inner divider and renders outer dual-action divider',
        async ({mount}) => {
            const component = await mount('list/DualAction', {kind});
            const row = component.getByRole('listitem').first();
            await expect(row.getByTestId('row-divider')).toHaveCount(0);
            await expect(row.getByTestId('row-divider-dual-action')).toHaveCount(1);
        }
    );
