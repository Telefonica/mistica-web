// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=5841-10827
// source=src/sheet-common.tsx
// component=Sheet
import figma from 'figma';

export default {
    example: figma.code`
        <Sheet onClose={() => {}}>
            {({closeModal, modalTitleId}) => (
                <SheetBody modalTitleId={modalTitleId} title="Title" description="Description" />
            )}
        </Sheet>
    `,
    imports: ['import {Sheet, SheetBody} from "@telefonica/mistica";'],
    id: 'sheet-common',
    metadata: {nestable: false},
};
