import * as React from 'react';
import Drawer from '../drawer';
import {Placeholder} from '../placeholder';
import Stack from '../stack';
import {ButtonPrimary} from '../button';
import {Text3} from '../text';

export default {
    title: 'Components/Modals/Drawer',
    component: Drawer,
    argTypes: {
        width: {
            control: {type: 'range', min: 300, max: 1000, step: 1},
        },
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
                >
                    {content}
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
};
