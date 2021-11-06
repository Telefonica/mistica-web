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
    IconCheckRegular,
    FadeIn,
    IconCallCenterUserSupportFilled,
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

export const MisticaIcons: React.FC = () => {
    const [showRegular, regularCheckbox] = useCheckbox('Regular', true);
    const [showLight, lightCheckbox] = useCheckbox('Light', false);
    const [showFilled, filledCheckbox] = useCheckbox('Filled', false);
    const [isInverse, inverseCheckbox] = useCheckbox('Inverse', false);
    const [showNames, showNamesCheckbox] = useCheckbox('Name', true);
    const [showCircle, showCircleCheckbox] = useCheckbox('Circled', false);
    const [showIconBackground, showIconBackgroundCheckbox] = useCheckbox('Icon area', false);
    const [filter, setFilter] = React.useState('');
    const [size, setSize] = React.useState(24);
    const {colors} = useTheme();
    const [selectedColor, setSelectedColor] = React.useState(colors.neutralHigh);

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

    const backgroundColor = isInverse ? selectedColor : colors.background;
    const iconBackgroundColor = showIconBackground ? '#FF13FA32' : 'none';
    // const circle = showCircle ? <Circle size={40} backgroundColor={colors.neutralHigh}></Circle> : "none"; — Opción para meter el icono en un circulo
    const {isTabletOrSmaller, isTablet} = useScreenSize();

    return (
        <div
            style={{
                flexDirection: isTabletOrSmaller ? 'column' : 'row',
                width: '100%',
                background: isInverse ? selectedColor : colors.background,
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
                        position: 'fixed',
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
                                label="Search an icon..."
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
                                            <div style={{width: '160px'}}>{showCircleCheckbox}</div>
                                            <div style={{width: '160px'}}>{showIconBackgroundCheckbox}</div>
                                        </Inline>
                                    </Stack>
                                </Inline>
                            ) : (
                                <Stack space={16}>
                                    <Inline space="between">
                                    <input type="range" name="size" style={{width: "150%" }}  min={16} max={120} step={8} onChange={(v) => setSize(v.target.value)} value={size}/>
                                    <Text3>{size}</Text3>
                                    </Inline>
                                    <RadioGroup
                                        name="colorPicker"
                                        aria-labelledby="custom-render"
                                        value={selectedColor}
                                        onChange={setSelectedColor}
                                    >
                                        <Inline space="between">
                                            {[
                                                colors.neutralHigh,
                                                colors.neutralMedium,
                                                colors.brand,
                                                colors.success,
                                                colors.warning,
                                                colors.error,
                                            ].map((pickerColor) => (
                                                <RadioButton
                                                    value={selectedColor}
                                                    render={() => (
                                                        <Circle size={32} backgroundColor={pickerColor}>
                                                            {(selectedColor === colors.neutralHigh ||
                                                                selectedColor) && (
                                                                <IconCheckRegular
                                                                    size={18}
                                                                    color={colors.inverse}
                                                                />
                                                            )}
                                                        </Circle>
                                                    )}
                                                />
                                            ))}
                                        </Inline>
                                    </RadioGroup>

                                    <Divider /> 
                                    {lightCheckbox}
                                    {regularCheckbox}
                                    {filledCheckbox}
                                    <Divider />
                                    {inverseCheckbox}
                                    {showNamesCheckbox}
                                    {showCircleCheckbox}
                                    {showIconBackgroundCheckbox}
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
                                margin: isTabletOrSmaller ? '177px auto 0 auto' : '0 auto',
                                maxWidth: '100%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
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
                                            height: "auto",
                                            margin: '0 auto',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Box padding={24}>
                                            <div
                                                style={{
                                                    // transition: 'padding 0.25s ease-in-out',
                                                    padding: showNames
                                                        ? '16px 0 16px 0'
                                                        : '32px 0 24px 0',
                                                    position: "relative",
                                                    width: "auto",
                                                    transformOrigin: 'center center',
                                                }}
                                            >
                                                <Stack space={16}>
                                                    <div
                                                        style={{
                                                            width: size,
                                                            margin: 'auto',
                                                            fontSize: 0,
                                                            transformOrigin: 'center',
                                                        }}
                                                    >
                                                    {showCircle ?
                                                        <Circle size={size + 16} backgroundColor={isInverse ? colors.inverse : selectedColor}>
                                                            <div
                                                        style={{
                                                            width: size,
                                                            background: iconBackgroundColor,
                                                        }}
                                                    >
                                                        <Icon
                                                            size={size}
                                                            color={showCircle && isInverse ? selectedColor : colors.inverse}
                                                            id="custom-render"
                                                        />
                                                        </div>
                                                        </Circle>
                                                        :
                                                        <div
                                                        style={{
                                                            width: size,
                                                            background: iconBackgroundColor,
                                                        }}
                                                    >
                                                        <Icon
                                                            size={size}
                                                            color={isInverse ? colors.inverse : selectedColor}
                                                            id="custom-render"
                                                        />
                                                        </div>
                                                    }
                                                    </div>
                                                    <FadeIn
                                                        delay="0"
                                                        duration="300"
                                                        // meter fadein cuando se activa/desactiva el checkbox de name
                                                    >
                                                        {showNames && (
                                                            <Text1 regular color={colors.textSecondary}>
                                                                {breakName(Icon.name)}
                                                            </Text1>
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
