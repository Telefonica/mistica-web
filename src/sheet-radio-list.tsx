'use client';
import * as React from 'react';
import Sheet, {SheetBody} from './sheet-common';
import {useScreenSize, useTheme} from './hooks';
import NegativeBox from './negative-box';
import {ButtonPrimary} from './button';
import {RadioGroup} from './radio-button';
import {Row, RowList} from './list';
import * as tokens from './text-tokens';

import type {DataAttributes} from './utils/types';

type RadioListSheetProps = {
    title?: string;
    subtitle?: string;
    description?: string | ReadonlyArray<string>;
    items: ReadonlyArray<{
        id: string;
        title?: string;
        description?: string;
        asset?: React.ReactNode;
    }>;
    selectedId?: string;
    onClose?: () => void;
    onSelect?: (id: string) => void;
    dataAttributes?: DataAttributes;
    button?: {
        text: string;
    };
};

const RadioListSheet = React.forwardRef<HTMLDivElement, RadioListSheetProps>(
    ({title, subtitle, description, items, selectedId, onClose, onSelect, button, dataAttributes}, ref) => {
        const [selectedItemId, setSelectedItemId] = React.useState(selectedId);
        const hasSelectedRef = React.useRef(false);
        const {isDesktopOrBigger} = useScreenSize();
        const {texts, t} = useTheme();

        return (
            <Sheet
                onClose={onClose}
                ref={ref}
                dataAttributes={{'component-name': 'RadioListSheet', ...dataAttributes}}
            >
                {({closeModal, modalTitleId}) => (
                    <SheetBody
                        title={title}
                        subtitle={subtitle}
                        description={description}
                        modalTitleId={modalTitleId}
                        button={
                            isDesktopOrBigger ? (
                                <ButtonPrimary
                                    onPress={() => {
                                        if (hasSelectedRef.current) {
                                            onSelect?.(selectedItemId || '');
                                        }
                                        closeModal();
                                    }}
                                >
                                    {button?.text || texts.sheetConfirmButton || t(tokens.sheetConfirmButton)}
                                </ButtonPrimary>
                            ) : undefined
                        }
                    >
                        <NegativeBox>
                            <RadioGroup
                                aria-labelledby={modalTitleId}
                                name="sheetselection"
                                value={selectedItemId}
                                onChange={(value) => {
                                    setSelectedItemId(value);
                                    hasSelectedRef.current = true;

                                    // In desktop, the modal is closed with the ButtonPrimary
                                    if (isDesktopOrBigger) {
                                        return;
                                    }

                                    onSelect?.(value);
                                    // Wait for radio animation to finish before closing the modal
                                    setTimeout(() => {
                                        closeModal();
                                    }, 200);
                                }}
                            >
                                <RowList>
                                    {items.map((item) => (
                                        <Row
                                            key={item.id}
                                            title={item.title ?? ''}
                                            description={item.description}
                                            asset={item.asset}
                                            radioValue={item.id}
                                        />
                                    ))}
                                </RowList>
                            </RadioGroup>
                        </NegativeBox>
                    </SheetBody>
                )}
            </Sheet>
        );
    }
);

export default RadioListSheet;
