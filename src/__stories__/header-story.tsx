import * as React from 'react';
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

const FieldWithCheckbox: React.FC = ({children}) => (
    <div style={{display: 'flex', alignItems: 'center'}}>{children}</div>
);

export const Default: StoryComponent = () => {
    const [pretitle, pretitleTextField] = useTextField('pretitle', 'Your last bill');
    const [title, titleTextField] = useTextField('title', 'December bill is now available');
    const [preamount, preamountTextField] = useTextField('preamount', 'Monthly fee (IVA included)');
    const [amount, amountTextField] = useTextField('amount', '60,44 €');
    const [buttonLabel, buttonLabelTextField] = useTextField('button', 'Download bill');
    const [secondaryButtonLabel, secondaryButtonLabelTextField] = useTextField('secondaryButton', 'Pay bill');
    const [subtitle, subtitleTextField] = useTextField('subtitle', 'This is a subtitle');
    const [isInverse, inverseCheckbox] = useCheckbox('Inverse', true);
    const [isErrorAmount, errorAmountCheckbox] = useCheckbox('Error amount', false);
    const [withExtraContent, extraContentCheckbox] = useCheckbox('With extra content', true);
    const [extraSideBySide, extraSideBySideCheckbox] = useCheckbox(
        'Extra content placed on the right in desktop',
        true
    );
    const [withBreadcrumbs, breadcrumbsCheckbox] = useCheckbox('With breadcrumbs', true);
    return (
        <>
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
        </>
    );
};

Default.story = {name: 'Header'};
