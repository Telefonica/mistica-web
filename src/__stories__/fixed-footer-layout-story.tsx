import * as React from 'react';
import {ButtonPrimary, ButtonSecondary, Stack, Text2, FixedFooterLayout, ButtonFixedFooterLayout} from '..';
import {useCheckbox} from './helpers';

export default {
    title: 'Components/Layouts/FixedFooterLayout',
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
            {isFooterVisibleCheckbox}
            <Stack space={16}>
                {textLines.map((line, idx) => (
                    <Text2 regular key={idx}>
                        {line}
                    </Text2>
                ))}
            </Stack>
        </ButtonFixedFooterLayout>
    );
};

FooterWithButtonsOnly.storyName = 'ButtonFixedFooterLayout';

export const MoreComplexFooter: StoryComponent = () => {
    const [textLines, loadMoreText] = useTextLines();
    const [isFooterVisible, isFooterVisibleCheckbox] = useCheckbox('isFooterVisible', true);
    return (
        <FixedFooterLayout
            footer={
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        justifyContent: 'space-between',
                        padding: 16,
                    }}
                >
                    <Text2 regular as="p">
                        Lines of text: <Text2 medium>{textLines.length}</Text2>
                    </Text2>
                    <ButtonPrimary onPress={loadMoreText}>Load more text</ButtonPrimary>
                </div>
            }
            isFooterVisible={isFooterVisible}
        >
            {isFooterVisibleCheckbox}
            <Text2 regular as="p">
                When you need a more elaborated thing for your footer (not just buttons), you can use
                FixedFooterLayout instead of ButtonFixedFooterLayout
            </Text2>
            <Stack space={16}>
                {textLines.map((line, idx) => (
                    <Text2 regular key={idx}>
                        {line}
                    </Text2>
                ))}
            </Stack>
        </FixedFooterLayout>
    );
};

MoreComplexFooter.storyName = 'FixedFooterLayout';
