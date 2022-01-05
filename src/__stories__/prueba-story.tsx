import * as React from 'react';
import classNames from 'classnames';
import {StorySection} from './helpers';
import {useTheme, Text3, TextField, Menu, Touchable, Box, Text1, createUseStyles, Form} from '..';
import {DOWN, ENTER, SPACE, UP} from '../utils/key-codes';
import {cancelEvent} from '../utils/dom';
import {combineRefs} from '../utils/common';

export default {
    title: 'Components/Prueba/Prueba',
};

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
    {
        text: 'Option 4',
        value: 'option4',
    },
    {
        text: 'Option 5',
        value: 'option5',
    },
    {
        text: 'Option 6',
        value: 'option6',
    },
    {
        text: 'Option 7',
        value: 'option7',
    },
];

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
    );
};

export const PruebaStory: StoryComponent = () => {
    const inputRef = React.useRef<HTMLInputElement>();
    const [options, setOptions] = React.useState(OPTIONS);
    const [filterValue, setFilterValue] = React.useState('');
    const [selectedValue, setSelectedValue] = React.useState('');

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

    React.useEffect(() => {
        setOptions(OPTIONS.filter(({value}) => value.includes(filterValue)));
    }, [filterValue]);

    return (
        <StorySection title="Prueba">
            <Form onSubmit={() => {}}>
                <Menu
                    renderTarget={({ref, onPress, isMenuOpen}) => (
                        <TextField
                            ref={combineRefs(ref, inputRef)}
                            onFocus={onPress}
                            fullWidth
                            value={filterValue}
                            name="prueba"
                            label="Prueba"
                            onChangeValue={(value) => filterOptions(value, onPress, isMenuOpen)}
                            onBlur={checkIfRightOption}
                            autoComplete="off"
                        />
                    )}
                    renderMenu={({ref, className, close}) => (
                        <Options
                            elementRef={ref}
                            options={options}
                            className={className}
                            selectedValue={selectedValue}
                            setFilterValue={setFilterValue}
                            setSelectedValue={setSelectedValue}
                            closeMenu={close}
                        />
                    )}
                />
            </Form>
        </StorySection>
    );
};

PruebaStory.storyName = 'Prueba';
