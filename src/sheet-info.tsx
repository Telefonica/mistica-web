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
import {ButtonPrimary} from './button';
import Divider from './divider';

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
                  /** @deprecated use url instead */
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
    button?: {
        text: string;
    };
};

const InfoSheet = React.forwardRef<HTMLDivElement, InfoSheetProps>(
    ({title, subtitle, description, items, onClose, button, dataAttributes}, ref) => {
        const {isDarkMode} = useTheme();
        return (
            <Sheet
                onClose={onClose}
                ref={ref}
                dataAttributes={{'component-name': 'InfoSheet', ...dataAttributes}}
            >
                {({closeModal, modalTitleId}) => (
                    <SheetBody
                        title={title}
                        subtitle={subtitle}
                        description={description}
                        modalTitleId={modalTitleId}
                        button={
                            button ? (
                                <ButtonPrimary onPress={closeModal}>{button.text}</ButtonPrimary>
                            ) : undefined
                        }
                    >
                        <Box paddingBottom={16} role="list">
                            {items.map((item, idx) => (
                                <React.Fragment key={item.id || idx}>
                                    <div className={styles.itemContainer} role="listitem">
                                        <Inline space={8}>
                                            <div
                                                className={styles.infoItemIconContainer}
                                                style={{
                                                    alignItems:
                                                        item.icon.type !== 'bullet' && !item.description
                                                            ? 'center'
                                                            : undefined,
                                                }}
                                            >
                                                <div className={styles.infoItemIcon}>
                                                    {item.icon.type === 'bullet' ? (
                                                        <Circle
                                                            size={8}
                                                            backgroundColor={skinVars.colors.textPrimary}
                                                        />
                                                    ) : item.icon.Icon ? (
                                                        <item.icon.Icon
                                                            size={item.icon.type === 'small' ? 16 : 24}
                                                        />
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
                                    </div>
                                    {idx < items.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </Box>
                    </SheetBody>
                )}
            </Sheet>
        );
    }
);

export default InfoSheet;
