import * as React from 'react';
import {ButtonPrimary, ButtonSecondary, ButtonLink, ButtonDanger, ButtonLayout, Stack} from '../..';

const ButtonTest: React.FC = () => (
    <Stack space={8}>
        <ButtonLayout>
            <ButtonPrimary href="https://google.com">Primary</ButtonPrimary>
            <ButtonSecondary href="https://google.com">Secondary</ButtonSecondary>
        </ButtonLayout>

        <ButtonLayout>
            <ButtonDanger href="https://google.com">Danger</ButtonDanger>
            <ButtonSecondary href="https://google.com">Secondary</ButtonSecondary>
        </ButtonLayout>

        <ButtonLayout link={<ButtonLink to="https://google.com">Link</ButtonLink>}>
            <ButtonPrimary href="https://google.com">Primary</ButtonPrimary>
            <ButtonSecondary href="https://google.com">Secondary</ButtonSecondary>
        </ButtonLayout>
    </Stack>
);

export default ButtonTest;
