import * as React from 'react';
import {Text1, Text2, Text5} from './text';
import Inline from './inline';
import Box from './box';
import {vars} from './skins/skin-contract.css';
import {useTheme} from './hooks';

import type {DataAttributes} from './utils/types';

type TitleLayoutProps = {
    title: React.ReactElement;
    right?: React.ReactNode;
};

const TitleLayout = ({title, right}: TitleLayoutProps): React.ReactElement => {
    const {textPresets} = useTheme();
    if (!right) {
        return title;
    }

    return (
        <Inline space="between" alignItems="baseline">
            {title}
            <Box paddingLeft={16}>
                <Text2 weight={textPresets.link.weight}>{right}</Text2>
            </Box>
        </Inline>
    );
};

type TitleProps = {
    children: React.ReactNode;
    id?: string;
    right?: React.ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
};

export const Title1 = ({children, as = 'h3', id, right, dataAttributes}: TitleProps): React.ReactElement => {
    const {textPresets} = useTheme();
    return (
        <TitleLayout
            title={
                <Text1
                    color={vars.colors.textSecondary}
                    transform="uppercase"
                    weight={textPresets.title1.weight}
                    as={as}
                    id={id}
                    dataAttributes={{'component-name': 'Title1', ...dataAttributes}}
                    wordBreak={false}
                >
                    {children}
                </Text1>
            }
            right={right}
        />
    );
};

export const Title2 = ({children, as = 'h3', id, right, dataAttributes}: TitleProps): React.ReactElement => {
    return (
        <TitleLayout
            title={
                <Text5 as={as} id={id} dataAttributes={{'component-name': 'Title2', ...dataAttributes}}>
                    {children}
                </Text5>
            }
            right={right}
        />
    );
};
