import * as React from 'react';
import Drawer from '../drawer';
import {Placeholder} from '../placeholder';
import Stack from '../stack';
import {ButtonPrimary} from '../button';

export default {
    title: 'Components/Modals/Drawer',
};

type Args = {
    title: string;
    subtitle: string;
    description: string;
    contentLength: number;
};

export const Default = ({title, subtitle, description, contentLength}: Args): JSX.Element => {
    const [isOpen, setIsOpen] = React.useState(false);
    const content = (
        <Stack space={16}>
            {Array.from({length: contentLength}).map((_, index) => (
                <Placeholder key={index} height={200} />
            ))}
        </Stack>
    );

    return (
        <>
            <ButtonPrimary onPress={() => setIsOpen(true)}>Open Drawer</ButtonPrimary>
            {isOpen && (
                <Drawer
                    title={title}
                    subtitle={subtitle}
                    description={description}
                    onClose={() => {
                        setIsOpen(false);
                    }}
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
};
