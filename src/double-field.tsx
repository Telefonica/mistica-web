import * as React from 'react';
import Box from './box';
import {createUseStyles} from './jss';
import {DEFAULT_WIDTH} from './text-field-components';
import CreditCardExpirationField from './credit-card-expiration-field';
import CvvField from './cvv-field';
import DateField from './date-field';
import DecimalField from './decimal-field';
import EmailField from './email-field';
import IntegerField from './integer-field';
import PasswordField from './password-field';
import PhoneNumberField from './phone-number-field';
import Select from './select';
import TextField from './text-field';

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
    | React.ReactElement<TextFieldProps, typeof TextField>
    | React.ReactElement<SelectProps, typeof Select>
    | React.ReactElement<CvvFieldProps, typeof CvvField>
    | React.ReactElement<CreditCardExpirationFieldProps, typeof CreditCardExpirationField>
    | React.ReactElement<DecimalFieldProps, typeof DecimalField>
    | React.ReactElement<IntegerFieldProps, typeof IntegerField>
    | React.ReactElement<DateFieldProps, typeof DateField>
    | React.ReactElement<PhoneNumberFieldProps, typeof PhoneNumberField>
    | React.ReactElement<PasswordFieldProps, typeof PasswordField>
    | React.ReactElement<EmailFieldProps, typeof EmailField>;

type Props = {
    fullWidth?: boolean;
    children: Field | [Field, Field];
    layout?: '50/50' | '40/60' | '60/40';
};

const useStyles = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        [theme.mq.tabletOrSmaller]: {
            width: '100%',
        },
        [theme.mq.desktopOrBigger]: {
            width: ({fullWidth}) => (fullWidth ? '100%' : DEFAULT_WIDTH),
        },
    },
}));

const DoubleField: React.FC<Props> = ({children, fullWidth, layout}) => {
    const classes = useStyles({fullWidth});

    let rightWidth: string;
    let leftWidth: string;
    if (layout === '40/60') {
        leftWidth = '40%';
        rightWidth = '60%';
    } else if (layout === '60/40') {
        leftWidth = '60%';
        rightWidth = '40%';
    } else {
        leftWidth = '50%';
        rightWidth = '50%';
    }

    const renderChildren = () => {
        const [first, second]: any = React.Children.toArray(children);
        return (
            <>
                <Box paddingRight={8} width={leftWidth}>
                    {React.cloneElement(first, {
                        fullWidth: true,
                    })}
                </Box>
                <Box paddingLeft={8} width={rightWidth}>
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
