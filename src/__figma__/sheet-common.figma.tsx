import React from 'react';
import {Sheet, SheetBody} from '../../sheet';
import figma from '@figma/code-connect';

figma.connect(
    Sheet,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=5841%3A10827',
    {
        props: {},
        example: () => (
            <Sheet onClose={() => {}}>
                {({closeModal, modalTitleId}) => (
                    <SheetBody modalTitleId={modalTitleId} title="Title" description="Description" />
                )}
            </Sheet>
        ),
    }
);
