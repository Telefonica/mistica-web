import * as React from 'react';
import {TextFieldBaseAutosuggest} from './text-field-base';
import IconCalendarRegular from './generated/mistica-icons/icon-calendar-regular';
import Datetime from 'react-datetime';
import Overlay from './overlay';
import {DEFAULT_WIDTH} from './text-field-components';
import IconButton from './icon-button';
import {cancelEvent, createChangeEvent} from './utils/dom';
import {useElementDimensions, useTheme} from './hooks';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import * as styles from './date-time-picker.css';

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

const DateTimePicker: React.FC<DateTimePickerProps> = ({withTime, mode, isValidDate, optional, ...rest}) => {
    const [showPicker, realSetShowPicker] = React.useState(false);
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
            borderRadius: 8,
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
            <TextFieldBaseAutosuggest
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
                        className={styles.reactDatePicker}
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
