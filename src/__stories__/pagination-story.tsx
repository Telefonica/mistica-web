import * as React from 'react';
import {Box, Pagination, ResponsiveLayout} from '..';

export default {
    title: 'Components/Pagination',
    parameters: {fullScreen: true},
    argTypes: {
        mode: {
            options: ['default', 'iconOnly'],
            control: {type: 'select'},
        },
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
        totalPages: {control: {type: 'number', min: 1, step: 1}},
        currentPage: {control: {type: 'number', min: 1, step: 1}},
        defaultPage: {control: {type: 'number', min: 1, step: 1}},
        maxPages: {control: {type: 'number', min: 1, step: 1}},
        showEllipsis: {control: {type: 'boolean'}},
        hideNavigationControls: {control: {type: 'boolean'}},
        hidePageList: {control: {type: 'boolean'}},
        withCompactView: {control: {type: 'boolean'}},
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

type Args = {
    totalPages: number;
    currentPage?: number;
    defaultPage?: number;
    maxPages?: number;
    showEllipsis: boolean;
    hideNavigationControls: boolean;
    hidePageList?: boolean | 'true' | 'false';
    withCompactView: boolean | 'true' | 'false';
    disabled: boolean;
    mode?: 'default' | 'iconOnly';
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
    maxPages,
    showEllipsis,
    hideNavigationControls,
    hidePageList,
    withCompactView,
    disabled,
    mode,
    variantOutside,
    navLeftLabel,
    navRightLabel,
    onChange,
}) => {
    const [selectedPage, setSelectedPage] = React.useState(currentPage ?? defaultPage ?? 1);

    React.useEffect(() => {
        setSelectedPage(currentPage ?? defaultPage ?? 1);
    }, [currentPage, defaultPage]);

    const handleChange = (page: number) => {
        setSelectedPage(page);
        getOnChange(onChange)?.(page);
    };

    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <div style={{display: 'flex', height: '100vh'}}>
                <div style={{flexGrow: 1}}>
                    <Box paddingY={16} paddingX={{mobile: 0, tablet: 16, desktop: 16}}>
                        <Pagination
                            totalPages={totalPages}
                            currentPage={selectedPage}
                            maxPages={maxPages}
                            showEllipsis={showEllipsis}
                            hideNavigationControls={hideNavigationControls}
                            hidePageList={
                                hidePageList === 'true' || hidePageList === 'false'
                                    ? hidePageList === 'true'
                                    : hidePageList
                            }
                            withCompactView={
                                withCompactView === 'true' || withCompactView === 'false'
                                    ? withCompactView === 'true'
                                    : withCompactView
                            }
                            disabled={disabled}
                            mode={mode}
                            navLeftLabel={navLeftLabel || undefined}
                            navRightLabel={navRightLabel || undefined}
                            onChange={handleChange}
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
    currentPage: 1,
    maxPages: 3,
    showEllipsis: true,
    hideNavigationControls: false,
    withCompactView: false,
    disabled: false,
    variantOutside: 'default',
    onChange: 'none',
};
