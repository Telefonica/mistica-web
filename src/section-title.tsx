import * as React from 'react';
import Box from './box';
import {Text1} from './text';
import {useTheme} from './hooks';

type Props = {children: React.ReactNode; id?: string};

const SectionTitle: React.FC<Props> = ({children, id}) => {
    const theme = useTheme();
    return (
        <Box paddingTop={16} paddingBottom={8}>
            <Text1 color={theme.colors.textSecondary} uppercase medium as="h3" id={id}>
                {children}
            </Text1>
        </Box>
    );
};

export default SectionTitle;
