import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {ThemeContextProvider, Table, IconLightningRegular} from '..';
import {makeTheme} from './test-utils';
import userEvent from '@testing-library/user-event';

test('Row actions in collapsed-rows mode are accessible', async () => {
    const firstActionClickSpy = jest.fn();
    const secondActionClickSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Table
                responsive="collapse-rows"
                content={[
                    {
                        cells: ['Slice of pizza'],
                        actions: [
                            {Icon: IconLightningRegular, onPress: firstActionClickSpy, label: 'action 1'},
                            {Icon: IconLightningRegular, onPress: secondActionClickSpy, label: 'action 2'},
                        ],
                    },
                ]}
            />
        </ThemeContextProvider>
    );

    await userEvent.click(await screen.findByRole('button', {name: 'action 1'}));
    await userEvent.click(await screen.findByRole('button', {name: 'action 2'}));

    expect(firstActionClickSpy).toHaveBeenCalledTimes(1);
    expect(secondActionClickSpy).toHaveBeenCalledTimes(1);
});
