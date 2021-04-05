import * as React from 'react';
import {
    Header,
    HeaderLayout,
    ButtonPrimary,
    ButtonSecondary,
    Stack,
    NavigationBreadcrumbs,
    ResponsiveLayout,
    Text3,
} from '..';
import {useTextField, useCheckbox} from './helpers';

export default {
    title: 'Components/Headers/Header',
    parameters: {
        fullScreen: true,
    },
};

const FieldWithCheckbox: React.FC = ({children}) => (
    <div style={{display: 'flex', alignItems: 'center'}}>{children}</div>
);

export const Default: StoryComponent = () => {
    const [pretitle, pretitleTextField] = useTextField('Pretitle', 'Your last bill');
    const [title, titleTextField] = useTextField('Title', 'December bill is now available');
    const [preamount, preamountTextField] = useTextField('Pretitle', 'Monthly fee (IVA included)');
    const [amount, amountTextField] = useTextField('Amount', '60,44 €');
    const [buttonLabel, buttonLabelTextField] = useTextField('Button', 'Download bill');
    const [secondaryButtonLabel, secondaryButtonLabelTextField] = useTextField('SecondaryButton', 'Pay bill');
    const [subtitle, subtitleTextField] = useTextField('Subtitle', 'This is a subtitle');
    const [isInverse, inverseCheckbox] = useCheckbox('Inverse', true);
    const [isErrorAmount, errorAmountCheckbox] = useCheckbox('Error amount', false);
    const [withExtraContent, extraContentCheckbox] = useCheckbox('With extra content', true);
    const [extraSideBySide, extraSideBySideCheckbox] = useCheckbox(
        'Extra content placed on the right in desktop',
        true
    );
    const [withBreadcrumbs, breadcrumbsCheckbox] = useCheckbox('With breadcrumbs (desktop only)', true);
    return (
        <Stack space={16}>
            <div data-testid="header-layout">
                <HeaderLayout
                    isInverse={isInverse}
                    sideBySideExtraOnDesktop={extraSideBySide}
                    breadcrumbs={
                        withBreadcrumbs ? (
                            <NavigationBreadcrumbs
                                title="Bills"
                                breadcrumbs={[{title: 'Account', url: '/consumptions'}]}
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
                    extra={
                        withExtraContent ? (
                            <Text3 regular>some account chart here, for example</Text3>
                        ) : undefined
                    }
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
    );
};

Default.storyName = 'Header';

export const RichTexts: StoryComponent = () => {
    const filler = ' - more text'.repeat(20);
    return (
        <div data-testid="header-layout">
            <HeaderLayout
                header={
                    <Header
                        pretitle={{
                            text: `Pretitle (truncated to one line) ${filler}}`,
                            truncate: true,
                        }}
                        title="Title is always a plain string"
                        subtitle={{
                            text: `Subtitle (truncated to two lines) ${filler}}`,
                            truncate: 2,
                        }}
                    />
                }
            />
        </div>
    );
};
