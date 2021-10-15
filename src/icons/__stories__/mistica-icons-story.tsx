import * as React from 'react';
import {useCheckbox} from '../../__stories__/helpers';
import {ThemeVariant, useTheme, Box, Stack, SearchField, Inline, Divider, Text1} from '../..';
import IntegerField from '../../integer-field';
import {kebabCase, upperFirst} from 'lodash';
import {useScreenSize} from '../../hooks';

// require all icons
const misticaIcons = ((requireContext) =>
    requireContext
        .keys()
        .map((id: string) => requireContext(id))
        .map((module: any) => module.default))(
    require.context('../../generated/mistica-icons/', true, /\.tsx$/)
);

export default {
    title: 'Icons/Mistica Icons',
    parameters: {
        fullScreen: true,
    },
};

export const Catalog: React.FC = () => {
    const [showRegular, regularCheckbox] = useCheckbox('Regular', true);
    const [showLight, lightCheckbox] = useCheckbox('Light', false);
    const [showFilled, filledCheckbox] = useCheckbox('Filled', false);
    const [isInverse, inverseCheckbox] = useCheckbox('Inverse', false);
    const [showNames, showNamesCheckbox] = useCheckbox('Name', true);
    const [showIConBackground, showIConBackgroundCheckbox] = useCheckbox('Icon area', false);
    const [filter, setFilter] = React.useState('');
    const [size, setSize] = React.useState(24);
    const {colors} = useTheme();

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

    const backgroundColor = isInverse ? colors.backgroundBrand : colors.background;
    const iconBackgroundColor = showIConBackground ? '#FF13FA32' : 'none';
    const {isTabletOrSmaller, isTablet} = useScreenSize();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: isTabletOrSmaller ? 'column' : 'row',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: isTabletOrSmaller ? 'column' : 'row',
                }}
            >
                <div
                    style={{
                        height: isTabletOrSmaller ? 'auto' : '100vh',
                        width: isTabletOrSmaller ? 'auto' : '280px',
                        position: isTabletOrSmaller ? 'static' : 'fixed',
                        background: colors.background,
                        borderRight: isTabletOrSmaller ? 'none' : '1px solid' + colors.divider,
                        borderBottom: isTabletOrSmaller ? '1px solid' + colors.divider : 'none',
                    }}
                >
                    <Box padding={16}>
                        <Stack space={16}>
                            <SearchField
                                name="filter"
                                value={filter}
                                label="Filter"
                                onChangeValue={setFilter}
                                fullWidth
                            />
                            {isTabletOrSmaller ? (
                                <Inline space={16} fullWidth>
                                    <IntegerField
                                        name="size"
                                        value={String(size || 0)}
                                        label="Size (px)"
                                        onChangeValue={(v) => setSize(Number(v) || 0)}
                                    />
                                    <Stack space="between">
                                        <Inline space="between">
                                            <div style={{width: '160px'}}>{lightCheckbox}</div>
                                            <div style={{width: '160px'}}>{regularCheckbox}</div>
                                            <div style={{width: '160px'}}>{filledCheckbox}</div>
                                        </Inline>
                                        <Inline space="between">
                                            <div style={{width: '160px'}}>{inverseCheckbox}</div>
                                            <div style={{width: '160px'}}>{showNamesCheckbox}</div>
                                            <div style={{width: '160px'}}>{showIConBackgroundCheckbox}</div>
                                        </Inline>
                                    </Stack>
                                </Inline>
                            ) : (
                                <Stack space={16}>
                                    <IntegerField
                                        name="size"
                                        value={String(size || 0)}
                                        label="Size (px)"
                                        onChangeValue={(v) => setSize(Number(v) || 0)}
                                        fullWidth
                                    />
                                    <Divider />
                                    {lightCheckbox}
                                    {regularCheckbox}
                                    {filledCheckbox}
                                    <Divider />
                                    {inverseCheckbox}
                                    {showNamesCheckbox}
                                    {showIConBackgroundCheckbox}
                                </Stack>
                            )}
                        </Stack>
                    </Box>
                </div>
                <div
                    style={{
                        display: 'flex',
                        width: isTabletOrSmaller ? 'auto' : 'calc(100% - 280px)',
                        marginLeft: isTabletOrSmaller ? '0' : '280px',
                    }}
                >
                    <ThemeVariant isInverse={isInverse}>
                        <div style={{background: backgroundColor}}>
                            {misticaIcons
                                .filter(({name}) => filterIcon(name))
                                .sort((a, b) => compareNames(a.name, b.name))
                                .map((Icon) => (
                                    <div
                                        style={{
                                            display: 'inline-block',
                                            verticalAlign: 'top',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                padding: 0,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    margin: 'auto',
                                                    padding: showNames
                                                        ? '48px 16px 24px 16px'
                                                        : '72px 16px 72px 16px',
                                                    borderRight: '1px solid' + colors.divider,
                                                    borderBottom: '1px solid' + colors.divider,
                                                    borderRadius: '0px',
                                                    width: 163,
                                                    height: showNames ? '96px' : 'auto',
                                                    fontSize: 0,
                                                }}
                                            >
                                                <Stack space="between">
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
                                                        <Text1 regular>{breakName(Icon.name)}</Text1>
                                                    )}
                                                </Stack>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </ThemeVariant>
                </div>
            </div>
        </div>
    );
};
