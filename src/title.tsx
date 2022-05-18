import * as React from 'react';
import {Text1, Text2, Text5} from './text';
import {useTheme} from './hooks';
import Inline from './inline';
import Box from './box';
import {DataAttributes} from './utils/types';

type TitleLayoutProps = {
    title: React.ReactElement;
    right?: React.ReactNode;
    dataAttributes?: DataAttributes;
};

const TitleLayout = ({title, right, dataAttributes}: TitleLayoutProps): React.ReactElement => {
    if (!right) {
        return title;
    }

    return (
        <Inline space="between" alignItems="baseline" dataAttributes={dataAttributes}>
            {title}
            <Box paddingLeft={16}>
                <Text2 regular>{right}</Text2>
            </Box>
        </Inline>
    );
};

type TitleProps = {
    children: React.ReactNode;
    id?: string;
    right?: React.ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    dataAttributes?: DataAttributes;
};

export const Title1 = ({children, as = 'h3', id, right, dataAttributes}: TitleProps): React.ReactElement => {
    const theme = useTheme();

    return (
        <TitleLayout
            title={
                <Text1 color={theme.colors.textSecondary} transform="uppercase" medium as={as} id={id}>
                    {children}
                </Text1>
            }
            right={right}
            dataAttributes={dataAttributes}
        />
    );
};

export const Title2 = ({children, as = 'h3', id, right, dataAttributes}: TitleProps): React.ReactElement => {
    return (
        <TitleLayout
            title={
                <Text5 as={as} id={id}>
                    {children}
                </Text5>
            }
            right={right}
            dataAttributes={dataAttributes}
        />
    );
};
