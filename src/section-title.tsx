// @flow
import * as React from 'react';
import Box from './box';
import Text from './text';
import {useTheme, useScreenSize} from './hooks';

type Props = {children: React.ReactNode};

const SectionTitle = ({children}: Props): React.ReactNode => {
    const theme = useTheme();
    const {isTabletOrBigger} = useScreenSize();
    return (
        <Box paddingTop={16} paddingBottom={8}>
            <Text
                size={isTabletOrBigger ? 14 : 12}
                weight="medium"
                lineHeight={isTabletOrBigger ? '20px' : '16px'}
                color={theme.colors.textSecondary}
                uppercase
                as="h3"
            >
                {children}
            </Text>
        </Box>
    );
};

export default SectionTitle;
