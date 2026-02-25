import React from 'react';
import {
    ErrorFeedbackScreen,
    InfoFeedbackScreen,
    SuccessFeedback,
    SuccessFeedbackScreen,
} from '../../feedback';
import figma from '@figma/code-connect';

figma.connect(
    ErrorFeedbackScreen,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=567%3A9999',
    {
        props: {},
        example: () => <ErrorFeedbackScreen title="Error title" description="Error description" />,
    }
);

figma.connect(
    InfoFeedbackScreen,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=567%3A10354',
    {
        props: {},
        example: () => <InfoFeedbackScreen title="Info title" description="Info description" />,
    }
);

figma.connect(
    SuccessFeedback,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=28758%3A2483',
    {
        props: {},
        example: () => <SuccessFeedback title="Success title" description="Success description" />,
    }
);

figma.connect(
    SuccessFeedbackScreen,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=28742%3A89',
    {
        props: {},
        example: () => <SuccessFeedbackScreen title="Success title" description="Success description" />,
    }
);
