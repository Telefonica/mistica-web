import * as React from 'react';
import {Pagination} from '..';

export default {
    title: 'Components/Pagination',
    argTypes: {
        mode: {
            options: ['default', 'iconOnly'],
            control: {type: 'select'},
        },
        totalPages: {control: {type: 'number'}},
        currentPage: {control: {type: 'number'}},
        dynamicCount: {control: {type: 'number'}},
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
    dynamicCount: number;
    showEllipsis: boolean;
    hideNavigationControls: boolean;
    hidePageList: boolean;
    disabled: boolean;
    mode: 'default' | 'iconOnly';
    navLeftLabel: string;
    navRightLabel: string;
};

export const Default: StoryComponent<Args> = ({
    totalPages,
    currentPage,
    dynamicCount,
    showEllipsis,
    hideNavigationControls,
    hidePageList,
    disabled,
    mode,
    navLeftLabel,
    navRightLabel,
}) => (
    <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        dynamicCount={dynamicCount}
        showEllipsis={showEllipsis}
        hideNavigationControls={hideNavigationControls}
        hidePageList={hidePageList}
        disabled={disabled}
        mode={mode}
        navLeftLabel={navLeftLabel || undefined}
        navRightLabel={navRightLabel || undefined}
    />
);

Default.storyName = 'Pagination';
Default.args = {
    totalPages: 9,
    currentPage: 3,
    dynamicCount: 3,
    showEllipsis: true,
    hideNavigationControls: false,
    hidePageList: false,
    disabled: false,
    mode: 'default',
    navLeftLabel: '',
    navRightLabel: '',
};
