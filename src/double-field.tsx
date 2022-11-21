import * as React from 'react';
import Box from './box';
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
import * as styles from './double-field.css';

import type {RendersElement} from './utils/types';

type Field =
    | RendersElement<typeof TextField>
    | RendersElement<typeof Select>
    | RendersElement<typeof CvvField>
    | RendersElement<typeof CreditCardExpirationField>
    | RendersElement<typeof DecimalField>
    | RendersElement<typeof IntegerField>
    | RendersElement<typeof DateField>
    | RendersElement<typeof PhoneNumberField>
    | RendersElement<typeof PasswordField>
    | RendersElement<typeof EmailField>;

type Props = {
    fullWidth?: boolean;
    children: Field | [Field, Field];
    layout?: '50/50' | '40/60' | '60/40';
};

const DoubleField: React.FC<Props> = ({children, fullWidth, layout}) => {
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

    return <div className={styles.variants[fullWidth ? 'fullWidth' : 'default']}>{renderChildren()}</div>;
};

export default DoubleField;
