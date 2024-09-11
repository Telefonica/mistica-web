import * as React from 'react';
import Box from './box';
import * as styles from './double-field.css';

import type CreditCardExpirationField from './credit-card-expiration-field';
import type CvvField from './cvv-field';
import type DateField from './date-field';
import type DecimalField from './decimal-field';
import type EmailField from './email-field';
import type IntegerField from './integer-field';
import type PasswordField from './password-field';
import type PhoneNumberField from './phone-number-field';
import type Select from './select';
import type TextField from './text-field';
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

const DoubleField = ({children, fullWidth, layout}: Props): JSX.Element => {
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
