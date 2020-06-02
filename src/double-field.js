// @flow
import * as React from 'react';
import {useScreenSize} from './hooks';
import Box from './box';

import typeof TextField from './text-field';
import typeof Select from './select';
import typeof FormTextField from './form-text-field';
import typeof FormSelect from './form-select';
import typeof FormCreditCardExpirationField from './form-credit-card-expiration-field';
import typeof FormCvvField from './form-cvv-field';

type Field =
    | React.Element<TextField>
    | React.Element<Select>
    | React.Element<FormTextField>
    | React.Element<FormSelect>
    | React.Element<FormCvvField>
    | React.Element<FormCreditCardExpirationField>;

type Props = {
    fullWidth?: boolean,
    children: Field | [Field, Field],
};

const DEFAULT_WIDTH = 328;

const DoubleField = ({children, fullWidth}: Props): React.Element<'div'> => {
    const {isMobile} = useScreenSize();

    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        width: fullWidth || isMobile ? '100%' : DEFAULT_WIDTH,
    };

    const renderChildren = () => {
        const [first, second] = React.Children.toArray(children);
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

export default DoubleField;
