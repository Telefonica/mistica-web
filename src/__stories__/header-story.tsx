// @flow
import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {
    Header,
    HeaderLayout,
    Box,
    ButtonPrimary,
    ButtonSecondary,
    Stack,
    NavigationBreadcrumbs,
    ResponsiveLayout,
} from '..';
import {useTextField, useCheckbox} from './helpers';

export default {
    title: 'Components|Headers/Header',
    parameters: {
        fullScreen: true,
    },
};

const FieldWithCheckbox = ({children}: {children: React.ReactNode}) => (
    <div style={{display: 'flex', alignItems: 'center'}}>{children}</div>
);

export const Default = (): React.ReactNode => {
    const [pretitle, pretitleTextField] = useTextField('pretitle', 'Factura de diciembre');
    const [title, titleTextField] = useTextField(
        'title',
        'La última factura de diciembre ya esta disponible'
    );
    const [preamount, preamountTextField] = useTextField('preamount', 'Cuota mensual (IVA incluido)');
    const [amount, amountTextField] = useTextField('amount', '60,44 €');
    const [buttonLabel, buttonLabelTextField] = useTextField('button', 'Descargar factura');
    const [secondaryButtonLabel, secondaryButtonLabelTextField] = useTextField(
        'secondaryButton',
        'Pagar factura'
    );
    const [subtitle, subtitleTextField] = useTextField('subtitle', 'Y esto es un subtitulo');
    const [isInverse, inverseCheckbox] = useCheckbox('Inverse', true);
    const [isErrorAmount, errorAmountCheckbox] = useCheckbox('Error amount', false);
    const [withExtraContent, extraContentCheckbox] = useCheckbox('With extra content', true);
    const [extraSideBySide, extraSideBySideCheckbox] = useCheckbox(
        'Extra content placed on the right in desktop',
        true
    );
    const [withBreadcrumbs, breadcrumbsCheckbox] = useCheckbox('With breadcrumbs', true);
    return (
        <MemoryRouter>
            <Stack space={16}>
                <div data-testid="header-layout">
                    <HeaderLayout
                        isInverse={isInverse}
                        sideBySideExtraOnDesktop={extraSideBySide}
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
                                secondaryButton={
                                    secondaryButtonLabel ? (
                                        <ButtonSecondary href="asdf">{secondaryButtonLabel}</ButtonSecondary>
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
                        {secondaryButtonLabelTextField}
                        {subtitleTextField}
                        {inverseCheckbox}
                        {extraContentCheckbox}
                        {extraSideBySideCheckbox}
                    </Stack>
                </ResponsiveLayout>
            </Stack>
        </MemoryRouter>
    );
};

Default.story = {name: 'Header'};
