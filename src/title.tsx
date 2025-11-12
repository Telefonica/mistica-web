'use client';
import * as React from 'react';
import Text, {Text1, Text2, Text6, useTextPresetSizes} from './text';
import Inline from './inline';
import Box from './box';
import {vars} from './skins/skin-contract.css';
import {useTheme} from './hooks';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes, HeadingType} from './utils/types';

type TitleLayoutProps = {
    title: React.ReactElement;
    right?: React.ReactNode;
    dataAttributes?: DataAttributes;
};

const TitleLayout = ({title, right, dataAttributes}: TitleLayoutProps): React.ReactElement => {
    const {textPresets} = useTheme();
    if (!right) {
        return <div {...getPrefixedDataAttributes(dataAttributes)}>{title}</div>;
    }

    return (
        <Inline space="between" alignItems="baseline" dataAttributes={dataAttributes}>
            {title}
            <Box paddingLeft={16}>
                <Text2 weight={textPresets.link.weight}>{right}</Text2>
            </Box>
        </Inline>
    );
};

export type TitleProps = {
    children: React.ReactNode;
    id?: string;
    right?: React.ReactNode;
    as?: HeadingType;
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
                    wordBreak={false}
                >
                    {children}
                </Text1>
            }
            right={right}
            dataAttributes={{'component-name': 'Title1', ...dataAttributes}}
        />
    );
};

export const Title2 = ({children, as = 'h3', id, right, dataAttributes}: TitleProps): React.ReactElement => {
    const {textPresets} = useTheme();
    return (
        <TitleLayout
            title={
                <Text as={as} id={id} {...useTextPresetSizes('text3')} weight={textPresets.title2.weight}>
                    {children}
                </Text>
            }
            right={right}
            dataAttributes={{'component-name': 'Title2', ...dataAttributes}}
        />
    );
};

export const Title3 = ({children, as = 'h3', id, right, dataAttributes}: TitleProps): React.ReactElement => {
    const {textPresets} = useTheme();
    return (
        <TitleLayout
            title={
                <Text
                    as={as}
                    id={id}
                    mobileSize={textPresets.title3.size.mobile}
                    desktopSize={textPresets.title3.size.desktop}
                    weight={textPresets.title3.weight}
                    mobileLineHeight={textPresets.title3.lineHeight.mobile}
                    desktopLineHeight={textPresets.title3.lineHeight.desktop}
                >
                    {children}
                </Text>
            }
            right={right}
            dataAttributes={{'component-name': 'Title3', ...dataAttributes}}
        />
    );
};

export const Title4 = ({children, as = 'h3', id, right, dataAttributes}: TitleProps): React.ReactElement => {
    return (
        <TitleLayout
            title={
                <Text6 as={as} id={id}>
                    {children}
                </Text6>
            }
            right={right}
            dataAttributes={{'component-name': 'Title4', ...dataAttributes}}
        />
    );
};
