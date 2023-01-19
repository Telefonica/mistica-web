import * as React from 'react';
import {useCheckbox} from '../../__stories__/helpers';
import {ThemeVariant, Box, Stack, SearchField, Inline, DoubleField, Text, skinVars} from '../..';
import IntegerField from '../../integer-field';
import {kebabCase, camelCase, upperFirst} from 'lodash';

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
})(require.context('../../generated/mistica-icons/', true, /\.tsx$/));

export default {
    title: 'Icons/Catalog',
};

export const Catalog = (): JSX.Element => {
    const [showRegular, regularCheckbox] = useCheckbox('Regular', true);
    const [showLight, lightCheckbox] = useCheckbox('Light', true);
    const [showFilled, filledCheckbox] = useCheckbox('Filled', true);
    const [isInverse, inverseCheckbox] = useCheckbox('Inverse', false);
    const [showNames, showNamesCheckbox] = useCheckbox('Show names', true);
    const [showIConBackground, showIConBackgroundCheckbox] = useCheckbox('Show background', false);
    const [filter, setFilter] = React.useState('');
    const [size, setSize] = React.useState(64);

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
        if (!showFilled && name.endsWith('Filled')) {
            return false;
        }
        if (!showLight && name.endsWith('Light')) {
            return false;
        }
        if (!showRegular && name.endsWith('Regular')) {
            return false;
        }

        if (filter && !getRealName(name).toLowerCase().includes(filter.toLocaleLowerCase())) {
            return false;
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

    const backgroundColor = isInverse ? skinVars.colors.backgroundBrand : skinVars.colors.background;
    const iconBackgroundColor = showIConBackground ? '#aaa' : 'none';

    return (
        <div>
            <Box paddingY={16}>
                <Inline space={16}>
                    <DoubleField>
                        <SearchField name="filter" value={filter} label="Filter" onChangeValue={setFilter} />
                        <IntegerField
                            name="size"
                            value={String(size || 0)}
                            label="Size (px)"
                            onChangeValue={(v) => setSize(Number(v) || 0)}
                        />
                    </DoubleField>
                    <Stack space={8}>
                        <Inline space={16}>
                            {regularCheckbox}
                            {lightCheckbox}
                            {filledCheckbox}
                        </Inline>
                        <Inline space={16}>
                            {inverseCheckbox}
                            {showNamesCheckbox}
                            {showIConBackgroundCheckbox}
                        </Inline>
                    </Stack>
                </Inline>
            </Box>

            <ThemeVariant isInverse={isInverse}>
                <div style={{background: backgroundColor}}>
                    {misticaIcons
                        .filter(({componentName}) => filterIcon(componentName))
                        .sort((a, b) => compareNames(a.componentName, b.componentName))
                        .map((Icon) => (
                            <div style={{display: 'inline-block', verticalAlign: 'top', textAlign: 'center'}}>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        padding: 16,
                                        width: size,
                                        minWidth: showNames ? 100 : 0,
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
                                    {showNames && (
                                        <Box paddingTop={8}>
                                            <Text size={13}>{breakName(Icon.componentName)}</Text>
                                        </Box>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </ThemeVariant>
        </div>
    );
};
