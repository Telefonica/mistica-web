import * as React from 'react';
import TextFieldBase from './text-field-base';
import IconCalendarRegular from './generated/mistica-icons/icon-calendar-regular';
import Datetime from 'react-datetime';
import Overlay from './overlay';
import {DEFAULT_WIDTH} from './text-field-components';
import IconButton from './icon-button';
import {cancelEvent, createChangeEvent} from './utils/dom';
import {createUseStyles} from './jss';
import {useElementDimensions, useTheme} from './hooks';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';

import type {CommonFormFieldProps} from './text-field-base';
import type Moment from 'moment';

/**
 * Do not use this component!
 * Use DateField or FormDateTimeField
 *
 * This component is a fallback for browsers that don't support datetime-local or date inputs
 */

const browserLocale = navigator.language.toLocaleLowerCase().split('-')[0];
import(/* webpackChunkName: "moment-locale" */ `moment/locale/${browserLocale}`).finally(() => {});

export interface DateTimePickerProps extends CommonFormFieldProps {
    inputRef: (field: HTMLInputElement | null) => void;
    isValidDate?: (currentDate: Moment.Moment, selectedDate: Moment.Moment) => boolean;
    withTime?: boolean;
    mode?: 'year-month';
}

// styles from "react-datetime/css/react-datetime.css" converted to JSS "as is"
const useStyles = createUseStyles(() => ({
    reactDatePicker: {
        '& td, & th': {verticalAlign: 'middle'},
        '& .rdt': {position: 'relative', userSelect: 'none'},
        '& .rdtPicker': {
            display: 'none',
            position: 'absolute',
            minWidth: 250,
            padding: 4,
            marginTop: 1,
            zIndex: '99999 !important',
            background: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,.1)',
            border: '1px solid #f9f9f9',
        },
        '& .rdtOpen .rdtPicker': {display: 'block'},
        '& .rdtStatic .rdtPicker': {boxShadow: 'none', position: 'static'},
        '& .rdtPicker .rdtTimeToggle': {textAlign: 'center'},
        '& .rdtPicker table': {width: '100%', margin: 0},
        '& .rdtPicker td, & .rdtPicker th': {textAlign: 'center', height: 28},
        '& .rdtPicker td': {cursor: 'pointer'},
        '& .rdtPicker td.rdtDay:hover, & .rdtPicker td.rdtHour:hover, & .rdtPicker td.rdtMinute:hover, & .rdtPicker td.rdtSecond:hover, & .rdtPicker .rdtTimeToggle:hover':
            {
                background: '#eeeeee',
                cursor: 'pointer',
            },
        '& .rdtPicker td.rdtOld, & .rdtPicker td.rdtNew': {color: '#999999'},
        '& .rdtPicker td.rdtToday': {position: 'relative'},
        '& .rdtPicker td.rdtToday:before': {
            content: '""',
            display: 'inline-block',
            borderLeft: '7px solid transparent',
            borderBottom: '7px solid #428bca',
            borderTopColor: 'rgba(0, 0, 0, 0.2)',
            position: 'absolute',
            bottom: 4,
            right: 4,
        },
        '& .rdtPicker td.rdtActive, & .rdtPicker td.rdtActive:hover': {
            backgroundColor: '#428bca',
            color: '#fff',
            textShadow: '0 -1px 0 rgba(0, 0, 0, 0.25)',
        },
        '& .rdtPicker td.rdtActive.rdtToday:before': {borderBottomColor: '#fff'},
        '& .rdtPicker td.rdtDisabled, & .rdtPicker td.rdtDisabled:hover': {
            background: 'none',
            color: '#999999',
            cursor: 'default',
        },
        '& .rdtPicker td span.rdtOld': {color: '#999999'},
        '& .rdtPicker td span.rdtDisabled, & .rdtPicker td span.rdtDisabled:hover': {
            background: 'none',
            color: '#999999',
            cursor: 'default',
        },
        '& .rdtPicker th': {borderBottom: '1px solid #f9f9f9', fontWeight: 'bold'},
        '& .rdtPicker .dow': {width: '14.2857%', borderBottom: 'none', cursor: 'default'},
        '& .rdtPicker th.rdtSwitch': {width: 100},
        '& .rdtPicker th.rdtNext, & .rdtPicker th.rdtPrev': {fontSize: 21, verticalAlign: 'top'},
        '& .rdtPrev span, & .rdtNext span': {display: 'block', userSelect: 'none'},
        '& .rdtPicker th.rdtDisabled, & .rdtPicker th.rdtDisabled:hover': {
            background: 'none',
            color: '#999999',
            cursor: 'default',
        },
        '& .rdtPicker thead tr:first-of-type th': {cursor: 'pointer'},
        '& .rdtPicker thead tr:first-of-type th:hover': {background: '#eeeeee'},
        '& .rdtPicker tfoot': {borderTop: '1px solid #f9f9f9'},
        '& .rdtPicker button': {border: 'none', background: 'none', cursor: 'pointer'},
        '& .rdtPicker button:hover': {backgroundColor: '#eee'},
        '& .rdtPicker thead button': {width: '100%', height: '100%'},
        '& td.rdtMonth, & td.rdtYear': {height: 50, width: '25%', cursor: 'pointer'},
        '& td.rdtMonth:hover, & td.rdtYear:hover': {background: '#eee'},
        '& .rdtCounters': {display: 'inline-block'},
        '& .rdtCounters > div': {float: 'left'},
        '& .rdtCounter': {height: 100, width: 40},
        '& .rdtCounterSeparator': {lineHeight: '100px'},
        '& .rdtCounter .rdtBtn': {
            height: '40%',
            lineHeight: '40px',
            cursor: 'pointer',
            display: 'block',
            userSelect: 'none',
        },
        '& .rdtCounter .rdtBtn:hover': {background: '#eee'},
        '& .rdtCounter .rdtCount': {height: '20%', fontsize: '1.2em'},
        '& .rdtMilli': {verticalAlign: 'middle', paddingLeft: 8, width: 48},
        '& .rdtMilli input': {width: '100%', fontSize: '1.2em', marginTop: 37},
        '& .rdtTime td': {cursor: 'default'},
    },
}));

const DateTimePicker: React.FC<DateTimePickerProps> = ({withTime, mode, isValidDate, optional, ...rest}) => {
    const [showPicker, realSetShowPicker] = React.useState(false);
    const classes = useStyles();
    const {texts} = useTheme();
    const fieldRef = React.useRef<HTMLInputElement | null>(null);
    const {height: pickerContainerHeight, ref: pickerContainerRef} = useElementDimensions();

    const setShowPicker = (show: boolean) => {
        if (!rest.disabled) {
            realSetShowPicker(show);
        }
    };

    const getPickerContainerStyles = (): React.CSSProperties => {
        const {top = 0, bottom = 0, left = 0} = fieldRef.current?.getBoundingClientRect() || {};
        // picker has different heights for month, year or day selectors
        // this hardcoded value is the date selector height + a little threshold
        const maxPickerHeight = 260;
        const openToBottom = maxPickerHeight + bottom < window.innerHeight;

        return {
            width: DEFAULT_WIDTH,
            top: openToBottom ? bottom : top - pickerContainerHeight,
            left,
            position: 'absolute',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow:
                '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
        };
    };

    const getValue = (): Date | undefined => {
        const value = fieldRef.current?.value;
        return value ? new Date(value) : undefined;
    };

    const formatMoment = (moment: Moment.Moment): string => {
        if (withTime) {
            return moment.format('yyyy-MM-DD HH:mm');
        }
        if (mode === 'year-month') {
            return moment.format('yyyy-MM');
        }
        return moment.format('yyyy-MM-DD');
    };

    const setValue = (moment: string | Moment.Moment) => {
        const value = typeof moment === 'string' ? moment : formatMoment(moment);
        if (fieldRef.current) {
            fieldRef.current.focus();
            rest.onChange?.(createChangeEvent(fieldRef.current, value));
        }
    };

    const renderEndIcon = () => {
        if (getValue() && optional) {
            return (
                <IconButton
                    aria-label={texts.clearButton}
                    size={32}
                    onPress={(event) => {
                        event.stopPropagation();
                        setValue('');
                    }}
                >
                    <IconCloseRegular />
                </IconButton>
            );
        }
        return (
            <IconButton
                disabled={rest.disabled}
                aria-label=""
                size={32}
                onPress={() => setShowPicker(!showPicker)}
            >
                <IconCalendarRegular />
            </IconButton>
        );
    };

    return (
        <>
            <TextFieldBase
                {...rest}
                style={{cursor: 'default'}}
                required={!optional}
                type="text"
                autoComplete="off"
                shrinkLabel={!!getValue()}
                endIcon={renderEndIcon()}
                inputRef={(e: HTMLInputElement) => {
                    rest?.inputRef?.(e);
                    fieldRef.current = e;
                }}
                readOnly
                onKeyDown={() => setShowPicker(true)}
                onClick={() => {
                    setShowPicker(true);
                }}
            />
            {showPicker && (
                <Overlay
                    onPress={(e) => {
                        cancelEvent(e);
                        setShowPicker(false);
                    }}
                    disableScroll
                >
                    <div
                        ref={pickerContainerRef}
                        style={getPickerContainerStyles()}
                        className={classes.reactDatePicker}
                    >
                        <Datetime
                            initialViewMode={mode === 'year-month' ? 'months' : undefined}
                            dateFormat={mode === 'year-month' ? 'YYYY-MM' : undefined}
                            timeFormat={withTime ? 'HH:mm' : false}
                            initialValue={getValue()}
                            locale={browserLocale}
                            input={false}
                            onChange={setValue}
                            isValidDate={isValidDate}
                        />
                    </div>
                </Overlay>
            )}
        </>
    );
};

export default DateTimePicker;
