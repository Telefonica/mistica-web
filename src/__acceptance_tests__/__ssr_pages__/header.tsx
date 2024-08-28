import * as React from 'react';
import {
    HeaderLayout,
    Header,
    MainSectionHeaderLayout,
    MainSectionHeader,
    ButtonPrimary,
    Stack,
    Placeholder,
} from '../../..';

const HeaderTest = (): JSX.Element => (
    <Stack space={8}>
        <HeaderLayout
            header={<Header title="La última factura de diciembre ya esta disponible" />}
            extra={<Placeholder />}
        />
        <MainSectionHeaderLayout>
            <MainSectionHeader
                title="Soporte"
                description="¿En qué podemos ayudarte?"
                button={<ButtonPrimary href="asdf">Acción</ButtonPrimary>}
            />
        </MainSectionHeaderLayout>
    </Stack>
);

export default HeaderTest;
