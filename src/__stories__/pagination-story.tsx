import * as React from 'react';
import {Box, Pagination, ResponsiveLayout} from '..';

export default {
    title: 'Components/Pagination',
    argTypes: {
        mode: {
            options: ['default', 'iconOnly'],
            control: {type: 'select'},
        },
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
        totalPages: {control: {type: 'number'}},
        currentPage: {control: {type: 'number'}},
        maxPages: {control: {type: 'number'}},
        showEllipsis: {control: {type: 'boolean'}},
        hideNavigationControls: {control: {type: 'boolean'}},
        hidePageList: {control: {type: 'boolean'}},
        disabled: {control: {type: 'boolean'}},
        navLeftLabel: {control: {type: 'text'}},
        navRightLabel: {control: {type: 'text'}},
    },
};

type Args = {
    totalPages: number;
    currentPage: number;
    maxPages?: number;
    showEllipsis: boolean;
    hideNavigationControls: boolean;
    hidePageList: boolean;
    disabled: boolean;
    mode: 'default' | 'iconOnly';
    variantOutside: 'default' | 'brand' | 'negative' | 'alternative';
    navLeftLabel: string;
    navRightLabel: string;
};

export const Default: StoryComponent<Args> = ({
    totalPages,
    currentPage,
    maxPages,
    showEllipsis,
    hideNavigationControls,
    hidePageList,
    disabled,
    mode,
    variantOutside,
    navLeftLabel,
    navRightLabel,
}) => (
    <ResponsiveLayout variant={variantOutside} fullWidth>
        <Box padding={16}>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                maxPages={maxPages}
                showEllipsis={showEllipsis}
                hideNavigationControls={hideNavigationControls}
                hidePageList={hidePageList}
                disabled={disabled}
                mode={mode}
                navLeftLabel={navLeftLabel || undefined}
                navRightLabel={navRightLabel || undefined}
            />
        </Box>
    </ResponsiveLayout>
);

Default.storyName = 'Pagination';
Default.args = {
    totalPages: 9,
    currentPage: 3,
    showEllipsis: true,
    hideNavigationControls: false,
    hidePageList: false,
    disabled: false,
    mode: 'default',
    variantOutside: 'default',
    navLeftLabel: '',
    navRightLabel: '',
};
