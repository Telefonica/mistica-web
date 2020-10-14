import * as React from 'react';
import Box from './box';
import {createUseStyles} from './jss';
import {DEFAULT_WIDTH} from './text-field-components';

import type {TextFieldProps} from './text-field';
import type {SelectProps} from './select';
import type {CvvFieldProps} from './cvv-field';
import type {CreditCardExpirationFieldProps} from './credit-card-expiration-field';
import type {DecimalFieldProps} from './decimal-field';
import type {IntegerFieldProps} from './integer-field';
import type {DateFieldProps} from './date-field';
import type {PasswordFieldProps} from './password-field';
import type {PhoneNumberFieldProps} from './phone-number-field';
import type {EmailFieldProps} from './email-field';

type Field =
    | React.ReactElement<TextFieldProps>
    | React.ReactElement<SelectProps>
    | React.ReactElement<CvvFieldProps>
    | React.ReactElement<CreditCardExpirationFieldProps>
    | React.ReactElement<DecimalFieldProps>
    | React.ReactElement<IntegerFieldProps>
    | React.ReactElement<DateFieldProps>
    | React.ReactElement<PhoneNumberFieldProps>
    | React.ReactElement<PasswordFieldProps>
    | React.ReactElement<EmailFieldProps>;

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
