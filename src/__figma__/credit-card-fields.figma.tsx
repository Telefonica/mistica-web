import React from 'react';
import CreditCardFields from '../credit-card-fields';
import figma from '@figma/code-connect';

// Desktop
figma.connect(
    CreditCardFields,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=657%3A3990',
    {
        props: {},
        example: () => <CreditCardFields />,
    }
);

// Mobile
figma.connect(
    CreditCardFields,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=657%3A3990',
    {
        props: {},
        example: () => <CreditCardFields />,
    }
);
