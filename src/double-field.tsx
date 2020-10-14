import * as React from 'react';
import Box from './box';
import {createUseStyles} from './jss';
import {DEFAULT_WIDTH} from './text-field-components';

import type {FormTextFieldProps} from './text-field';
import type {FormSelectProps} from './select';
import type {FormCvvFieldProps} from './cvv-field';
import type {FormCreditCardExpirationFieldProps} from './credit-card-expiration-field';
import type {FormDecimalFieldProps} from './decimal-field';
import type {FormIntegerFieldProps} from './integer-field';
import type {FormDateFieldProps} from './date-field';
import type {FormPasswordFieldProps} from './password-field';
import type {FormPhoneNumberFieldProps} from './phone-number-field';
import type {FormEmailFieldProps} from './email-field';

type Field =
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

const DoubleField: React.FC<Props> = ({children, fullWidth}) => {
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

export default DoubleField;
