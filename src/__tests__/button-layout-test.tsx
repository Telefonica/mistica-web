import * as React from 'react';
import {ButtonPrimary, ButtonSecondary} from '../button';
import ButtonLayout from '../button-layout';
import {render, screen} from '@testing-library/react';

test('One button is rendered', () => {
    render(
        <ButtonLayout withMargins>
            <ButtonPrimary onPress={() => {}}>Button1</ButtonPrimary>
        </ButtonLayout>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
});

test('Two buttons are rendered', () => {
    render(
        <ButtonLayout withMargins>
            <ButtonPrimary onPress={() => {}}>Button1</ButtonPrimary>
            <ButtonSecondary onPress={() => {}}>Button2</ButtonSecondary>
        </ButtonLayout>
    );

    expect(screen.queryAllByRole('button')).toHaveLength(2);
});
