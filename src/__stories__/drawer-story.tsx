import * as React from 'react';
import Drawer from '../drawer';
import {Placeholder} from '../placeholder';
import Stack from '../stack';
import {ButtonPrimary} from '../button';
import {Text3} from '../text';
import TextField from '../text-field';
import {useForm} from '../form-context';
import EmailField from '../email-field';
import IntegerField from '../integer-field';
import {isRunningAcceptanceTest} from '../utils/platform';

export default {
    title: 'Components/Modals/Drawer',
    component: Drawer,
    argTypes: {
        width: {
            control: {type: 'range', min: 300, max: 1000, step: 1},
        },
        // workaround for: https://github.com/storybookjs/storybook/issues/25035#issuecomment-1850692061
        // boolean args are ignored in first storybook load
        form: {
            options: ['true', 'false'],
            mapping: {true: true, false: false},
            control: {
                type: 'select',
                labels: {true: 'true', false: 'false'},
            },
        },
        // controls to remove from story
        children: {table: {disable: true}},
        button: {table: {disable: true}},
        buttonLink: {table: {disable: true}},
        dataAttributes: {table: {disable: true}},
        onClose: {table: {disable: true}},
        onDismiss: {table: {disable: true}},
        secondaryButton: {table: {disable: true}},
        dismissLabel: {table: {disable: true}},
    },
};

type Args = {
    title: string;
    subtitle: string;
    description: string;
    contentLength: number;
    onDismissHandler: boolean;
    showButton: boolean;
    showSecondaryButton: boolean;
    showButtonLink: boolean;
    width: number;
    form: boolean;
};

const FormContent = () => {
    const form = useForm();
    return (
        <Stack space={16}>
            <TextField name="name" label="Name" />
            <EmailField name="email" label="E-mail" />
            <IntegerField name="age" label="Age" />
            <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </Stack>
    );
};

export const Default = ({
    title,
    subtitle,
    description,
    contentLength,
    onDismissHandler,
    showButton,
    showSecondaryButton,
    showButtonLink,
    width,
    form,
}: Args): JSX.Element => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [result, setResult] = React.useState('');
    const content = (
        <Stack space={16}>
            {Array.from({length: contentLength}).map((_, index) => (
                <Placeholder key={index} height={200} />
            ))}
        </Stack>
    );

    return (
        <>
            <Stack space={16}>
                <ButtonPrimary onPress={() => setIsOpen(true)}>Open Drawer</ButtonPrimary>
                <Text3 regular>
                    Result: <span data-testid="result">{result}</span>
                </Text3>
            </Stack>
            {isOpen && (
                <Drawer
                    width={width}
                    title={title}
                    subtitle={subtitle}
                    description={description}
                    onClose={() => setIsOpen(false)}
                    onDismiss={onDismissHandler ? () => setResult('dismiss') : undefined}
                    button={showButton ? {text: 'Primary', onPress: () => setResult('primary')} : undefined}
                    secondaryButton={
                        showSecondaryButton
                            ? {text: 'Secondary', onPress: () => setResult('secondary')}
                            : undefined
                    }
                    buttonLink={showButtonLink ? {text: 'Link', onPress: () => setResult('link')} : undefined}
                    form={
                        form
                            ? {
                                  initialValues: {
                                      name: 'Pepito',
                                      email: 'pepito@gmail.com',
                                  },
                                  onSubmit: async (values) => {
                                      await new Promise((r) =>
                                          setTimeout(r, isRunningAcceptanceTest() ? 0 : 2000)
                                      );
                                      setResult(JSON.stringify(values));
                                  },
                              }
                            : undefined
                    }
                >
                    {form ? <FormContent /> : content}
                </Drawer>
            )}
        </>
    );
};

Default.storyName = 'Drawer';

Default.args = {
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Description',
    contentLength: 2,
    onDismissHandler: true,
    showButton: true,
    showSecondaryButton: true,
    showButtonLink: true,
    width: 0,
    form: 'false',
};
