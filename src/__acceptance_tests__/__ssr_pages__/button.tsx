import * as React from 'react';
import {ButtonPrimary, ButtonSecondary, ButtonLink, ButtonDanger, ButtonLayout, Stack} from '../../..';

const ButtonTest = (): JSX.Element => (
    <Stack space={8}>
        <ButtonLayout
            primaryButton={<ButtonPrimary href="https://google.com">Primary</ButtonPrimary>}
            secondaryButton={<ButtonSecondary href="https://google.com">Secondary</ButtonSecondary>}
        />

        <ButtonLayout
            primaryButton={<ButtonDanger href="https://google.com">Danger</ButtonDanger>}
            secondaryButton={<ButtonSecondary href="https://google.com">Secondary</ButtonSecondary>}
        />

        <ButtonLayout
            link={<ButtonLink to="https://google.com">Link</ButtonLink>}
            primaryButton={<ButtonPrimary href="https://google.com">Primary</ButtonPrimary>}
            secondaryButton={<ButtonSecondary href="https://google.com">Secondary</ButtonSecondary>}
        />
    </Stack>
);

export default ButtonTest;
