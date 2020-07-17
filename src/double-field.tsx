import * as React from 'react';
import {useScreenSize} from './hooks';
import Box from './box';

import type {TextFieldProps} from './text-field';
import type {SelectProps} from './select';
import type {FormTextFieldProps} from './form-text-field';
import type {FormSelectProps} from './form-select';
import type {FormCvvFieldProps} from './form-cvv-field';
import type {FormCreditCardExpirationFieldProps} from './form-credit-card-expiration-field';

type Field =
    | React.ReactElement<TextFieldProps>
    | React.ReactElement<SelectProps>
    | React.ReactElement<FormTextFieldProps>
    | React.ReactElement<FormSelectProps>
    | React.ReactElement<FormCvvFieldProps>
    | React.ReactElement<FormCreditCardExpirationFieldProps>;

type Props = {
    fullWidth?: boolean;
    children: Field | [Field, Field];
};

const DEFAULT_WIDTH = 328;

export const DoubleField: React.FC<Props> = ({children, fullWidth}) => {
    const {isMobile} = useScreenSize();

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        width: fullWidth || isMobile ? '100%' : DEFAULT_WIDTH,
    };

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

    return <div style={containerStyle}>{renderChildren()}</div>;
};
