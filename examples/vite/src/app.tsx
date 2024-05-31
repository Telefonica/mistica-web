import {
    Form,
    Box,
    Stack,
    TextField,
    EmailField,
    ButtonLayout,
    ButtonPrimary,
    useDialog,
    ResponsiveLayout,
} from '@telefonica/mistica';

const App = () => {
    const {alert} = useDialog();
    return (
        <ResponsiveLayout>
            <Form
                onSubmit={(formData) =>
                    alert({
                        title: 'This is your data',
                        message: JSON.stringify(formData, null, 2),
                    })
                }
            >
                <Box padding={16}>
                    <Stack space={16}>
                        <img height={40} src="/vite.svg" alt="Vite Logo" />
                        <TextField name="name" label="Name" autoComplete="name" />
                        <EmailField name="email" label="E-mail" autoComplete="email" />
                        <ButtonLayout primaryButton={<ButtonPrimary submit>Send</ButtonPrimary>} />
                    </Stack>
                </Box>
            </Form>
        </ResponsiveLayout>
    );
};

export default App;
