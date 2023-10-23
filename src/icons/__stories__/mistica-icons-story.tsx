import * as React from 'react';
import {Box, ResponsiveLayout, Text} from '../..';
import {kebabCase, camelCase, upperFirst} from 'lodash';
import iconKeywords from '../../generated/mistica-icons/icons-keywords';

/**
 * './path/icon-name-filled.tsx' => 'IconNameFilled'
 */
const fileNameToComponentName = (fileName: string) => {
    const lastSlashIdx = fileName.lastIndexOf('/');
    return upperFirst(camelCase(fileName.slice(lastSlashIdx + 1).replace('.tsx', '')));
};

// require all icons
const misticaIcons = ((requireContext) => {
    return requireContext.keys().map((id: string) => {
        const component = requireContext(id).default;
        component.componentName = fileNameToComponentName(id);
        return component;
    });
})(require.context('../../generated/mistica-icons/', true, /^(?!\.\/icons\-keywords\.tsx$).+\.(?:tsx)$/));

export default {
    title: 'Icons/Catalog',
    argTypes: {
        size: {
            control: {type: 'range', min: 24, max: 48, step: 4},
        },
    },
    parameters: {fullScreen: true},
};

type Args = {
    filter: string;
    size: number;
    regular: boolean;
    light: boolean;
    filled: boolean;
    inverse: boolean;
    names: boolean;
    background: boolean;
};

export const Catalog: StoryComponent<Args> = ({
    filter,
    size,
    regular,
    light,
    filled,
    inverse,
    names,
    background,
}) => {
    const getRealName = (name: string) => name.replace(/^Icon/, '').replace(/(Regular|Filled|Light)$/, '');
    const getTypeSortValue = (name: string) => {
        if (name.endsWith('Regular')) {
            return 0;
        }
        if (name.endsWith('Light')) {
            return 1;
        }
        return 2;
    };

    const filterIcon = (name: string): boolean => {
        if (!filled && name.endsWith('Filled')) {
            return false;
        }
        if (!light && name.endsWith('Light')) {
            return false;
        }
        if (!regular && name.endsWith('Regular')) {
            return false;
        }

        if (filter) {
            const realName = getRealName(name);
            const keywords = [...(iconKeywords[kebabCase(realName)] || []), realName.toLowerCase()];
            return keywords.some((key) => key.includes(filter.toLocaleLowerCase()));
        }

        return true;
    };

    const compareNames = (a: string, b: string): number => {
        const realA = getRealName(a);
        const realB = getRealName(b);
        if (realA < realB) {
            return -1;
        }
        if (realA > realB) {
            return 1;
        }
        return getTypeSortValue(a) < getTypeSortValue(b) ? -1 : 1;
    };

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

    const iconBackgroundColor = background ? '#aaa' : 'none';

    return (
        <ResponsiveLayout fullWidth isInverse={inverse}>
            {misticaIcons
                .filter(({componentName}) => filterIcon(componentName))
                .sort((a, b) => compareNames(a.componentName, b.componentName))
                .map((Icon, index) => (
                    <div
                        key={index}
                        style={{display: 'inline-block', verticalAlign: 'top', textAlign: 'center'}}
                    >
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
                                <Icon size={size} />
                            </div>
                            {names && (
                                <Box paddingTop={8}>
                                    <Text size={13}>{breakName(Icon.componentName)}</Text>
                                </Box>
                            )}
                        </div>
                    </div>
                ))}
        </ResponsiveLayout>
    );
};

Catalog.args = {
    filter: '',
    size: 32,
    regular: true,
    light: true,
    filled: true,
    inverse: false,
    names: true,
    background: false,
};
