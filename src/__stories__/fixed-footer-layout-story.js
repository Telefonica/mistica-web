// @flow
import * as React from 'react';
import {ButtonPrimary, ButtonSecondary} from '../button';
import FixedFooterLayout from '../fixed-footer-layout';
import ButtonFixedFooterLayout from '../button-fixed-footer-layout';
import {useCheckbox} from './helpers';

export default {
    title: 'Components|Layouts/FixedFooterLayout',
    component: FixedFooterLayout,
};

const someTextLines = Array.from({length: 4}, () => 'Body text');
const useTextLines = () => {
    const [textLines, setTextLines] = React.useState(someTextLines);
    const loadMoreText = () => {
        setTextLines((textLines) => [...textLines, ...someTextLines]);
    };
    const loadLessText = () => {
        setTextLines((textLines) => textLines.slice(0, -4));
    };
    return [textLines, loadMoreText, loadLessText];
};

export const FooterWithButtonsOnly = (): React.Node => {
    const [isFooterVisible, isFooterVisibleCheckbox] = useCheckbox('isFooterVisible', true);
    const [textLines, loadMoreText, loadLessText] = useTextLines();
    return (
        <ButtonFixedFooterLayout
            button={<ButtonPrimary onPress={loadMoreText}>Load more text</ButtonPrimary>}
            secondaryButton={<ButtonSecondary onPress={loadLessText}>Load less text</ButtonSecondary>}
            isFooterVisible={isFooterVisible}
        >
            {isFooterVisibleCheckbox}
            {textLines.map((line, idx) => (
                <p key={idx}>{line}</p>
            ))}
        </ButtonFixedFooterLayout>
    );
};

FooterWithButtonsOnly.story = {name: 'ButtonFixedFooterLayout'};

export const MoreComplexFooter = (): React.Node => {
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
                    <div>
                        Lines of text: <strong>{textLines.length}</strong>
                    </div>
                    <ButtonPrimary onPress={loadMoreText}>Load more text</ButtonPrimary>
                </div>
            }
            isFooterVisible={isFooterVisible}
            footerHeight={80}
        >
            {isFooterVisibleCheckbox}
            <p>
                When you need a more elavorated thing for your footer (not just buttons), you can use
                FixedFooterLayout instead of ButtonFixedFooterLayout
            </p>
            {textLines.map((line, idx) => (
                <p key={idx}>{line}</p>
            ))}
        </FixedFooterLayout>
    );
};

MoreComplexFooter.story = {name: 'FixedFooterLayout'};
