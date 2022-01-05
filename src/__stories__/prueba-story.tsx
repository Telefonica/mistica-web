import * as React from 'react';
import {StorySection} from './helpers';
import {useTheme, Text3, TextField, Menu, Touchable, Box, Text1, createUseStyles} from '..';

export default {
    title: 'Components/Prueba/Prueba',
};

const useStyles = createUseStyles(({colors, mq}) => ({
    hover: {
        [mq.supportsHover]: {
            '&:hover': {
                background: colors.backgroundAlternative,
            },
        },
    },
}));

const OPTIONS = [
    {
        text: 'Option 1',
        value: 'option1',
    },
    {
        text: 'Option 2',
        value: 'option2',
    },
    {
        text: 'Patata 3 (checking this will close the menu)',
        value: 'patata',
    },
];

export const PruebaStory: StoryComponent = () => {
    const {colors} = useTheme();
    const classes = useStyles();
    const [options, setOptions] = React.useState(OPTIONS);
    const [filterValue, setFilterValue] = React.useState('');
    const [selected, setSelected] = React.useState('');

    const filterOptions = (valueInput: string) => {
        setFilterValue(valueInput);
    };

    const checkIfRightOption = () => {
        if (filterValue === selected) return;

        if (OPTIONS.filter(({value}) => value === filterValue).length === 0) {
            setFilterValue('');
            setSelected('');
        }
    };

    React.useEffect(() => {
        setOptions(OPTIONS.filter(({value}) => value.includes(filterValue)));
    }, [filterValue]);

    return (
        <>
            <StorySection title="Prueba">
                <Menu
                    renderTarget={({ref, onPress}) => (
                        <Touchable elementRef={ref} onPress={onPress}>
                            <TextField
                                fullWidth
                                value={filterValue}
                                name="prueba"
                                label="Prueba"
                                onChangeValue={filterOptions}
                                onBlur={checkIfRightOption}
                                autoComplete="off"
                            />
                        </Touchable>
                    )}
                    renderMenu={({ref, className, close}) => (
                        <div ref={ref} className={className}>
                            {options.map((option) => (
                                <Box paddingX={16} paddingY={8} key={option.value}>
                                    <Touchable
                                        className={classes.hover}
                                        onPress={() => {
                                            setSelected(option.value);
                                            setFilterValue(option.value);
                                            close();
                                        }}
                                    >
                                        <Text1 as="p" regular>
                                            {option.value}
                                        </Text1>
                                        <Text1 regular color={colors.textSecondary}>
                                            {option.text}
                                        </Text1>
                                    </Touchable>
                                </Box>
                            ))}
                            {options.length === 0 ? (
                                <Box paddingX={16} paddingY={8}>
                                    <Text3 regular color={colors.textSecondary}>
                                        No option
                                    </Text3>
                                </Box>
                            ) : null}
                        </div>
                    )}
                />
            </StorySection>
        </>
    );
};

PruebaStory.storyName = 'Prueba';
