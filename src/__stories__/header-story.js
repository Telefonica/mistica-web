// @flow
import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {Header, HeaderLayout, Box, ButtonPrimary, Stack, NavigationBreadcrumbs, ResponsiveLayout} from '..';
import {useTextField, useCheckbox} from './helpers';

export default {
    title: 'Components|Headers/Header',
    parameters: {
        fullScreen: true,
    },
};

const FieldWithCheckbox = ({children}: {children: React.Node}) => (
    <div style={{display: 'flex', alignItems: 'center'}}>{children}</div>
);

export const Default = (): React.Node => {
    const [pretitle, pretitleTextField] = useTextField('pretitle', 'Factura de diciembre');
    const [title, titleTextField] = useTextField(
        'title',
        'La última factura de diciembre ya esta disponible'
    );
    const [preamount, preamountTextField] = useTextField('preamount', 'Cuota mensual (IVA incluido)');
    const [amount, amountTextField] = useTextField('amount', '60,44 €');
    const [buttonLabel, buttonLabelTextField] = useTextField('buttonLabel', 'Descargar factura');
    const [subtitle, subtitleTextField] = useTextField('subtitle', 'Y esto es un subtitulo');
    const [isInverse, inverseCheckbox] = useCheckbox('Inverse', true);
    const [isErrorAmount, errorAmountCheckbox] = useCheckbox('Error amount', false);
    const [withExtraContent, extraContentCheckbox] = useCheckbox('With secondary content', true);
    const [withBreadcrumbs, breadcrumbsCheckbox] = useCheckbox('With breadcrumbs', true);
    return (
        <MemoryRouter>
            <Stack space={16}>
                <div data-testid="header-layout">
                    <HeaderLayout
                        isInverse={isInverse}
                        breadcrumbs={
                            withBreadcrumbs ? (
                                <NavigationBreadcrumbs
                                    title="Facturas"
                                    breadcrumbs={[{title: 'Cuenta', url: '/consumptions'}]}
                                />
                            ) : undefined
                        }
                        header={
                            <Header
                                pretitle={pretitle}
                                title={title}
                                preamount={preamount}
                                amount={amount}
                                button={
                                    buttonLabel ? (
                                        <ButtonPrimary href="asdf">{buttonLabel}</ButtonPrimary>
                                    ) : undefined
                                }
                                subtitle={subtitle}
                                isErrorAmount={isErrorAmount}
                            />
                        }
                        extra={withExtraContent ? <Box>some account chart here, for example</Box> : undefined}
                    />
                </div>
                <ResponsiveLayout>
                    <Stack space={16}>
                        {breadcrumbsCheckbox}
                        {pretitleTextField}
                        {titleTextField}
                        {preamountTextField}
                        <FieldWithCheckbox>
                            {amountTextField}
                            {errorAmountCheckbox}
                        </FieldWithCheckbox>
                        {buttonLabelTextField}
                        {subtitleTextField}
                        {inverseCheckbox}
                        {extraContentCheckbox}
                    </Stack>
                </ResponsiveLayout>
            </Stack>
        </MemoryRouter>
    );
};

Default.story = {name: 'Header'};
