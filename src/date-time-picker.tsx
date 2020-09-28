import * as React from 'react';
import TextFieldBase, {CommonFormFieldProps} from './text-field-base';
import {IconCalendarRegular} from './generated/mistica-icons';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import Overlay from './overlay';
import {DEFAULT_WIDTH} from './text-field-components';
import IconButton from './icon-button';
import {cancelEvent, createChangeEvent} from './utils/dom';

import type Moment from 'moment';

/**
 * Do not use this component!
 * Use FormDateField or FormDateTimeField
 *
 * This component is a fallback for browsers that don't support datetime-local or date inputs
 */

const browserLocale = navigator.language.toLocaleLowerCase().split('-')[0];
import(/* webpackChunkName: "moment-locale" */ `moment/locale/${browserLocale}`).finally(() => {});

export interface DateTimePickerProps extends CommonFormFieldProps {
    inputRef: (field: HTMLInputElement | null) => void;
    withTime?: boolean;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({withTime, ...rest}) => {
    const [showPicker, setShowPicker] = React.useState(false);
    const fieldRef = React.useRef<HTMLInputElement | null>(null);

    const onFocus = (event: React.FocusEvent) => {
        setShowPicker(true);
        rest.onFocus?.(event);
    };

    const getCalendarContainerStyles = (): React.CSSProperties => {
        const {top = 0, left = 0, height = 0} = fieldRef.current?.getBoundingClientRect() || {};
        return {
            width: DEFAULT_WIDTH,
            top: top + height,
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

    const setValue = (moment: string | Moment.Moment) => {
        console.log(moment);
        const value =
            typeof moment === 'string' ? moment : moment.format(withTime ? 'yyyy-MM-DD hh:mm' : 'yyyy-MM-DD');
        if (fieldRef.current) {
            console.log('onChange', value);
            rest.onChange?.(createChangeEvent(fieldRef.current, value));
        }
    };

    return (
        <>
            <TextFieldBase
                {...rest}
                type="text"
                autoComplete="off"
                onFocus={onFocus}
                shrinkLabel={!!getValue()}
                endIcon={
                    <IconButton label="" size={32} onPress={() => setShowPicker(!showPicker)}>
                        <IconCalendarRegular size={24} />
                    </IconButton>
                }
                inputRef={(e: HTMLInputElement) => {
                    rest?.inputRef?.(e);
                    fieldRef.current = e;
                }}
                readOnly
                onKeyDown={() => setShowPicker(true)}
                onClick={() => setShowPicker(true)}
            />
            {showPicker && (
                <Overlay
                    onPress={(e) => {
                        cancelEvent(e);
                        setShowPicker(false);
                    }}
                    disableScroll
                >
                    <div style={getCalendarContainerStyles()}>
                        <Datetime
                            initialValue={getValue()}
                            timeFormat={withTime ? undefined : false}
                            locale={browserLocale}
                            input={false}
                            onChange={setValue}
                        />
                    </div>
                </Overlay>
            )}
        </>
    );
};

export default DateTimePicker;
