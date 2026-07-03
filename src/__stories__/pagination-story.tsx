import * as React from 'react';
import {Box, Pagination, ResponsiveLayout} from '..';

export default {
    title: 'Components/Pagination',
    parameters: {fullScreen: true},
    argTypes: {
        navigationControls: {
            options: ['buttonLink', 'iconButton'],
            control: {type: 'select'},
        },
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
        totalPages: {control: {type: 'number', min: 1, step: 1}},
        currentPage: {control: {type: 'number', min: 1, step: 1}},
        defaultPage: {control: {type: 'number', min: 1, step: 1}},
        surroundingPageCount: {control: {type: 'number', min: 0, step: 1}},
        hideNavigationControls: {control: {type: 'boolean'}},
        hidePageList: {control: {type: 'boolean'}},
        disabled: {control: {type: 'boolean'}},
        navLeftLabel: {control: {type: 'text'}},
        navRightLabel: {control: {type: 'text'}},
        onChange: {
            options: ['none', 'alert'],
            control: {type: 'select'},
        },
    },
};

type OnChangeAction = 'none' | 'alert';
type NavigationControls = 'buttonLink' | 'iconButton';

type Args = {
    totalPages: number;
    currentPage?: number;
    defaultPage?: number;
    surroundingPageCount?: number;
    hideNavigationControls: boolean;
    hidePageList?: boolean | 'true' | 'false';
    disabled: boolean;
    navigationControls: NavigationControls;
    variantOutside: 'default' | 'brand' | 'negative' | 'alternative';
    navLeftLabel?: string;
    navRightLabel?: string;
    onChange: OnChangeAction;
};

const getOnChange = (onChange: OnChangeAction) =>
    onChange === 'alert' ? (page: number) => window.alert(`Page changed to ${page}`) : undefined;

export const Default: StoryComponent<Args> = ({
    totalPages,
    currentPage,
    defaultPage,
    surroundingPageCount,
    hideNavigationControls,
    hidePageList,
    disabled,
    navigationControls,
    variantOutside,
    navLeftLabel,
    navRightLabel,
    onChange,
}) => {
    const paginationMode = navigationControls === 'iconButton' ? 'iconOnly' : 'default';
    const hidePageListValue =
        hidePageList === 'true' || hidePageList === 'false' ? hidePageList === 'true' : hidePageList;

    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <div style={{display: 'flex', height: '100vh'}}>
                <div style={{flexGrow: 1}}>
                    <Box paddingY={16} paddingX={{mobile: 0, tablet: 16, desktop: 16}}>
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            defaultPage={defaultPage}
                            surroundingPageCount={surroundingPageCount}
                            hideNavigationControls={hideNavigationControls}
                            hidePageList={hidePageListValue}
                            disabled={disabled}
                            mode={paginationMode}
                            navLeftLabel={navLeftLabel || undefined}
                            navRightLabel={navRightLabel || undefined}
                            onChange={getOnChange(onChange)}
                        />
                    </Box>
                </div>
            </div>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Pagination';
Default.args = {
    totalPages: 9,
    defaultPage: 1,
    surroundingPageCount: 1,
    hideNavigationControls: false,
    disabled: false,
    navigationControls: 'buttonLink',
    variantOutside: 'default',
    onChange: 'none',
};
