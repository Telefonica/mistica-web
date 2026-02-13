'use client';
import * as React from 'react';
import Sheet, {SheetBody} from './sheet-common';
import {useTheme} from './hooks';
import Box from './box';
import {Text3} from './text';
import {vars as skinVars} from './skins/skin-contract.css';
import * as styles from './sheet-action-row.css';
import Image from './image';
import NegativeBox from './negative-box';
import Touchable from './touchable';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes, IconProps} from './utils/types';

type ActionsListSheetProps = {
    title?: string;
    subtitle?: string;
    description?: string | ReadonlyArray<string>;
    items: ReadonlyArray<{
        id: string;
        title: string;
        /** "normal" by default */
        style?: 'normal' | 'destructive';
        icon?: ExclusifyUnion<
            | {
                  /** @deprecated - use url instead */
                  Icon: React.ComponentType<IconProps>;
              }
            | {
                  url: string;
                  urlDark?: string;
              }
        >;
    }>;
    onClose?: () => void;
    onSelect?: (id: string) => void;
    dataAttributes?: DataAttributes;
};

const ActionsListSheet = React.forwardRef<HTMLDivElement, ActionsListSheetProps>(
    ({title, subtitle, description, items, onClose, onSelect, dataAttributes}, ref) => {
        const {isDarkMode} = useTheme();

        return (
            <Sheet
                onClose={onClose}
                ref={ref}
                dataAttributes={{'component-name': 'ActionsListSheet', ...dataAttributes}}
            >
                {({closeModal, modalTitleId}) => (
                    <SheetBody
                        title={title}
                        subtitle={subtitle}
                        description={description}
                        modalTitleId={modalTitleId}
                    >
                        <NegativeBox>
                            {items.map(({id, style, title, icon}) => (
                                <Touchable
                                    key={id}
                                    onPress={() => {
                                        onSelect?.(id);
                                        closeModal();
                                    }}
                                >
                                    <div className={styles.sheetActionRow}>
                                        {icon && (
                                            <Box paddingRight={16}>
                                                {icon.Icon ? (
                                                    <icon.Icon
                                                        size={24}
                                                        color={
                                                            style === 'destructive'
                                                                ? skinVars.colors.textLinkDanger
                                                                : skinVars.colors.neutralHigh
                                                        }
                                                    />
                                                ) : (
                                                    <Image
                                                        circular
                                                        src={
                                                            isDarkMode && icon.urlDark
                                                                ? icon.urlDark
                                                                : icon.url
                                                        }
                                                        width={40}
                                                    />
                                                )}
                                            </Box>
                                        )}
                                        <Text3
                                            regular
                                            color={
                                                style === 'destructive'
                                                    ? skinVars.colors.textLinkDanger
                                                    : skinVars.colors.textPrimary
                                            }
                                        >
                                            {title}
                                        </Text3>
                                    </div>
                                </Touchable>
                            ))}
                        </NegativeBox>
                    </SheetBody>
                )}
            </Sheet>
        );
    }
);

export default ActionsListSheet;
