import * as React from 'react';
import * as misticaIcons from '../../generated/mistica-icons';
import {useCheckbox} from '../../__stories__/helpers';
import {ThemeVariant, useTheme, Box, Stack, FormSearchField, Inline, DoubleField} from '../..';
import FormIntegerField from '../../form-integer-field';

export default {
    title: 'Icons|Mistica Icons',
};

export const Catalog: StoryComponent = () => {
    const [showRegular, regularCheckbox] = useCheckbox('Regular', true);
    const [showLight, lightCheckbox] = useCheckbox('Light', true);
    const [showFilled, filledCheckbox] = useCheckbox('Filled', true);
    const [isInverse, inverseCheckbox] = useCheckbox('Inverse', false);
    const [showNames, showNamesCheckbox] = useCheckbox('Show names', false);
    const [showIConBackground, showIConBackgroundCheckbox] = useCheckbox('Show background', false);
    const [filter, setFilter] = React.useState('');
    const [size, setSize] = React.useState(64);
    const {colors} = useTheme();

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

        const realName = name.replace(/^Icon/, '').replace(/(Regular|Filled|Light)$/, '');

        if (filter && !realName.toLowerCase().includes(filter.toLocaleLowerCase())) {
            return false;
        }

        return true;
    };

    const backgroundColor = isInverse ? colors.backgroundBrand : colors.background;
    const textColor = isInverse ? colors.textPrimaryInverse : colors.textPrimary;
    const iconBackgroundColor = showIConBackground ? '#aaa' : 'none';

    return (
        <div>
            <Box paddingY={16}>
                <Inline space={16}>
                    <DoubleField>
                        <FormSearchField
                            name="filter"
                            value={filter}
                            label="Filter"
                            onChangeValue={setFilter}
                        />
                        <FormIntegerField
                            name="size"
                            value={String(size || 0)}
                            label="Size (px)"
                            onChangeValue={(v) => setSize(Number(v) || 0)}
                        />
                    </DoubleField>
                    <Stack space={16}>
                        <>
                            <b>Type:</b> {filledCheckbox} {lightCheckbox} {regularCheckbox}
                        </>
                        <>
                            {inverseCheckbox} {showNamesCheckbox} {showIConBackgroundCheckbox}
                        </>
                    </Stack>
                </Inline>
            </Box>

            <ThemeVariant isInverse={isInverse}>
                <div style={{background: backgroundColor}}>
                    {Object.entries(misticaIcons)
                        .filter(([name]) => filterIcon(name))
                        .map(([name, Icon]) => (
                            <div style={{display: 'inline-block', textAlign: 'center'}}>
                                <div style={{textAlign: 'center', padding: 16}}>
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
                                    {showNames && <div style={{color: textColor, marginTop: 8}}>{name}</div>}
                                </div>
                            </div>
                        ))}
                </div>
            </ThemeVariant>
        </div>
    );
};
