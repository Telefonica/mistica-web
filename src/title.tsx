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

const useTitleProps = (titleType: 'title1' | 'title2' | 'title3' | 'title4') => {
    const {textPresets} = useTheme();
    return {
        weight: textPresets[titleType].weight,
        size: textPresets[titleType].size.desktop,
        mobileSize: textPresets[titleType].size.mobile,
        lineHeight: textPresets[titleType].lineHeight.desktop,
        mobileLineHeight: textPresets[titleType].lineHeight.mobile,
    };
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
    const titleProps = useTitleProps('title1');
    return (
        <TitleLayout
            title={
                <Text
                    as={as}
                    id={id}
                    {...titleProps}
                    color={vars.colors.textSecondary}
                    transform="uppercase"
                    wordBreak={false}
                >
                    {children}
                </Text>
            }
            right={right}
            dataAttributes={{'component-name': 'Title1', ...dataAttributes}}
        />
    );
};

export const Title2 = ({children, as = 'h3', id, right, dataAttributes}: TitleProps): React.ReactElement => {
    const titleProps = useTitleProps('title2');
    return (
        <TitleLayout
            title={
                <Text as={as} id={id} {...titleProps}>
                    {children}
                </Text>
            }
            right={right}
            dataAttributes={{'component-name': 'Title2', ...dataAttributes}}
        />
    );
};

export const Title3 = ({children, as = 'h3', id, right, dataAttributes}: TitleProps): React.ReactElement => {
    const titleProps = useTitleProps('title3');
    return (
        <TitleLayout
            title={
                <Text as={as} id={id} {...titleProps}>
                    {children}
                </Text>
            }
            right={right}
            dataAttributes={{'component-name': 'Title3', ...dataAttributes}}
        />
    );
};

export const Title4 = ({children, as = 'h3', id, right, dataAttributes}: TitleProps): React.ReactElement => {
    const titleProps = useTitleProps('title4');
    return (
        <TitleLayout
            title={
                <Text as={as} id={id} {...titleProps}>
                    {children}
                </Text>
            }
            right={right}
            dataAttributes={{'component-name': 'Title4', ...dataAttributes}}
        />
    );
};
