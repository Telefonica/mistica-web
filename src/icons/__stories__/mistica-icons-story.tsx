import * as React from 'react';
import {Box, Icon, ResponsiveLayout, Text} from '../..';
import {kebabCase, upperFirst, sortBy} from 'lodash';
import {iconKeywords, iconCategories} from '../../generated/mistica-icons/icons-keywords';

import type {Variant} from '../../theme-variant-context';

const availableCategories = ['All', ...new Set(sortBy(Object.values(iconCategories).flat()))];
const misticaIcons = Object.keys(iconKeywords).reduce<Array<string>>((acc, icon) => {
    acc.push(`${icon}-regular`, `${icon}-light`, `${icon}-filled`);
    return acc;
}, []);

export default {
    title: 'Icons/Catalog',
    argTypes: {
        size: {
            control: {type: 'range', min: 16, max: 48, step: 4},
        },
        category: {
            control: {type: 'select'},
            options: availableCategories,
        },
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
    },
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    category: string;
    filter: string;
    size: number;
    regular: boolean;
    light: boolean;
    filled: boolean;
    variantOutside: Variant;
    names: boolean;
    background: boolean;
};

export const Catalog: StoryComponent<Args> = ({
    category,
    filter,
    size,
    regular,
    light,
    filled,
    variantOutside,
    names,
    background,
}) => {
    const getRealName = (name: string) => name.replace(/-(regular|light|filled)$/i, '');

    const getVariant = React.useCallback((name: string): 'regular' | 'light' | 'filled' | null => {
        if (name.endsWith('-regular')) return 'regular';
        if (name.endsWith('-light')) return 'light';
        if (name.endsWith('-filled')) return 'filled';
        return null;
    }, []);

    const getTypeSortValue = React.useCallback(
        (name: string) => {
            const variant = getVariant(name);
            if (variant === 'regular') return 0;
            if (variant === 'light') return 1;
            return 2;
        },
        [getVariant]
    );

    const filterIcon = React.useCallback(
        (name: string): boolean => {
            const variant = getVariant(name);

            if (!filled && variant === 'filled') return false;
            if (!light && variant === 'light') return false;
            if (!regular && variant === 'regular') return false;

            const realName = getRealName(name);
            const iconKeywordsData = iconKeywords[kebabCase(realName)];
            const iconCategoriesData = iconCategories[kebabCase(realName)];

            if (category && category !== 'All') {
                const categories = iconCategoriesData || [];
                if (!categories.includes(category)) return false;
            }

            if (filter) {
                const keywords = iconKeywordsData || [];
                const categories = iconCategoriesData || [];
                const allSearchableTerms = [...keywords, ...categories, realName.toLowerCase()];
                return allSearchableTerms.some((key) => key.toLowerCase().includes(filter.toLowerCase()));
            }

            return true;
        },
        [category, filled, filter, light, regular, getVariant]
    );

    const compareNames = React.useCallback(
        (a: string, b: string): number => {
            const realA = getRealName(a);
            const realB = getRealName(b);
            if (realA < realB) {
                return -1;
            }
            if (realA > realB) {
                return 1;
            }
            return getTypeSortValue(a) < getTypeSortValue(b) ? -1 : 1;
        },
        [getTypeSortValue]
    );

    const breakName = (name: string) =>
        kebabCase(name)
            .split('-')
            .map(upperFirst)
            .map((part, i) => (
                <span key={i}>
                    {part}
                    <wbr />
                </span>
            ));

    const filteredAndSortedIcons = React.useMemo(
        () => misticaIcons.filter((name) => filterIcon(name)).sort((a, b) => compareNames(a, b)),
        [compareNames, filterIcon]
    );

    const iconBackgroundColor = background ? '#aaa' : 'none';

    return (
        <ResponsiveLayout fullWidth variant={variantOutside}>
            {filteredAndSortedIcons.map((name) => (
                <div key={name} style={{display: 'inline-block', verticalAlign: 'top', textAlign: 'center'}}>
                    <div
                        style={{
                            textAlign: 'center',
                            padding: 16,
                            width: size,
                            minWidth: names ? 100 : 0,
                        }}
                    >
                        <div
                            style={{
                                width: size,
                                margin: 'auto',
                                background: iconBackgroundColor,
                                fontSize: 0,
                            }}
                        >
                            <Icon name={name} size={size} />
                        </div>
                        {names && (
                            <Box paddingTop={8}>
                                <Text size={13}>{breakName(name)}</Text>
                            </Box>
                        )}
                    </div>
                </div>
            ))}
        </ResponsiveLayout>
    );
};

Catalog.args = {
    category: 'All',
    filter: '',
    size: 24,
    regular: true,
    light: true,
    filled: true,
    variantOutside: 'default',
    names: true,
    background: false,
};
