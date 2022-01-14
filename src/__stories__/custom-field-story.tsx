import * as React from 'react';
import classNames from 'classnames';
import {StorySection} from './helpers';
import {
    useTheme,
    Text2,
    Text3,
    TextField,
    Menu,
    Touchable,
    Box,
    Text1,
    createUseStyles,
    Form,
    Stack,
    useFieldProps,
    ButtonPrimary,
} from '..';
import {DOWN, ENTER, SPACE, UP} from '../utils/key-codes';
import {cancelEvent} from '../utils/dom';
import {combineRefs} from '../utils/common';

export default {
    title: 'Experiments/Custom field',
};

const OPTIONS = [
    {
        text: 'Albania',
        value: 'albania',
    },
    {
        text: 'Alemania',
        value: 'alemania',
    },
    {
        text: 'Andorra',
        value: 'andorra',
    },
    {
        text: 'Belgica',
        value: 'belgica',
    },
    {
        text: 'Brasil',
        value: 'brasil',
    },
    {
        text: 'Canada',
        value: 'canada',
    },
    {
        text: 'España',
        value: 'españa',
    },
    {
        text: 'Francia',
        value: 'francia',
    },
    {
        text: 'Grecia',
        value: 'grecia',
    },
];

const useStyles = createUseStyles(({mq}) => ({
    hover: {
        [mq.supportsHover]: {
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
            },
        },
    },
    selected: {backgroundColor: 'rgba(0, 0, 0, 0.08)'},
}));

type OptionsProps = {
    options: ReadonlyArray<{text: string; value: string}>;
    selectedValue: string;
    setFilterValue: any;
    setSelectedValue: any;
    className: string;
    closeMenu: () => void;
    elementRef: React.Ref<HTMLDivElement>;
};

const Options = ({
    className,
    options,
    selectedValue,
    setSelectedValue,
    setFilterValue,
    closeMenu,
    elementRef,
}: OptionsProps) => {
    const classes = useStyles();
    const {colors} = useTheme();
    const scrollRef = React.useRef<HTMLDivElement>();
    const optionRefs = React.useRef(new Map<string, HTMLDivElement>());
    const [tentativeValueState, setTentativeValueState] = React.useState('');

    const scrollIntoTargetListElement = (targetValueState: string) => {
        const menuClientRect = scrollRef.current?.getBoundingClientRect();
        if (menuClientRect && targetValueState && optionRefs.current.has(targetValueState)) {
            const itemRef = optionRefs.current.get(targetValueState);
            const clientRect = itemRef?.getBoundingClientRect();
            if (
                clientRect &&
                clientRect.top + clientRect.height / 2 >= menuClientRect.top + menuClientRect.height
            ) {
                itemRef?.scrollIntoView();
                return;
            }
            if (clientRect && clientRect.top + clientRect.height / 2 <= menuClientRect.top) {
                itemRef?.scrollIntoView(false);
            }
        }
    };

    React.useEffect(() => {
        const updateTentativeValueState = (e: KeyboardEvent) => {
            const keyToOperand: Record<number, 1 | -1 | undefined> = {[UP]: -1, [DOWN]: 1};
            const operand = keyToOperand[e.keyCode];
            if (operand) {
                cancelEvent(e);
                const newTentativeValueState =
                    options[options.findIndex(({value}) => value === tentativeValueState) + operand]?.value ??
                    tentativeValueState;
                setTentativeValueState(newTentativeValueState);
                scrollIntoTargetListElement(newTentativeValueState);
            }
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (tentativeValueState && (e.keyCode === ENTER || e.keyCode === SPACE)) {
                cancelEvent(e);
                if (
                    options.findIndex(({value}) => value === tentativeValueState) !== -1 &&
                    tentativeValueState !== selectedValue
                ) {
                    setSelectedValue(tentativeValueState);
                    setFilterValue(tentativeValueState);
                }
                closeMenu();
            }

            updateTentativeValueState(e);
        };
        document.addEventListener('keydown', handleKeyDown, false);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
        };
    });

    return (
        <div
            ref={combineRefs(elementRef, scrollRef)}
            className={className}
            onMouseDown={(event) => {
                // Prevent blur and lost input focus
                event.preventDefault();
            }}
        >
            {options.map((option) => (
                <Box
                    paddingX={16}
                    paddingY={8}
                    key={option.value}
                    className={classNames(classes.hover, {
                        [classes.selected]: option.value === tentativeValueState,
                    })}
                    ref={(liRef) => {
                        if (liRef) {
                            optionRefs.current.set(option.value, liRef);
                        } else {
                            optionRefs.current.delete(option.value);
                        }
                    }}
                >
                    <Touchable
                        onPress={() => {
                            setSelectedValue(option.value);
                            setFilterValue(option.value);
                            requestAnimationFrame(() => {
                                closeMenu();
                            });
                        }}
                    >
                        <Text1 as="p" regular>
                            {option.text}
                        </Text1>
                        <Text1 regular color={colors.textSecondary}>
                            {option.value}
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
    );
};

type AutocompleteSelectFieldProps = {
    name: string;
    options: ReadonlyArray<{text: string; value: string}>;
};

const AutocompleteSelectField = ({name, options}: AutocompleteSelectFieldProps) => {
    const inputRef = React.useRef<HTMLInputElement>();
    const [filteredOptions, setFilteredOptions] = React.useState(options);
    const [filterValue, setFilterValue] = React.useState('');
    const [selectedValue, setSelectedValue] = React.useState('');

    const fieldProps = useFieldProps({
        name,
        defaultValue: undefined,
        value: filterValue,
        processValue: (value: string) => value.trim(),
        helperText: undefined,
        optional: false,
        error: false,
        disabled: false,
        onBlur: undefined,
        validate: undefined,
        onChange: undefined,
        onChangeValue: undefined,
    });

    React.useEffect(() => {
        setFilteredOptions(options.filter(({value}) => value.includes(filterValue)));
    }, [filterValue, options]);

    const filterOptions = (valueInput: string, openMenu: () => void, isMenuOpen: boolean) => {
        if (!isMenuOpen) {
            openMenu();
        }
        setFilterValue(valueInput);
    };

    const checkIfRightOption = () => {
        if (filterValue === selectedValue) return;

        if (OPTIONS.filter(({value}) => value === filterValue).length === 0) {
            setFilterValue('');
            setSelectedValue('');
        }
    };
    return (
        <Menu
            renderTarget={({ref, onPress, isMenuOpen}) => (
                <TextField
                    {...fieldProps}
                    fullWidth
                    label="Autocomplete"
                    ref={combineRefs(ref, inputRef)}
                    onFocus={onPress}
                    onPress={() => {
                        if (!isMenuOpen) {
                            onPress();
                        }
                    }}
                    onChangeValue={(value) => filterOptions(value, onPress, isMenuOpen)}
                    onBlur={checkIfRightOption}
                    autoComplete="off"
                />
            )}
            renderMenu={({ref, className, close}) => (
                <Options
                    elementRef={ref}
                    options={filteredOptions}
                    className={className}
                    selectedValue={selectedValue}
                    setFilterValue={setFilterValue}
                    setSelectedValue={setSelectedValue}
                    closeMenu={close}
                />
            )}
        />
    );
};

export const Default: StoryComponent = () => {
    const [formData, setFormData] = React.useState<any>({});
    return (
        <StorySection title="Custom field">
            <Stack space={32}>
                <Text2 regular>
                    This is an example of how to create a custom form field based on Mistica's pieces. This
                    component is like a select with autocomplete feature.
                </Text2>
                <Form
                    onSubmit={(data) => {
                        setFormData(data);
                    }}
                >
                    <Stack space={24}>
                        <AutocompleteSelectField name="autocomplete" options={OPTIONS} />
                        <ButtonPrimary submit>Send</ButtonPrimary>
                        <Text2 as="pre" regular>
                            DATA: {JSON.stringify(formData, null, 2)}
                        </Text2>
                    </Stack>
                </Form>
            </Stack>
        </StorySection>
    );
};

Default.storyName = 'Custom field';
