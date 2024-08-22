'use client';
import * as React from 'react';
import * as styles from './table.css';
import ScreenReaderOnly from './screen-reader-only';
import {useTheme} from './hooks';
import * as tokens from './text-tokens';

export const TableActionsHeader = (): React.ReactElement => {
    const {texts, t} = useTheme();

    return (
        <th>
            <ScreenReaderOnly>
                {/** TODO: review text and translations (https://jira.tid.es/browse/PRODUCTDSN-2491) */}
                <div className={styles.actionsHeaderText}>
                    {texts.tableActionsHeaderLabel || t(tokens.tableActionsHeaderLabel)}
                </div>
            </ScreenReaderOnly>
        </th>
    );
};
