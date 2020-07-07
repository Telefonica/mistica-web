import * as React from 'react';
import Box from './box';
import Text from './text';
import {useTheme, useScreenSize, useAriaId} from './hooks';

type Props = {children: React.ReactNode; id?: string};

const SectionTitle: React.FC<Props> = ({children, id}) => {
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
                id={useAriaId(id)}
            >
                {children}
            </Text>
        </Box>
    );
};

export default SectionTitle;
