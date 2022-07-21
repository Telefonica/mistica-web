import * as React from 'react';
import {
    ButtonPrimary,
    ButtonSecondary,
    Stack,
    Text2,
    Text6,
    FixedFooterLayout,
    ButtonFixedFooterLayout,
    ResponsiveLayout,
    Box,
    Inline,
    alert,
} from '..';
import {useCheckbox} from './helpers';

export default {
    title: 'Layout/Fixed footer layout',
    component: FixedFooterLayout,
};

const someTextLines = Array.from({length: 4}, () => 'Body text');
const useTextLines = (): [Array<string>, () => void, () => void] => {
    const [textLines, setTextLines] = React.useState(someTextLines);
    const loadMoreText = () => {
        setTextLines((textLines) => [...textLines, ...someTextLines]);
    };
    const loadLessText = () => {
        setTextLines((textLines) => textLines.slice(0, -4));
    };
    return [textLines, loadMoreText, loadLessText];
};

export const FooterWithButtonsOnly: StoryComponent = () => {
    const [isFooterVisible, isFooterVisibleCheckbox] = useCheckbox('isFooterVisible', true);
    const [textLines, loadMoreText, loadLessText] = useTextLines();
    return (
        <ButtonFixedFooterLayout
            button={<ButtonPrimary onPress={loadMoreText}>Load more text</ButtonPrimary>}
            secondaryButton={<ButtonSecondary onPress={loadLessText}>Load less text</ButtonSecondary>}
            isFooterVisible={isFooterVisible}
        >
            <ResponsiveLayout>
                <Box paddingY={16}>
                    <Stack space={16}>
                        {isFooterVisibleCheckbox}
                        {textLines.map((line, idx) => (
                            <Text2 regular key={idx}>
                                {line}
                            </Text2>
                        ))}
                    </Stack>
                </Box>
            </ResponsiveLayout>
        </ButtonFixedFooterLayout>
    );
};

FooterWithButtonsOnly.storyName = 'Button fixed footer layout';
FooterWithButtonsOnly.parameters = {fullScreen: true};

export const MoreComplexFooter: StoryComponent = () => {
    const [textLines, loadMoreText] = useTextLines();
    const [isFooterVisible, isFooterVisibleCheckbox] = useCheckbox('isFooterVisible', true);
    return (
        <FixedFooterLayout
            footer={
                <ResponsiveLayout>
                    <Box paddingY={16}>
                        <Inline space="between" alignItems="center">
                            <Text2 regular as="p">
                                Lines of text: <Text2 medium>{textLines.length}</Text2>
                            </Text2>
                            <ButtonPrimary onPress={loadMoreText}>Load more text</ButtonPrimary>
                        </Inline>
                    </Box>
                </ResponsiveLayout>
            }
            isFooterVisible={isFooterVisible}
        >
            <ResponsiveLayout>
                <Stack space={16}>
                    {isFooterVisibleCheckbox}
                    <Text2 regular as="p">
                        When you need a more elaborated thing for your footer (not just buttons), you can use
                        FixedFooterLayout instead of ButtonFixedFooterLayout
                    </Text2>
                    {textLines.map((line, idx) => (
                        <Text2 regular key={idx}>
                            {line}
                        </Text2>
                    ))}
                </Stack>
            </ResponsiveLayout>
        </FixedFooterLayout>
    );
};

MoreComplexFooter.storyName = 'Fixed footer layout';
MoreComplexFooter.parameters = {fullScreen: true};

export const DialogOverFixedFooter: StoryComponent = () => {
    return (
        <ButtonFixedFooterLayout
            button={<ButtonPrimary onPress={() => alert({message: 'Message'})}>Open dialog</ButtonPrimary>}
        >
            <ResponsiveLayout>
                <Box paddingY={16}>
                    <Stack space={16}>
                        <Text6 as="p">
                            Open this story using a mobile viewport, then press the footer button to open a
                            dialog.
                        </Text6>
                        <Text6 as="p">The dialog backdrop should cover the fixed footer.</Text6>
                        <div style={{paddingTop: '100vh'}}>
                            <Text2 regular as="p">
                                This content adds scroll to the page.
                            </Text2>
                        </div>
                    </Stack>
                </Box>
            </ResponsiveLayout>
        </ButtonFixedFooterLayout>
    );
};

DialogOverFixedFooter.storyName = 'Dialog over fixed footer';
DialogOverFixedFooter.parameters = {fullScreen: true};
