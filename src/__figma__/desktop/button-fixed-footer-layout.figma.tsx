import React from 'react';
import ButtonFixedFooterLayout from '../../button-fixed-footer-layout';
import {ButtonPrimary} from '../../button';
import figma from '@figma/code-connect';

figma.connect(
    ButtonFixedFooterLayout,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=5212%3A4201',
    {
        props: {},
        example: () => (
            <ButtonFixedFooterLayout button={<ButtonPrimary onPress={() => {}}>Primary</ButtonPrimary>}>
                Content
            </ButtonFixedFooterLayout>
        ),
    }
);
