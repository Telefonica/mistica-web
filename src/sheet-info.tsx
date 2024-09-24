'use client';
import * as React from 'react';
import Inline from './inline';
import Circle from './circle';
import Sheet, {SheetBody} from './sheet-common';
import {useTheme} from './hooks';
import Box from './box';
import Stack from './stack';
import {Text3, Text2} from './text';
import {vars as skinVars} from './skins/skin-contract.css';
import * as styles from './sheet-info.css';
import Image from './image';

import type {ExclusifyUnion} from './utils/utility-types';
import type {DataAttributes, IconProps} from './utils/types';

type InfoSheetProps = {
    title?: string;
    subtitle?: string;
    description?: string | ReadonlyArray<string>;
    items: ReadonlyArray<{
        id?: string;
        title: string;
        description?: string;
        icon: ExclusifyUnion<
            | {
                  type: 'regular' | 'small';
                  Icon: React.ComponentType<IconProps>;
              }
            | {
                  type: 'regular' | 'small';
                  url: string;
                  urlDark?: string;
              }
            | {type: 'bullet'}
        >;
    }>;
    onClose?: () => void;
    dataAttributes?: DataAttributes;
};

export const InfoSheet = React.forwardRef<HTMLDivElement, InfoSheetProps>(
    ({title, subtitle, description, items, onClose, dataAttributes}, ref) => {
        const {isDarkMode} = useTheme();
        return (
            <Sheet
                onClose={onClose}
                ref={ref}
                dataAttributes={{'component-name': 'InfoSheet', ...dataAttributes}}
            >
                {({modalTitleId}) => (
                    <SheetBody
                        title={title}
                        subtitle={subtitle}
                        description={description}
                        modalTitleId={modalTitleId}
                    >
                        <Box paddingBottom={16}>
                            <Stack space={16} role="list">
                                {items.map((item, idx) => (
                                    <Inline key={item.id || idx} space={8}>
                                        <div className={styles.infoItemIcon}>
                                            {item.icon.type === 'bullet' ? (
                                                <Circle
                                                    size={8}
                                                    backgroundColor={skinVars.colors.textPrimary}
                                                />
                                            ) : item.icon.Icon ? (
                                                <item.icon.Icon size={item.icon.type === 'small' ? 16 : 24} />
                                            ) : (
                                                <Image
                                                    src={
                                                        isDarkMode && item.icon.urlDark
                                                            ? item.icon.urlDark
                                                            : item.icon.url
                                                    }
                                                    width={item.icon.type === 'small' ? 16 : 24}
                                                    height={item.icon.type === 'small' ? 16 : 24}
                                                />
                                            )}
                                        </div>
                                        <Stack space={2}>
                                            <Text3 regular>{item.title}</Text3>
                                            {item.description && (
                                                <Text2 regular color={skinVars.colors.textSecondary}>
                                                    {item.description}
                                                </Text2>
                                            )}
                                        </Stack>
                                    </Inline>
                                ))}
                            </Stack>
                        </Box>
                    </SheetBody>
                )}
            </Sheet>
        );
    }
);

export default InfoSheet;
