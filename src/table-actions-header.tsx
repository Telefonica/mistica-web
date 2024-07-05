'use client';
import * as React from 'react';
import * as styles from './table.css';
import ScreenReaderOnly from './screen-reader-only';
import {useTheme} from './hooks';

export const TableActionsHeader = (): React.ReactElement => {
    const {texts} = useTheme();

    return (
        <th>
            <ScreenReaderOnly>
                {/** TODO: review text and translations (https://jira.tid.es/browse/PRODUCTDSN-2491) */}
                <div className={styles.actionsHeaderText}>{texts.tableActionsHeaderLabel}</div>
            </ScreenReaderOnly>
        </th>
    );
};
