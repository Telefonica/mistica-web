import * as React from 'react';
import Box from './box';
import {createUseStyles} from './jss';
import {DEFAULT_WIDTH} from './text-field-components';

import type {TextFieldProps} from './text-field';
import type {SelectProps} from './select';
import type {FormTextFieldProps} from './form-text-field';
import type {FormSelectProps} from './form-select';
import type {FormCvvFieldProps} from './form-cvv-field';
import type {FormCreditCardExpirationFieldProps} from './form-credit-card-expiration-field';
import type {FormDecimalFieldProps} from './form-decimal-field';
import type {FormIntegerFieldProps} from './form-integer-field';
import type {FormDateFieldProps} from './form-date-field';
import type {FormPasswordFieldProps} from './form-password-field';
import type {FormPhoneNumberFieldProps} from './form-phone-number-field';
import type {FormEmailFieldProps} from './form-email-field';

type Field =
    | React.ReactElement<TextFieldProps>
    | React.ReactElement<SelectProps>
    | React.ReactElement<FormTextFieldProps>
    | React.ReactElement<FormSelectProps>
    | React.ReactElement<FormCvvFieldProps>
    | React.ReactElement<FormCreditCardExpirationFieldProps>
    | React.ReactElement<FormDecimalFieldProps>
    | React.ReactElement<FormIntegerFieldProps>
    | React.ReactElement<FormDateFieldProps>
    | React.ReactElement<FormPhoneNumberFieldProps>
    | React.ReactElement<FormPasswordFieldProps>
    | React.ReactElement<FormEmailFieldProps>;

type Props = {
    fullWidth?: boolean;
    children: Field | [Field, Field];
};

const useStyles = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        [theme.mq.mobile]: {
            width: '100%',
        },
        [theme.mq.tabletOrBigger]: {
            width: ({fullWidth}) => (fullWidth ? '100%' : DEFAULT_WIDTH),
        },
    },
}));

export const DoubleField: React.FC<Props> = ({children, fullWidth}) => {
    const classes = useStyles({fullWidth});

    const renderChildren = () => {
        const [first, second]: any = React.Children.toArray(children);
        return (
            <>
                <Box paddingRight={8} width="50%">
                    {React.cloneElement(first, {
                        fullWidth: true,
                    })}
                </Box>
                <Box paddingLeft={8} width="50%">
                    {second &&
                        React.cloneElement(second, {
                            fullWidth: true,
                        })}
                </Box>
            </>
        );
    };

    return <div className={classes.container}>{renderChildren()}</div>;
};
