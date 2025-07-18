import * as React from 'react';
import {CoverCard} from '../card-cover';
import {makeTheme} from './test-utils';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import userEvent from '@testing-library/user-event';
import {ButtonPrimary, ButtonLink} from '../button';
import IconMobileDeviceRegular from '../generated/mistica-icons/icon-mobile-device-regular';
import IconStarFilled from '../generated/mistica-icons/icon-star-filled';
import IconStarRegular from '../generated/mistica-icons/icon-star-regular';

test('CoverCard tab order with video', async () => {
    // not implemented in jsdom
    HTMLMediaElement.prototype.load = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ButtonPrimary onPress={() => {}}>Click me</ButtonPrimary>
            <CoverCard
                videoSrc="https://example.com/image.jpg"
                aria-label="Datacard touchable"
                onClose={() => {}}
                closeButtonLabel="Close label"
                onPress={() => {}}
                topActions={[
                    {
                        Icon: IconMobileDeviceRegular,
                        onPress: () => alert('Icon pressed'),
                        label: 'Device Icon',
                    },
                    {
                        checkedProps: {Icon: IconStarFilled, label: 'Star Checked'},
                        uncheckedProps: {Icon: IconStarRegular, label: 'Star Unchecked'},
                        defaultChecked: true,
                        onChange: () => {},
                    },
                ]}
                showFooter
                buttonPrimary={
                    <ButtonPrimary onPress={() => {}} small>
                        Button Primary
                    </ButtonPrimary>
                }
                buttonLink={
                    <ButtonLink onPress={() => {}} small>
                        Button Link
                    </ButtonLink>
                }
                title="Title"
                description="Description"
            />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('button', {name: 'Click me'}));

    await userEvent.tab();
    expect(await screen.findByRole('button', {name: 'Pausar'})).toHaveFocus();

    await userEvent.tab();
    expect(await screen.findByRole('button', {name: 'Datacard touchable'})).toHaveFocus();

    await userEvent.tab();
    expect(await screen.findByRole('button', {name: 'Button Primary'})).toHaveFocus();

    await userEvent.tab();
    expect(await screen.findByRole('button', {name: 'Button Link'})).toHaveFocus();

    await userEvent.tab();
    expect(await screen.findByRole('button', {name: 'Device Icon'})).toHaveFocus();

    await userEvent.tab();
    expect(await screen.findByRole('button', {name: 'Star Checked'})).toHaveFocus();

    await userEvent.tab();
    expect(await screen.findByRole('button', {name: 'Close label'})).toHaveFocus();

    await userEvent.tab();
    // Outside the Card
    expect(document.body).toHaveFocus();
});
