// @flow
import * as React from 'react';
import Box from './box';
import Text from './text';
import {useTheme} from './hooks';

type Props = {children: React.Node};

const SectionTitle = ({children}: Props): React.Node => {
    const theme = useTheme();
    return (
        <Box paddingTop={16} paddingBottom={8}>
            <Text
                size={12}
                weight="medium"
                lineHeight={1.33}
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
