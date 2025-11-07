'use client';
import * as React from 'react';
import Text from './text';
import {useTheme} from './hooks';

type Props = {
    children: React.ReactNode;
    isCollapsedRowTitle?: boolean;
};

const TableCellText = ({children, isCollapsedRowTitle}: Props): JSX.Element => {
    const {textPresets} = useTheme();
    return (
        <Text
            desktopSize={textPresets.text2.size.desktop}
            desktopLineHeight={textPresets.text2.lineHeight.desktop}
            // Use Text4 size/lineHeight for row's title when collapsed-row mode is used
            {...(isCollapsedRowTitle
                ? {
                      mobileSize: textPresets.text4.size.mobile,
                      mobileLineHeight: textPresets.text4.lineHeight.mobile,
                  }
                : {
                      mobileSize: textPresets.text2.size.mobile,
                      mobileLineHeight: textPresets.text2.lineHeight.mobile,
                  })}
            as="div"
            wordBreak={false}
        >
            {children}
        </Text>
    );
};

export default TableCellText;
