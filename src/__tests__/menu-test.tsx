import * as React from 'react';
import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import {ThemeContextProvider, Touchable, Text3} from '..';
import Menu from '../menu';
import {makeTheme} from './test-utils';

const options = [
    {
        text: 'Option 1',
        value: 'option1',
    },
    {
        text: 'Option 2',
        value: 'option2',
    },
    {
        text: 'Option 3',
        value: 'option3',
    },
];

test('close option', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Menu
                width={400}
                renderTarget={({ref, onPress, isMenuOpen}) => (
                    <Touchable elementRef={ref} onPress={onPress}>
                        <Text3 regular>{isMenuOpen ? 'menu is open' : 'menu is close'}</Text3>
                    </Touchable>
                )}
                renderMenu={({ref, className, close}) => (
                    <div ref={ref} className={className}>
                        {options.map((option) => (
                            <Touchable
                                key={option.value}
                                onPress={() => {
                                    if (option.value === 'option3') {
                                        close();
                                    }
                                }}
                            >
                                {option.text}
                            </Touchable>
                        ))}
                    </div>
                )}
            />
        </ThemeContextProvider>
    );

    expect(screen.getByText('menu is close')).toBeInTheDocument();

    userEvent.click(screen.getByText('menu is close'));

    expect(screen.getByText('menu is open')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();

    userEvent.click(screen.getByText('Option 1'));

    expect(screen.getByText('menu is open')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();

    userEvent.click(screen.getByText('Option 3'));

    expect(screen.getByText('menu is close')).toBeInTheDocument();
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
});
