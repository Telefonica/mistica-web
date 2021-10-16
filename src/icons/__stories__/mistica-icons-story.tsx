import * as React from 'react';
import {useCheckbox} from '../../__stories__/helpers';
import {
    ThemeVariant,
    useTheme,
    Box,
    Stack,
    SearchField,
    Inline,
    Divider,
    Text1,
    TextField,
    Circle,
    RadioGroup,
    RadioButton,
    Text3,
    IconCheckedRegular,
    IconCheckRegular,
    FadeIn,
} from '../..';
import IntegerField from '../../integer-field';
import {kebabCase, upperFirst} from 'lodash';
import {useScreenSize} from '../../hooks';
import {NoEmitOnErrorsPlugin} from 'webpack';
import overscrollColorStory from '../../__stories__/overscroll-color-story';

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
    const [changeColor, changeColorRadio] = React.useState('neutralHigh ');
    // const [showCircle, circleCheckbox] = useCheckbox('Circle', false);
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
    // const circle = showCircle ? <Circle size={40} backgroundColor={colors.neutralHigh}></Circle> : "none"; — Opción para meter el icono en un circulo
    const {isTabletOrSmaller, isTablet} = useScreenSize();

    return (
        <div
            style={{
                flexDirection: isTabletOrSmaller ? 'column' : 'row',
                width: '100%',
                background: isInverse ? colors.brand : colors.background,
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
                        width: isTabletOrSmaller ? '100%' : '280px',
                        position: isTabletOrSmaller ? 'fixed' : 'fixed',
                        zIndex: 2,
                        background: colors.background,
                        borderRight: isTabletOrSmaller ? 'none' : `1px solid ${colors.divider}`,
                        borderBottom: isTabletOrSmaller ? `1px solid ${colors.divider}` : 'none',
                    }}
                >
                    <Box padding={16}>
                        <Stack space={16}>
                            <SearchField
                                name="filter"
                                value={filter}
                                label="Find icons"
                                onChangeValue={setFilter}
                                fullWidth
                            />
                            <Divider />
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
                                    <RadioGroup
                                        name="group1"
                                        aria-labelledby="custom-render"
                                        value={changeColor}
                                        onChange={changeColorRadio}
                                        defaultValue={colors.neutralHigh}
                                    >
                                        <Inline space="between">
                                            <RadioButton
                                                value={colors.neutralHigh}
                                                render={() => (
                                                    <Inline space={16}>
                                                        <Circle
                                                            size={32}
                                                            backgroundColor={colors.neutralHigh}
                                                        >
                                                            {changeColor === colors.neutralHigh && (
                                                                <IconCheckRegular
                                                                    size={18}
                                                                    color={colors.inverse}
                                                                />
                                                            )}
                                                        </Circle>
                                                    </Inline>
                                                )}
                                            />
                                            <RadioButton
                                                value={colors.neutralMedium}
                                                render={() => (
                                                    <Inline space={16}>
                                                        <Circle
                                                            size={32}
                                                            backgroundColor={colors.neutralMedium}
                                                        >
                                                            {changeColor === colors.neutralMedium && (
                                                                <IconCheckRegular
                                                                    size={18}
                                                                    color={colors.inverse}
                                                                />
                                                            )}
                                                        </Circle>
                                                    </Inline>
                                                )}
                                            />
                                            <RadioButton
                                                value={colors.brand}
                                                render={() => (
                                                    <Circle size={32} backgroundColor={colors.brand}>
                                                        {changeColor === colors.brand && (
                                                            <IconCheckRegular
                                                                size={18}
                                                                color={colors.inverse}
                                                            />
                                                        )}
                                                    </Circle>
                                                )}
                                            />
                                            <RadioButton
                                                value={colors.success}
                                                render={() => (
                                                    <Inline space={16}>
                                                        <Circle size={32} backgroundColor={colors.success}>
                                                            {changeColor === colors.success && (
                                                                <IconCheckRegular
                                                                    size={18}
                                                                    color={colors.inverse}
                                                                />
                                                            )}
                                                        </Circle>
                                                    </Inline>
                                                )}
                                            />
                                            <RadioButton
                                                value={colors.warning}
                                                render={() => (
                                                    <Inline space={16}>
                                                        <Circle size={32} backgroundColor={colors.warning}>
                                                            {changeColor === colors.warning && (
                                                                <IconCheckRegular
                                                                    size={18}
                                                                    color={colors.inverse}
                                                                />
                                                            )}
                                                        </Circle>
                                                    </Inline>
                                                )}
                                            />
                                            <RadioButton
                                                value={colors.error}
                                                render={() => (
                                                    <Inline space={16}>
                                                        <Circle size={32} backgroundColor={colors.error}>
                                                            {changeColor === colors.error && (
                                                                <IconCheckRegular
                                                                    size={18}
                                                                    color={colors.inverse}
                                                                />
                                                            )}
                                                        </Circle>
                                                    </Inline>
                                                )}
                                            />
                                        </Inline>
                                    </RadioGroup>

                                    <Divider />
                                    {lightCheckbox}
                                    {regularCheckbox}
                                    {filledCheckbox}
                                    <Divider />
                                    {inverseCheckbox}
                                    {showNamesCheckbox}
                                    {showIConBackgroundCheckbox}
                                    {/* {showCircle} */}
                                </Stack>
                            )}
                        </Stack>
                    </Box>
                </div>
                <div style={{width: isTabletOrSmaller ? '100%' : 'calc(100% - 280px)', marginLeft: 'auto'}}>
                    <ThemeVariant isInverse={isInverse}>
                        <div
                            style={{
                                margin: '0 auto',
                                maxWidth: '100%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                                gridGap: '1px',
                                alignItems: 'stretch',
                                borderBottom: `1px solid ${colors.divider}`,
                            }}
                        >
                            {misticaIcons
                                .filter(({name}) => filterIcon(name))
                                .sort((a, b) => compareNames(a.name, b.name))
                                .map((Icon) => (
                                    // card
                                    <div
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            boxShadow: `0px 0px 0px 1px ${colors.divider}`,
                                            background: backgroundColor,
                                            borderRadius: '0px',
                                            border: '0px solid #eee',
                                            width: '100%',
                                            textAlign: 'center',
                                            height: size + 136,
                                            margin: '0 auto',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Box padding={16}>
                                            <div
                                                style={{
                                                    transition: 'padding 0.25s ease-in-out',
                                                    padding: showNames
                                                        ? '24px 8px 24px 8px'
                                                        : '48px 8px 72px 8px',
                                                }}
                                            >
                                                <Stack space={16}>
                                                    <div
                                                        style={{
                                                            width: size,
                                                            margin: 'auto',
                                                            background: iconBackgroundColor,
                                                            fontSize: 0,
                                                        }}
                                                    >
                                                        <Icon
                                                            size={size}
                                                            color={isInverse ? colors.inverse : changeColor}
                                                            id="custom-render"
                                                        />
                                                    </div>
                                                    <FadeIn
                                                        delay="0"
                                                        duration="300"
                                                        // meter fadein cuando se activa/desactiva el checkbox de name
                                                    >
                                                        {showNames && (
                                                            <Text1 regular>{breakName(Icon.name)}</Text1>
                                                        )}
                                                    </FadeIn>
                                                </Stack>
                                            </div>
                                        </Box>
                                    </div>
                                ))}
                        </div>
                    </ThemeVariant>
                </div>
            </div>
        </div>
    );
};
