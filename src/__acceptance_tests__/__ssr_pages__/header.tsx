import * as React from 'react';
import {
    HeaderLayout,
    Header,
    MainSectionHeaderLayout,
    MainSectionHeader,
    ButtonPrimary,
    Stack,
    Text3,
    Text8,
    skinVars,
} from '../../..';

const HeaderTest = (): JSX.Element => (
    <Stack space={8}>
        <HeaderLayout
            header={<Header title="La última factura de diciembre ya esta disponible" />}
            extra={
                <Stack space={16}>
                    <Stack space={8}>
                        <Text3 regular color={skinVars.colors.textPrimary}>
                            Cuota mensual (IVA incluido)
                        </Text3>
                        <Text8 color={skinVars.colors.textPrimary}>60,44 €</Text8>
                    </Stack>

                    <ButtonPrimary href="asdf">Descargar factura</ButtonPrimary>
                    <Text3 regular>Y esto es un subtitulo</Text3>
                </Stack>
            }
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
