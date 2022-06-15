import * as React from 'react';
import {
    Form,
    ButtonFixedFooterLayout,
    ButtonPrimary,
    ButtonLink,
    Tabs,
    Box,
    ResponsiveLayout,
    Stack,
    Text6,
    Text3,
    TextField,
    PasswordField,
    useTheme,
    TextLink,
} from '@telefonica/mistica';

const App = () => {
    const [tabIndex, setTabIndex] = React.useState(0);
    const {colors} = useTheme();
    return (
        <Form
            onSubmit={(formData) => {
                alert({
                    title: 'Form data',
                    message: JSON.stringify(formData, null, 2),
                });
            }}
        >
            <ButtonFixedFooterLayout
                button={<ButtonPrimary submit>Continuar</ButtonPrimary>}
                link={<ButtonLink onPress={() => {}}>Not a customer yet? register now!</ButtonLink>}
            >
                <Tabs
                    selectedIndex={tabIndex}
                    onChange={setTabIndex}
                    tabs={[{text: 'Password'}, {text: 'Phone number'}]}
                />
                <Box paddingY={24}>
                    <ResponsiveLayout>
                        {tabIndex === 0 ? (
                            <Stack space={16}>
                                <Text6>This is a title</Text6>
                                <Text3 regular color={colors.textSecondary}>
                                    Subtitle text, write here an explanation of what the user has to do.
                                </Text3>
                                <TextField name="user" label="User" />
                                <PasswordField name="password" label="Password" helperText="Helper text" />
                                <TextLink href="#">I’m having problems with my password</TextLink>
                            </Stack>
                        ) : (
                            <Stack space={16}>
                                <Text6>This is a title</Text6>
                                <Text3 regular color={colors.textSecondary}>
                                    Introduce your phone number below.
                                </Text3>
                                <TextField name="phone" label="Phone number" prefix="+34" />

                                <ButtonLink aligned onPress={() => {}}>
                                    I’m having access problems
                                </ButtonLink>
                            </Stack>
                        )}
                    </ResponsiveLayout>
                </Box>
            </ButtonFixedFooterLayout>
        </Form>
    );
};

export default App;
